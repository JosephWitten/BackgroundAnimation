//make sure html has correct onresize thingy in real doc
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
const squares = 20
    
let width = canvas.clientWidth;
let height = canvas.clientHeight;

let map = []
for (let i = 0; i < squares; i++) {
    map.push([])
    for (let j = 0; j < squares; j++) {
        map[i].push(squares-j+i)
    }
}
let squareWidth = width/squares
let squareHeight = height/squares


window.addEventListener('resize', () => {
    sizeChange()
});

window.addEventListener('fullscreenchange', () => {
    sizeChange()
});

canvas.width = width
canvas.height = height
    

draw()

console.log(map)

function draw() {

    for (let i = 0; i < squares; i++) {
        for (let j = 0; j < squares; j++) {
            if (map[i][j] == 0) {
                ctx.fillStyle = "green"
                ctx.fillRect(i*squareWidth, j*squareHeight, squareWidth, squareHeight)
            }
            ctx.beginPath();
            ctx.strokeStyle = "grey"
            ctx.rect(i*squareWidth, j*squareHeight, squareWidth, squareHeight)
            ctx.stroke()
        }
        
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sizeChange() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    squareWidth = width/squares
    squareHeight = height/squares
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    draw();
}