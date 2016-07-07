import React from 'react';

export default React.createClass({
  render: function() {
    var userListItems = this.props.userObjs.map(function (element) {
      return <li className={element.exist ? element.stream ? "streaming" : "quiet" : "error"} key={element.name}><a href={element.url}>{element.name}</a></li>
    }.bind(this));

    return (
      <ul className="user-list-mobile">{userListItems}</ul>
    )
  }
});
