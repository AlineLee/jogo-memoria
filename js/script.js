function setup() {
	score = 0;
	acumulatedWin = 0;
	selectCards = [];
	pos = [[1,1],[1,2],[1,3],[2,1],[2,2],[2,3]];
	cardList = document.querySelectorAll('.card');
	sizeCard = parseInt(getComputedStyle(cardList[0], null).getPropertyValue("width")) +
				(parseInt(getComputedStyle(cardList[0], null).getPropertyValue("margin"))) * 2;
	var cardContainer = document.querySelectorAll('.cards')[0];
	cardContainer.style.height = pos[pos.length - 1][0] * sizeCard + 'px';
	cardContainer.style.width = pos[pos.length - 1][1] * sizeCard + 'px';

	initNewTurn();
}

function shuffledList(length) {
	var newList =  Array.apply(null, {length: length}).map(Number.call, Number);

	for (i = newList.length; i; i--) {
		var j = Math.floor(Math.random() * i);
		x = newList[i - 1];
		newList[i - 1] = newList[j];
		newList[j] = x;
	}

	return newList;
}

function initNewTurn(){
	var change = shuffledList(cardList.length);

	cardList.forEach(function(e){
		hideCard(e);
		var newPos = change[i++];

		e.style.top = sizeCard * (pos[newPos][0] - 1) + 'px';
		e.style.left = sizeCard * (pos[newPos][1] - 1) + 'px';
	});

	//showAllCardsQuiqkly(cards);
}

function isTheCardTurnUp(card){
	return card.querySelectorAll('.checkhack')[0].checked;
}

function hideCard(card){
	var check = card.querySelectorAll('.checkhack')[0];
	check.checked = false;
}

function showCard(card){
	var check = card.querySelectorAll('.checkhack')[0];
	check.checked = true;
}

function winTurn(){
	acumulatedWin++;

	if (acumulatedWin > 0){
		score = score + (acumulatedWin * 10);
	} else {
		score = 10;
	}

	updateScore();
}

function loseTurn(){
	acumulatedWin = 0;
	score = score - 10;

	updateScore();
}

function updateScore(){
	showScore = document.querySelector('.score');
	showScore.innerText = score;
}

function cardClick(e) {
	var card = e.target.parentElement;
	if (isTheCardTurnUp(card)) {
		e.preventDefault();
		return;
	}
	selectCards.push(card);
	card.querySelector('.picture').addEventListener('transitionend', function(){
		if (selectCards.length == 2) {
			if (thisMatch()){
				console.log('Yeh');
				clearSelections(false);
				winTurn();

				if(!leftCardsTurnDown()) {
					initNewTurn();
				}
			} else {
				loseTurn();
				clearSelections(true);
			}
		}
	});
}

document.querySelector('.cards').addEventListener('click', function(e){
	if (e.target.matches('.click-label')) {
		cardClick(e);
	}
});

function thisMatch(){
	if(selectCards[0].getAttribute('data-card') == selectCards[1].getAttribute('data-card')){
		return true;
	}
	return false;
}

function leftCardsTurnDown(){
	if (document.querySelectorAll('input[type=checkbox]:not(:checked) ~ .picture').length > 0){
		return true;
	}
	return false;
}

function clearSelections(hideCardSelected) {
	if (hideCardSelected == true) {
		selectCards.forEach(hideCard);
	}
	selectCards = [];
}

function showAllCardsQuiqkly(cards){
	cards.forEach(function(e){
		showCard(e);

		e.querySelector('.picture').addEventListener('transitionend', function(){
			setTimeout(function () {
				hideCard(e);
			}, 1000);
		});
	});
}

setup();