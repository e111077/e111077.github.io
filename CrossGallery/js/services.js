pod = crosscloud.connect();
angular.module('CrossGallery.controllers', []).
    factory('crossCloudAPIService', function($q) {
        crossCloud = {};

        crossCloud.requestAllMediaData = function() {
            var deferred = $q.defer();
            pod.query().filter({appName:appVersion}).onAllResults(function(item){deferred.notify(item)}).start();
            return deferred.promise;
        };

        return crossCloud;
    }
);