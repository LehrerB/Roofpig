let cubeSRC = "https://ruwix.com/widget/3d/?label=Sample&alg=F&setupmoves=B%20U2%20F%20R2%20F2%20U2%20F'%20D2%20U2%20L2%20B'%20L'%20B'%20F'%20R%20B2%20R%20U'%20L%20D&hover=1&speed=700&flags=showalg";
//let cubeFrame = document.getElementById('cubeframe')
let cube1 = document.getElementById('cube1');

console.log('script')
let randAlg = "R2 B' L2 B' R2 U2 B' F2 R2 F' D L2 U R' B' D2 U' L B' D' R2' L2";
randAlg = "R2' D2' U B2' D U2' R2' D2' F' L' D' R D R' U2' L' F U' L' B2'";
let partialSolve = '';
let startAlg = [randAlg,partialSolve].join(' ').trim();
let testAlg = "L2";

function createcubeSRC(alg,setupmoves,speed=400,sampletxt='sample',highlight='') {
    //setupmoves = replaceXYZRUF(setupmoves);

    let string = `https://ruwix.com/widget/3d/?label=${sampletxt}`;
    string += `&alg=${alg.replaceAll(' ','%20')}`
    string += `&setupmoves=${setupmoves.replaceAll(' ','%20')}`
    string += `&hover=1&speed=${speed}&flags=""`; //showalg
    if(highlight!='') {
        string += `&colored=${highlight}`;
    }
    return string
}

function createConfig(alg,setupmoves,speed=400,sampletxt='sample',highlight='') {
    //setupmoves = replaceXYZRUF(setupmoves);

    let string = ``;
    string += `alg=${alg}`
    string += `|setupmoves=${setupmoves}`
    string += `|hover=1|speed=${speed}|flags=''`; //showalg
    //string += `|colors=U:#ffffff`
    if(highlight!='') {
        string += `|colored=${highlight}`;
    }
    console.log(string)
    return string
}

function initiateAlg(alg,startAlgorithm = "", speed=400,num=0,highlightBoolean=true) {
    let preventXYZstring = preventXYZ((countXYZ(randAlg + " " + alg)));
    let startSequence = startAlgorithm == "" ? preventXYZstring + alg : preventXYZstring + startAlgorithm + " " + alg;
    let highlight = highlightBoolean ? algoArray[num][0] : "";
    return createConfig(alg,startSequence,speed,num,highlight);
}

function getStartAlg() {
    return [randAlg,partialSolve].join(' ').trim();
}

function loadCurrent(speed=400,num,multipleBoolean=false) {
    //cubeFrame.src = initiateAlg(testAlg,getStartAlg(),speed,num);
    clearAllCanvases();
    removeDivById('cube1');
    CubeAnimation.create_in_dom('#cube1parent', initiateAlg(testAlg,getStartAlg(),speed,num), "id=cube1 class='roofpig mycube noBorder'");
    cube1 = document.getElementById('cube1')
    cube1.setAttribute('data-config',initiateAlg(testAlg,getStartAlg(),speed,num));
    if(multipleBoolean) {
        let highlightBoolean = false;
        removeDivById('cube2');
        CubeAnimation.create_in_dom('#cube2parent', initiateAlg(testAlg,getStartAlg(),speed,num,highlightBoolean), "id=cube2 class='roofpig mycube noBorder'");
        cube1 = document.getElementById('cube2')
        cube1.setAttribute('data-config',initiateAlg(testAlg,getStartAlg(),speed,num,highlightBoolean));  
    }
}

function removeElementAndChildren(element) {
    // Check if the element exists
    if (element) {
        // Recursively remove all children
        while (element.firstChild) {
            removeElementAndChildren(element.firstChild);  // Recursively remove child elements
        }
        // Once all children are removed, remove the parent element itself
        element.remove();
        console.log(`Element with ID '${element.id}' and all nested children have been removed.`);
    }
}

function removeDivById(divId) {
    const element = document.getElementById(divId);
    removeElementAndChildren(element);  // Call the recursive function
}

function deleteHelp() {
    const elements = document.querySelectorAll('[id*="help-"]');
    for(let element of elements) {
        removeElementAndChildren(element);
    }
}

function clearAllCanvases() {
    // Find all canvas elements in the document
    const canvases = document.querySelectorAll('canvas');

    // Iterate over each canvas element
    canvases.forEach(canvas => {
        
    });

    console.log(`Cleared ${canvases.length} canvas elements.`);
}

function reverseMoves(moves) {
    moves = moves.trim();
    // Split the input string into an array of individual moves
    let moveArray = moves.split(" ");
    
    // Iterate over each move and modify it
    for (let i = 0; i < moveArray.length; i++) {
        if (moveArray[i].includes("'")) {
            // If the move contains a "'", remove it
            moveArray[i] = moveArray[i].replace("'", "");
        } else {
            // If the move does not contain a "'", add it
            moveArray[i] += "'";
        }
    }

    moveArray.reverse();
    
    // Join the array back into a single string with space as a delimiter
    return moveArray.join(" ");
}

