var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var keys = require("./keys.js");

var method = process.argv[2];
var media = process.argv[3];    


var client = new Twitter(keys.twitterKeys);

if (method === 'my-tweets'){
 
var params = {screen_name: 'PI_Bentley', count:20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i ++){
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("\n-------------\n");
            }
        } 
        else {
            console.log(error)
        }
    });
}

if (method === 'spotify-this-song'){
    spotify.search({type:'track', query: media} , function(err,data){
      if(err){
          console.log(err);
          return;
      }
      else{
        
            console.log(JSON.stringify(data, null, 2));
            
          }   
    });
}

if (method === 'movie-this'){
    var search ='';

for (var i = 3; i < process.argv.length; i ++ ){
    search += process.argv[i]+ ' '; 
}

search = search.trim();


request("http://www.omdbapi.com/?t="+search + "&y=&plot=short&r=json", function(error, response, body){

    if (!error && response.statusCode === 200){
        
        console.log(JSON.parse(body).Year);
    }

});
}