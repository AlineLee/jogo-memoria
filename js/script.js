function shuffledList(length) {

	var newList =  Array.apply(null, {length: length}).map(Number.call, function(n){
		return Number(n)+1;
	});

	for (i = newList.length; i; i--) {
		var j = Math.floor(Math.random() * i);
		x = newList[i - 1];
		newList[i - 1] = newList[j];
		newList[j] = x;
	}

	return newList;
}

function initNewTurn(){
	var cards = document.querySelectorAll('.card'),
		change = shuffledList(cards.length),
		i=0;

	cards.forEach(function(e){
		hideCard(e);
		e.className = ['card', 'draw1', 'pos'+change[i++]].join(' ');
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

initNewTurn();

var score = 0;
var acumulatedWin = 0;

var selectCards = [];

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