function reverseXYZ(moves) {
    moves = moves.trim();
    // Split the input string into an array of individual moves
    let moveArray = moves.split(" ");
    for (let i = 0; i < moveArray.length; i++) {
        if(moveArray[i].includes("x") || moveArray[i].includes("y") || moveArray[i].includes("z")) {
            if (moveArray[i].includes("'")) {
                // If the move contains a "'", remove it
                moveArray[i] = moveArray[i].replace("'", "");
            } else {
                // If the move does not contain a "'", add it
                moveArray[i] += "'";
            }
        }
    }
    return moveArray.join(" ").trim();
}

function removeXYZ(moves) {
    moves = moves.trim();
    // Split the input string into an array of individual moves
    let moveArray = moves.split(" ");
    for (let i = 0; i < moveArray.length; i++) {
        if(moveArray[i].includes("x") || moveArray[i].includes("y") || moveArray[i].includes("z")) {
            moveArray[i] = '';
        }
    }
    return moveArray.join(" ").trim();
}

function substituteXYZ(moves) {
    moves = moves.trim();
    // Split the input string into an array of individual moves
    let moveArray = moves.split(" ");
    for (let i = 0; i < moveArray.length; i++) {
        if(moveArray[i].includes("y")) {
            moveArray[i] = "d U'";
        }
    }
    return moveArray.join(" ").trim();
}

function countXYZ(moves) {
    moves = moves.trim();
    let countArray = [0,0,0,0,0,0]
    // Split the input string into an array of individual moves
    let moveArray = moves.split(" ");
    for (let i = 0; i < moveArray.length; i++) {
            let add = moveArray[i].includes("'") ? -1 : 1;
            if(moveArray[i].includes("x")) {
                countArray[0]+=add;
            }
            if(moveArray[i].includes("y")) {
                countArray[1]+=add;
            }
            if(moveArray[i].includes("z")) {
                countArray[2]+=add;
            }
            if(moveArray[i].includes("r")) {
                countArray[3]+=add;
            }
            if(moveArray[i].includes("f")) {
                countArray[4]+=add;
            }
            if(moveArray[i].includes("u")) {
                countArray[5]+=add;
            }
    }
    countArray[0] = countArray[0] % 4; //x
    countArray[1] = countArray[1] % 4; //y
    countArray[2] = countArray[2] % 4; //z
    countArray[3] = countArray[3] % 4; //r
    countArray[4] = countArray[4] % 4; //f
    countArray[5] = countArray[5] % 4; //u
    return countArray;
}

function preventXYZ(countArray) {
    let preventXYZstring = "";
    let reverseBoolean = false;
    let cI = 0;
    
    //x
    cI = 0;
    reverseBoolean = countArray[cI] < 0; 
    countArray[cI] = Math.abs(countArray[cI]);
    for(let i = 0; i < countArray[cI]; i++) {
        if(reverseBoolean)  {
            preventXYZstring += "r' L ";
        } else {
            preventXYZstring += "r L' ";
        }
        
    }

    //y
    cI = 1
    reverseBoolean = countArray[cI] < 0; 
    countArray[cI] = Math.abs(countArray[cI]);
    for(let i = 0; i < countArray[cI]; i++) {
        if(reverseBoolean)  {
            preventXYZstring += "d' U ";
        } else {
            preventXYZstring += "d U' ";
        }
        
    }

    //z
    cI = 2
    reverseBoolean = countArray[cI] < 0; 
    countArray[cI] = Math.abs(countArray[cI]);
    for(let i = 0; i < countArray[cI]; i++) {
        if(reverseBoolean)  {
            preventXYZstring += "f B' ";
        } else {
            preventXYZstring += "f' B ";
        }
        
    }

    //r
    cI = 3;
    reverseBoolean = countArray[cI] < 0; 
    countArray[cI] = Math.abs(countArray[cI]);
    for(let i = 0; i < countArray[cI]; i++) {
        if(reverseBoolean)  {
            preventXYZstring += "r' L ";
        } else {
            preventXYZstring += "r L' ";
        }
        
    }

    //f
    cI = 4;
    reverseBoolean = countArray[cI] < 0; 
    countArray[cI] = Math.abs(countArray[cI]);
    for(let i = 0; i < countArray[cI]; i++) {
        if(reverseBoolean)  {
            preventXYZstring += "d' U ";
        } else {
            preventXYZstring += "d U' ";
        }
        
    }

    //u
    cI = 5;
    reverseBoolean = countArray[cI] < 0; 
    countArray[cI] = Math.abs(countArray[cI]);
    for(let i = 0; i < countArray[cI]; i++) {
        if(reverseBoolean)  {
            preventXYZstring += "f B' ";
        } else {
            preventXYZstring += "f' B ";
        }
        
    }
    return preventXYZstring;
}

function replaceXYZRUF(input) {
    let newInput = input
    .replaceAll("x'","r' L")
    .replaceAll("y'","d' U ")
    .replaceAll("z'","")
    .replaceAll("r'","")
    .replaceAll("f'","")
    .replaceAll("u'","")

    .replaceAll("x","r L' ")
    .replaceAll("y","d U' ")
    .replaceAll("z","")
    .replaceAll("r","")
    .replaceAll("f","")
    .replaceAll("u","");
    return newInput;
}

