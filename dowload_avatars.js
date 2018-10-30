//Required Modules
var request = require('request'); 
var secret = require("./secrets");
var fs = require("fs");

//Welome Message
console.log('Welcome to the GitHub Avatar Downloader!');

//Fetches Repo Information
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner+ "/" + repoName + "/contributors", 
        headers: {
            'User-Agent': 'request', 
            'Authorization' : secret.GITHUB_TOKEN
        }
    };
    
    request(options, function(err, result, body) {
    cb(err, body);
    });
}

//Parses URLs and isolates Avatars
function isoAvatar(err, data) {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Avatars Downloading...");
        JSON.parse(data).forEach (user => {
            downloadImageByURL(user.avatar_url,"./Avatars/" + user.login + ".jpg");
        });
    }

}

//Downloads Avatars to user
function downloadImageByURL(url, filePath) {
    request(url)
        .pipe(fs.createWriteSteam(filepath)); 
}

getRepoContributors();

console.log ("Process Complete");

