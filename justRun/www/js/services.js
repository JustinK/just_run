angular.module('starter.services', [])

.factory('StopWatch', function($interval){
  var clock = null;
  var isRunning = false;
  return {

    startClock: function(fn){
      if (clock === null){
        clock = $interval(fn, 1000);
        isRunning = true;
      }
    },
    stopClock: function(){
      if (clock !== null){
        $interval.cancel(clock);
        clock = null;
        isRunning = false;
      }
    },
    isRunning: function(){
      return isRunning;
    }

  };
})

.factory('Runs', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var runs = [{
    id: 0,
    date: 'June 24, 2015',
    distance: '3.34',
    duration: '32:43',
    pace: '9:43',
    calories: '662'
  },{
    id: 1,
    date: 'June 21, 2015',
    distance: '3.49',
    duration: '38:16',
    pace: '10:02',
    calories: '578'
  },{
    id: 2,
    date: 'June 17, 2015',
    distance: '6.31',
    duration: '32:43',
    pace: '9:12',
    calories: '662'
  }, {
    id: 3,
    date: 'June 11, 2015',
    distance: '4.82',
    duration: '32:43',
    pace: '9:43',
    calories: '662'
  }, {
    id: 4,
    date: 'June 8, 2015',
    distance: '5.11',
    duration: '32:43',
    pace: '9:43',
    calories: '662'
  }, {
    id: 5,
    date: 'June 4, 2015',
    distance: '6.22',
    duration: '51:23',
    pace: '9:43',
    calories: '662'
  }];

  return {
    all: function() {
      return runs;
    },
    remove: function(run) {
      runs.splice(runs.indexOf(run), 1);
    },
    get: function(runId) {
      for (var i = 0; i < runs.length; i++) {
        if (runs[i].id === parseInt(runId)) {
          return runs[i];
        }
      }
      return null;
    }
  };
});
