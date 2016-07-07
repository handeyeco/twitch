import React from 'react';

export default React.createClass({
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
