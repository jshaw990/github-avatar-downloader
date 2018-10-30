//Required Modules
var request = require('request'); 
var secret = require('./secrets');
var fs = require('fs');

//Welome Message
console.log('Welcome to the GitHub Avatar Downloader!');

//Fetches Repo Information
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner+ "/" + repoName + "/contributors", 
        headers: {
            'User-Agent': 'jshaw990', 
            'Authorization' : "token " + secret.GITHUB_TOKEN
        }
    };
    
    request(options, function(err, result, body) {
    if (err) {
        console.log("An error has occured"); 
    } else {
        // console.log("Testing", result);
        cb(body);
    }
    }); 
}

//Parses URLs and isolates Avatar address
function isoAvatar(data) {
        console.log("Avatars Downloading...");
        JSON.parse(data).forEach (user => {
            console.log(user.avatar_url);
            downloadImageByURL(user.avatar_url,"./Avatars/" + user.login);
            return;
        })
        };


//Downloads Avatars to user
function downloadImageByURL(url, filePath) {
    console.log(url + filePath);
    request.get(url)
        .on('error', function (err) {                                   // Note 2
            throw err; 
        })
        .on('response', function (response) {                           // Note 3
            console.log('Response Status Code: ', response.statusCode);
        })
        .pipe(fs.createWriteStream(filePath)); 
}

// Testing command line prior to process.argv
// getRepoContributors("jshaw990", "github-avatar-downloader", isoAvatar);

// User enters GitHub User and Repo
// If both fields not filled than it will produce an error
var [repo, owner, conflict] = process.argv.slice(2);
if (!repo || !owner || conflict) {
    console.log ("Action Failed. Enter your requested User and Repository.");
} else {
    getRepoContributors(repo,owner, isoAvatar); 
}