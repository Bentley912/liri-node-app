var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var key = require("./keys.js");



var client = new Twitter({
  consumer_key: key.twitterKeys.consumer_key,
  consumer_secret: key.twitterKeys.consumer_secret,
  access_token_key: key.twitterKeys.access_token_key,
  access_token_secret: key.twitterKeys.access_token_secret
});
 
var params = {screen_name: 'PI_Bentley'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
  else {
      console.log(error)
  }
});