/* To Do & problems I'm having
    - figure out how to do the click to copy part
    - looks like I need to turn the password p into a text area in order to select it with code. https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
*/

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?"];

// set legalCharacters to only include letters by default
let legalCharacters = [];

const generateBtnEl = document.querySelector('#generate-btn');
const lengthOutput = document.querySelector('#length-output');
const passwordElOne =  document.querySelector('#pw1');
const passwordElTwo =  document.querySelector('#pw2');
const numbersCheckbox = document.querySelector('#numbers-checkbox');
const symmbolsCheckbox = document.querySelector('#symbols-checkbox');
const hintEl = document.querySelector("#hint");

let includeNumbers = true;
let includeSymbols = true;
let lengthValue = lengthOutput.value;

// listen for a change of the length slider
lengthOutput.addEventListener('mouseup', function() {
    lengthValue = lengthOutput.value;
})

// listen for click on Generate Passwords button
generateBtnEl.addEventListener('click', renderPasswords);

symmbolsCheckbox.addEventListener('click', function() {
    includeSymbols = !includeSymbols;
})

numbersCheckbox.addEventListener('click', function() {
    includeNumbers = !includeNumbers;
})


// change color of passwords to the enabled/active color
function enablePasswords() {
    passwordElOne.classList.remove('disabled')
    passwordElTwo.classList.remove('disabled')
}

function generatePassword() {
    let password = "";
    legalCharacters = [...letters];
    if (includeNumbers) {
        legalCharacters.push(...numbers);
    }
    if (includeSymbols) {
        legalCharacters.push(...symbols);
    }

    for (i = 0; i < lengthOutput.value; i++){
        password += getRandomChar();
    }
    // check if the password contains a number
    while (includeNumbers && !containsNumber(password)) {
        password = generatePassword();
    }
    // check if the password contains a symbol
    while (includeSymbols && !containsSymbols(password)) {
        password = generatePassword();
    }

    hintEl.textContent = "↑ click a password to copy ↑ ";
    return password;
}

// print the passwords to the page
function renderPasswords() {
    enablePasswords();
    passwordElOne.textContent = generatePassword();
    passwordElTwo.textContent = generatePassword();
}

function getRandomChar() {
    let randomNum = Math.floor( Math.random() * legalCharacters.length);
    return legalCharacters[randomNum];
}

// check if a string contains a number
function containsNumber(str) {
    return /\d/.test(str);
}

// check if a string contains a non alpha numeric character
function containsSymbols(str) {
    return /[^A-Za-z0-9]/.test(str);
}

// set the numbers and symbols toggles to 'on'
window.onload = onPageLoad();

function onPageLoad() {
    document.querySelector('#numbers-checkbox').checked = true;
    document.querySelector('#symbols-checkbox').checked = true;
}

