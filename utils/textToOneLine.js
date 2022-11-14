const textToOneLine = (text) => {
	return text.trim().replaceAll('\n', ' ').replaceAll(/( )+/g, ' ');
};

module.exports = textToOneLine;