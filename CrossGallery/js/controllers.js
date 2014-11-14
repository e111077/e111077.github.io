function getAllImages(scope) {
    scope.media = [];
    pod.query().filter({appName:"CrossGallery"}).onAllResults(function(item) {
        owner = item._owner;

        if (owner == pod.getUserId()) {
            userId = item._id;
            userMediaList = item.media;
        }

        var mediaList = item.media;

        for (var i = 0; i < mediaList.length; i++) {
            scope.media.push({media : mediaList[i]});
        }
    }).start();
}