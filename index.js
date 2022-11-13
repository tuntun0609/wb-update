const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const HttpsProxyAgent = require("https-proxy-agent");

const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:7890`);

const getGithubContribution = async (name) => {
	try {
		const data = await axios.get(`https://github.com/${name}?from=2022-11-13&to=2022-11-13&tab=overview`, {
			proxy: false,
			httpsAgent,
		});
		const $ = cheerio.load(data.data);
		// const timelineItems = $('.contribution-activity-listing div').find('.TimelineItem');
		// console.log($('.contribution-activity-listing div').find('.TimelineItem'));
		// Object.keys(timelineItems).forEach((key) => {
		// 	console.log(timelineItems[key]);
		// });
	} catch (error) {
		console.error('getGithubContribution error', error);
	}
}

const init = async () => {
	// const data = await updateWb('test');
	// console.log(data?.msg ? data.msg : data);

	await getGithubContribution('tuntun0609');
}

init();
