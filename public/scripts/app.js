/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]


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
      $(".tweets").append(createTweetElement(tweet));
    }
  }

  function loadTweets() {
    $.ajax( {
      method: "GET",
      url: "/tweets"
    }).then (function (tweets) {
      renderTweets(tweets);
    });
  }


  $('#tweetMaker').on('submit', function(event) {
    event.preventDefault();

    const serialized = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: serialized
    }).done (function () {
    });
  });

  loadTweets();
});




