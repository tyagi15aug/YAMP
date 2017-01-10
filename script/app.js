var movieApp = angular.module('movieApp',['ngRoute']);

movieApp.config(['$routeProvider','$locationProvider',function($routeProvider,$location){
    $routeProvider
    .when('/',{
        templateUrl:'templates/login.html'
    })
    .when('/home',{
        templateUrl:'templates/home.html',
        controller: 'homeController'
    })
    .when('/details',{
        templateUrl:'templates/details.html',
        controller: 'detailsController'
    })
    .when('/resultCard',{
        templateUrl:'templates/resultCard.html'
    })
    .otherwise({redirectTo:'/home'});
}]);

// movieApp.factory('shareData', function(){
//     var data = {};
//     data.add = function(_data){
//         data = _data;
//       };
//     return data;
// });

movieApp.service('shareData', function(){
    var data = this;
});

movieApp.controller('movieResults',function($scope, $http, $q){
  $scope.getMovies = function(){
    var tmdburl = 'https://api.themoviedb.org/3/search/movie?api_key=4fc1abb150efd5f298181b4ff2bf0eca&query=' + $scope.searchString;
    //var rottenTomatoesURL = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=89cm6j7ykyrce4ze8akyr5qn&q=" + $scope.searchString + "&page_limit=1";
    if($scope.searchString){
      $http.get(tmdburl)
          .then(function(response) {
              $scope.movies = response.data.results;
          });
      } else if($scope.searchString == "" || $scope.searchString == null){
        $scope.movies = {};
      }
  }

  $scope.wolframIt =  function(){
    var url = 'http://api.wolframalpha.com/v2/query?input=' + $scope.wolframString + '&appid=AA5WPW-QR2JY3QY82'
    $http.get(url)
        .then(function(response) {
            var x2js = new X2JS();
            var jsonOutput = x2js.xml_str2json(response.data);
            $scope.wolframResults = jsonOutput.queryresult;
        });
  }
});

movieApp.controller('homeController',function($scope, $http, $q){

});

movieApp.controller('detailsController',function($scope, $http, shareData){
    $scope.movieDetails = shareData.data;
});

movieApp.controller('resultCardController',function($scope, $http, $location, shareData){
    $scope.showMovieDetails = function(movieID){
        var tmdbDetURL = 'https://api.themoviedb.org/3/movie/'+ movieID +'?api_key=4fc1abb150efd5f298181b4ff2bf0eca&append_to_response=videos';
        $http.get(tmdbDetURL)
             .then(function(response){
                 $scope.movieDetails = response.data;
                 shareData.data = $scope.movieDetails;
                 $location.path('/details');
             });
    }
});

movieApp.directive('resultCard', ['$http',function($http){
    return{
        restrict: 'E',
        scope:{ movie: '=movieData'},
        templateUrl: 'templates/resultCard.html',
        controller: 'resultCardController'
    };
}]);

movieApp.filter('textLimiter', function(){
    return function(input){
        if(input.length <= 347){
          return input;
        } else if(input.length > 347){
          input = input.substring(0,347) + "...";
          return input;
        }
    }
});

movieApp.filter('movieLanguage', function(){
    return function(input){
        if(input == 'hi'){
          return 'Hindi';
        } else if(input == 'en'){
          return 'English';
        } else if(input == 'fr'){
          return 'French';
        } else if(input == 'es'){
          return 'Spanish';
        } else if(input == 'ta'){
          return 'Tamil';
        } else if(input == 'te'){
          return 'Telugu';
        } else if(input == 'kn'){
          return 'Kannad';
        } else if(input == 'ml'){
          return 'Malayalam';
        } else if(input == 'ar'){
          return 'Arabic';
        } else if(input == 'sr'){
          return 'Serbian';
        } else if(input == 'ru'){
          return 'Russian';
        } else if(input == 'cs'){
          return 'Czech';
        } else if(input == 'th'){
          return 'Thai';
        } else if(input == 'tl'){
          return 'Philippines';
        }  if(input == 'hr'){
          return 'Hungarian';
        } else{
          return input;
        }
    }
});

movieApp.filter('dateFormatter', function(){
    return function(input){
        var date = input.substring(5,7) + "/" + input.substring(8,10) + "/" + input.substring(0,4);
        return date;
    }
});
