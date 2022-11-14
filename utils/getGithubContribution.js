const axios = require('axios');
const cheerio = require('cheerio');
const HttpsProxyAgent = require("https-proxy-agent");
const textToOneLine = require('./textToOneLine');

const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:7890`);

const getGithubContribution = async (name, time) => {
	const date = new Date();
	const month = `${(date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}`;
	const day = `${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`;
	const today = time ? time : `${date.getFullYear()}-${month}-${day}`;
	const data = await axios.get(`https://github.com/${name}?from=${today}&to=${today}&tab=overview`, {
		proxy: false,
		httpsAgent,
	});
	const $ = cheerio.load(data.data);
	const timelineItems = $('.contribution-activity-listing .TimelineItem h4,summary span[class~="text-left"]');
	const res = [today]
	timelineItems.each(function (i, el) {
		res.push(textToOneLine($(this).text()));
	});
	return res.join('\n');
}

module.exports = getGithubContribution;
