const jsLogo = document.querySelector('.js-svg');
gsap.to(jsLogo, {x: 20, duration: 1, ease: "bounce"});

//FORM PAGE-----------------------------------------------------//

const signUpOption = document.querySelector('.register');
const logInOption = document.querySelector('.log-in');
const signUpForm = document.querySelector('.signup-form');
const logInForm = document.querySelector('.login-form');

signUpOption.classList.add('toggle-btn');

const navigationDiv = document.querySelector('.nav-div');

signUpOption.addEventListener('click', () => {
    gsap.to(jsLogo, {x:0, duration: 3});
    if(!signUpOption.classList.contains('toggle-btn'))
    {
        logInOption.classList.remove('toggle-btn');
        signUpOption.classList.add('toggle-btn');
        signUpForm.style.display = 'block';
        logInForm.style.display = 'none';
        navigationDiv.classList.remove('toggle-log-in');
    }
});


logInOption.addEventListener('click', () => {

    gsap.to(jsLogo, {x: 600, duration: 3});
    if(!logInOption.classList.contains('toggle-btn'))
    {
        signUpOption.classList.remove('toggle-btn');
        logInOption.classList.add('toggle-btn');
        signUpForm.style.display = 'none';
        logInForm.style.display = 'block';
        navigationDiv.classList.add('toggle-log-in');
    }
});


const inputs = document.querySelectorAll('input.signup-input');

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

const popUpContainer = document.querySelector('.signup-complete-popup-container');

let validationBoolean = false;
let validateFields, validateName, validateEmail, validateUserName, validatePassword, confirmPassword;

//MAIN VALIDATION FORM FUNCTION
function validateForm(){
    checkForEmptyFields();
    validateFullName();
    emailValidation();
    usernameValidation();
    passwordValidation();
    confirmPasswordValidation();

    if(validateFields && validateName && validateEmail && validateUserName && validatePassword  && confirmPassword)
    {
        localStorage.setItem('email', `${emailInput.value}`);
        localStorage.setItem('password', `${passwordInput.value}`);
        popUpContainer.style.display = 'flex';
        setTimeout(() => {
            popUpContainer.style.display = 'none';
        }, 2000);
        setTimeout(() => {
            validationBoolean = true;
        }, 3000);
    }
    else 
        validationBoolean = false;

    return validationBoolean;
}

let validationBooleanLogIn = false;
let validateFieldsLogIn, validateEmailLogIn, validatePassLogIn;
const emailLogInWarning = document.querySelector('.emaillogin_warning');
const passwordLogInWarning = document.querySelector('.passwordlogin_warning');
const emailLogInInput = document.querySelector('#email_login');
const passwordLogInInput = document.querySelector('#password_login');
const warningMessage = document.querySelector('.warning');

emailLogInInput.addEventListener('keydown', () => {warningCSSRemoval(emailLogInWarning, emailLogInInput)});
passwordLogInInput.addEventListener('keydown', () => {warningCSSRemoval(passwordLogInWarning, passwordLogInInput)});

function validateFormLogIn(){
    checkForEmptyFieldsLogIn();
    inputsLogInValidation();

    if(validateFieldsLogIn && validateEmailLogIn && validatePassLogIn)
        validationBooleanLogIn = true;
    else
        validationBooleanLogIn = false;

    return validationBooleanLogIn;
}


//LOG IN FORM VALIDATIONS FUNCTIONS
function checkForEmptyFieldsLogIn(){
    if(emailLogInInput.value === ''){
        emailLogInWarning.innerText = 'Enter your email';
        warningCSSChange(emailLogInWarning, emailLogInInput);
        validateFieldsLogIn = false;
    }

    if(passwordLogInInput.value === ''){
        passwordLogInWarning.innerText = 'Enter your password';
        warningCSSChange(passwordLogInWarning, passwordLogInInput);
        validateFieldsLogIn = false;
    }

    if(emailLogInInput.value !== '' && passwordLogInInput.value !== '')
        validateFieldsLogIn = true;
}

function inputsLogInValidation(){
    if(`${emailLogInInput.value}` === localStorage.getItem('email') && `${passwordLogInInput.value}` === localStorage.getItem('password'))
    {
        validateEmailLogIn = true;
        validatePassLogIn = true;
    }
    else if((`${emailLogInInput.value}` !== localStorage.getItem('email') || `${passwordLogInInput.value}` !== localStorage.getItem('password')) && validateFieldsLogIn === true)
    {
        warningMessage.innerText = 'Email or password is incorrect';
        warningMessage.style.display = 'block';
    }
}

//SIGN UP FORM VALIDATIONS FUNCTIONS

function warningCSSChange(warningBlock, inputType){
    warningBlock.style.display = 'block';
    inputType.style.cssText = 'border: 1px solid red';
}

function warningCSSRemoval(warningBlock, inputType){
    warningBlock.style.display = 'none';
    inputType.style.cssText = "border: 1px solid var(--primary-color)";
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
        warningCSSChange(nameWarning, input);
    }
    else if(input.id === 'email'){
        emailWarning.innerText = 'Enter your email';
        warningCSSChange(emailWarning, input);
    }else if(input.id === 'username'){
        usernameWarning.innerText = 'Enter your username';
        warningCSSChange(usernameWarning, input);
    }else if(input.id === 'password'){
        passwordWarning.innerText = 'Enter your password';
        warningCSSChange(passwordWarning, input);
    }else if(input.id === 'confirm_password'){
        if(document.querySelector('#password').value != '')
            confirmPassWarning.innerText = 'Enter your password';

            warningCSSChange(confirmPassWarning, input);
    }


}

