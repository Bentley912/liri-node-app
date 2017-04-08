var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");

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

if (method === 'spotify-this-song' && media !== undefined){
    spotify.search({type:'track', query: media} , function(err,data){
      if(err){
          console.log(err);
          return;
      }
            for (var i = 0; i < data.tracks.items.length;i++ ){
                console.log(data.tracks.items[i].artists[0].name);
                console.log(data.tracks.items[i].name);
                console.log(data.tracks.items[i].preview_url);
                console.log(data.tracks.items[i].album.name);
                console.log('\n-----------------------\n')
            }     
    });
}

if (method === 'spotify-this-song' && media === undefined){
    spotify.search({type:'track', query:"The+Sign" } , function(err,data){
    if (err){
        console.log(err)
    }
        console.log(data);
    });
}

if (method === 'movie-this' && process.argv[3] !== undefined){
    var search ='';

    for (var i = 3; i < process.argv.length; i ++ ){
        search += process.argv[i]+ ' '; 
    }

    search = search.trim();

    request("http://www.omdbapi.com/?t="+search + "&y=&plot=short&r=json", function(error, response, body){

        if (!error && response.statusCode === 200){
            console.log('\n------------------------\n') 
            console.log(JSON.parse(body).Title);   
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
            console.log(JSON.parse(body).Rating);
            console.log(JSON.parse(body).imdbRating);
            console.log('\n------------------------\n') 
        }
    });
}

if (method === 'movie-this' && process.argv[3] === undefined){
     request("http://www.omdbapi.com/?t=Mr.Nobody+&y=&plot=short&r=json", function(error, response, body){

        if (!error && response.statusCode === 200){
            console.log('\n------------------------\n') 
            console.log(JSON.parse(body).Title);   
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
            console.log(JSON.parse(body).Rating);
            console.log(JSON.parse(body).imdbRating);
            console.log('\n------------------------\n'); 
        }
    });
}

if (method === 'do-what-it-says'){
   var text = fs.readFileSync('./random.txt','utf8')
    var res = text.split(',');
    spotify.search({type:'track', query: res[1]} , function(err,data){
      if(err){
          console.log(err);
          return;
      }
            for (var i = 0; i < data.tracks.items.length;i++ ){
                console.log(data.tracks.items[i].artists[0].name);
                console.log(data.tracks.items[i].name);
                console.log(data.tracks.items[i].preview_url);
                console.log(data.tracks.items[i].album.name);
                console.log('\n-----------------------\n')
            }     
    });
}
