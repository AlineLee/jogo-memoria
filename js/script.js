define(['score', 'pack'], function(score, pack) {
	var cardList, maxPairs;


	function setup() {
		cardList = document.querySelectorAll('.card');
		maxPairs = document.querySelector('input[name="qtd-pairs"]:checked').value * 2;

		var maxColumn = 4, x = 1, y = 1, i = 0;
		pos = [];
		while(pos.length < maxPairs) {
			pos[i] = [x, y, i];
			if(y == maxColumn) {
				y = 0;
				x++;
			};
			y++; i++;
		}

		sizeCard = parseInt(getComputedStyle(cardList[0], null).getPropertyValue("width")) +
					(parseInt(getComputedStyle(cardList[0], null).getPropertyValue("margin"))) * 2;
		var cardContainer = document.querySelectorAll('.cards')[0];
		cardContainer.style.height = Math.ceil(maxPairs / maxColumn) * sizeCard + 'px';
		cardContainer.style.width = maxColumn * sizeCard + 'px';


		pack.initNewTurn(maxPairs, cardList);

		cardList = document.querySelectorAll('.card:not(.hideCard)');

		pack.showAllCardsQuiqkly(cardList);
	};

	var verifyIfWin = function(){
		if (pack.cardsSelectedEnough()) {
			if (pack.checkIfWin()) {
				pack.clearSelections(false);
				score.winTurn();

				if(!pack.leftCardsTurnDown()) {
					pack.initNewTurn(maxPairs, cardList);
				}
			} else {
				score.loseTurn();
				pack.clearSelections(true);
			}
		}
	};

	document.querySelector('.cards').addEventListener('click', function(e){
		if (e.target.matches('.click-label')) {
			var card = e.target.parentElement;

			if (pack.canSelectCard(card)) {
				pack.addSelectCard(card, verifyIfWin);
			} else {
				e.preventDefault();
			}
		}
	});

	//document.querySelector('.cards').addEventListener('keydown', function(e){
		// if (e.target.matches('.checkhack')) {
		// 	cardManipulate.click(e);
		// }
	//});

	document.querySelector('.pairs').addEventListener('change', function(e){
		setup();
	});


	setup();
});
