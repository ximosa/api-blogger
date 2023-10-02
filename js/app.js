	// the app module
	var mainApp = angular.module('mainApp', ['ui.router','ngResource']);

	// configured routes
	mainApp.config(function($stateProvider,$httpProvider) {
		$stateProvider
		.state('inicio',{
			url:'/inicio',
			templateUrl : 'pages/inicio.html',
			controller  : 'blogController'
		})
			.state('blog',{
		        url:'/blog',
				templateUrl : 'pages/blog.html',
				controller  : 'blogController'
		    })

			.state('post',{
		        url:'/:id',
				templateUrl : 'pages/post.html',
				controller  : 'postsController'
		    });

  })

  .run(function($state){
    $state.go('inicio');
  });

	mainApp.controller('blogController',function($scope,$state,Blog){
        $scope.title = 'WEBGAE';
        $scope.description = 'Diseño y desrrollo web';
	    $scope.posts = Blog.query();
	});

	mainApp.controller('postsController', function($scope,$state,$stateParams,Blog) {
		$scope.posts = Blog.get({id:$stateParams.id});
		$scope.key = $stateParams.id;
		$scope.postURL = 'http://localhost:8888/' + $stateParams.id;
	   	$scope.searchFilter = function (post) {
	    var keyword = new RegExp($scope.dataFilter, 'i');
	    	return !$scope.dataFilter || keyword.test(posts.title) || keyword.test(posts.author.displayName) || keyword.test(posts.labels) || keyword.test(posts.content);
		};
	});

	mainApp.factory('Blog',function($resource){
    	return $resource(
    		'https://www.googleapis.com/blogger/v3/blogs/2756493429384988662/posts?maxResults=500&key=AIzaSyD30gkIMXNzKlKsAHAA8ADKaYoFf_WKIOA',
    		{},
      		{query: { method: 'GET', isArray: false }}
    	);
	});

	mainApp.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

   