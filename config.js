module.exports = {
	server: {
		host: "127.0.0.1",
		port: 3000,
		path: "/"
	},
	deployments: {
		"neutroncss.com": {
			"refs/heads/master": {
				localPath: "/var/www/neutroncss.com"
			},
			"refs/heads/develop": {
				localPath: "/var/www/develop.neutroncss.com"
			}
		}
	}
};
