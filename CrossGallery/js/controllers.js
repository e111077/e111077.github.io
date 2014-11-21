angular.module('CrossGallery.services', []).controller('mediaController', function($scope, crossCloudAPIService) {
    $scope.allMedia = [];
    crossCloudAPIService.requestAllMediaData().then(
        function(media) {
            $scope.allMedia = media;
             
        }, function(error) {},
        function(media) {
            $scope.allMedia = media;
    });
});