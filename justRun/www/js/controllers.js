angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, StopWatch, $cordovaGeolocation, $cordovaBackgroundGeolocation, $window) {
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
      startWatch();
      $scope.isPaused = false;
      $scope.pauseLabel = 'Pause';
    }else{
      StopWatch.stopClock();
      $scope.isRunning = true;
      $scope.isPaused = true;
      $scope.pauseLabel = 'Resume';
    }
    
  }

  $scope.startClicked = startWatch;
  $scope.stopClicked = stopWatch;

navigator.geolocation.getCurrentPosition(function(location) {
        console.log('[GEOLOCAL JS1] Location from Phonegap');
    },
    function (error){
        console.log('[GEOLOCAL JS1] error with GPS: error.code: ' + error.code + ' Message: ' + error.message);
    },options);


 var options = {
    enableHighAccuracy : true,
    desiredAccuracy: 0,
    stationaryRadius: 1,
    distanceFilter: 5,
    notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
    notificationText: 'ENABLED', // <-- android only, customize the text of the notification
    activityType: 'AutomotiveNavigation',
    debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
    };

  //document.addEventListener("deviceready", function () {
  ionic.Platform.ready(function(){
      $scope.location = 'ready';
    // `configure` calls `start` internally
    $cordovaBackgroundGeolocation.configure(options)
    .then(
      null, // Background never resolves
      function (err) { // error callback
        $scope.location = err;
      },
      function (location) { // notify callback
        $scope.location  = location; //.coords.latitude + ' ' + location.coords.longitude;
      });

    $scope.stopBackgroundGeolocation = function () {
      $cordovaBackgroundGeolocation.stop();
    };

  });
    

  //}, false);





  // var posOptions = {timeout: 10000, enableHighAccuracy: true};
  // $cordovaGeolocation
  //   .getCurrentPosition(posOptions)
  //   .then(function (position) {
  //     var lat  = position.coords.latitude
  //     var long = position.coords.longitude
  //   }, function(err) {
  //     // error
  //   });


  // var watchOptions = {
  //   frequency : 1000,
  //   timeout : 3000,
  //   enableHighAccuracy: true // may cause errors if true
  // };

  // var watch = $cordovaGeolocation.watchPosition(watchOptions);
  // watch.then(
  //   null,
  //   function(err) {
  //     // error
  //   },
  //   function(position) {
  //     $scope.location  = position.coords.latitude + ' ' + position.coords.longitude;
  // });






  //watch.clearWatch();
  // OR
  // $cordovaGeolocation.clearWatch(watch)
  //   .then(function(result) {
  //     // success
  //     }, function (error) {
  //     // error
  //   });

  // window.navigator.geolocation.getCurrentPosition(function(location) {
  //       console.log('Location from Phonegap');
  //   });
  // $ionicPlatform.ready(function() {
  //   $cordovaPlugin.someFunction().then(success, error);
  // });
   //var bgGeo = $window.plugins.backgroundGeoLocation;

  // /**
  //   * This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
  //   */
  //   var yourAjaxCallback = function(response) {
  //       ////
  //       // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
  //       //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
  //       // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
  //       //
  //       //
  //       bgGeo.finish();
  //   };

  //   /**
  //   * This callback will be executed every time a geolocation is recorded in the background.
  //   */
  //   var callbackFn = function(location) {
  //       $scope.location = '[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude;
  //       // Do your HTTP request here to POST location to your server.
  //       //
  //       //
  //       yourAjaxCallback.call(this);
  //   };

  //   var failureFn = function(error) {
  //       console.log('BackgroundGeoLocation error');
  //   }

  //   // BackgroundGeoLocation is highly configurable.
  //   bgGeo.configure(callbackFn, failureFn, {
  //       url: 'http://only.for.android.com/update_location.json', // <-- Android ONLY:  your server url to send locations to
  //       params: {
  //           auth_token: 'user_secret_auth_token',    //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
  //           foo: 'bar'                              //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
  //       },
  //       headers: {                                   // <-- Android ONLY:  Optional HTTP headers sent to your configured #url when persisting locations
  //           "X-Foo": "BAR"
  //       },
  //       desiredAccuracy: 10,
  //       stationaryRadius: 20,
  //       distanceFilter: 30,
  //       notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
  //       notificationText: 'ENABLED', // <-- android only, customize the text of the notification
  //       activityType: 'AutomotiveNavigation',
  //       debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
  //       stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
  //   });

  //   // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
  //   bgGeo.start();

  // var options = {
  //   // https://github.com/christocracy/cordova-plugin-background-geolocation#config
  // };

  // document.addEventListener("deviceready", function () {

  //   // `configure` calls `start` internally
  //   $cordovaBackgroundGeolocation.configure(options)
  //   .then(
  //     null, // Background never resolves
  //     function (err) { // error callback
  //       console.error(err);
  //     },
  //     function (location) { // notify callback
  //       $scope.location = location;
  //     });


  //   $scope.stopBackgroundGeolocation = function () {
  //     $cordovaBackgroundGeolocation.stop();
  //   };

  // }, false);


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
    enableCalories: true,
    enableMetric: false
  };
});
