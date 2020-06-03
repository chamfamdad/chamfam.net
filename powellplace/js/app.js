(function(){
	var app = angular.module( 'APPHO', ['ngRoute'] );
	
	app.config( [ '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ){
		
		$routeProvider
		.when( '/', {
			templateUrl: '/templates/home.html'
		})
		.when( '/board', {
			templateUrl: '/templates/board.html'
		})
		.when( '/faq', {
			templateUrl: '/templates/faq.html'
		})
		.when( '/info', {
			templateUrl: '/templates/info.html'
		})
		.when( '/newsletter', {
			templateUrl: '/templates/newsletter.html'
		})
		.when( '/meetings', {
			templateUrl: '/templates/meetings.html',
			controller: 'MeetingsCtrl'
		})
		.otherwise( {
			redirectTo: '/'
		});
	}]);
	
	app.directive( 'apphoNavbar', function(){
		return{
			restrict: 'E',
			templateUrl: '/templates/navbar.html',
			activeTab: '='
		};
	});
	
	app.directive( 'apphoFooter', function(){
		return{
			restrict: 'E',
			templateUrl: '/templates/footer.html'
		};
	});
	
	app.controller( 'MeetingsCtrl', [ '$scope', '$http', function( $scope, $http ){
		$scope.meetings = [];
		
		$http.get( "/data/board-meetings.json?version=20140811" ).success( function( data ) {
			$scope.meetings = data;
		});
		
		$scope.isFuture = function( data ){
			
			if( data )
			{
				return data >= getToday();
			} 
			
			return false; 
		};
		
		$scope.isPast = function( data ){
			
			if( data )
			{
				return data < getToday();
			}
			
			return false; 
		};
		
		function getToday()
		{
			var date = new Date( Date.now() );
			var d = date.getDate();
			var m = date.getMonth() + 1;
			var y = date.getFullYear();
			
			return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
		}
	}]);
	
	app.controller( 'ApphoCtrl', [ '$scope', function( $scope ) {
		$scope.activeTab = '';
		
		$scope.$on( '$routeChangeSuccess', function( event, toState ){
			if( toState.originalPath )
			{
				$scope.activeTab = toState.originalPath.substr(1);
			}
		});

	}]);
})();
