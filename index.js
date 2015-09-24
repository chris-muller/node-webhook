var config = require('./config.js');

console.log(config);

var githubhook = require('githubhook');
var github = githubhook({host: config.server.host, port: config.server.port});


github.listen();

var neutron = config.repo.neutron;
github.on('push:' + neutron.name + ':ref/heads/' + neutron.branch, function (repo, ref, data) {
	
	var neutroncssGit = require('simple-git')(neutron.localPath);

	console.log("Repo: ", repo);
	neutroncssGit.pull();
	
});

