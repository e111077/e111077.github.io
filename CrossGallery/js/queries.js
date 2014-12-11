$(function() {
  // do queries upon login
  pod.onLogin(function(userId) {
    var $gallery      = $("#gallery");
    
    // create a query
    var mediaQuery = pod.query();
    // filter for media
    mediaQuery.filter({appName:appVersion, type:"media"});


    // query handle the results
    mediaQuery.on('Appear', function (medium) {
      // iterate through each result
      var mediumHtml = mediumToHtml(medium);
      
      // append the media object
      $gallery.append(mediumHtml);
    });


    // deletes proper elements on delete
    mediaQuery.on('Disappear', function (medium) {
      var mediaId = medium._id;

      // delete the media object
      var $mediaWrapper = $('.mediaWrapper[mediaId="' + mediaId + '"]');
      $mediaWrapper.remove();
    });
    
    // create a new query for the comments
    var commentQuery  = pod.query();
    // filter for comments
    commentQuery.filter({appName:appVersion, type:"comment"});


    // handle the comment results
    commentQuery.on('Appear', function(comment) {
      // iterate through each comment
      var commentHtml = commentToHtml(comment);

      // get the place where we will insert comments for this medium
      var $commentField = $('[mediaId="' + comment.mediaId + '"].comments');
      // put the comment in the correct pedia object
      $commentField.append(commentHtml);

      $.fancybox.update();
    });


    // deletes proper comment elements on delete
    commentQuery.on('Disappear', function (comment) {
      var commentId = comment._id;

      // deletes the comment
      var $comment = $('.comment[commentId="' + commentId + '"]');
      $comment.remove();

      $.fancybox.update();
    });

    mediaQuery.start();
    commentQuery.start();
  });
});