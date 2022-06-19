//HTML ELEMENTS
const statusDiv=document.querySelector('.status');
const resetDiv=document.querySelector('.reset');
const cellDivs=document.querySelectorAll('.game-cell');

//GAME VARIABLES
let gameIsLive=true;
let xIsNext =true;  //if it's true it's X turn other wise it's O turn

//OTHER FUNCTION
const handleWinner=(winner)=>{ // if there is a winner displaying the winner name
    gameIsLive=false;   
        if(winner==='X'){
            statusDiv.innerHTML=`<div class="winnerX"><span> PLAYER ${winner} HAS WON!!</span></div>`
        } else{
            statusDiv.innerHTML=`<div class="winnerO"><span> PLAYER ${winner} HAS WON!!</span></div>`
        }
};

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];
    //to check if someone is a winner
    if(topLeft && topLeft===topMiddle && topLeft===topRight){
        handleWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    }else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWinner(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
      } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWinner(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
      } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
      } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWinner(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
      } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWinner(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
      } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
      } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWinner(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
      }else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) { //if it's a Tie
        gameIsLive = false;
        statusDiv.innerHTML = "GAME OVER IT'S A TIE!!";
      }else{ // if we don't have a winner and all the cells are not filled yet
        xIsNext= !xIsNext;
        if(xIsNext){
            statusDiv.innerHTML="Player X's turn";
        }else{
            statusDiv.innerHTML="Player O's turn";
        }
      }
};
//EVENT HANDLERS
const handleReset=()=>{ //function to perform reset
    xIsNext=true;
    statusDiv.innerHTML="Player X's turn";
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('X');
        cellDiv.classList.remove('O');
        cellDiv.classList.remove('won');
    }
    gameIsLive=true;
};

const handleCellClick=(e)=>{
    const classList=e.target.classList;
    if (!gameIsLive || classList[1] === 'X' || classList[1] === 'O') {
        return;
      }
    if(xIsNext){
        classList.add('X');
        checkGameStatus();
    }
    else{
        classList.add('O');
        checkGameStatus();
    }
};

//EVENT LISTENER
resetDiv.addEventListener('click',handleReset);

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click',handleCellClick);
} 