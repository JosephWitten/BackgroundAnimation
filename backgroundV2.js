//for refrence this is what the map looks like 
// 0: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 1: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 2: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 3: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 4: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 5: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 6: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 7: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 8: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 9: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 10: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 11: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 12: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 13: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 14: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 15: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 16: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 17: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 18: (10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// 19: (10) [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

// TO DO:


//make sure html has correct onresize thingy in real doc
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
const horizSquares = 10
const vertSquares = 20
const blockArray = ["longBlock", "angleBlock", "cubeBlock", "tBlock", "zBlock"]

    
let width = canvas.clientWidth;
let height = canvas.clientHeight;

let map = []
for (let i = 0; i < vertSquares; i++) {
    map.push([])
    for (let j = 0; j < horizSquares; j++) {
        if (i == vertSquares - 1) {
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

let ended = false
let collision = false

draw()

//---------------------------------------------------------------------------------------------------------------------------------------

window.onload = async function() {
    this.console.log(map)
    let yum = 0
    while(yum < 10) {
     
        if (!blockInMotion) {
            for (let i = 0; i < horizSquares; i++) {
                createBlock(i)
                while (!collision) {
                    fallByOne()
                    if (collision) {
                        countHoles()
                    }
                    this.draw()
                    await sleep(50)
                    this.clear()
                }
       
            }
        }


        // //becomes green + grey lines
        // this.draw()
        
       
        // //pause
        // await sleep(100)

        // //full white
        // this.clear()

        this.draw()
        //break
        yum += 1
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------

function fallByOne() {
    PosArray = []
    //add current blocks pos to array and clear falling blocks
    for (let i = 0; i < vertSquares; i++) {
        for (let j = 0; j < horizSquares; j++) {
            if (map[i][j] == 1) {
                temp = []
                temp.push(i)
                temp.push(j)
                PosArray.push(temp)
            }
        } 
    }
    //clean map
    if (!collision) {
        for (let k = 0; k < PosArray.length; k++) {
                map[PosArray[k][0]][PosArray[k][1]] = 0
            }
    }

    //check for collisons
    for (let i = 0; i < vertSquares; i++) {
        for (let j = 0; j < horizSquares; j++) {
            for (let k = 0; k < PosArray.length; k++) {
                if (map[PosArray[k][0] + 1][PosArray[k][1]] == 2) {
                    collision = true
                    
                }
            }
        }
    }
    if (!collision) {
        //increment
        for (let k = 0; k < PosArray.length; k ++) {
            PosArray[k][0] = PosArray[k][0] + 1

        for (let i = 0; i < vertSquares; i++) {
            for (let j = 0; j < horizSquares; j++) {
                    map[PosArray[k][0]][PosArray[k][1]] = 1
                }
            }
        }
    }
}

function draw() {
    
    for (let i = 0; i < vertSquares; i++) {
        for (let j = 0; j < horizSquares; j++) {
            if(map[i][j] == 0) {
            ctx.fillStyle = "#aaaaaa"
            ctx.fillRect(j*squareWidth, i*squareHeight, squareWidth, squareHeight)
            }

            if(map[i][j] == 2) {
            ctx.fillStyle = "#bbbbbb"
            ctx.fillRect(j*squareWidth, i*squareHeight, squareWidth, squareHeight)
            }

            ctx.beginPath();
            ctx.strokeStyle = "grey"
            ctx.rect(j*squareWidth, i*squareHeight, squareWidth, squareHeight)
            ctx.stroke()
        }
        
    }
   
}



function moveTo(column) {
    let tempMoveArray = []
    for (let i = 0; i < horizSquares; i++) {
        for (let j = 0; j < vertSquares; j++) {
            if (map[i][j] == 1) {
                let temp = []
                temp.push(i)
                temp.push(j)
                tempMoveArray.push(temp)    
            }
        }
    }

    let tempMoveArrayCopy = tempMoveArray

    for (let i = 0; i < horizSquares; i++) {
        try {
            tempMoveArray = shiftRight(tempMoveArray)
        } catch {
            console.log("broke")
            tempMoveArray = tempMoveArrayCopy
            break
        }
    }

    for (let i = 0; i < column; i++) {
        try {
            tempMoveArray = shiftLeft(tempMoveArray)
        }
        catch {
            console.log("broke on Leftshift")
            tempMoveArray = tempMoveArrayCopy
        }
    }

    for (let i = 0; i < horizSquares; i++) {
        for (let j = 0; j < vertSquares; j++) {
            if (map[i][j] == 1) {
                map[i][j] = 0
            }
        }
    } 

    for (let i = 0; i < tempMoveArray.length; i++) {
        map[tempMoveArray[i][0]][tempMoveArray[i][1]] = 1
    }
    return tempMoveArray
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



function randomBlock() {
    return blockArray[Math.floor(Math.random()*blockArray.length)];
}

function createBlock(givenStartPos) {
    
    let startPos = givenStartPos
    let newBlock = randomBlock() 
    switch (newBlock) {
    

    case ("longBlock"):
    
        map[0][startPos] =  1
        map[1][startPos] = 1
        map[2][startPos] = 1
        map[3][startPos] = 1
        blockInMotion = true
        break
    

    case ("tBlock"):
        try {
        map[1][startPos + 1] = 1
        map[0][startPos] = 1
        map[1][startPos] = 1
        map[2][startPos] = 1
        blockInMotion = true
        }
        catch {
            blockInMotion = false
        }
        break

    case ("cubeBlock"):
        try {
        map[0][startPos + 1] = 1
        map[1][startPos + 1] = 1
        map[0][startPos] = 1
        map[1][startPos] = 1
        blockInMotion = true
        }
        catch {
            blockInMotion = false
        }
        break
    
    

    case ("angleBlock"):
        
        try {
            map[0][startPos + 1] = 1
            map[0][startPos] = 1
            map[1][startPos] = 1
            map[2][startPos] = 1
            blockInMotion = true
        }
        catch {
            
            blockInMotion = false
        }
        break

    case ("zBlock"):
        try {
            map[1][startPos + 1] = 1
            map[2][startPos + 1] = 1
            map[0][startPos] = 1
            map[1][startPos] = 1
            blockInMotion = true
      
        }
        catch {
            blockInMotion = false
        }
        break

    default:
        console.log(newBlock)
        console.log("no cube selected")
    
    }
    if (blockInMotion) {
        let blockPosArray = []
        for (let i = 0; i < vertSquares; i ++) {
            for (let j = 0; j < horizSquares; j++) {
                if (map[i][j] == 1) {
                    temp = []
                    temp.push(i)
                    temp.push(j)
                    blockPosArray.push(temp)
                }
            }
        }
        return blockPosArray
    }
}



function checkForEnd() {
    for (let i = 0; i < horizSquares; i++) {
        if (map[i][0] == 2) {
            temp = true
            break
        }
        else {
            temp = false
        }
    }
    if (temp) {
        ended = true
    }
    else {
        ended = false
    }
}


//------------------------SHIFT FUNCTIONS -----------------------------------------------------------------------

function shiftLeft(PosArray) {
    PosArrayBackup = PosArray
    tempPosArray = []

    for (let i = 0; i < PosArray.length; i++) {
        let temp = []
        temp.push(PosArray[i][0] - 1)
        temp.push(PosArray[i][1])
        tempPosArray.push(temp)
        }

        for (j = 0; j < tempPosArray.length; j ++) {
            if (tempPosArray[j][0] < 0) {
                
                return PosArrayBackup
                
            } else {
                for (let m = 0; m < horizSquares; m++) {
                    for (let a = 0; a < vertSquares; a++) {
                        if (map[m][a] == 1) {
                            map[m][a] = 0
                        }
                    }
                }
                return tempPosArray
            }
        }
    }

function shiftRight(PosArray) {
    let bad = false
    PosArrayBackup = PosArray
    tempPosArray = []

    for (let i = 0; i < PosArray.length; i++) {
        let temp = []
        temp.push(PosArray[i][0] + 1)
        temp.push(PosArray[i][1])
        tempPosArray.push(temp)
        }

        for (j = 0; j < tempPosArray.length; j ++) {
            if (tempPosArray[j][0] >= horizSquares) {
                bad = true
                } 
            }

            if (bad) {
                return PosArrayBackup
            } else {
                for (let m = 0; m < horizSquares; m++) {
                    for (let a = 0; a < vertSquares; a++) {
                        if (map[m][a] == 1) {
                            map[m][a] = 0
                        }
                    }
                }
                return tempPosArray
        }
    }
    

//------------------------SHIFT FUNCTIONS END -----------------------------------------------------------------------
