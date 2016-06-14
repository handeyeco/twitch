import React from 'react';
import {render} from 'react-dom';

var userData = {
  userList: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
  userObjs: {}
}

window.setTimeout(function () {
  console.log(userData.userObjs["freecodecamp"]);
}, 5000);

var TwitchUsers = React.createClass({
  getInitialState: function() {
    return {
      userList: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
      userObjs: {}
    };
  },

  componentDidMount: function() {
    userData.userList.forEach(function (element) {
      $.getJSON("https://api.twitch.tv/kraken/channels/" + element, function(result) {
        var name = element,
            displayName = result.display_name,
            status = result.status || "",
            updated = result.updated_at,
            logo = result.logo,
            url = result.url,
            views = result.views,
            followers = result.followers;
        $.getJSON("https://api.twitch.tv/kraken/streams/" + element, function (result) {
          var game = "None", stream = "Nope";
          if (!!result.stream) {
            stream = "Yep";
            game = result.stream.game;
          }
          userData.userObjs[element] =
            <div className="container">
              <div className="row information">
                <div className="col-sm-12 col-md-6">
                  <a href={url}><img src={url} alt={displayName}/></a>
                </div>
                <div className="col-sm-12 col-md-6">
                  <a href={url}><h1>{displayName}</h1></a>
                  <p>Followers: {followers}</p>
                  <p>Views: {views}</p>
                  <p>Updated: {updated}</p>
                </div>
              </div>
              <div className="row status">
                <p>Currently Streaming: {stream} Game: {game}</p>
                <p>Status: {status.trim()}</p>
              </div>
            </div>;
        });
      });
    });
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return <div>{userData.userObjs["freecodecamp"]}</div>
  }
});

render(<TwitchUsers />, document.getElementById('twitch-app'));
