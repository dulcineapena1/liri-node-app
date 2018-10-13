require("dotenv").config();


var Spotify= require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

//el nombre del la info a buscar, es lo que escriba después del comando en bash
var valorabuscar = process.argv[3];

var fs = require("fs");
//esta variable let es para almacenar el dato que està en el otro archivo txt
//y asì poderlo leer màs abajo dentro de un case
let laultima= 
{    principal: null,
     secundaria :fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
        return console.log(error);
        }
        //console.log("adentro"+data);
        var ladata= data;
        laultima.principal=ladata;
        
       // console.log("adentro2"+laultima.principal);
      
    }),
    
}




  



switch(process.argv[2]) {
    //--BANDS IN TOWN PART
    case "concert-this":
        // Then run a request to the BANDSINTOWN API with the band specified
        request("https://rest.bandsintown.com/artists/" + valorabuscar + "/events?app_id=codingbootcamp", function(error, response, body) {
        // console.log(response.body.id);
            var elparse1 = JSON.parse(body);
            console.log("NAME OF THE VENUE:"+ " "+ elparse1[0].venue.name);
            console.log ("VENUE LOCATION:" + " "+ elparse1[0].venue.country + ", " + elparse1[0].venue.city);
            console.log ("DATE OF THE EVENT:" + " " + elparse1[0].datetime );      
        });
    break;
    //--SPOTIFY PART
    case "spotify-this-song":
        spotify.search({ type: 'track', query: ''+valorabuscar+'', limit:1 }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            } 
            console.log("SONG NAME:" + valorabuscar);
            console.log("ARTIST:" + data.tracks.items[0].album.artists[0].name);
            console.log("LINK TO SONG:" + data.tracks.items[0].external_urls.spotify);
            console.log("ALBUM:" +data.tracks.items[0].name);
        }); 
    break;
    //--MOVIE PART
    case "movie-this":
        var queryUrl = "http://www.omdbapi.com/?t=" + valorabuscar + "&y=&plot=short&apikey=trilogy";
        // THIS IS TO DEBUG IN CASE OF... console.log(queryUrl);
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                console.log("TITLE: " + JSON.parse(body).Title);
                console.log("YEAR: " + JSON.parse(body).Year);
                console.log("ROTTEN TOMATOES: " + JSON.parse(body).Ratings[0].Value);
                console.log("IMDB RATING: " + JSON.parse(body).imdbRating);
                console.log("COUNTRY: " + JSON.parse(body).Country);
                console.log("LANGUAGE: " + JSON.parse(body).Language); 
                console.log("PLOT: " + JSON.parse(body).Plot);
                console.log("ACTORS: " + JSON.parse(body).Actors);  
            }
        });
    break;
    //--LIRI SAYS PART
    case "do-what-it-says":
        spotify.search({ type: 'track', query: ''+laultima.principal+'', limit:1 }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            } 
            console.log("SONG NAME:" + laultima.principal);
            console.log("ARTIST:" + data.tracks.items[0].album.artists[0].name);
            console.log("LINK TO SONG:" + data.tracks.items[0].external_urls.spotify);
            console.log("ALBUM:" +data.tracks.items[0].name);
        }); 
    break;
}






