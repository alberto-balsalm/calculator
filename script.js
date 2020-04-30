const buttons = document.querySelectorAll('.button')
const displayBottom = document.querySelector('.display-bottom')

getInput()

function getInput() {
    let input = ""
    
    buttons.forEach(button => button.addEventListener('click', () => {
        let chars = "0123456789"
        let operators = '−+×÷'
        let currButton = button.textContent
        
        if(currButton == 'AC') {

        } else if(currButton == '←') {
            input = input.slice(0,input.length - 1)
        } else if(currButton == '=') {

        } else if(button.classList[1] == 'operator') {
            //previously input character was an operator -> replace it
            if(operators.includes(input[input.length-2])) {
                input = input.substr(0, input.length-2) + currButton + " "                
            } 
            //adding an operator after a number
            else {
                input += " " + currButton + " "
            }
        } else {
            input += currButton
        }
         
        
        displayBottom.textContent = input
    }))

}




function operate(a, b, operator) {
    let result
    if(operator == '+') result = add(a, b)
    else if(operator == '-') result = subtract(a, b)
    else if(operator == '*') result = multiply(a, b)
    else if(operator == '/') result = divide(a,b)
    return result




}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply (a, b) {
    return a * b
}

function divide (a, b) {
    return a / b
}