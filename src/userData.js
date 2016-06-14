var userData = {
  userList: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
  userObjs: {},
  User: function (name, displayName, status, updated, logo, url, views, followers, stream, game) {
    this.name = name;
    this.displayName = displayName;
    this.status = status;
    this.updated = updated;
    this.logo = logo;
    this.url = url;
    this.views = views;
    this.followers = followers;
    this.stream = stream;
    this.game = game;
  }
};

exports.userData = userData;
