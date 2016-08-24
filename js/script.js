function setup() {
	score = 0;
	acumulatedWin = 0;
	selectCards = [];
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

	initNewTurn();
}

function shuffledList() {
	var newList =  Array.apply(null, {length: maxPairs}).map(Number.call, Number);

	for (var i = newList.length; i; i--) {
		var j = Math.floor(Math.random() * i);
		x = newList[i - 1];
		newList[i - 1] = newList[j];
		newList[j] = x;
	}

	return newList;
}

function initNewTurn(){
	var change = shuffledList(), i = 0;

	cardList.forEach(function(e){
		var checkhack = e.querySelector('.checkhack');

		if (e.getAttribute('data-card') < ((maxPairs/2))) {
			hideCard(e);
			var newPos = change[i++];
			e.style.top = sizeCard * (pos[newPos][0] - 1) + 'px';
			e.style.left = sizeCard * (pos[newPos][1] - 1) + 'px';
			checkhack.tabIndex = pos[newPos][2] + 1;
			if (pos[newPos][2] == 0) {
				e.querySelector('.checkhack').focus();
			}
			checkhack.disabled = false;
			e.className = 'card'; //Gambiarra
		} else {
			checkhack.disabled = true;
			e.className += ' hideCard';
		}
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

document.querySelector('.cards').addEventListener('keydown', function(e){
	if (e.target.matches('.checkhack')) {
		cardClick(e);
	}
});

document.querySelector('.pairs').addEventListener('change', function(e){
	setup();
});


function thisMatch(){
	if(selectCards[0].getAttribute('data-card') == selectCards[1].getAttribute('data-card')){
		return true;
	}
	return false;
}

function leftCardsTurnDown(){
	if (document.querySelectorAll('input[type=checkbox]:not(:checked):not(:disabled) ~ .picture').length > 0){
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