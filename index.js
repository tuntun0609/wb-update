const axios = require('axios');
const qs = require('qs');
const fs = require('fs');
const getCookie = require('./getCookie');

const updateBaseUrl = 'https://weibo.com/ajax/statuses/update';

const updateWb = async (content) => {
	if (fs.existsSync('cookie.txt')) {
		const cookieData = fs.readFileSync('cookie.txt').toString();
		const data = await axios.post(
			updateBaseUrl,
			qs.stringify({
				content: content,
				pic_id: '',
				pic_id: '',
				visible: 0,
				share_id: '',
				media: '{}',
				vote: '{}',
				approval_state: 0,
			}),
			{
				headers: {
					authority: 'weibo.com',
					'content-type': 'application/x-www-form-urlencoded',
					cookie: cookieData,
					traceparent: '00-5175e2baf74db2f4fa4da2a9061eba74-948675b0f17aa309-00',
					'x-requested-with': 'XMLHttpRequest',
					'x-xsrf-token': getCookie(cookieData, 'XSRF-TOKEN'),
				}
			}
		);
		return data.data;
	} else {
		return 'cookie.txt not exist, please create cookie.txt';
	}
}

const init = async () => {
	const data = await updateWb('test');
	console.log(data?.msg ? data.msg : data);
}

init();
