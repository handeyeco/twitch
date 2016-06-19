var userData = {
  //Constructor for userObjs
  User: function (name, exist, displayName, status, updated, logo, url, views, followers, stream, game) {
    this.name = name;
    this.exist = exist;
    this.displayName = displayName || name;
    this.status = status || "";
    this.updated = updated || "";
    this.logo = logo;
    this.url = url || "https://www.twitch.tv/";
    this.views = views || 0;
    this.followers = followers || 0;
    this.stream = stream || false;
    this.game = game || "";
  }
};

exports.userData = userData;
