const updateWb = require('./utils/updateWb');
const getGithubContribution = require('./utils/getGithubContribution');

const init = async () => {
	try {
		const data = await getGithubContribution('tuntun0609');
		console.log(data);
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
