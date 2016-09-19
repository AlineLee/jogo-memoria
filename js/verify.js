define('verify', ['score'], function(scoreTeste) {

	return {

		match: function(cardA, cardB){
			return (cardA.getAttribute('data-card') == cardB.getAttribute('data-card'));
		}
	};
});

