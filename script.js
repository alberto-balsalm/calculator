const buttons = document.querySelectorAll('.button')
const displayBottom = document.querySelector('.display-bottom')

getInput()

function getInput() {
    let input = ""    
    
    buttons.forEach(button => button.addEventListener('click', () => {
        let operators = '−+×÷'
        let numbers = "0123456789"
        let currButton = button.textContent                    
        

        if(currButton == 'AC') {
            input = ""
            enableDot()

        } else if(currButton == '←') {
            //removing operator and spaces
            if(input[input.length - 1] == " ") {
                input = input.slice(0,input.length - 3)
                if(isDot(input)) disableDot()
            }//removing a digit or a dot
            else {
                if(input[input.length - 1] == ".") { enableDot() }
                input = input.slice(0,input.length - 1)
            }
        } else if(currButton == '=') {
            //perform only if number is at the end of input
            if(!operators.includes(input[input.length-2])) {
                input = operate(input).toString() //performing calculations
                console.log(input)
            }
        } else if(button.classList[1] == 'operator' && input.length) { 
            //if previously input character was an operator -> replace it
            if(operators.includes(input[input.length-2])) {
                input = input.substr(0, input.length-2) + currButton + " "                
            } 
            //adding an operator after a number
            else {
                input += " " + currButton + " "
            }
            enableDot()
        } else if(currButton == '.') { 
                input += currButton
                disableDot()                
        } else {
            input += currButton
        }

        
        displayBottom.textContent = input
    }))

}

function enableDot() {
    let dot = document.querySelector('.dot')
    dot.style.pointerEvents = "auto"
}

function disableDot() {
    let dot = document.querySelector('.dot')
    dot.style.pointerEvents = "none"
}

function isDot(input) { //check if there's a dot in latest number
    let dotIndex = input.lastIndexOf(".")
    let spaceIndex = input.lastIndexOf(" ")
    if(dotIndex > spaceIndex) return true
    return false
}

function operate(input) {
    if(typeof(input) != "string") input = input.toString()
    let inputArray = input.split(' ')
    //performing multiplication and division first
    for(let i = 0; i < inputArray.length; i++) {
        switch(inputArray[i]) {
            case '×':
                inputArray.splice(i-1, 3, multiply(inputArray[i-1],inputArray[i+1]))
                i = 0
                break
            case '÷':
                inputArray.splice(i-1, 3, divide(inputArray[i-1], inputArray[i+1]))
                i = 0
                break
        }
    }
    //addition and subtraction comes second
    for(let i = 0; i < inputArray.length; i++) {
        switch(inputArray[i]) {
            case '+':
                inputArray.splice(i-1, 3, add(parseFloat(inputArray[i-1]),parseFloat(inputArray[i+1])))
                i = 0
                break
            case '−':
                inputArray.splice(i-1, 3, subtract(parseFloat(inputArray[i-1]),parseFloat(inputArray[i+1])))
                i = 0
                break
        }
    }
    
    //if calculated number is an integer adding dot is enabled
    if(inputArray[0] % 1 == 0) enableDot()
    //otherwise disable dot
    else disableDot()

    return inputArray
}


function add(a, b) {
    return Math.round((a + b) * 100) / 100
}

function subtract(a, b) {
    return Math.round((a - b) * 100) / 100
}

function multiply (a, b) {
    return Math.round((a * b) * 100) / 100
}

function divide (a, b) {
    return Math.round((a / b) * 100) / 100
}