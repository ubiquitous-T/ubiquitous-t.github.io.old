

/* users datastore:
users: {
  username: usernameValue,
  password: passwordValue,
  userId: someNumberValue,
  avatar: imageReferenceValue
}
*/
// object for holding different string descriptions of when a message was posted
var postDateStrings = {
  "now": " just now ",
  "minuteSingular": " minute ago",
  "minutePlural": " minutes ago"
};

/* userPosts datastore */
//localStorage.clear();
var thisUser = "scott_t";
var status = "active";
var userPosts = JSON.parse(localStorage.getItem("userPosts")) || {
  thisUser: {
    "status": status,
    posts : [
      {
        "postId": 0,
        "content": "",
        "postDate": "",
        "postTime": 0
      }]
  }
};

//if (!userPosts) {
//}
  localStorage.setItem("userPosts", JSON.stringify(userPosts));
  console.log("created datastore");
  //userPosts = JSON.parse(localStorage.getItem("userPosts"));
  console.log("userPosts datastore: ", userPosts);
//}
//else {
//  console.log("object already exists");
//}

// bind event to input object
$(".message").on("keydown click", function(event) {
  if (event.which === 13) {
    var date = new Date();
    var postDate = getFormattedDate(date);
    var postTime = getFormattedTime(date);
    console.log("postDate: ", postDate);
    console.log("postTime: ", postTime);
    var content = $(this).val();
    renderPost(content, postDate, postTime);
    // clear the input
    $(this).val("");

    // add data to datastore
    userPosts.thisUser.posts.push(
      {
        "postId": 1,
        "content": content,
        "postDate": postDate,
        "postTime": postTime
      });

    localStorage.setItem("userPosts", JSON.stringify(userPosts));
  }
});

var getFormattedDate = function(date) {
  return (date.getMonth() + 1) +"-"+ date.getDate() +"-"+date.getFullYear();
};

var getFormattedTime = function(date) {
  var meridian = getMeridian(date);
  return date.getUTCHours() +":"+ date.getUTCMinutes() +":"+ date.getUTCSeconds() +" "+ meridian;
};

var getMeridian = function(date) {
  return (date.getUTCHours() >= 0 && date.getUTCHours() < 12) ? "AM" : "PM";
};
var getTimeAgo = function(postDate) {
  var now = Date.now();
  console.log("now: ", now);
  // calculate to minute resolution
  var timeAgo = (now - postDate)/(1000*60);
  var floor = Math.floor(timeAgo);
  var floorRemainder = timeAgo - floor;
  var ceiling = Math.ceil(timeAgo);
  var ceilRemainder = ceiling - timeAgo;

  if (floorRemainder < ceilRemainder) {
    console.log("time ago (floor): ", floor);
    return floor;
  }
  else if (floorRemainder > ceilRemainder) {
    console.log("time ago (floor): ", floor);
    return ceiling;
  }
  // fudge upwards, since time will continue to elapse
  else {
    console.log("time ago (ceiling): ", ceiling);
    return ceiling;
   }
}

// update the elapsed time
var getElapsedTime = function(then) {
  var now = Date.now();
  var elapsedTime = (now/60000) + then;
  return (elapsedTime);
};

var renderPost = function(content, postDate, postTime) {
  var postTemplate = _.template($(".posts-template").html());
  // container for each post
  var $postElement = $("<div>");
  // populate the template
  var postHTML = postTemplate({
    content: content,
    postDate: postDate,
    postTime: postTime,
    thisUser: thisUser
  });
  $postElement.append(postHTML);
  $(".posts").prepend($postElement);
};
