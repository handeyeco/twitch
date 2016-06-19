/* jshint esversion: 6 */

function twitchAPIRequest(element, that) {
  //Constructor for users returned via AJAX
  function User (name, exist, displayName, status, updated, logo, url, views, followers, stream, game) {
    this.name = name;
    this.exist = exist;
    this.displayName = displayName || name;
    this.status = status || "";
    this.updated = updated || "";
    this.logo = logo;
    this.url = url || "https://www.twitch.tv/";
    this.views = views || 0;
    this.followers = followers || 0;
    this.stream = stream || false;
    this.game = game || "";
  }

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
      that.handleAjaxReturn(new User(name, exist, displayName, status, updated, logo, url, views, followers, stream, game));
    });

  //Handle usernames that don't exist
  }).error(function (){
    that.handleAjaxReturn(new User(element, false));
  });

}

exports.twitchAPIRequest = twitchAPIRequest;
