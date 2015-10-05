module.exports = {
	server: {
		host: "127.0.0.1",
		port: 3000,
		path: "/"
	},
	deployments: {
		"Neutron Master": {
			repo: "neutroncss.com",
			branch: "master",
			localPath: "/var/www/neutroncss.com"
		},
		"Neutron Develop" : {
			repo: "neutroncss.com",
			branch: "develop",
			localPath: "/var/www/develop.neutroncss.com"
		}
	}
};
