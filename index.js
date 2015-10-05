var config = require('./config.js');

var githubhook = require('githubhook');
var github = githubhook({host: config.server.host, port: config.server.port, path: config.server.path});

github.listen();

console.log('Starting listener loop.');
config.deployments.forEach(function(deployment) {
	console.log('Setting listener for '+deployment.repo);
	github.on('*', function (event, repo, ref, data) {

		var git = require('simple-git')(deployment.localPath);
	
		if(ref == "refs/heads/"+deployment.branch && repo == deployment.repo) {
			console.log('Pulling data for '+deployment.repo);
			git.pull();
		}
	});
}, this);
