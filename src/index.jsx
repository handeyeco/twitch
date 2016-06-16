import React from 'react';
import {render} from 'react-dom';
import {userData} from './userData'
import {twitchAPIRequest} from './twitchAPIRequest'

var TwitchApp = React.createClass({
  getInitialState: function() {
    return {
      userObjs: [{displayName: "Loading"}],
      selectedUser: ""
    };
  },

  polling: function () {
    this.setState({userObjs: userData.userObjs});
  },

  componentDidMount: function() {
    userData.userList.forEach(twitchAPIRequest);
    setInterval(this.polling, 1000);
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <TwitchApp.userList userObjs={this.state.userObjs} />
    )
  }
});

TwitchApp.userList = React.createClass({
  handleSelection: function (event) {
    console.log(event.target);
  },

  render: function() {
    var userList = this.props.userObjs.map(function (element) {
      return <li onClick={this.handleSelection} className="user-list-item" name={element.name} key={element.name}>{element.displayName.toUpperCase()}</li>
    }.bind(this));

    return (
      <div id="user-list-container">
        <ul id="user-list">{userList}</ul>
      </div>
    )
  }
});

window.setTimeout(function () {
  console.log(userData.userObjs);
}, 2000);

render(<TwitchApp />, document.getElementById('twitch-app'));
