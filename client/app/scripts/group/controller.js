'use strict';

angular.module('Group')
.controller('group', function ($scope,generateMeeting,$http) {

  //console.log(JitsiMeetJS);


  $scope.controller_loaded = 'Group loaded!';
  $scope.newMeet = function(is_moderator){
    console.log($scope.room_name);
    $http({
      method: 'GET',
      url: '/jwt',
      params: {room_name: $scope.room_name, is_moderator: is_moderator}
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        console.log($scope.room_name);
        generateMeeting.newMeet($scope.room_name,is_moderator,response.data.token);
        //$scope.jwt = reponse.token;
      }, function errorCallback(response) {
        console.log(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(response);
      });
    
  }

})
.factory("generateMeeting", function(){


  var api;

  var generateMeeting = function (room_name , is_moderator , jwt){
    const domain = '8x8.vc';
    const options = {
      //roomName: `idukay-${ room_name }`,
      //roomName: `idukay-${ room_name }`,
      roomName: `vpaas-magic-cookie-1a656b2d05664edbbdad560acaee1fd7/${ room_name }`,
              
      //width: 800,
      height: 800,
      parentNode: document.querySelector('#meet'),
      jwt: jwt,
      configOverwrite:{
        disableInviteFunctions: true,
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        prejoinPageEnabled: true,
        enableWelcomePage: true,
        // remoteVideoMenu: {
        //       // If set to true the 'Kick out' button will be disabled.
        //       disableKick: true
        //   },
      
          // If set to true all muting operations of remote participants will be disabled.
          disableRemoteMute: true,
      },
      interfaceConfigOverwrite : {
        HIDE_INVITE_MORE_HEADER: true,
        TOOLBAR_BUTTONS: is_moderator?[
          'microphone',
          'camera',
          'closedcaptions',
          'desktop',
          'embedmeeting',
          'fullscreen',
          'fodeviceselection',
          'hangup',
          'profile',
          'chat',
          'recording',
          'livestreaming',
          'etherpad',
          'sharedvideo',
          'settings',
          'raisehand',
          'videoquality',
          'filmstrip',
          'invite',
          'feedback',
          'stats',
          'shortcuts',
          'tileview',
          'videobackgroundblur',
          'download',
          'help',
          'mute-everyone',
          'security'
      ]:[
        'microphone',
        'camera',
        'desktop',
        'fullscreen',
    ],
  
      },
     onload: onloadJitsiIframe
    };

    api = new JitsiMeetExternalAPI(domain, options);

    api.addEventListeners(
      'participantJoined' , onParticipantJoined
    );
  }

  

  var onloadJitsiIframe = function () {
    console.log("ONLOAD TEST");

    const participants = api.getParticipantsInfo();
    console.log(participants);

           window.apij = api;
  }

  var onParticipantJoined = function (event){
    console.log('Joined');
    console.log(`Hi ${event}`);
  }

  var meet = {
        newMeet: function(room_name, role, name, email){
          generateMeeting(room_name, role, name, email);
        }
    }
    return meet;
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });
});
