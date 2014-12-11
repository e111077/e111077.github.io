$(document).ready(function() {
  var $imagePreview = $('#imagePreview');
  var $uploadButton = $('#uploadButton');
  var $captionText = $('#captionText');
  var $urlField = $('#newUrl');
  var $uploadDiv = $('.upload');

  // $('#fileSelector').on('change', handleFileSelect);
  $uploadButton.on('click', pushToServer);

  // function handleFileSelect(evt) {
  //   var files = evt.target.files; // FileList object

  //   // Loop through the FileList and render image files as thumbnails.
  //   for (var i = 0, f; f = files[i]; i++) {

  //     // Only process image files.
  //     if (!f.type.match('image.*')) {
  //       continue;
  //     }

  //     var reader = new FileReader();

  //     // Closure to capture the file information.
  //     reader.onload = (function(theFile) {
  //       return function(e) {
  //         dataURL = e.target.result;
  //         // Render thumbnail.
  //         $imagePreview.html(['<img class="centered block thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join(''));
          
          
  //         if ($uploadDiv.hasClass('hidden')) {
  //           $uploadDiv.transition('slide down');
  //         }
  //       };
  //     })(f);

  //     // Read in the image file as a data URL.
  //     reader.readAsDataURL(f);
  //   }
  // }

  // pushes the media to the server
  function pushToServer() {
    // will not submit if it is animating
    if ($uploadDiv.hasClass('animating')) {
      return;
    }

    // gets the caption and the url
    var caption = $captionText.val();
    var url = $urlField.val();

    // checks if there are any issues with the input
    if (url != undefined && url != "" && caption != undefined && caption != "") {
      // clears the fields
      $captionText.val("");
      $urlField.val("");

      // closes the form
      if ($uploadDiv.hasClass('visible')) {
        $imagePreview.html("");
        $uploadDiv.transition('slide down');
      }

      // pushes to server
      var mediaItem = pod.push({appName:appVersion, type:"media", url:url, caption:caption}, function(mediaItem) {
      });
    } else {
      alert("Url and Caption are required fields.");
    }
  }
});