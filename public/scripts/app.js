/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const path_icon_love = "/icons/love.svg";
  const path_icon_bookmark = "/icons/bookmark.svg";
  const path_icon_retweet = "/icons/retweet.svg";

  function createTweetElement(tweet) {

    let newTweet = $("<article>").addClass("tweet");
    
    const header = $("<header>").appendTo(newTweet);
    const image = $("<img>").addClass("profile-picture").attr("src", tweet.user.avatars.regular).appendTo(header);
    const name = $("<span>").addClass("name").text(tweet.user.name).appendTo(header);
    const username = $("<span>").addClass("username").text(tweet.user.handle).appendTo(header);

    const body = $("<div>").addClass("body").appendTo(newTweet);
    const content = $("<p>").text(tweet.content.text).appendTo(body);
    
    const footer = $("<footer>").appendTo(newTweet);
    const timestamp = $("<p>").addClass("timestamp").text(tweet.created_at).appendTo(footer);
    const icon_like = $("<img>").addClass("icon").attr("src", path_icon_love).appendTo(footer);
    const icon_bookmark = $("<img>").addClass("icon").attr("src", path_icon_bookmark).appendTo(footer);
    const icon_retweet = $("<img>").addClass("icon").attr("src", path_icon_retweet).appendTo(footer);

    return newTweet;

  }

  function renderTweets(tweets) {
    for (let tweet of tweets) {
      $(".tweets").prepend(createTweetElement(tweet));
    }
  }

  function loadTweets() {
    $.ajax( {
      method: "GET",
      url: "/tweets"
    }) .then (function (tweets) {
      renderTweets(tweets);
    });
  }

  $('#compose').on('click', function(event) {
    $('#tweet-composer').slideToggle('slow');
  });

  $('#tweetMaker').on('submit', function(event) {

    event.preventDefault();

    const maxLength = 140;
    let content = $('#tweetcontent').val();

    if (content.length > maxLength) {
      return alert("Max tweet length is 140 characters");
    } else if (!content) {
      return alert("Cannot submit an empty tweet");
    }

    const serialized = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: serialized,
      success: function(result){
        loadTweets();
      },
      error: function(err){

      }
    }) 
  });

  loadTweets();
});




