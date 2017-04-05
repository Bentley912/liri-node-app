var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var keys = require("./keys.js");

var method = process.argv[2];


var client = new Twitter(keys.twitterKeys);
 
var params = {screen_name: 'PI_Bentley', count:20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error && method === 'twitter') {
    
    /*console.log(response.created_at);*/
    for (var i = 0; i < tweets.length; i ++){
        console.log(tweets[i].created_at);
    }
  } 
  else {
      console.log(error)
  }
});