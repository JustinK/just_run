angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, StopWatch) {
  var counter = 0;
  $scope.displayTime = '00:00:00'
  $scope.isRunning = false;
  $scope.isPaused = false;
  $scope.pauseLabel = 'Pause';
  var runClock;

  function displayTime() {
    $scope.displayTime = moment().hour(0).minute(0).second(counter++).format('HH:mm:ss');
    
  }
  function startWatch(){
    
    StopWatch.startClock(displayTime);
    $scope.isRunning = true;
    
  }
  function stopWatch(){
    if($scope.isPaused){
      StopWatch.startClock();
      //$scope.isRunning = false;
      $scope.isPaused = false;
      $scope.pauseLabel = 'Pause';
    }else{
      StopWatch.stopClock();
      $scope.isRunning = false;
      $scope.isPaused = true;
      $scope.pauseLabel = 'Resume';
    }
    
  }

  $scope.startClicked = startWatch;
  $scope.stopClicked = stopWatch;


})

.controller('RunsCtrl', function($scope, Runs) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.runs = Runs.all();
  $scope.remove = function(chat) {
    Runs.remove(chat);
  }
})

.controller('RunDetailCtrl', function($scope, $stateParams, Runs) {
  $scope.run = Runs.get($stateParams.runId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
