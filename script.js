const buttons = document.querySelectorAll('.pick');
const scoreEl= document.getElementById('score');
const main= document.getElementById('main');
const selection= document.getElementById('selection');
const reset= document.getElementById('reset');
const user_select = document.getElementById('user_select');
const computer_select= document.getElementById('computer_select');
const winner= document.getElementById('winner');

//modal 
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const modal = document.getElementById('modal');

const choices = ['paper', 'rock', 'scissors' ];

let userChoice = undefined;

let score = 0;

//user selected choice
buttons.forEach(button => {
    button.addEventListener('click', () =>{
        userChoice = button.getAttribute('data-choice');

        checkWinner();
    });
});

reset.addEventListener('click', ()=>{
    //showing the selection part and hiding main part
    main.style.display= 'flex';
    selection.style.display= 'none';
});

openBtn.addEventListener('click', ()=>{
    modal.style.display= 'flex';
});

closeBtn.addEventListener('click', ()=>{
    modal.style.display= 'none';
});

function checkWinner() {
    const computerChoice = pickRandomChoice();

    //updating the view
    updateSelection(user_select, userChoice);
    updateSelection(computer_select, computerChoice);

    if(userChoice === pickRandomChoice){
        //draw
        winner.innerText = 'draw';
    }
    else if (
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        //user won 
        updateScore(1);
        winner.innerText = 'win';
    } else {
        //user lost
        updateScore(-1);
        winner.innerText = 'lost';
    }

    //showing the selection part and hiding main part
    main.style.display= 'none';
    selection.style.display= 'flex';
}

function updateScore(value){
    score += value;

    scoreEl.innerText = score;

}

//computer's random choice function
function pickRandomChoice(){
    return choices[Math.floor(Math.random() * choices.length)]
    ;
}

function updateSelection(selectionEl, choice){
    //class reset
    selectionEl.classList.remove('btn-paper');
    selectionEl.classList.remove('btn-scissors');
    selectionEl.classList.remove('btn-rock');

    //update imgae
    const img = selectionEl.querySelector('img');

    selectionEl.classList.add(`btn-${choice}`);
    selectionEl.querySelector('img').src =`./images/icon-${choice}.svg`;
    img.alt= choice;
}