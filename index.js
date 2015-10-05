var config = require('./config.js');

var githubhook = require('githubhook');
var github = githubhook({host: config.server.host, port: config.server.port, path: config.server.path});

github.listen();

console.log('Starting listener loop.');
for(var deploymentIndex in config.deployments) { 
	if (config.deployments.hasOwnProperty(deploymentIndex)) {
		var deployment = config.deployments[deploymentIndex];
		
		console.log('Setting listener for '+deployment.repo);
		github.on('*', function (event, repo, ref, data) {
			
			var git = require('simple-git')(deployment.localPath);
			
			if(ref == "refs/heads/"+deployment.branch && repo == deployment.repo) {
				console.log('Pulling data for '+deployment.repo);
				git.pull();
			}
		});
	}
}
