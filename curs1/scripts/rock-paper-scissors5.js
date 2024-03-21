let score = JSON.parse(localStorage.getItem('score')) ||
   {
      wins: 0,
      losses: 0,
      ties: 0
    };
    
    updateScoreElement();

    // ia score ul din local storage - accepta doar stringuri
/*
  if (!score){ // initializez score ul daca nu exista in local storage / !score => score === null
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    }
  }
*/


  function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';
    if(randomNumber >= 0 && randomNumber < 1 / 3){
      computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2 / 3){
      computerMove = 'scissors';
    } else if (randomNumber >= 2/3 && randomNumber < 1){
      computerMove = 'paper';
    }

    return computerMove;
  }

  document.body.addEventListener('keydown', (event) => { // verifica daca vreo tasta e apasata
    if(event.key === 'r'){
      playGame('rock');
    } else if(event.key === 'p'){
      playGame('paper');
    } else if (event.key === 's'){
      playGame('scissors');
    }
  })

  function playGame(playerMove){
    const computerMove = pickComputerMove();
    let result = '';
    if(playerMove === computerMove){
      result = 'Tie'
    } else if ((playerMove === 'rock' && computerMove === 'paper') || (playerMove === 'paper' && computerMove === 'scissors') || (playerMove === 'scissors' && computerMove === 'rock') ){
     result = "Lose";
    }
    else result = "Win";

      if(result === 'Win'){
        score.wins++;
      } else if(result === 'Lose') {
        score.losses++;
      } else if(result === 'Tie'){
        score.ties++;
      }

      localStorage.setItem('score', JSON.stringify(score)); // salveaza scorul in local storage

      updateScoreElement();

      document.querySelector('.js-result').innerHTML = result;

      document.querySelector('.js-result').innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`

      

  }

  function updateScoreElement(){
    document.querySelector('.js-score').innerText = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}.`;

  }

  function resetScore(score){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
  }

  let isAutoPlaying = false;
  
  let intervalId;
 /* const autoPlay = () => {

  }*/
  function autoPlay(){
    if(!isAutoPlaying){
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000)
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }

  document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
  })
  document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
  })
  document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
  })
