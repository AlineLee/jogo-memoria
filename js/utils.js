define('utils', [], function() {
	return {
		shuffledList: function(maxPairs) {
			var newList =  Array.apply(null, {length: maxPairs}).map(Number.call, Number);

			for (var i = newList.length; i; i--) {
				var j = Math.floor(Math.random() * i);
				x = newList[i - 1];
				newList[i - 1] = newList[j];
				newList[j] = x;
			}

			return newList;
		}
	};
});