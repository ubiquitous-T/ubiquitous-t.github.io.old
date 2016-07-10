var getTopTracks = function(name){
  $.ajax({
    url:"https://api.spotify.com/v1/search?q=" + name + "&type=artist",
    method:"GET"
  }).success(function(artistData){
    var artistId = artistData.artists.items[0].id;

    $.ajax({
      url:"https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US",
      method:"GET"
    }).success(function(topTracks){
      // get list of related artists
      $.ajax({
        url:"https://api.spotify.com/v1/artists/"+artistId+"/related-artists",
        method: "GET"
      }).success(function(relatedArtists) {
        // pass in artists array
        renderRelatedArtists(relatedArtists.artists, name);
      });
      //this function expects an array
      //topTracks comes back as an object
      //with an array inside - watch out for that
      renderTopTracks(topTracks.tracks);
    });
  }).error(function(err){
    var parsedErr = JSON.parse(err.responseText);

    console.log(parsedErr.error.message,parsedErr.error.status);
  });
}

//function from underscore library
//returns a function that produces
//HTML based on a template
//.... WHAT?!
var trackTemplate = _.template($(".track-template").html());

//argument must be an array
var renderTopTracks = function(tracks){
  var $tracksElement = $("<div>");

  for(var i = 0; i < tracks.length; i++){
    var trackHTML = trackTemplate({
      title:tracks[i].name,
      artist:tracks[i].artists[0].name,
      album:tracks[i].album.name,
      songUrl:tracks[i].preview_url,
      artistUrl:tracks[i].artists[0].external_urls.spotify,
      albumUrl:tracks[i].album.external_urls.spotify,
      playId: "play-"+i,
      pauseId: "pause-"+i
    });
    $tracksElement.append(trackHTML);
  }
  $(".top-tracks").html($tracksElement);
}
// use underscore to produce html from template
var relatedArtistsTemplate = _.template($(".related-artists-template").html());

// display related artists
var renderRelatedArtists = function(relatedArtists, artist) {
  var $artistsElement = $("<div>");
  for (var i = 0; i < relatedArtists.length; i++) {
    var artistHTML = relatedArtistsTemplate({
      relatedArtist: relatedArtists[i].name,
      artistUrl: relatedArtists[i].external_urls,
    });
    $artistsElement.append(artistHTML);
  }
  $(".related-artists").html('<br><h4 class="related-title"> artists similar to '+ artist +'</h4>').css("text-align", "center");
  $(".related-artists").append($artistsElement);
}

//default javascript object
var audio = document.createElement("audio");
$("body").append(audio);

$(".artist-search").on("keydown",function(event){
  if(event.which === 13){
    getTopTracks($(this).val());
    $(this).val("");
  }
});

//delegate event - because there are no
//elements with a class of "play" or "pause" when the page loads
// these two event binding allow "play" and "pause" to be toggled
$(document).on("click",".play",function(event){
  // swap glyphicons by giving new values to
  // class property
  var $div = $(".top-tracks div div");

  console.log("$div: ", $("$div[0] div span"));

  $(event.target).attr("class", "glyphicon glyphicon-pause pause").css("display", "inline-block");

  var songUrl = $(this).attr("url");
  $(audio).attr("src",songUrl);
  audio.play();
});
$(document).on("click", ".pause", function() {
  // pause the audio
  audio.pause();
  // swap glyphicons again
  $(event.target).attr("class", "glyphicon glyphicon-play play").css("display", "inline-block");
})
