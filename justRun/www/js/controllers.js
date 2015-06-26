angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, StopWatch) {
  var counter = 0;
  $scope.displayTime = '00:00:00'
  var runClock;

  function displayTime() {
    $scope.displayTime = moment().hour(0).minute(0).second(counter++).format('HH:mm:ss');
  }
  function startWatch(){
    //alert('something');
    $scope.displayTime = '5';
    
  }
  function stopWatch(){
    
  }

  $scope.startClicked = function (){
    StopWatch.startClock(displayTime);
  }
  $scope.stopClicked = stopWatch();

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
