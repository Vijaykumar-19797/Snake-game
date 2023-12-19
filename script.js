const gameBoard = document.getElementById('myCanvas');
const context = gameBoard.getContext('2d');
const span = document.getElementById('score')
let score = 0;
const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 20;
let foodX,foodY;
let xVel = UNIT;
let yVel = 0;
let active = true;
let started = false;
let snake = [{x:UNIT*3,y:0},{x:UNIT*2,y:0},{x:UNIT,y:0},{x:0,y:0}];

window.addEventListener('keydown',changeDirection)
startGame()

function startGame(){
    context.fillStyle = '#212121'
    context.fillRect(0,0,WIDTH,HEIGHT)
    createFood();
    showFood();
    drawSnake();
}

function clearBoard(){
    context.fillStyle = '#212121'
    context.fillRect(0,0,WIDTH,HEIGHT)
}

function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}

function showFood(){
    context.fillStyle = "red";
    context.fillRect(foodX,foodY,UNIT,UNIT);
}

function drawSnake(){
    context.fillStyle = "aqua";
    context.strokeStyle = "#212121";
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT);
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xVel,y:snake[0].y+yVel};
    snake.forEach(val => {
        if(val.x==head.x && val.y==head.y){
        active = false
        }
    })
    snake.unshift(head);
    if(snake[0].x==foodX && snake[0].y==foodY){
        createFood();
        score++;
        span.innerText = score;
        document.getElementById('food').play();
    }
    else{
    snake.pop();
    }
}

function nextTick(){
    if(active){
    setTimeout(()=>{
        clearBoard();
        showFood();
        moveSnake();
        drawSnake();
        gameOver();
        nextTick();
    },100)
}
else{
    clearBoard();
    drawSnake();
    showFood();
    context.font = "bold 50px serif";
    context.fillStyle = "white";
    context.textAlign = "center"
    context.fillText("Game Over!",WIDTH/2,HEIGHT/2);
    document.getElementById('over').play();
    document.getElementById('over').volume = 1;
}
}

function changeDirection(e){
    if(!started){
        started = true;
        nextTick();
    }
    const UP = "ArrowUp";
    const DOWN = "ArrowDown";
    const LEFT = "ArrowLeft";
    const RIGHT = "ArrowRight";

    switch(true){
        case(e.key==LEFT && xVel!=UNIT):
        xVel = -UNIT;
        yVel = 0;
        break;
        case(e.key==RIGHT && xVel!=-UNIT):
        xVel = UNIT;
        yVel = 0;
        break;
        case(e.key==UP && yVel!=UNIT):
        xVel = 0;
        yVel = -UNIT;
        break;
        case(e.key==DOWN && yVel!=-UNIT):
        xVel = 0;
        yVel = UNIT;
        break;
    }
}

function gameOver(){
    switch(true){
        case(snake[0].x<0):
        active = false;
        break;
        case(snake[0].x>=WIDTH):
        active = false;
        break;
        case(snake[0].y<0):
        active = false;
        break;
        case(snake[0].y>=HEIGHT):
        active = false;
        break;
    }
}