angular.module('CrossGallery.services', []).controller('mediaController', function($scope, crossCloudAPIService) {
  $scope.allMedia = [];
  crossCloudAPIService.requestAllMediaData().then(
    function(media) {
      for (var i = 0; i < media.length; i++) {
        var id = media[i]._id;
        id = id.split('/').join('').split('.').join('').split(':').join('');
        media[i].id = id;
      }

      $scope.allMedia = media;
         
    }, function(error) {

    },
    function(media) {
      for (var i = 0; i < media.length; i++) {
        var id = media[i]._id;
        id = id.split('/').join('').split('.').join('').split(':').join('');
        media[i].id = id;
      }

      $scope.allMedia = media;
    }
  );
});