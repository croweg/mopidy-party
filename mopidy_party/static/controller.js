'use strict';

// TODO : add a mopidy service designed for angular, to avoid ugly $scope.$apply()...
angular.module('partyApp', [])
  .controller('MainController', function($scope) {

  // Scope variables

  $scope.message = [];
  $scope.tracks  = [];
  $scope.tltracks = "Aucune musique dans la playlist";
  $scope.loading = true;
  $scope.ready   = false;
  $scope.currentState = {
    paused : false,
    length : 0,
    track  : {
      length : 0,
      name   : 'Nothing playing, add some songs to get the party going!'
    }
  };
console.log("extName: " + $scope.tltracks.name)
  // Initialize

  var mopidy = new Mopidy({
    'callingConvention' : 'by-position-or-by-name'
  });

  // Adding listenners

  mopidy.on('state:online', function () {
    mopidy.playback
    .getCurrentTrack()
    .then(function(track){
      if(track)
        $scope.currentState.track = track;
      return mopidy.playback.getState();
    })
    .then(function(state){
      $scope.currentState.paused = (state === 'paused');
      return mopidy.tracklist.getLength();
    })
    .then(function(length){
      $scope.currentState.length = length;
    })
    .done(function(){
      $scope.ready   = true;
      $scope.loading = false;
      $scope.$apply();
    });
  });
  mopidy.on('event:playbackStateChanged', function(event){
    $scope.currentState.paused = (event.new_state === 'paused');
    $scope.$apply();
  });
  mopidy.on('event:trackPlaybackStarted', function(event){
    $scope.currentState.track = event.tl_track.track;
    $scope.$apply();
  });
  mopidy.on('event:tracklistChanged', function(){
    mopidy.tracklist.getTracks().done(function(tltrack){
	    console.log("tltrack: " + tltrack);
	    var keys = Object.keys(tltrack);
			var tracks = [];
			console.log("keys: " + keys);
			for (var i = 0, len = keys.length; i < len; i++) {
				console.log("Name: " + tltrack[i]["name"]); 
				tracks.push = tltrack[i]["name"];
				console.log("tracks: " + tracks);
				$scope.tltracks = tracks;
				console.log("ExtName: " + $scope.tltracks.name)}
		});
	});

	function trackName(tlname) {
		return tlname.album.name === name;
	}
	
  $scope.printDuration = function(track){

    if(!track.length)
      return '';

    var _sum = parseInt(track.length / 1000);
    var _min = parseInt(_sum / 60);
    var _sec = _sum % 60;

    return '(' + _min + ':' + (_sec < 10 ? '0' + _sec : _sec) + ')' ;
  };

  $scope.togglePause = function(){
    var _fn = $scope.currentState.paused ? mopidy.playback.resume : mopidy.playback.pause;
    _fn().done();
  };

  $scope.search = function(){

    if(!$scope.searchField)
      return;

    $scope.message = [];
    $scope.loading = true;

    mopidy.library.search({
      'any' : [$scope.searchField]
    }).done(function(res){

      $scope.loading = false;
      $scope.tracks  = [];

      var _index = 0;
      var _found = true;
      while(_found){
        _found = false;
        for(var i = 0; i < res.length; i++){
          if(res[i].tracks && res[i].tracks[_index]){
            $scope.tracks.push(res[i].tracks[_index]);
            _found = true;
            mopidy.tracklist.filter({'uri': [res[i].tracks[_index].uri]}).done(function(matches){
    if (matches.length) {
      for (var i = 0; i < $scope.tracks.length; i++)
      {
        if ($scope.tracks[i].uri == matches[0].track.uri)
          $scope.tracks[i].disabled = true;
      }
      $scope.$apply();
    }
      });
          }
        }
        _index++;
      }

      $scope.$apply();
    });
  };

  $scope.addTrack = function(track){

    track.disabled = true;

    mopidy.tracklist
    .index()
    .then(function(index){
      return mopidy.tracklist.add({uris: [track.uri]});
    })
    .then(function(){
      // Notify user
      $scope.message = ['success', 'Next track: ' + track.name];
      $scope.$apply();
      return mopidy.tracklist.setConsume([true]);
    })
    .then(function(){
      return mopidy.playback.getState();
    })
    .then(function(state){
      // Get current state
      if(state !== 'stopped')
        return;
      // If stopped, start music NOW!
      return mopidy.playback.play();
    })
    .catch(function(){
      track.disabled = false;
      $scope.message = ['error', 'Unable to add track, please try again...'];
      $scope.$apply();
    })
    .done();
  };

  $scope.nextTrack = function(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "/party/vote", false ); // false for synchronous request
    xmlHttp.send( null );
    $scope.message = ['success', xmlHttp.responseText];
    $scope.$apply();
  };
});
