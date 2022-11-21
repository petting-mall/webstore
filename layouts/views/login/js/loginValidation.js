// Functions

function createErrorMsg(formField, className, message) {
  const element = document.createElement('p');
  element.classList.add(className);
  element.innerText = message;
  formField.insertAdjacentElement('afterend', element);
}

function removeAllErrorMessages(querySelectorName) {
  const errorMessages = document.querySelectorAll(querySelectorName);
  errorMessages.forEach(error => error.remove())
}

// Login
let hasLoginError = true;
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Reset previous errors
  removeAllErrorMessages('.input-error-msg')
  hasLoginError = false;
  const loginInput = loginForm.querySelectorAll('input');
  loginInput.forEach(input => {
    if (!input.value.trim()) {
      createErrorMsg(input, 'input-error-msg', 'O campo acima deve ser preenchido.');
      hasLoginError = true;
    }
  });
  if (!hasLoginError) {
    console.log('SUBMITED');
    // loginForm.submit();
  }
});

// To Register
let hasRegisterError = true;
const toRegisterForm = document.querySelector('#to-register-form');
toRegisterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Reset previous errors
  removeAllErrorMessages('.input-error-msg')
  hasRegisterError = false;
  const toRegisterInput = toRegisterForm.querySelectorAll('input');
  toRegisterInput.forEach(input => {
    if (!input.value.trim()) {
      createErrorMsg(input, 'input-error-msg', 'O campo acima deve ser preenchido.');
      hasRegisterError = true;
    }
  });
  if (!hasRegisterError) {
    console.log('SUBMITED');
    // toRegisterForm.submit();
  }
});
