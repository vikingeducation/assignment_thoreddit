//Helper for sorting comments and posts by score

function sortByScore(inputArray) {
	var returnVal = inputArray.sort(function(a, b) {
		return b.score - a.score;
	});
	return returnVal;
}

module.exports = sortByScore;
