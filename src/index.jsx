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
        <TwitchApp.userListMobile userObjs={this.state.userObjs} />
        <TwitchApp.userList userObjs={this.state.userObjs} selectedUser= {this.state.selectedUser} handleSelection={this.handleSelection} />
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
      var assembledClass = element.exist ? element.stream ? "streaming" : "quiet" : "error";
      if (this.props.selectedUser && element.name === this.props.selectedUser.name) {
        assembledClass += " selected";
      }

      return (
        <li onClick={this.props.handleSelection} className={assembledClass} key={element.name}>
          {element.name}
        </li>
    )}.bind(this));

    return (
      <ul className="user-list">{userListItems}</ul>
    )
  }
});

TwitchApp.userListMobile = React.createClass({
  render: function() {
    var userListItems = this.props.userObjs.map(function (element) {
      return <li className={element.exist ? element.stream ? "streaming" : "quiet" : "error"} key={element.name}><a href={element.url}>{element.name}</a></li>
    }.bind(this));

    return (
      <ul className="user-list-mobile">{userListItems}</ul>
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
      var shortURL = userObj.url.replace(/^https:\/\/(.+)/, "$1");
      return (
        <div className="user-display-container">
          <img src={userObj.logo} />

          <div className="user-data">
            <a href={userObj.url}>
              <h1>{userObj.displayName}</h1>
            </a>
            <p><span className="label">Followers:</span> {userObj.followers}</p>
            <p><span className="label">Views:</span> {userObj.views}</p>
            <p><span className="label">Updated:</span> {userObj.updated}</p>
            <p><a href={userObj.url}>{shortURL}</a></p>
          </div>

          <div className="user-status">
            <p><span className="label">Currently Streaming:</span> {userObj.stream ? "Yes" : "Nope"}</p>
            {userObj.stream ? <p><span className="label">Game:</span> {userObj.game}</p> : ""}
            <p><span className="label">Status:</span> {userObj.status}</p>
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