'FRU','FRD',
'RBU','RBD',
'BLU','BLD',
'FLU','FLD'

let algoArray = [
    ['D*/e U*/m',"F' F' F U F' y' x x' U' F' F' y' F' F' F U' R"],
    ['D*/e */m',"U U F' F' y U F' F' y F' F' y U F' F' x x'"],
    ['RBD U*/m',"y'"],
    ['RBD B*/m R*/m U*/m',"y U' R U R' U'"],
    ["BLD B*/m L*/m U*/m","y' y' y' U y L' U' L U"],
    ["FRD F*/m R*/m","y' y y U' U' R U R' U' R U R' U' R U R' U'"],
    ["FLD","y' R U R' U'"],
    ["FLD F*/m L*/m","R U R' U'"],
    ["BL","y'"],
    ["BL B*/m L*/m D*","U' y U' L' U' L U y' R U R' U'"],
    ["RB B*/m R*/m D*","y' U U R U R' U' y L' U' L U"],
    ["RF FLD","y R U R' U' y L' U' L U"], //11
    ["RF R*/m F*/m D*","U' y U' L' U' L U y' R U R' U'"],
    ["FL L*/m F*/m D*","y' y U' L' U' L U y' R U R' U "],
    ["U*/e U*/m","U f R U R' U' f'"],
    ["R*/m F*/m B*/m L*/m U*/e U*/m","y y y U' y y y U' y' y' R U R' U R U2' R' U y y y y"],
    ["*/m U*/c U*/e","y' y' y'"], //16
    ["R*/m F*/m UFR","y R U' L' U R' U' L U"],
    ["U* */m","y' y' x x R U R' U' R U R' U' x x' D R U R' U' R U R' U' x x' D D R U R' U' R U R' U' D"],
    ["",""],
]

let currentNum = 0;
let currentMove = 0;

testAlg = algoArray[0][1];
partialSolve = "";
loadCurrent(200,0,true);
setTimeout(deleteHelp, 4);


function nextAction() {
    let moves = algoArray[currentNum][1].split(' ');
    if(currentMove > moves.length-1) {
        currentNum += 1;
        currentMove = 0;
        testAlg = algoArray[currentNum][1];
        partialSolve = concatAlgoArrayUpTo(currentNum);
        loadCurrent(100,currentNum,true);
    } else {
        console.log(currentNum)
        pressNextButton();
        currentMove += 1;
    }
    deleteHelp();
}

function pressNextButton(id="") {
    if(id=="") {
        const elements = document.querySelectorAll('[id*="next-"]');
        for(let element of elements) {
            element.click();
        }
        //elements[0].click();
    } else {
        document.getElementById(id).click();
    }
}

function concatAlgoArrayUpTo(number,array=algoArray) {
    let string = ""
    for(let i = 0; i < number; i++) {
        string += array[i][1];
        string += " "
    }
    return string.trim();
}



document.getElementById('b1').addEventListener('click', function() {
    nextAction();
});


document.getElementById('b2').addEventListener('click', function() {
    let num = 2;
    testAlg = algoArray[num][1];
    partialSolve = concatAlgoArrayUpTo(num);
    loadCurrent(100,num);
});

document.getElementById('b3').addEventListener('click', function() {
    let num = 3;
    testAlg = algoArray[num][1];
    partialSolve = concatAlgoArrayUpTo(num);
    loadCurrent(100,num);
});

document.getElementById('b4').addEventListener('click', function() {
    let num = 4;
    testAlg = algoArray[num][1];
    partialSolve = concatAlgoArrayUpTo(num);
    loadCurrent(100,num);
});

document.getElementById('b5').addEventListener('click', function() {
    let num = 5;
    testAlg = algoArray[num][1];
    partialSolve = concatAlgoArrayUpTo(num);
    loadCurrent(100,num);
});

document.getElementById('b6').addEventListener('click', function() {
    let num = 6;
    testAlg = algoArray[num][1];
    partialSolve = concatAlgoArrayUpTo(num);
    loadCurrent(100,num);
});

document.getElementById('b7').addEventListener('click', function() {
    let num = 7;
    testAlg = algoArray[num][1];
    partialSolve = concatAlgoArrayUpTo(num);
    loadCurrent(100,num);
});

document.getElementById('b8').addEventListener('click', function() {
    let num = 8;
    testAlg = algoArray[num][1];
    partialSolve = concatAlgoArrayUpTo(num);
    loadCurrent(100,num);
});

document.getElementById('b9').addEventListener('click', function() {
    let num = 9;
    testAlg = algoArray[num][1];
    partialSolve = concatAlgoArrayUpTo(num);
    loadCurrent(100,num);
});

document.getElementById('b10').addEventListener('click', function() {
    currentNum +=1;
    let num = currentNum;
    testAlg = algoArray[num][1];
    partialSolve = concatAlgoArrayUpTo(num);
    loadCurrent(100,num);
});




