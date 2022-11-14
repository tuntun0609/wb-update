const retry = function (asyncFunc, times = 5, retryInterval = 1000) {
	// 内部重试计数器
	let retryTime = times;

	const retryCallback = async function (...args) {
		try {
			return await asyncFunc(...args);
		} catch (e) {
			if (retryTime <= 0) throw e;
			console.log(
				`${args} 查询失败，将在 ${retryInterval} 毫秒后重试，剩余重试次数 ${retryTime}`
			);
			retryTime -= 1;
			await new Promise((reslove) => setTimeout(reslove, retryInterval));
			return await retryCallback(...args);
		}
	};

	return retryCallback;
};

module.exports = retry;
