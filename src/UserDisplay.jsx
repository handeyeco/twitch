import React from 'react';

export default React.createClass({
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
