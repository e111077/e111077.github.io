$(document).ready(function() {
  var imagePreview = $('#imagePreview');
  var uploadButton = $('#uploadButton');
  var captionText = $('#captionText');
  var urlField = $('#newUrl');
  var uploadDiv = $('.upload');

  // $('#fileSelector').on('change', handleFileSelect);
  uploadButton.on('click', pushToServer);

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
  //         imagePreview.html(['<img class="centered block thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join(''));
          
          
  //         if (uploadDiv.hasClass('hidden')) {
  //           uploadDiv.transition('slide down');
  //         }
  //       };
  //     })(f);

  //     // Read in the image file as a data URL.
  //     reader.readAsDataURL(f);
  //   }
  // }

  function pushToServer() {
    if (uploadDiv.hasClass('animating')) {
      return;
    }

    if (uploadDiv.hasClass('visible')) {
      imagePreview.html("");
      uploadDiv.transition('slide down');
    }

    var caption = captionText.val();
    var url = urlField.val();

    if (url != undefined || url != "" || caption != undefined || caption != "") {
      captionText.val("");
      urlField.val("");

      var mediaItem = pod.push({appName:appVersion, type:"media", url:url, caption:caption}, function(mediaItem) {
        pod.push({appName:appVersion, type:"comment",content:caption,mediaId:mediaItem._id});
      });
    }
  }
});