function removeWarning(input){
    if(input.id === 'full_name')
        warningCSSRemoval(nameWarning, input);
    else if(input.id === 'email')
        warningCSSRemoval(emailWarning, input);
    else if(input.id === 'username')
        warningCSSRemoval(usernameWarning, input);
    else if(input.id === 'password')
        warningCSSRemoval(passwordWarning, input);
    else if(input.id === 'confirm_password')
        warningCSSRemoval(confirmPassWarning, input);    
}

//FULL NAME VALIDATION
function validateFullName(){
    const fullNameString = String(fullNameInput.value);

    if(fullNameString.length < 3 && fullNameString.length >= 1){
        validateName = false;
        nameWarning.innerText = 'Name must be at least 3 characters long.'
        warningCSSChange(nameWarning, fullNameInput);
    }
    else if(!(isAlphabetic(fullNameString)) && fullNameString.length >= 1)
    {
        validateName = false;
        nameWarning.innerText = 'Name must contain characters only.';
        warningCSSChange(nameWarning, fullNameInput);
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

//Email Validation
function emailValidation(){
    const emailString = String(emailInput.value);
    let whiteSpaceCount = 0;

    //check for whitespaces
    for(let i = 0; i < emailString.length; i++)
    {
        if(isWhitespace(emailString[i]))
            whiteSpaceCount++;
    }

    if(whiteSpaceCount > 0){
        validateEmail = false;
        emailWarning.innerText = 'Invalid email';
        warningCSSChange(emailWarning, emailInput);
    }
    else if(!emailString.includes("@gmail.com") && emailString.length > 0)
    {
        validateEmail = false;
        emailWarning.innerText = 'Email must include @gmail.com';
        warningCSSChange(emailWarning, emailInput);
    }
    else if(emailString.includes("@gmail.com") && emailString.length === 10)
    {
        validateEmail = false;
        emailWarning.innerText = ' The email must include a username before the \'@gmail.com\' domain."';
        warningCSSChange(emailWarning, emailInput);
    }
    else
    {
        validateEmail = true;
    }
}

//username validations
function usernameValidation(){
    const usernameString = String(usernameInput.value);
    let whiteSpaceCount = 0, specialCharactersCount = 0;;

    //check for whitespaces and special Characters
    for(let i = 0; i < usernameString.length; i++)
    {
        if(isWhitespace(usernameString[i]))
            whiteSpaceCount++;

        if(isSpecialCharacter(usernameString[i]) && usernameString[i] !== '.' && usernameString !== '_')
            specialCharactersCount++;
    }

    if(usernameString.length < 5 && usernameString.length >= 1)
    {   
        validateUserName = false;
        usernameWarning.innerText = 'Username must be at least 5 characters long';
        warningCSSChange(usernameWarning, usernameInput);
    }
    else if(usernameString.length > 20)
    {
        validateUserName = false;
        usernameWarning.innerText = 'Username must be at most 20 characters long';
        warningCSSChange(usernameWarning, usernameInput);
    }
    else if(whiteSpaceCount > 0){
        validateUserName = false;
        usernameWarning.innerText = 'Username must not contain whitespaces';
        warningCSSChange(usernameWarning, usernameInput);
    }
    else if(specialCharactersCount > 0){
        validateUserName = false;
        usernameWarning.innerText = 'Only . and _ are accepted';
        warningCSSChange(usernameWarning, usernameInput);
    }
    else
    {
        validateUserName = true;
    }
}

//password validation
function passwordValidation(){
    const passwordString = String(passwordInput.value);
    let whiteSpaceCount = 0, numberCount = 0, specialCharactersCount = 0;

    //check for whitespaces, numbers and specialCharacters
    for(let i = 0; i < passwordString.length; i++)
    {
        if(isWhitespace(passwordString[i]))
            whiteSpaceCount++;

        if(isNumber(passwordString[i]))
            numberCount++;

        if(isSpecialCharacter(passwordString[i]))
            specialCharactersCount++;
    }

    if(passwordString.length < 10 && passwordString.length >= 1)
    {   
        validatePassword = false;
        passwordWarning.innerText = 'Your password must be at least 10 characters long';
        warningCSSChange(passwordWarning, passwordInput);
    }
    else if(whiteSpaceCount > 0)
    {
        validatePassword = false;
        passwordWarning.innerText = 'Your password must not contain any whitespaces';
        warningCSSChange(passwordWarning, passwordInput);
    }
    else if(numberCount < 1 && passwordString.length >= 1)
    {   
        validatePassword = false;
        passwordWarning.innerText = 'Your password must contain at least one number';
        warningCSSChange(passwordWarning, passwordInput);
    }
    else if(specialCharactersCount < 1 && passwordString.length >= 1)
    {
        validatePassword = false;
        passwordWarning.innerText = 'Your password must contain at least one special character';
        warningCSSChange(passwordWarning, passwordInput);
    }
    else
    {
        validatePassword = true;
    }
    
}

function confirmPasswordValidation(){
    if(confirmPassInput.value === passwordInput.value){
        confirmPassword = true;
    }
    else if(confirmPassInput.value !== '' && passwordInput.value === '')
    {
        confirmPassword = false;
        confirmPassWarning.innerText = 'Enter your password first';
        warningCSSChange(confirmPassWarning, confirmPassInput);
    }
    else if(confirmPassInput.value === '' && validatePassword === true)
    {
        confirmPassword = false;
        confirmPassWarning.innerText = 'Re-enter password';
        warningCSSChange(confirmPassWarning, confirmPassInput);
    }
    else if(confirmPassInput.value !== passwordInput.value && validatePassword === true)
    {
        confirmPassword = false;
        confirmPassWarning.innerText = 'Passwords don\'t match';
        warningCSSChange(confirmPassWarning, confirmPassInput);
    }
}

