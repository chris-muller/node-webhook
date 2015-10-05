var config = require('./config.js');

var githubhook = require('githubhook');
var github = githubhook({host: config.server.host, port: config.server.port, path: config.server.path});

github.listen();

console.log('Starting listener loop.');
for(var deploymentIndex in config.deployments) { 
	if (config.deployments.hasOwnProperty(deploymentIndex)) {
		var deployment = config.deployments[deploymentIndex];
		
		console.log('Setting listener for '+deployment.repo + ":" + deploymentIndex);
		github.on('*', function (event, repo, ref, data) {
			console.log('Listener called for '+deployment.repo);
			
			var git = require('simple-git')(deployment.localPath);
			
			if(ref == deployment.branch && repo == deployment.repo) {
				console.log('Pulling data for '+deployment.repo);
				git.pull();
			} else {
				console.log(deploymentIndex + 'skipped: repo '+deployment.repo + " - branch " + deployment.branch);
			}
		});
	}
}
