var URL_Stream = 'https://wind-bow.gomix.me/twitch-api/streams/'

var URL_Channel = 'https://wind-bow.gomix.me/twitch-api/channels/'

  //List of Channels to display
var channelArr = ["ruphin", "freecodecamp", "callowcreation", "i2ival__", "joshstrobl", "monstercat"]

  //JSON data Storage
var twitchUserData = [];



$(document).ready(function(){
  //getStatus(); 
  $(function(){
  channelArr.forEach(function(e,i){
    getStatus(e);
  })
})
})

function getStatus(user){
  $.ajax({
    url: URL_Stream + user,
    type: 'GET',
    aysnc: false,
    dataType: 'jsonp',
    success: function(data){
      var tempUserData = {};
      tempUserData.name = user;
      tempUserData.live = (data.stream !== null);
      if (tempUserData.live) {
        tempUserData.viewers = data.stream.viewers;
        tempUserData.preview = data.stream.preview.large;
      } else {
        tempUserData.viewers = null;
        tempUserData.preview = null;
      }
      $.ajax({
        url: URL_Channel + user,
        type: 'GET',
        aysnc: false,
        dataType: 'jsonp',
        success: function(data){
          tempUserData.logo = data.logo;
          tempUserData.info = data.status;
          tempUserData.display_name = data.display_name
          tempUserData.game = data.game;
          tempUserData.url = data.url;
          if (tempUserData.preview === null && data.video_banner !== null){
            tempUserData.preview = data.video_banner;
          }
          if (tempUserData.preview === null && data.profile_banner !== null) {
            tempUserData.preview = data.profile_banner;
          }
          if (tempUserData.preview === null && data.profile_banner === null) {
            tempUserData.preview = 'twitch';
          }
          twitchUserData.push(tempUserData);
          if (twitchUserData.length == channelArr.length){
            console.log(twitchUserData);
          }
          //console.log(tempUserData);
        }
      })
      
    }
  })
}