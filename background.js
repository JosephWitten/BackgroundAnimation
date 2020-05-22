//make sure html has correct onresize thingy in real doc
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
const horizSquares = 10
const vertSquares = 20
const blockArray = ["longBlock", "lBlock", "cubeBlock", "tBlock", "zBlock"]


    
let width = canvas.clientWidth;
let height = canvas.clientHeight;

let map = []
for (let i = 0; i < horizSquares; i++) {
    map.push([])
    for (let j = 0; j < vertSquares; j++) {
        if (j == vertSquares - 1) {
            map[i].push(2)
        } else {
        map[i].push(0)
    }
}
}


let blockInMotion = false

let squareWidth = width/horizSquares
let squareHeight = height/vertSquares


window.addEventListener('resize', () => {
    sizeChange()
});

window.addEventListener('fullscreenchange', () => {
    sizeChange()
});

canvas.width = width
canvas.height = height

draw()

window.onload = async function() {
    while(true) {


        //becomes green + grey lines
        this.draw()
        

        if (!blockInMotion) {
        createBlock()
        }

       
        //pause
        await sleep(100)

        //full white
        this.clear()

        this.fall()

        
    }
}



function draw() {
    
    for (let i = 0; i < horizSquares; i++) {
        //console.log(i)
        for (let j = 0; j < vertSquares; j++) {
            if(map[i][j] == 0) {
            ctx.fillStyle = "#aaaaaa"
            ctx.fillRect(i*squareWidth, j*squareHeight, squareWidth, squareHeight)
            }

      
            if(map[i][j] == 2) {
            ctx.fillStyle = "#bbbbbb"
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
function clear() {
    ctx.clearRect(0,0,width,height)
}

function sizeChange() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    squareWidth = width/horizSquares
    squareHeight = height/vertSquares
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    draw();
}

function randomPos() {
    return Math.floor(Math.random() * Math.floor(horizSquares));
}

function randomBlock() {
    return blockArray[Math.floor(Math.random()*blockArray.length)];
}

function createBlock() {
    
    let startPos = randomPos() 
    let currentBlock = randomBlock()
    if (currentBlock == "longBlock") {
    map[startPos][0] =  1
    map[startPos][1] = 1
    map[startPos][2] = 1
    map[startPos][3] = 1
    blockInMotion = true
    }
    
    
}

function fall() {
    let collide = false

    let tempPosArray = []

    for (let i = 0; i < horizSquares; i++) {
        for (let j = 0; j < vertSquares; j++) {
         
            //If map [i][j] = 1, then save it to an array to be analysed
            if (map[i][j] == 1) {
                
                
                tempPosArray.push([i, j])
                


            }
           
        }
    }

    
    for (let i = 0; i < horizSquares; i++) {
        for (let j = 0; j < vertSquares; j++) {

            for (let x = 0; x < tempPosArray.length; x++) {

                //if part of the saved array is 2, then turn the saved array to 2s aswell
                if (map[tempPosArray[x][0]][tempPosArray[x][1] + 1] == 2 || tempPosArray[x][1] + 1 == vertSquares - 1) {
                    for (let y = 0; y < tempPosArray.length; y++) {
                        
                        collide = true
                        
                    }
                    break
                } 
            }


            if (!collide) {

                    //for each coord in saved array, set that coord's value to 0
                    for (let z = 0; z < tempPosArray.length; z++) {
                    map[tempPosArray[z][0]][tempPosArray[z][1]] = 0
                }

                    //for each coord in the saved array, - its y pos by 1
                    for (let k = 0; k < tempPosArray.length; k++) {
                        map[tempPosArray[k][0]][tempPosArray[k][1] + 1] = 1
                    }

                    
                }
                else {
                    blockInMotion = false
                    if(map[i][j] == 1) {
                        map[i][j] = 2
                        console.log(map)
                    }
                }
            }
        }
    }
    

