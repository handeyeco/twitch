import React from 'react';
import {render} from 'react-dom';
import {userData} from './userData'
import {twitchAPIRequest} from './twitchAPIRequest'

var TwitchApp = React.createClass({
  getInitialState: function() {
    return {
      userObjs: [{displayName: "Loading"}],
      selectedUser: null
    };
  },

  handleSelection: function (event) {
    var newUserName = event.target.innerHTML;
    var newUserObj = userData.userObjs.filter(function (e){
      return e.name === newUserName;
    })[0];

    this.setState(function(state, currentProps) {
      return {selectedUser: newUserObj};
    });
  },

  polling: function () {
    this.setState({userObjs: userData.userObjs});
    if (userData.userObjs.length !== userData.userList.length) {
      setTimeout(this.polling, 500);
    }
  },

  componentDidMount: function() {
    userData.userList.forEach(twitchAPIRequest);
    setTimeout(this.polling, 200);
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
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
      return ( <h1 className="important-message">Welcome, please select a user</h1> );
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

    return ( <h1 className="important-message">Unable to find user</h1> );

  }
});

window.setTimeout(function () {
  console.log(userData.userObjs);
}, 2000);

render(<TwitchApp />, document.getElementById('twitch-app'));
