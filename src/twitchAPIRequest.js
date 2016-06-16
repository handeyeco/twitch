/* jshint esversion: 6 */

import {userData} from './userData';

function twitchAPIRequest(element) {

  //AJAX request to get channel information
  jQuery.getJSON("https://api.twitch.tv/kraken/channels/" + element, function(result) {
    var name = element,
        exist = true,
        displayName = result.display_name,
        status = result.status,
        updated = /\d{4}-\d{2}-\d{2}/.exec(result.updated_at)[0],
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
      userData.userObjs.push(new userData.User(name, exist, displayName, status, updated, logo, url, views, followers, stream, game));

      //Sort user data by whether an object exists and whether it's streaming
      userData.userObjs = userData.userObjs.sort(function (a, b) {
        if (!a.exist || (a.stream === false && b.stream === true)) {
          return 1;
        } else if (!b.exist || (b.stream === false && a.stream === true)) {
          return -1;
        } else {
          return 0;
        }

      });
    });

  //Handle usernames that don't exist
  //Automatically pushed to the end
  }).error(function (){
    userData.userObjs.push(new userData.User(element, false));
  });

}

exports.twitchAPIRequest = twitchAPIRequest;
