let turn=1;
let gotAns=false;

let isComputer=false;

let easy=false;
let medium=false;
let hard=false;

let arr=[undefined,-1,-1,-1,-1,-1,-1,-1,-1,-1];

const turnXorO=document.querySelector('.turn');
const newGameButton=document.getElementById('startNewGameButton');
const boxes=document.querySelectorAll('.box');
const newGamePromptButton=document.getElementById('startNewPromptButton');
const prompt=document.querySelector('.prompt');
const insertWinner=document.querySelector('.insertWinner');
const wrapper=document.querySelector('#wrapper');
const playWithComputerPrompt=document.querySelector('.play-with-computer-prompt');
const playWithComputerButton=document.querySelector('#playWithComputer');
const insertMode=document.querySelector('.mode');

playWithComputerButton.addEventListener('click',()=>{
    newGame();
    playWithComputerPrompt.style.visibility='visible';
    const easyButton=document.querySelector('#easy');
    const mediumButton=document.querySelector('#medium');
    const hardButton=document.querySelector('#hard');
    easyButton.addEventListener('click',()=>{
        isComputer=true;
        easy=true;
        medium=false;
        hard=false;
        playWithComputerPrompt.style.visibility='hidden';
        setMode();
    })
    mediumButton.addEventListener('click',()=>{
        isComputer=true;
        easy=false;
        medium=true;
        hard=false;
        playWithComputerPrompt.style.visibility='hidden';
        setMode();
    })
    hardButton.addEventListener('click',()=>{
        isComputer=true;
        easy=false;
        medium=false;
        hard=true;
        playWithComputerPrompt.style.visibility='hidden';
        setMode();
    })
})


function isEqual(a,b,c){
    return (a==b && b==c && a!=-1);
}

function checkWinner(){
    return ( isEqual(arr[1],arr[2],arr[3]) || isEqual(arr[4],arr[5],arr[6]) || isEqual(arr[7],arr[8],arr[9]) || isEqual(arr[1],arr[4],arr[7]) || isEqual(arr[2],arr[5],arr[8]) || isEqual(arr[3],arr[6],arr[9]) || isEqual(arr[1],arr[5],arr[9]) || isEqual(arr[3],arr[5],arr[7]) )
}

function setWhoseTurn(){
    if(isComputer){
        if(!gotAns && turn%2==0){
            let boxIdx=getIdxAccordingToMode();
            let selectedBox=document.getElementsByClassName(`${boxIdx}`);
            setTimeout(() => {
                selectedBox[0].click();   
            }, 500);
        }
    }
    else if(turn&1){
        turnXorO.innerHTML='X';
    }
    else{
        turnXorO.innerHTML='O';    
    }
}

function setMode(){
    turnXorO.innerHTML='';
    if(easy){
        insertMode.innerHTML='EASY';
    }
    else if(medium){
        insertMode.innerHTML='MEDIUM';
    }
    else{
        insertMode.innerHTML='HARD';
    }
}

function getIdxAccordingToMode(){
    if(easy){
        return generateRandom(arr);
    }
    else if(medium){
        let random=Math.random();
        if(random<0.20){
            return generateRandom(arr);
        }
        else{
            return findBest(turn,arr);
        }
    }
    else{
        return findBest(turn,arr);
    }
}

function newGame(){
    boxes.forEach((box)=>{
        // box.removeEventListener('click',handleClick);
        box.innerHTML='';
        box.addEventListener('click',handleClick);
    })
    turn=1;
    arr=[undefined,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    gotAns=false;
    wrapper.style.filter='none';
    prompt.style.visibility='hidden';
    setWhoseTurn();
}

newGameButton.addEventListener('click',()=>{
    newGame();
})
newGamePromptButton.addEventListener('click',()=>{
    newGame();
})


function handleClick(e){
    e.target.innerHTML=turn&1?'X':'O';
    e.target.removeEventListener('click',handleClick);
    let idx=parseInt(e.target.classList[0]);
    if(turn&1){
        arr[idx]=1;
    }
    else{
        arr[idx]=0;
    }
    if(checkWinner()){ 
        announceWinner();
    }
    turn++;    
    if(turn==10 && !gotAns){
        announceWinner();
    }
    setWhoseTurn();
}

function announceWinner(){
    gotAns=true;   
    
    boxes.forEach((box)=>{
        box.removeEventListener('click',handleClick);
    })
    
    if(turn==10){
        insertWinner.innerHTML='Draw !'
    }
    else{
        if(turn&1){
            insertWinner.innerHTML='X Won !';
        }
        else{
            insertWinner.innerHTML='O Won !';
        }
    }
    wrapper.style.filter='blur(4px)';
    prompt.style.visibility='visible';
}

newGame();