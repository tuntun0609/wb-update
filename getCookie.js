const getCookie = (cookieData, cname) => {
	let res;
	const name = cname + '=';
	const ca = cookieData.split(';');
	for(let i = 0; i < ca.length; i++) {
		const c = ca[i].trim();
		if (c.indexOf(name) === 0) {
			res = c.substring(name.length, c.length);
		}
	}
	if (res) {
		return res;
	}
	throw new Error('get cookie error');
};

module.exports = getCookie;