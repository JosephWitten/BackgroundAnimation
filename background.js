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

const maximum = Math.max.apply(Math, map[squares-1])
console.log(maximum)

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
console.log(map)
draw()

window.onload = async function() {
    while(true) {
    let iterator = 0
    while (iterator < maximum) {
        //becomes green + grey lines
        this.draw()
        // one number of cells become blue
        this.pulse(iterator)
        //pause
        await sleep(20)

        //full white
        this.clear()
        iterator++;
    }
}
}



function draw() {
    
    for (let i = 0; i < squares; i++) {
        //console.log(i)
        for (let j = 0; j < squares; j++) {
       
            ctx.fillStyle = "green"
            ctx.fillRect(i*squareWidth, j*squareHeight, squareWidth, squareHeight)

            ctx.beginPath();
            ctx.strokeStyle = "grey"
            ctx.rect(i*squareWidth, j*squareHeight, squareWidth, squareHeight)
            ctx.stroke()
        }
        
    }
   
}

function pulse(iterator) {
    sleep(10)
        
        for (let i = 0; i < squares; i++) {
            for (let j = 0; j < squares; j++) {
         
                if (map[i][j] == iterator) {
                    ctx.fillStyle = "blue"
                    ctx.fillRect(i*squareWidth, j*squareHeight, squareWidth, squareHeight)
                }
       
            }
        }
    }


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function clear() {
    ctx.clearRect(0,0,width,height)
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