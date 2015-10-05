var config = require('./config.js');

var githubhook = require('githubhook');
var github = githubhook({host: config.server.host, port: config.server.port, path: config.server.path});

github.listen();

for (var i = 0; i < config.deployments.length; i++) {
	var deployment = config.deployments[i];

	github.on('push', function (event, repo, ref, data) {

		var git = require('simple-git')(deployment.localPath);
	
		if(ref == "refs/heads/"+deployment.branch && repo == deployment.repo) {
			git.pull();
		}
	});
}
