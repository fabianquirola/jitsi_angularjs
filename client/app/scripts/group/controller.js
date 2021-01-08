'use strict';

angular.module('Group')
.controller('group', function ($scope,generateMeeting) {

  //console.log(JitsiMeetJS);
  
    
    console.log(generateMeeting);
  $scope.controller_loaded = 'Group loaded!';
  $scope.newMeet = function(){
    generateMeeting.newMeet('00111','moderator','Fabian','f@f.com');
  }
  $scope.newMeetNM = function(){
    generateMeeting.newMeet('00111','participant','Jose','jj@f.com');
  }

  $scope.registro = function(p1,p2){
    console.log('pares 1 =', p1, 'pares 2 =', p2);
    
    return [2011];
  };



})
.factory("generateMeeting", function(){


  var api;

  var generateMeeting = function (room_name , role, name, email){
    const domain = '8x8.vc';
    const options = {
      //roomName: `idukay-${ room_name }`,
      //roomName: `idukay-${ room_name }`,
      roomName: `vpaas-magic-cookie-1a656b2d05664edbbdad560acaee1fd7/idukay-${ room_name }`,
              
      //width: 800,
      height: 800,
      parentNode: document.querySelector('#meet'),
      jwt:
     // role==='moderator'?
      'eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtMWE2NTZiMmQwNTY2NGVkYmJkYWQ1NjBhY2FlZTFmZDcvYmVmYTBhLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTYxMDE0NTkwOCwibmJmIjoxNjEwMTM4NzAzLCJpc3MiOiJjaGF0Iiwicm9vbSI6IioiLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtMWE2NTZiMmQwNTY2NGVkYmJkYWQ1NjBhY2FlZTFmZDciLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOiJmYWxzZSIsIm91dGJvdW5kLWNhbGwiOiJmYWxzZSIsInRyYW5zY3JpcHRpb24iOiJmYWxzZSIsInJlY29yZGluZyI6ImZhbHNlIn0sInVzZXIiOnsibW9kZXJhdG9yIjoidHJ1ZSIsIm5hbWUiOiJUZXN0IFVzZXI5MSIsImlkIjoiZ29vZ2xlLW9hdXRoMnwxMDE3NTY5OTU5MDkzOTA1NjIyODAiLCJhdmF0YXIiOiIiLCJlbWFpbCI6InRlc3QudXNlcjkxQGRvbWFpbi5jb20ifX19.QVHMO9eF7139ex8B-0QiPmOA2_h71I9whcmAsfBf0BMgKeTuFJHBwuXT3__SFd504W20k46lSotHYNoWStBSBKLjkl3T5jx62e9vFSBVPYi7_4HAcBY43kly1c62PHEE1Y6OmA9JRQhFONwfCpJwTFzTeCpVpSMWIOF1PAsgiIZ3rePFwsJscKqczHd87qr5QeYoS-QyVvqS10tb0ShF2XVjJk7u9QaUX6k1sD19K0t7cu9qTxdwaOZswVYJZvsYfdcFC7U3rKkaeb_4iZQkjGwu_fdwoqHlmiuztjxJzvAmN7kqRIfz7QFP4dIwPG9jLPQzr_VyleSwwGKw_JBDZQ',
      // 'eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtMWE2NTZiMmQwNTY2NGVkYmJkYWQ1NjBhY2FlZTFmZDcvZjhlMzZjIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTYxMDEyOTY0NSwibmJmIjoxNjEwMTIyNDQwLCJpc3MiOiJjaGF0Iiwicm9vbSI6IioiLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtMWE2NTZiMmQwNTY2NGVkYmJkYWQ1NjBhY2FlZTFmZDciLCJjb250ZXh0Ijp7Imdyb3VwIjoiNDU2IiwiZmVhdHVyZXMiOnsibGl2ZXN0cmVhbWluZyI6ImZhbHNlIiwib3V0Ym91bmQtY2FsbCI6ImZhbHNlIiwidHJhbnNjcmlwdGlvbiI6ImZhbHNlIiwicmVjb3JkaW5nIjoiZmFsc2UiLCJtb2RlcmF0aW9uIjoiZmFsc2UifSwidXNlciI6eyJtb2RlcmF0b3IiOiJmYWxzZSIsIm5hbWUiOiJObyBtb2RlcmFkb3IgQW5kcmVzIiwiaWQiOiIxMjM0NTYiLCJhdmF0YXIiOiIiLCJlbWFpbCI6ImZhYmlhbi5xdWlyb2xhMjJAaWR1a2F5LmNvbSJ9fX0.et71FQWOuRCLT4NhPzO3zZ4VElrS7gOVvKG8bfkX8cNAWjCzzyTFsux0dCLgs3MPl765DoA28OnDyapLHVdAWgFMezHKT-zy8rFJRSvIo7pn4vOYdbahHkvMPFql57e3n8c02fp7TqzDVFAkq8a7-C3WgvSKtCvV4mFtQt15f5MbB8eS9ZktHdnaJ68w8AxMN3pe4LQuY_819N6OYSbkwG-1hqLiyO4eClmLFvjNNL3v97C19EYq0MF2BuUgPiifHcZKgTnMn2wovgPADIft7O3-TtsG7P8gBGxQ4QIMN42c4g1i6d9UXdqP5NYp4koVyFZ5fr4tnacpYQa_szoz8w',
    //   //'eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtMWE2NTZiMmQwNTY2NGVkYmJkYWQ1NjBhY2FlZTFmZDcvZjhlMzZjIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTYxMDEyOTY0NSwibmJmIjoxNjEwMTIyNDQwLCJpc3MiOiJjaGF0Iiwicm9vbSI6IioiLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtMWE2NTZiMmQwNTY2NGVkYmJkYWQ1NjBhY2FlZTFmZDciLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOiJmYWxzZSIsIm91dGJvdW5kLWNhbGwiOiJmYWxzZSIsInRyYW5zY3JpcHRpb24iOiJmYWxzZSIsInJlY29yZGluZyI6ImZhbHNlIn0sInVzZXIiOnsibW9kZXJhdG9yIjoiZmFsc2UiLCJuYW1lIjoiSm9zZSBBbGJlcnRvIEppbWVuZXoiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTAxNzU2OTk1OTA5MzkwNTYyMjgwIiwiYXZhdGFyIjoiIiwiZW1haWwiOiJqb3Nlc2l0b0BlbWFpbC5jb20ifX19.M0vdX7WTa9CVXfeOlwl5DEh3Csfr1uxGZKwnR7BtdOUe0EXZFys0O4PbQVaWWf6YhSSHC76pN1ZRw2emVzW8qN8Ej0QjtG6VjiBR8bLaBKO9z6ilN77Yawip6e5Sckzuao8oTmJhoUF1PnfYsJpHZfZYQHJUKkO4XsR1XjcJQ9i55YyUaLrVodGatq3N3QFzCeAuCK1h-BU361JyTFyuzI9LYaHgU6LD4JLDECRXJUcazEqzqQh-rT0EtrXJZ1E5pIVA0tF_vlH6CZp4DaU7em93JdJb4blBUzBltergCJDemKvWcfJrScxAXFdorc_6jkcoIg05Ldxqjp-tKeQuDQ',
      userInfo: {
        name: name,
        email: email,
        displayName: name,
      },
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
        TOOLBAR_BUTTONS: role==='moderator'?[
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
    console.log('inicio');
    console.log(api);
    console.log('fin');

    api.addEventListeners({
      participantJoined : onParticipantJoined,
    });
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
