const buttons = document.querySelectorAll('.button')
const displayBottom = document.querySelector('.display-bottom')

getInput()

function getInput() {
    let input = ""
    let dot = document.querySelector('.dot')
    
    buttons.forEach(button => button.addEventListener('click', () => {
        let operators = '−+×÷'
        let numbers = ".0123456789"
        let currButton = button.textContent                    
        

        if(currButton == 'AC') {
            input = ""

        } else if(currButton == '←') {
            //removing operator and spaces
            if(input[input.length - 1] == " ")
                input = input.slice(0,input.length - 3)
            //removing a digit or a dot
            else input = input.slice(0,input.length - 1)
        } else if(currButton == '=') {
            //perform only if number is at the end of input
            if(!operators.includes(input[input.length-2])) {
                input = operate(input) //performing calculations
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
            dot.style["pointer-events"] = "auto" // enables dot button
        } else if(numbers.includes(currButton)) { 
            //adding dot

            if(currButton == '.') {
                input += currButton
                dot.style.pointerEvents = "none" // disables click events on a div                
            }
                
            //adding a digit
            else if(currButton != '.')
                input += currButton
        }
         
        
        displayBottom.textContent = input
    }))

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