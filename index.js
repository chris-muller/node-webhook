var config = require('./config.js');
var githubhook = require('githubhook');
var github = githubhook({ host: config.server.host, port: config.server.port, path: config.server.path });

github.listen();

github.on('*', pullGitRepo);

function pullGitRepo(event, repo, ref, data) {
	var localPath = config[repo][ref].localPath;

	if (localPath) {
		console.log('Deploying for repo "' + repo + '" with ref "' + ref + '".');		var git = require('simple-git')(localPath);
		git.pull();
	} else {
		console.log('No deployment found for repo "' + repo + '" with ref "' + ref + '".');
	}
}
