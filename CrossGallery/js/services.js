pod = crosscloud.connect();
angular.module('CrossGallery.controllers', []).
    factory('crossCloudAPIService', function($q) {
        crossCloud = {};

        crossCloud.requestAllMediaData = function() {
            var deferred = $q.defer();
            pod.query().filter({appName:appVersion, type:"media"}).onAllResults(function(items){

              deferred.notify(items);
              // for (var i = 0; i < items.length; i++) {
              //   var item = items[i];
              //   item.comments = [];

              //   pod.query().filter({appName:appVersion, type:"comment", mediaId:item._id}).onAllResults(function(comment) {
              //     item.comments.push(comment);
              //     deferred.notify(item);
  
              //   }).start();
              // }
            }).start();

            return deferred.promise;
        };

        return crossCloud;
    }
);