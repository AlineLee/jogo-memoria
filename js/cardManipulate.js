define('cardManipulate', [], function() {


	return {
		checkIfTheCardIsTurnUp: function(card) {
			return card.querySelectorAll('.checkhack')[0].checked;
		},

		hide: function(card){
			var check = card.querySelectorAll('.checkhack')[0];
			check.checked = false;
		},

		show: function(card){
			var check = card.querySelectorAll('.checkhack')[0];
			check.checked = true;
		},

		turnUp: function(card, verifyIfWin) {
			card.querySelector('.picture').addEventListener('transitionend', function(){
				verifyIfWin();
			});
		}
	};
});