var config = require('./config.js');

var githubhook = require('githubhook');
var github = githubhook({host: config.server.host, port: config.server.port, path: config.server.path});

github.listen();

for (var i = 0; i < config.deployments.length; i++) {
	var deployment = config.deployments[i];

	github.on('push', function (repo, ref, data) {
		console.log('Setting listener for '+deployment.repo);
		var git = require('simple-git')(deployment.localPath);
	
		if(ref == "refs/heads/"+deployment.branch && repo == deployment.repo) {
			console.log('Pulling data for '+deployment.repo);
			git.pull();
		}
	});
}
