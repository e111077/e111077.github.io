appVersion = "CrossGallery_v0.4";
pod = crosscloud.connect();

$(document).ready(function() {
    var $uploadDiv = $('.upload');
    var $captionText = $('#captionText');
    var $urlField = $('#newUrl');


    jQuery('.fancybox').fancybox({
        margin      : [20, 80, 20, 80],
        helpers : {
            title   : {
                type: 'outside'
            },
            thumbs  : {
                width   : 50,
                height  : 50
            },
            fitToView : true,   
        }
    });

    /*
    * Replace all SVG images with inline SVG
    */
    $('img.svg').each(function(){
        var $img     = jQuery(this);
        var imgID    = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL   = $img.attr('src');

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });

    // opens the select image form
    $('#selectImage').on('click', function() {
        if ($uploadDiv.hasClass('animating')) {
            return;
        }
        
        if ($uploadDiv.hasClass('hidden')) {
            $uploadDiv.transition('slide down');
        }
    });

    // closes the select image from
    $('#cancelButton').on('click',function() {
        if ($uploadDiv.hasClass('animating')) {
            return;
        }

        if ($uploadDiv.hasClass('visible')) {
            $uploadDiv.transition('slide down', function() {
                $captionText.val("");
                $urlField.val("");
            });
        }
    });

    // listener for when user presses enter to submit comment
    $(document).on('keyup', '.comment.submission .input input', function(e){
        if (e.keyCode == 13){
            $(this).parent().parent().children(".button").trigger("click");
        }
    })

    // listener for when someone clicks submit comment button
    $(document).on('click', '.comment.submission .submit.button', function() {
        submitComment(this);
    });

    // listener for when someone clicks the delete media button
    $(document).on('click', '.deleteMedia.button', function() {
        var $this     = $(this);
        var mediaId   = $this.attr('mediaId');
        // finds all associated comments
        var $comments = $('.comment[mediaId="' + mediaId + '"]');

        // deletes all comments related to the media object
        for (var i = 0; i < $comments.length; i++) {
            var $comment  = $($comments[i]);
            var commentId = $comment.attr('commentId');

            pod.delete({_id:commentId});
        }

        // deletes the media object
        pod.delete({_id:mediaId});

    });

    // listener for when someone clicks the delete comment button
    $(document).on('click', '.deleteComment.icon', function() {
        var $this     = $(this);
        var commentId = $this.attr('commentId');

        pod.delete({_id:commentId});
    });

    // submits comment to the server
    submitComment = function(that){
        var $commentField = $($(that).parent().children(".input").children()[0]);
        var comment       = $commentField.val();
        var mediaId       = $(that).attr("mediaId");

        if (comment == "") {
            alert("Please enter a comment");
        }

        pod.push({appName:appVersion, type:"comment",content:comment,mediaId:mediaId}, function(commentObject){
            // clears the comment field
            $commentField.val("");
        });
    }
    
});