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

function changePosition(){

	var cards = document.getElementsByClassName('card'),
		change = shuffledList(cards.length);

	for (var i = cards.length - 1; i >= 0; i--) {
		hideCard(cards[i]);
		cards[i].className = ['card', 'draw1', 'pos'+change[i]].join(' ');
	}
}

function hideCard(card){

	var check = card.getElementsByClassName('checkhack')[0];
	check.checked = false;

}

changePosition();

