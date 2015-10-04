var config = require('./config.js');

var githubhook = require('githubhook');
var github = githubhook({host: config.server.host, port: config.server.port, path: config.server.path});
var neutron = config.repo.neutron;

github.listen();

github.on('*', function (event, repo, ref, data) {
	
	console.log("Push event received.");
	
	var neutroncssGit = require('simple-git')(neutron.localPath);

	console.log("event: ", event);
	console.log("repo: ", repo);
	console.log("refs: ", ref);
	
	if(ref == "refs/heads/master" && repo == 'neutroncss.com') {
		console.log('actually pulling data...');
		neutroncssGit.pull();
	} else {
		console.log("This is not the repo I am looking for...");
	}

	
});

