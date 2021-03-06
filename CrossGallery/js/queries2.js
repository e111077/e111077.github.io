$(function() {
  // do queries upon login
  pod.onLogin(function(userId) {
    var $gallery      = $("#gallery");
    
    // create a query
    var mediaQuery = pod.query();
    // filter for media
    mediaQuery.filter({appName:appVersion, type:"media"});

    // query handle the results
    mediaQuery.onAllResults(function (media) {
      var fullMediumHtml = "";
      // iterate through each result
      for (var i = 0; i < media.length; i++) {
        var medium     = media[i];
        var mediumHtml = mediumToHtml(medium);
        
        // append the media object
        fullMediumHtml += mediumHtml;
      }

      $gallery.html(fullMediumHtml);
    });
    
    // create a new query for the comments
    var commentQuery  = pod.query();
    // filter for comments
    commentQuery.filter({appName:appVersion, type:"comment"});
    // handle the comment results
    commentQuery.onAllResults(function(comments) {
      var fullCommentHtml = "";
      // iterate through each comment
      for(var j = 0; j < comments.length; j++) {
        var comment     = comments[j];
        var commentHtml = commentToHtml(comment);

        // get the place where we will insert comments for this medium
        var $commentField = $('[mediaId="' + comment.mediaId + '"] .comments');
        // put the comment in the correct pedia object
        fullCommentHtml += commentHtml;
      }

      $commentField.html(fullCommentHtml);
    });

    mediaQuery.start();
    commentQuery.start();
  });
});