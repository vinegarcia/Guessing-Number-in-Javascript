//Guess function
/*
-player must guess a number between min and max
-player gets a certain amunt of guesses
-notify the player of the correct answer if loose
-let player choose to play again
*/

//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesleft = 3;

//UI Element
const game = document.querySelector('#game');
    minNum =  document.querySelector('.min-num');
    maxNum =  document.querySelector('.max-num');
    guessbtn =  document.querySelector('#guess-btn');
    guessInput =  document.querySelector('#guess-input');
    message =  document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('play-again')){ 
    // if (e.target.className === 'btn play-again'){
        window.location.reload();
    }
});


//Listen 
guessbtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please Enter a Number between ${min} and ${max}`, 'red');
  }

  //Check if won
  if (guess === winningNum){
      //disable input
      guessInput.disabled = true;
      //change border color
      guessInput.style.borderColor = 'pink';
    //   setMessage(`${winningNum} is correct, You win!`, 'pink');
    gameOver(true, `${winningNum} is Correct, You Win !`);
  } else {
    //wrong number
    guessesleft -=1;

    if(guessesleft === 0 || guessesleft <= 0){
        //game over-lost
        gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)
    } else{
        //game continues - answer wrong
        //Cjhange border color
        guessInput.style.borderColor = 'red';
        //Clear Input
        guessInput.value = '';
        //tell user  its the wrong number
        setMessage(`${guess} is not correct, ${guessesleft} guesses left`, 'red');
    }
  }
});

function gameOver(won, msg){
    let color;

    won === true ? color = 'green' : color = 'red';
    //disble  input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = 'green';
//set text color
    message.style.color = color;
    //set message
    setMessage(msg);

    //Play again
    guessbtn.value = 'Play Again';
    guessbtn.className += ' play-again';
    // guessbtn.style.backgroundColor = 'pink';
}

//get Winning number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;

}