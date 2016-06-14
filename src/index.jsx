import React from 'react';
import {render} from 'react-dom';
import {userData} from './userData';

window.setTimeout(function () {
  console.log(userData)
}, 5000);

var TwitchUsers = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
    userData.userList.forEach(function (element) {
      $.getJSON("https://api.twitch.tv/kraken/channels/" + element, function(result) {
        var name = element,
            displayName = result.display_name,
            status = result.status,
            updated = result.updated_at,
            logo = result.logo,
            url = result.url,
            views = result.views,
            followers = result.followers;
        $.getJSON("https://api.twitch.tv/kraken/streams/" + element, function (result) {
          var game, stream;
          if (stream = !!result.stream) {
            game = result.stream.game;
          }
          userData.userObjs[element] = new userData.User(name, displayName, status, updated, logo, url, views, followers, stream, game);
        });
      });
    });
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        <p>This is the render</p>
      </div>
    );
  }
});

render(<TwitchUsers source="https://api.github.com/users/octocat/gists" />, document.getElementById('twitch-app'));
