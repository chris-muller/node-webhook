var githubhook = require('githubhook');
var github = githubhook({
	port: 81
});
var neutroncssGit = require('simple-git')('/var/www/neutroncss.com');

github.listen();

github.on('push:neutroncss.com:ref/heads/master', function (repo, ref, data) {
	neutroncssGit.pull();
});

