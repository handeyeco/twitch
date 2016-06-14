var twitch = {
	userArr: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"],
	userObj: {},
	channelUrl: "https://api.twitch.tv/kraken/channels/",
	streamUrl: "https://api.twitch.tv/kraken/streams/"
};

twitch.updateView = function () {

};

twitch.showUser = function (user) {
	var status = [user.game, "online-user"];

	if (!user.exist)
		status = ["Not found", "bad-user"];
	else if (!status[0])
		status = ["Offline", "offline-user"];

	$('<a href="' + user.alink + '"><div><img class="logo"><h3 class="user-name"></h3><p class="user-status"></p></div></a>')
	  .find("div") 
	  .addClass(status[1])
	  .end()
	  .find("img") 
	  .attr("src", user.logo)
	  .end()
	  .find("h3")
	  .text(user.displayName)
	  .end()
	  .find("p")
	  .text(status[0])
	  .end()
	  .appendTo("#twitch-container"); 
};

twitch.User = function (name, exist, displayName, logo, alink, streaming, game) {
	this.name = name;
	this.exist = exist || false;
	this.displayName = displayName || name;
	this.logo = logo || "images/whitespace.jpg";
	this.alink = alink || "http://twitch.tv";
	this.streaming = streaming || false;
	this.game = game || null;
};

twitch.initialRequest = function () {
	$.each(twitch.userArr, function (i, e) {

		$.getJSON(twitch.channelUrl + e, function (re) {
			var user = twitch.userObj[e] = new twitch.User(e, true, re.display_name, re.logo, "https://www.twitch.tv/" + e);

			$.getJSON(twitch.streamUrl + e, function (re) {
				user.streaming = !!re.stream;
				if (user.streaming) {
					user.game = re.stream.game;
				}

				twitch.showUser(user);
			});
		}).fail(function () {
			var user = twitch.userObj[e] = new twitch.User(e);

			twitch.showUser(user);
		});
	});
};

$(function () {
	$('.twitch-container').empty();
	twitch.initialRequest();
});


