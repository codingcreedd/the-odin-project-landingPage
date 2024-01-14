const jsLogo = document.querySelector('.js-svg');
const movementPath = document.querySelector('#movementPath')
gsap.to(jsLogo, {x: 20, y:-20, repeat: -1, duration: 1, yoyo:true, ease: "elastic"});

const signUpOption = document.querySelector('.register');
const logInOption = document.querySelector('.log-in');

signUpOption.addEventListener('click', () => {
    if(!signUpOption.classList.contains('toggle-btn'))
    {
        logInOption.classList.remove('toggle-btn');
        signUpOption.classList.add('toggle-btn');
    }
});

logInOption.addEventListener('click', () => {
    if(!logInOption.classList.contains('toggle-btn'))
    {
        signUpOption.classList.remove('toggle-btn');
        logInOption.classList.add('toggle-btn');
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

let validationBoolean = false;

function validateForm(){
    checkForEmptyFields();


    return validationBoolean;
}

function checkForEmptyFields(){
    inputs.forEach(input => {
        if(input.value === ''){
            changeInputField(input);
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
        input.style.cssText = "border: none";
    }
    else if(input.id === 'email'){
        emailWarning.style.display = 'none';
        input.style.cssText = "border: none";
    }else if(input.id === 'username'){
        usernameWarning.style.display = 'none';
        input.style.cssText = "border: none";
    }else if(input.id === 'password'){
        passwordWarning.style.display = 'none';
        input.style.cssText = "border: none";
    }else if(input.id === 'confirm_password'){
            confirmPassWarning.style.display = 'none';
            input.style.cssText = "border: none";
    }
}


