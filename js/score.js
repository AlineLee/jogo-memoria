define('score', [], function() {
	var score = 0;
	var acumulatedWin = 0;

	var update  = function() {
		showScore = document.querySelector('.score');
		showScore.innerText = score;
	}
	return {

		winTurn: function(){
			acumulatedWin++;

			if (acumulatedWin > 0){
				score = score + (acumulatedWin * 10);
			} else {
				score = 10;
			}

			update();
		},

		loseTurn: function(){
			acumulatedWin = 0;
			score = score - 10;

			update();
		}
	};
});
