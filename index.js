const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const HttpsProxyAgent = require("https-proxy-agent");
const textToOneLine = require('./utils/textToOneLine');
const updateWb = require('./utils/updateWb');

const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:7890`);

const getGithubContribution = async (name, time) => {
	try {
		const date = new Date();
		const today = time ? time : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		const data = await axios.get(`https://github.com/${name}?from=${today}&to=${today}&tab=overview`, {
			proxy: false,
			httpsAgent,
		});
		const $ = cheerio.load(data.data);
		const timelineItems = $('.contribution-activity-listing summary span[class~="text-left"]');
		const res = [today]
		timelineItems.each(function (i, el) {
			res.push(textToOneLine($(this).text()));
		});
		return res.join('\n');
	} catch (error) {
		console.error('getGithubContribution error', error);
	}
}

const init = async () => {
	try {
		const data = await getGithubContribution('tuntun0609');
		// console.log(data);
		if (data) {
			const updateMsg = await updateWb(data);
			console.log(updateMsg?.msg ? updateMsg.msg : updateMsg);
		} else {
			console.error('getGithubContribution error')
		}
	} catch (error) {
		console.error('update error')
	}
}

init();
