const updateWb = require('./utils/updateWb');
const getGithubContribution = require('./utils/getGithubContribution');
const retry = require('./utils/retry');

const getGithubContributionRetry = retry(getGithubContribution);

const init = async () => {
	try {
		const data = await getGithubContributionRetry('tuntun0609');
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
