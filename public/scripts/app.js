$(() => {

  const path_icon_love = "/icons/love.svg";
  const path_icon_bookmark = "/icons/bookmark.svg";
  const path_icon_retweet = "/icons/retweet.svg";

  function createTweetElement(tweet) {

    const newTweet = $("<article>").addClass("tweet");
    const formattedTime = moment(tweet.created_at).fromNow();
    

    const header = $("<header>").appendTo(newTweet);
    const image = $("<img>").addClass("profile-picture").attr("src", tweet.user.avatars.regular).appendTo(header);
    const name = $("<span>").addClass("name").text(tweet.user.name).appendTo(header);
    const username = $("<span>").addClass("username").text(tweet.user.handle).appendTo(header);

    const body = $("<div>").addClass("body").appendTo(newTweet);
    const content = $("<p>").text(tweet.content.text).appendTo(body);
    
    const footer = $("<footer>").appendTo(newTweet);
    const timestamp = $("<p>").addClass("timestamp").text(formattedTime).appendTo(footer);

    const iconContainer = $("<span>").addClass("icon-container").appendTo(footer);
    let iconLink;
    iconLink = $("<a>").addClass("icon-link").attr("href", "#").appendTo(iconContainer);
    const icon_like = $("<i>").addClass("fas fa-heart").appendTo(iconLink);
    iconLink = $("<a>").addClass("icon-link").attr("href", "#").appendTo(iconContainer);
    const icon_bookmark = $("<i>").addClass("fas fa-flag").appendTo(iconLink);
    iconLink = $("<a>").addClass("icon-link").attr("href", "#").appendTo(iconContainer);
    const icon_retweet = $("<i>").addClass("fas fa-retweet").appendTo(iconLink);

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
    $('#tweet-composer').slideToggle('slow',
    function() {
      $('#tweet-content').focus();
    });
  });

  $('#tweetMaker').on('submit', function(event) {

    event.preventDefault();

    const maxLength = 140;
    let content = $('#tweet-content').val();

    if (content.length > maxLength) {
      $('#error-messages').css({visibility: "visible"}).slideDown('slow');
      $('#error-messages').text("Max tweet length is 140 characters");
      return;
    } else if (!content) {
      $('#error-messages').css({visibility: "visible"}).slideDown('slow');;
      $('#error-messages').text("Cannot submit an empty tweet");
      return;
    }

    $('#error-messages').css({visibility: "hidden"}).slideUp('slow');
    const serialized = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: serialized,
      success: function(result){
        $('.tweets').empty();
        loadTweets();
        $('#tweet-content').val('');
        $('.new-tweet .counter').text('140');
      },
      error: function(err){

      }
    }) 
  });

  loadTweets();
  
});