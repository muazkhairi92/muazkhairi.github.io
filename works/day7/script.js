
function clearScreen() {
    document.getElementById("result").innerHTML = "";
}



function display(value) {
    document.getElementById("result").innerHTML +=value;
}

function deleteVal() {
    document.getElementById("result").innerHTML = document.getElementById("result").innerHTML.slice(0, -1);
}

 
function calculate() {
    var p = document.getElementById("result").innerHTML;
    var q = eval(p);
    document.getElementById("result").innerHTML = q;
}

function keypad(event){
    if(event.key === "1"){
        display('1')
    }
    if(event.key === "2"){
        display('2')
    }
    if(event.key === "3"){
        display('3')
    }
    if(event.key === "4"){
        display('4')
    }
    if(event.key === "5"){
        display('5')
    }
    if(event.key === "6"){
        display('6')
    }
    if(event.key === "7"){
        display('7')
    }
    if(event.key === "8"){
        display('8')
    }
    if(event.key === "9"){
        display('9')
    }
    if(event.key === "0"){
        display('0')
    }
    if(event.key === "/"){
        display('/')
    }
    if(event.key === "*"){
        display('*')
    }
    if(event.key === "+"){
        display('+')
    }
    if(event.key === "-"){
        display('-')
    }
    if(event.key === "."){
        display('.')
    }

    if(event.key === "Enter"){
        calculate()
    }
    if(event.key === "="){
        calculate()
    }
    if(event.key === " "){
        calculate()
    }
    if(event.key === "Backspace" || event.key === "Delete"){
        deleteVal()
    }
    document.getElementById("result").innerHTML 
}

window.addEventListener('keydown',keypad)