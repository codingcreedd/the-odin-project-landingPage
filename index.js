const jsLogo = document.querySelector('.js-svg');
gsap.to(jsLogo, {x: 20, y:-20, repeat: -1, duration: 1, yoyo:true, ease: "elastic"});

//FORM PAGE-----------------------------------------------------//

const signUpOption = document.querySelector('.register');
const logInOption = document.querySelector('.log-in');
const signUpForm = document.querySelector('.signup-form');
const logInForm = document.querySelector('.login-form');

signUpOption.classList.add('toggle-btn');

signUpOption.addEventListener('click', () => {
    if(!signUpOption.classList.contains('toggle-btn'))
    {
        logInOption.classList.remove('toggle-btn');
        signUpOption.classList.add('toggle-btn');
        signUpForm.style.display = 'block';
        logInForm.style.display = 'none';
    }
});

logInOption.addEventListener('click', () => {
    if(!logInOption.classList.contains('toggle-btn'))
    {
        signUpOption.classList.remove('toggle-btn');
        logInOption.classList.add('toggle-btn');
        signUpForm.style.display = 'none';
        logInForm.style.display = 'block';
    }
});


const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('keydown', () => {
        removeWarning(input);
    });
});

const nameWarning = document.querySelector('.name_warning');
const emailWarning = document.querySelector('.email_warning');
const usernameWarning = document.querySelector('.username_warning');
const passwordWarning = document.querySelector('.password_warning');
const confirmPassWarning = document.querySelector('.confirm_pass_warning')

//Inputs
const fullNameInput = document.querySelector('#full_name');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const confirmPassInput = document.querySelector('#confirm_password');


let validationBoolean = true;
let validateFields, validateName, b3, b4, b5;

function validateForm(){
    checkForEmptyFields();
    validateFullName();

    if(validateFields && validateName)
        validationBoolean = true;
    else 
        validationBoolean = false;

    return validationBoolean;
}

function checkForEmptyFields(){
    inputs.forEach(input => {
        if(input.value === ''){
            validateFields = false;
            changeInputField(input);
        }
        else
        {
            validateFields = true
        }
    });
}

function changeInputField(input){
    if(input.id === 'full_name'){
        nameWarning.innerText = 'Enter your full name';
        nameWarning.style.display = 'block';
        input.style.cssText = "border: 1px solid red";
    }
    else if(input.id === 'email'){
        emailWarning.innerText = 'Enter your email';
        emailWarning.style.display = 'block';
        input.style.cssText = "border: 1px solid red";
    }else if(input.id === 'username'){
        usernameWarning.innerText = 'Enter your username';
        usernameWarning.style.display = 'block';
        input.style.cssText = "border: 1px solid red";
    }else if(input.id === 'password'){
        passwordWarning.innerText = 'Enter your password';
        passwordWarning.style.display = 'block';
        input.style.cssText = "border: 1px solid red";
    }else if(input.id === 'confirm_password'){
        if(document.querySelector('#password').value != '')
            confirmPassWarning.innerText = 'Re-Enter your password';
        else
            confirmPassWarning.innerText = 'Enter your password';
    
        
            confirmPassWarning.style.display = 'block';
            input.style.cssText = "border: 1px solid red";
    }


}

function removeWarning(input){
    if(input.id === 'full_name'){
        nameWarning.style.display = 'none';
        input.style.cssText = "border: 1px solid var(--primary-color)";
    }
    else if(input.id === 'email'){
        emailWarning.style.display = 'none';
        input.style.cssText = "border: 1px solid var(--primary-color)";
    }else if(input.id === 'username'){
        usernameWarning.style.display = 'none';
        input.style.cssText = "border: 1px solid var(--primary-color)";
    }else if(input.id === 'password'){
        passwordWarning.style.display = 'none';
        input.style.cssText = "border: 1px solid var(--primary-color)";
    }else if(input.id === 'confirm_password'){
            confirmPassWarning.style.display = 'none';
            input.style.cssText = "border: 1px solid var(--primary-color)";
    }
}

//FULL NAME VALIDATION
function validateFullName(){
    const fullNameString = String(fullNameInput.value);

    if(fullNameString.length < 3 && fullNameString.length >= 1){
        validateName = false;
        nameWarning.innerText = 'Name must be at least 3 characters long.'
        nameWarning.style.display = 'block';
        fullNameInput.style.cssText = 'border: 1px solid red;';
    }
    else if(!(isAlphabetic(fullNameString)) && fullNameString.length >= 1)
    {
        validateName = false;
        nameWarning.innerText = 'Name must contain characters only.';
        nameWarning.style.display = 'block';
        fullNameInput.style.cssText = 'border: 1px solid red;';
    }
    else
        validateName = true;
    

}

function isAlphabetic(inputString) {
    let b = true;

    fixWhiteSpaces(inputString);

    //check for numbers and special characters
    for(let i = 0; i < inputString.length; i++)
    {
        if(isNumber(inputString[i]) || isSpecialCharacter(inputString[i])){
            b = false;
        }
        else
        {
            b = true;
        }
    }

    return b;
}

function isSpecialCharacter(char) {
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    return specialCharacterRegex.test(char);
}

function isNumber(char) {
    return !isNaN(Number(char));
}

function isWhitespace(char) {
    return /\s/.test(char);
}

function fixWhiteSpaces(inputString)
{
    //Trim the name
    inputString = inputString.trim();
    fullNameInput.value = inputString;

    //Keep only one space between words
    let whiteSpaceCount = 0;
    let modifiedString = '';
    for(let i = 0; i < inputString.length; i++)
    {
        if(!isWhitespace(inputString[i])){
            whiteSpaceCount = 0;
            modifiedString += inputString[i];
        }

        if(whiteSpaceCount >= 1)
            continue;  

        if(isWhitespace(inputString[i]) && whiteSpaceCount < 1){
            whiteSpaceCount++;
            modifiedString += inputString[i];
        }

    }

    inputString = modifiedString;
    fullNameInput.value = inputString;
}