define('pack', ['cardManipulate', 'utils', 'verify'], function(cardManipulate, utils, verify) {
	var selectCards = [];

	var select2Cards = function() {
		return (selectCards.length == 2);
	};

	return {

		canSelectCard: function(card) {
			return selectCards.length < 2 && !cardManipulate.checkIfTheCardIsTurnUp(card);
		},

		addSelectCard: function(card, verifyIfWin) {
			selectCards.push(card);
			cardManipulate.turnUp(card, verifyIfWin);
		},

		cardsSelectedEnough: function() {
			return select2Cards();
		},

		checkIfWin: function() {
			return select2Cards ? verify.match(selectCards[0], selectCards[1]) : false;
		},

		clearSelections: function(hideCardSelected) {
			if (hideCardSelected == true) {
				selectCards.forEach(cardManipulate.hide);
			}
			selectCards = [];
		},

		showAllCardsQuiqkly: function(cards){
			cards.forEach(function(e){
				cardManipulate.show(e);

				e.querySelector('.picture').addEventListener('transitionend', function(){
					setTimeout(function () {
						cardManipulate.hide(e);
					}, 1000);
				});
			});
		},

		leftCardsTurnDown: function(){
			return (document.querySelectorAll('input[type=checkbox]:not(:checked):not(:disabled) ~ .picture').length > 0);
		},

		initNewTurn: function(maxPairs, cardList){
			var change = utils.shuffledList(maxPairs), i = 0;

			cardList.forEach(function(e){
				var checkhack = e.querySelector('.checkhack');

				if (e.getAttribute('data-card') < ((maxPairs/2))) {
					cardManipulate.hide(e);
					var newPos = change[i++];
					e.style.top = sizeCard * (pos[newPos][0] - 1) + 'px';
					e.style.left = sizeCard * (pos[newPos][1] - 1) + 'px';
					checkhack.tabIndex = pos[newPos][2] + 1;
					if (pos[newPos][2] == 0) {
						e.querySelector('.checkhack').focus();
					}
					checkhack.disabled = false;
					e.className = 'card';
				} else {
					checkhack.disabled = true;
					e.className += ' hideCard';
				}
			});

		}
	};
});