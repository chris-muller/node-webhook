var config = require('./config.js');

var githubhook = require('githubhook');
var github = githubhook({host: config.server.host, port: config.server.port, path: config.server.path});
var neutron = config.repo.neutron;

github.listen();

github.on('push:' + neutron.name + ':ref/heads/' + neutron.branch, function (repo, ref, data) {
	
	console.log("Push event received.");
	
	var neutroncssGit = require('simple-git')(neutron.localPath);

	console.log("Repo: ", repo);
	neutroncssGit.pull();
	
});

