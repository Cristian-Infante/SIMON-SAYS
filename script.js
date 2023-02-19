let moves, totalMoves, score;
const myDiv = document.getElementById('game');

myDiv.style.pointerEvents = 'none';

function illuminate(cellPos, time){
    setTimeout(() => {
        let cell = document.querySelector('.cell[pos="' + cellPos + '"]')
        cell.classList.add('active');
        setTimeout(() => {
            cell.classList.remove('active');
        }, 300);
    }, time);
}

function setMoves(current){
    moves.push(Math.floor(Math.random() * 4) + 1);
    if(current < totalMoves){
        setMoves(++current);
    }
}

function startGame(){
    myDiv.style.pointerEvents = 'auto';
    moves = [];
    totalMoves = 2;
    score = 0;
    document.querySelector('#score').innerHTML = 'Score: ' + 0;
    document.querySelector('#level').innerHTML = 'Level: ' + 1;
    document.querySelector('#start').style.display = 'none';
    document.querySelector('#message').style.display = 'block';
    sequence();
}

function sequence(){
    myDiv.style.pointerEvents = 'none';
    moves = [];
    setMoves(1);
    document.querySelector('#message').innerHTML = 'Watch the sequence';

    for(let i = 0; i < moves.length; i++){
        illuminate(moves[i], i * 700);
    }

    setTimeout(() => {
        document.querySelector('#message').innerHTML = 'Repeat the sequence';
        myDiv.style.pointerEvents = 'auto';
    }, moves.length * 600);
}

function cellClick(e) {
    let cellPos = e.target.getAttribute('pos');
    illuminate(cellPos, 0);

    if(moves && moves.length){
        if(moves[0] == cellPos){
            moves.shift();
            if(!moves.length){
                score++;
                document.querySelector('#score').innerHTML = 'Score: ' + score;
                document.querySelector('#level').innerHTML = 'Level: ' + totalMoves;
                totalMoves++;
                setTimeout(() => {
                    sequence();
                }, 1000);
            }
        }else{
            myDiv.style.pointerEvents = 'none';
            document.querySelector('#message').innerHTML = 'You lost';
            setTimeout(() => {
                document.querySelector('#start').style.display = 'block';
                document.querySelector('#message').style.display = 'none';
            }, 1000);
        }
    }
}

document.querySelector('#start').addEventListener('click', startGame);
let cells = Array.from(document.getElementsByClassName('cell'));

cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
});
