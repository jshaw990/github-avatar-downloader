var request = require('request'); 
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner+ "/" + repoName + "/contributors", 
        headers: {
            'User-Agent': 'request'
        }
    };
    
    request(url, function(err, result, body) {
    cb(err, body);
    });
}

function isoAvatar(err, data) {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Avatars Downloading...");
        JSON.parse(data).forEach (user => {
            downloadURL(user.avatar_url,"avatars/" + user.login + ".jpg");
        });
    }

}

function downloadImageByURL(url, filePath) {
    request(url)
        .pipe(fs.createWriteSteam(filepath)); 
}