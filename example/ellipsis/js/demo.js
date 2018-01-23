angular.module('demoApp', ['thls.fast-ellipsis'])
    .service('dataService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
        this.loadText = function(){
            return $http.jsonp('https://baconipsum.com/api/?callback=JSON_CALLBACK');
        };
    }])
    .controller('demo', ['$scope', '$window', 'dataService', function ($scope, $window, dataService) {
       $scope.data = [];
          
       var window = angular.element($window);
       $scope.titleWidth = window.innerWidth; 
       
       dataService.loadImages().then(function(response){
            response.data.items.forEach(function(obj){
                dataService.loadText().then(
                function(text){
                    obj.titleText = text.data[0];
                },
                function(error){
      
                }
               );
            });
           $scope.data = response.data.items;
        });
        window.bind('resize', function() {
            $scope.titleWidth = window.innerWidth;
        });
    }]);