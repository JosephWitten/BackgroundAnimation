//for refrence this is what the map looks like 
// 0: (20) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
// 1: (20) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
// 2: (20) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
// 3: (20) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
// 4: (20) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
// 5: (20) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
// 6: (20) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 2]
// 7: (20) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2]
// 8: (20) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
// 9: (20) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]


//make sure html has correct onresize thingy in real doc
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
const horizSquares = 10
const vertSquares = 20
const blockArray = ["longBlock", "angleBlock", "cubeBlock", "tBlock", "zBlock"]

    
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
function getCleanMap() {
    let cleanMap = []
    for (let i = 0; i < horizSquares; i++) {
        cleanMap.push([])
        for (let j = 0; j < vertSquares; j++) {
            if (j == vertSquares - 1) {
                cleanMap[i].push(2)
            } else {
            cleanMap[i].push(0)
            }
        }
    }
    return cleanMap
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

draw()

//---------------------------------------------------------------------------------------------------------------------------------------

window.onload = async function() {
    this.console.log(map)
    while(true) {
        ended = false

        if (!blockInMotion) {
            createBlock()
        }

        //becomes green + grey lines
        this.draw()
        
        this.checkForEnd()
        if(ended) {
            cleanMap = getCleanMap()
            map = cleanMap
            blockInMotion = false
            
        }
       
        //pause
        await sleep(100)

        //full white
        this.clear()

        this.fall()

        
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------

function draw() {
    
    for (let i = 0; i < horizSquares; i++) {
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
    let newBlock = randomBlock() 
    switch (newBlock) {
    

    case ("longBlock"):
    
        map[startPos][0] =  1
        map[startPos][1] = 1
        map[startPos][2] = 1
        map[startPos][3] = 1
        blockInMotion = true
        break
    

    case ("tBlock"):
        try {
        map[startPos + 1][1] = 1
        map[startPos][0] = 1
        map[startPos][1] = 1
        map[startPos][2] = 1
        
        blockInMotion = true
        }
        catch {
            blockInMotion = false
        }
        break

    case ("cubeBlock"):
        try {
        map[startPos + 1][0] = 1
        map[startPos + 1][1] = 1
        map[startPos][0] = 1
        map[startPos][1] = 1
        blockInMotion = true
        }
        catch {
            blockInMotion = false
        }
        break
    
    

    case ("angleBlock"):
        
        try {
            map[startPos + 1][0] = 1
            map[startPos][0] = 1
            map[startPos][1] = 1
            map[startPos][2] = 1
            blockInMotion = true
        }
        catch {
            
            blockInMotion = false
        }
        break

    case ("zBlock"):
        try {
            map[startPos + 1][1] = 1
            map[startPos + 1][2] = 1
            map[startPos][0] = 1
            map[startPos][1] = 1
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
}

function fall() {
    let collide = false
    let holeRowArray = []
    let PosArray = []

    for (let i = 0; i < horizSquares; i++) {
        for (let j = 0; j < vertSquares; j++) {
         
            //If map [i][j] = 1, then save it to an array to be analysed
            if (map[i][j] == 1) {
                PosArray.push([i, j])   
            }
        }
    }


    
    for (let i = 0; i < horizSquares; i++) {
        for (let j = 0; j < vertSquares; j++) {

            for (let x = 0; x < PosArray.length; x++) {

                //if part of the saved array is 2, then turn the saved array to 2s aswell
                if (map[PosArray[x][0]][PosArray[x][1] + 1] == 2 || PosArray[x][1] + 1 == vertSquares - 1) {
                    collide = true
                
                   
                    break
                } 
            }

            PosArray = shiftRight(PosArray)

            if (!collide) {

                    //for each coord in saved array, set that coord's value to 0
                    for (let z = 0; z < PosArray.length; z++) {
                    map[PosArray[z][0]][PosArray[z][1]] = 0
                }

                    //for each coord in the saved array, - its y pos by 1
                    for (let k = 0; k < PosArray.length; k++) {
                        map[PosArray[k][0]][PosArray[k][1] + 1] = 1
                    }

                    
                }
                else {
                    blockInMotion = false
                    if(map[i][j] == 1) {
                        map[i][j] = 2
                    }
                    
                    for (let k = 0; k < PosArray.length; k++) {
                        if (holeRowArray.includes(PosArray[k][0])) {

                        } else {
                            holeRowArray.push(PosArray[k][0])
                        }
                    }
                }
            }
            
        }
        if (collide) {
            let overallFitness = 0
            for (let i = 0; i < holeRowArray.length; i++) {
            
            holesCreated = checkForHoles(holeRowArray[i])
            overallFitness = overallFitness + holesCreated
            
            
        }
        console.log(overallFitness)
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

function checkForHoles(row /*row in the console array not visual one*/) {
    let containsTwo = false
    let holesCreated = 0
    for (let i = 0; i < vertSquares; i++) {
        //if there is a block in the row, make true
        if (map[row][i] == 2) {
            containsTwo = true
        } 
        //if block above, count how many spaces below
        if (map[row][i] == 0 && containsTwo) {
            holesCreated = holesCreated + 1
        }
    }
    return holesCreated
}

function shiftLeft(PosArray) {
    console.log(PosArray)
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
