import React from 'react';
import {render} from 'react-dom';

import TwitchHeader from './TwitchHeader.jsx';
import MobileUserList from './MobileUserList.jsx';
import UserDisplay from './UserDisplay.jsx';
import UserList from './UserList.jsx';

import {twitchAPIRequest} from './twitchAPIRequest'

var TwitchApp = React.createClass({
  getInitialState: function() {
    return {
      userList: ["ESL_SC2", "OgamingSC2", "comster404", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
      userObjs: [],
      selectedUser: null
    };
  },

  componentDidMount: function() {
    var that = this;
    this.state.userList.forEach(function (element) {
      twitchAPIRequest(element, that);
    });
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  handleAjaxReturn: function (newUser) {
    var newState = this.state.userObjs.slice();
    newState.push(newUser);
    newState.sort(function (a, b) {
      if (!a.exist || (a.stream === false && b.stream === true)) {
        return 1;
      } else if (!b.exist || (b.stream === false && a.stream === true)) {
        return -1;
      } else {
        return 0;
      }
    });
    this.setState({userObjs: newState});
  },

  handleSelection: function (event) {
    var newUserName = event.target.innerHTML;
    var newUserObj = this.state.userObjs.filter(function (e){
      return e.name === newUserName;
    })[0];

    this.setState({selectedUser: newUserObj});
  },

  render: function() {
    return (
      <div>
        <TwitchHeader />
        <MobileUserList userObjs={this.state.userObjs} />
        <UserList userObjs={this.state.userObjs} selectedUser= {this.state.selectedUser} handleSelection={this.handleSelection} />
        <UserDisplay selectedUser={this.state.selectedUser} />
      </div>
    )
  }
});

render(<TwitchApp />, document.getElementById('twitch-app'));
