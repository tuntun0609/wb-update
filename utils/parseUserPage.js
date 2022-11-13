const parseUserPage = (content) => {
	// take roughly the svg block
	const block = content
		.split(`class="js-calendar-graph-svg"`)[1]
		.split("</svg>")[0];

	let x = 0;
	let lastYAttribute = 0;

	const rects = Array.from(block.matchAll(/<rect[^>]*>/g)).map(([m]) => {
		const date = m.match(/data-date="([^"]+)"/)?.[1];
		const count = +m.match(/data-count="([^"]+)"/)?.[1];
		const level = +m.match(/data-level="([^"]+)"/)?.[1];
		const yAttribute = +m.match(/y="([^"]+)"/)?.[1];

		if (lastYAttribute > yAttribute) x++;

		lastYAttribute = yAttribute;

		return { date, count, level, x, yAttribute };
	});

	const yAttributes = Array.from(
		new Set(rects.map((c) => c.yAttribute)).keys()
	).sort();

	const cells = rects.map(({ yAttribute, ...c }) => ({
		y: yAttributes.indexOf(yAttribute),
		...c,
	}));

	return cells;
};

module.exports = parseUserPage;
