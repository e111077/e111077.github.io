var pod = crosscloud.connect();
var userMediaList = [];
var dataURLs = [];
var userId = undefined;
var app = angular.module('gallery', []);

pod.query().filter({appName:"CrossGallery"}).onAllResults(function(item) {
    owner = item._owner;

    if (owner == pod.getUserId()) {
        userId = item._id;

        userMediaList = item.media;
    }

    var mediaList = [];

    for (var i = 0; i < item.length; i++) {
      mediaList = mediaList.concat(item[i].media);
    }

    if (mediaList.length != 0) {
      for (var i = 0; i < mediaList.length; i++) {
        var image = mediaList[i];
        var imageDiv = $("#images");
        var prevImagesHtml = imageDiv.html();
        prevImagesHtml += "<img src='"+image.dataURL+"'>";
        imageDiv.html(prevImagesHtml);
      }
    }
}).start();

// app.controller('AllImagesController', function () {
//     this.media = [];
//     pod.query().pattern({appName:"CrossGallery"}).onAllResults(function(item) {
//         owner = item._owner;

//         if (owner == pod.getUserId()) {
//             userId = item._id;

//             userMediaList = item.media;
//         }

//         var mediaList = item.media;

//         for (var i = 0; i < mediaList.length; i++) {
//             this.media.push({media : mediaList[i]});
//         }
//     }).start();
// });

function handleFileSelect(evt) {
  dataURLs = [];
  var files = evt.target.files; // FileList object

      // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        dataURLs.push({dataURL : e.target.result});
        // Render thumbnail.
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(span, null);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

function pushToServer() {
  var newUserList = userMediaList + dataURLs;

  if (userId === undefined) {
    pod.push({appName:"CrossGallery", media : dataURLs})
  } else {
    pod.push({_id:userId, media:newUserList});
  }
}