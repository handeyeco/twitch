import React from 'react';
import {render} from 'react-dom';
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
        <TwitchApp.header />
        <TwitchApp.userList userObjs={this.state.userObjs} handleSelection={this.handleSelection} />
        <TwitchApp.displayUser selectedUser={this.state.selectedUser} />
      </div>
    )
  }
});

TwitchApp.header = React.createClass({
  render: function () {
    return (
      <nav>
        <a href="https://www.twitch.tv/">
          <img src="./images/twitch_logo.svg" />
        </a>
      </nav>
    );
  }
});

TwitchApp.userList = React.createClass({
  render: function() {
    var userListItems = this.props.userObjs.map(function (element) {
      return <li onClick={this.props.handleSelection} className={element.exist ? element.stream ? "streaming" : "quiet" : "error"} id={element.name} key={element.name}>{element.name}</li>
    }.bind(this));

    return (
      <div id="user-list-container">
        <ul id="user-list">{userListItems}</ul>
      </div>
    )
  }
});

TwitchApp.displayUser = React.createClass({
  render: function() {
    var userObj = this.props.selectedUser;

    if (!userObj) {
      return (
        <div className="important-message">
          <h1>Welcome</h1>
          <p>Please select a user</p>
        </div>
      );
    }

    if (userObj.exist) {
      return (
        <div id="user-display-container">
          <img src={userObj.logo} />

          <div id="user-data">
            <a href={userObj.url}>
              <h1>{userObj.displayName}</h1>
            </a>
            <p>Followers: {userObj.followers}</p>
            <p>Views: {userObj.views}</p>
            <p>Updated: {userObj.updated}</p>
          </div>

          <div id="user-status">
            <p>Currently Streaming: {userObj.stream ? "Yes Game: " + userObj.game : "Nope"}</p>
            <p>Status: {userObj.status}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="important-message">
        <h1>Sorry</h1>
        <p>Unable to find user</p>
      </div>
     );

  }
});

render(<TwitchApp />, document.getElementById('twitch-app'));
