/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
-Added game rules
    1. A player looses his entire score when he rolls two 6 in a row. Then its next players turn.
    2. Added input filed to HTML where players can set the winning score. 
    3. 
*/



//document.querySelector('#score-' + activePlayer).textContent = dice;
//$('#score-' + activePlayer).html(dice); //jquery equivalent of the upper line

//document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'</em>';
//var x = $('#score-0').html();
//console.log(x);

//document.querySelector('.dice').style.display =  'none';
//$(".dice").css('display','none'); //jquery equivalent of upper line

var scores, roundScore, activePlayer,gamePlaying,prevRow;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1.random number
        var dice = (Math.floor(Math.random() * 6)) + 1;

        //2. display result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice+'.png';
        //3.update the round score IF the rolled number was not a 1
        if(dice === 6 && prevRow === 6 ){
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = '0';
            nextPlayer();
        }else if(dice!==1){
            //Add score 
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore; 
        }else{ //round has ended
            //Next Player
            nextPlayer();
        }
        prevRow = 6;
    }
   
});

/*//jquery function for event handling for roll dice button
$(".btn-roll").click(function(){ 
    var dice = (Math.floor(Math.random() * 6)) + 1;   
    var diceDOM = $(".dice");
    diceDOM.css('display','block');
    diceDOM.attr("src",'dice-'+dice+'.png');
    
    if(dice!==1){
        roundScore+=dice;
        $('#current-'+activePlayer).html(roundScore);
    }else{ //round has ended
        if(activePlayer ===1){
            activePlayer = 0;
        }else{
            activePlayer = 1;
        }
        
        roundScore = 0;
        $('#current-0').html('0');
        $('#current-1').html('0');
        
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        $(".dice").css("display","none");
    }
});
*/

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
         // Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector("#score-"+activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
   
        //undefoned 0, null or "" are coerced to false
        //Anything else is coerced to true
        var winningScore
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }
        
        //Check if player won the game
        if(scores[activePlayer] >=winningScore){
            document.querySelector('#name-'+activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer(); 
        }
        //Next Player
    }          
});

document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer(){
    //Next Player
        if (activePlayer === 1){
            activePlayer = 0;
        }else{
            activePlayer = 1;
        }
        roundScore = 0;
        document.getElementById("current-0").textContent = '0';
        document.getElementById("current-1").textContent = '0';
        
        document.querySelector(".player-0-panel").classList.toggle('active');
        document.querySelector(".player-1-panel").classList.toggle('active');
        
        //document.querySelector(".player-0-panel").classList.remove('active');
        //document.querySelector(".player-1-panel").classList.add('active');
        
        document.querySelector('.dice').style.display = 'none';
}



function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    $(".dice").css('display','none');
    document.getElementById('score-0').textContent = '0'; //$('#score-0').html(0); jquery to change html
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}



















