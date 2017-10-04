var URL_Stream = 'https://wind-bow.gomix.me/twitch-api/streams/';

var URL_Channel = 'https://wind-bow.gomix.me/twitch-api/channels/';

//List of Channels to display
var channelArr = ["ruphin", "freecodecamp", "callowcreation", "i2ival__", "joshstrobl", "monstercat", "shroomhead_one", "abdulhd"];

//JSON data Storage
var twitchUserData = [];



$(document).ready(function(){
  //getStatus(); 
  $(function(){
    channelArr.forEach(function(e,i){
      getStatus(e);  
    })

    $('#online-btn').click(function(){
      if ($('div.main-card').hasClass("offline-status")) {
        $('div.offline-status').addClass("hide");
        if ($('div.online-status').hasClass("hide")){
          $('div.online-status').removeClass("hide");
        }
      } 
    })
    $('#all-btn').click(function () {
      $('div.main-card').removeClass('hide');
    })
    $('#offline-btn').click(function () {
      if ($('div.main-card').hasClass('online-status')) {
        $('div.online-status').addClass('hide');
        if ($('div.offline-status').hasClass('hide')){
          $('div.offline-status').removeClass('hide');
        }
      }
    })
  })
})
//T
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
            tempUserData.preview = 'https://s3.amazonaws.com/indieobscura-www/assets/article/2017/04/07/best-twitch-streamers-playerunknown-battlegrounds-feature_feature.jpg';
          }
          twitchUserData.push(tempUserData);
          if (twitchUserData.length == channelArr.length){
            console.log(twitchUserData);
            outputData();
          }
          //console.log(tempUserData);
        }
      })

    }
  })
}

function outputData(){
  var htmlstring=' ';
  for(var i = 0; i < twitchUserData.length; i++){

    htmlstring += '<div class="main-card col-12 col-md-6 col-lg-4 '+twitchUserData[i].name;
    if (twitchUserData[i].live) {
      htmlstring +=' online-status">';
    } else {
      htmlstring +=' offline-status">';
    }
    htmlstring += '<div class="info-card" style="background-image:url('+twitchUserData[i].preview+');"><img class="logo" src="' + twitchUserData[i].logo + '"><div class="info-section"><span class="name">'+twitchUserData[i].display_name+'</span><br><span class="info">'+twitchUserData[i].info+'</span><br><span class="game-viewers">'+twitchUserData[i].game+' - ';
    if (twitchUserData[i].viewers !== null){
      htmlstring += twitchUserData[i].viewers+'</span><div class="online"></div></div><a href="'+twitchUserData[i].url+'" target="_blank"><i class="fa fa-play-circle-o play"></i></a></div></div>'; 
    } else {
      htmlstring += 'OFFLINE</span><div class="offline"></div></div><a href="'+twitchUserData[i].url+'" target="_blank"><i class="fa fa-play-circle-o play"></i></a></div></div>';
    }

  }
  console.log(htmlstring);
  $('#output').html(htmlstring)
};