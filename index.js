'use strict';

const manager = {};
module.exports = manager;


const fs = require('fs');
const dotenv = require('dotenv');
const _ = require('lodash');


manager.expand = (...params) => {
	return require('dotenv-expand')(dotenv.config(params));
};

manager.config = () => {
	return dotenv.config();
};

manager.overload = (...filenames) => {

	const config = dotenv.config();
	_.forEach(filenames, filename => {

		if (!fs.existsSync(filename)) {
			console.warn(`@geek/dotenv.overload - file not found: ${filename}`);
			return;
		}
		const envConfig = dotenv.parse(fs.readFileSync(filename));
		for (const envVarName in envConfig) {
			process.env[envVarName] = envConfig[envVarName];
			config.parsed[envVarName] = envConfig[envVarName];
		}

	});
	config.ignoreProcessEnv = true;
	return require('dotenv-expand')(config);
};
