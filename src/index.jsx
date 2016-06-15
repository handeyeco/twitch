import React from 'react';
import {render} from 'react-dom';
import {userData} from './userData'
import {twitchAPIRequest} from './twitchRequest'

var TwitchUsers = React.createClass({
  getInitialState: function() {
    return {
      selectedUser: ""
    };
  },

  componentDidMount: function() {
    userData.userList.forEach(twitchAPIRequest);
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return <p>Testing</p>
  }
});

render(<TwitchUsers />, document.getElementById('twitch-app'));

window.setTimeout(function () {
  console.log(userData.userObjs);
}, 5000);
