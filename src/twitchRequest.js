/* jshint esversion: 6 */

import {userData} from './userData';

function twitchAPIRequest (element) {

  //AJAX request to get channel information
  jQuery.getJSON("https://api.twitch.tv/kraken/channels/" + element, function(result) {
    var name = element,
        exist = true,
        displayName = result.display_name,
        status = result.status,
        updated = result.updated_at,
        logo = result.logo,
        url = result.url,
        views = result.views,
        followers = result.followers;

    //Ajax request to get streaming information
    jQuery.getJSON("https://api.twitch.tv/kraken/streams/" + element, function (result) {
      var stream = !!result.stream, game = "Game Off";
      if (stream) {
        game = result.stream.game;
      }

      //Create new User object for each username that exists
      userData.userObjs[element] = new userData.User(name, exist, displayName, status, updated, logo, url, views, followers, stream, game);
    });

  //Handle usernames that don't exist
  }).error(function (){
    userData.userObjs[element] = new userData.User(element, false);
  });

}

exports.twitchAPIRequest = twitchAPIRequest;
