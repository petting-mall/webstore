// Functions

function createErrorMsg(formField, className, message) {
  const element = document.createElement('p');
  element.classList.add(className);
  element.innerText = message;
  formField.parentNode.appendChild(element);
  // formField.insertAdjacentElement('afterend', element);
}

function findErrorMessages(input, querySelectorName) {
  return input.parentNode.querySelectorAll(querySelectorName).length > 0;
}

function removeAllErrorMessages(querySelectorName) {
  const errorMessages = document.querySelectorAll(querySelectorName);
  errorMessages.forEach(message => message.remove());
}

function removeLocalErrorMessages(input, querySelectorName) {
  const errorMessages = input.parentNode.querySelectorAll(querySelectorName);
  errorMessages.forEach(message => message.remove());
}

function validateDigitsLength(input, length) {
  if (input.value.length !== length || isNaN(input.value)) {
    createErrorMsg(input, 'input-error-msg', `O campo acima deve conter apenas ${length} dígitos numéricos.`);
    inputError[input.name] = true;
    return;
  }
  inputError[input.name] = false;
}

function minMaxValidation(number, min, max) {
  return (number >= min && number <= max);
}

function validateLengthRange(input, min, max) {
  if (!minMaxValidation(input.value.length, min, max)) {
    if (min === max) {
      createErrorMsg(input, 'input-error-msg', `O campo acima deve ter ${min} caracteres.`);
    } else {
      createErrorMsg(input, 'input-error-msg', `O campo acima deve ter entre ${min} e ${max} caracteres.`);
    }
    inputError[input.name] = true;
    return;
  }
  inputError[input.name] = false;
}

function validatePassword(input) {
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,60})/;
  if (!strongPassword.test(input.value)) {
    createErrorMsg(input, 'input-error-msg', 'A senha deve cumprir os requisitos de segurança abaixo.');
    inputError[input.name] = true;
    return;
  }
  inputError[input.name] = false;
}

function validatePasswordConfirmation(confirmationInput, passwordInput) {
  if (confirmationInput.value !== passwordInput.value) {
    createErrorMsg(confirmationInput, 'input-error-msg', 'A confirmação da senha não confere.');
    inputError[confirmationInput.name] = true;
    return;
  }
  inputError[confirmationInput.name] = false;
}

function eraseInputErrors(obj) {
  for (const key in obj) {
    obj[key] = false;
  }
}

function findInputError(obj) {
  for (const key in obj) {
    if (obj[key]) {
      return true;
    }
  }
  return false;
}

// Account Type - check type-pf radio button
document.getElementById('register-type-pf').checked = true;
const formItemPF = document.querySelectorAll('.form-item-pf');
const formItemPJ = document.querySelectorAll('.form-item-pj');

// Account Type - event listenner
const radioAccountType = document.querySelectorAll('input[name="account-type"]');
radioAccountType.forEach(input => {
  input.addEventListener('click', () => {
    removeAllErrorMessages('.input-error-msg');
    eraseInputErrors(inputError);
    if (input.value === 'type-pf') {
      formItemPF.forEach(item => {
        if (item.classList.contains('visible-flex')) return;
        item.classList.remove('invisible');
        item.classList.add('visible-flex');
      });
      formItemPJ.forEach(item => {
        if (item.classList.contains('invisible')) return;
        item.classList.remove('visible-flex');
        item.classList.add('invisible');
      });
    }
    if (input.value === 'type-pj') {
      formItemPJ.forEach(item => {
        if (item.classList.contains('visible-flex')) return;
        item.classList.remove('invisible');
        item.classList.add('visible-flex');
      });
      formItemPF.forEach(item => {
        if (item.classList.contains('invisible')) return;
        item.classList.remove('visible-flex');
        item.classList.add('invisible');
      });
    }
  });
});

// PJ Checkbox - Insc. Estadual
const ieCheckbox = document.querySelector('#register-ie-na');
ieCheckbox.addEventListener('change', function () {
  const ieInput = document.querySelector('#register-ie');
  if (this.checked) {
    ieInput.disabled = true;
    ieInput.value = 'Isento';
  } else {
    ieInput.disabled = false;
    ieInput.value = '';
  }
});

// Address
const formAdrress = document.querySelectorAll('.form-address');
// CEP Button
const btnBuscaCEP = document.getElementById('busca-cep');
btnBuscaCEP.addEventListener('click', (event) => {
  event.preventDefault();
  const inputCEP = document.getElementById('register-cep');
  // Fetch if CEP input data is valid
  if (inputCEP.value.length === 8 && !isNaN(inputCEP.value)) {
    const settings = {
      method: 'get',
      mode: 'cors'
    };
    fetch(`https://viacep.com.br/ws/${inputCEP.value}/json/`, settings)
      .then(response => response.json())
      .then(addressData => {
        formAdrress.forEach(item => {
          if (item.classList.contains('visible-flex')) return;
          item.classList.remove('invisible');
          item.classList.add('visible-flex');
        });
        document.querySelector('#register-address').value = addressData.logradouro;
        document.querySelector('#register-address-bairro').value = addressData.bairro;
        document.querySelector('#register-address-city').value = addressData.localidade;
        document.querySelector('#register-address-uf').value = addressData.uf;
      })
      .catch(err => console.log(err));
  }
});

// Validate each input - onblur
const inputError = {};
const inputForm = document.querySelectorAll('form.register-form input');
inputForm.forEach(input => {
  input.addEventListener('blur', function () {
    // Remove previous error messages
    removeLocalErrorMessages(this, '.input-error-msg');

    switch (this.name) {
      case 'register-cnpj':
        validateDigitsLength(this, 14);
        break;

      case 'register-cpf':
        validateDigitsLength(this, 11);
        break;

      case 'register-name':
        validateLengthRange(this, 5, 200);
        break;

      case 'register-cep':
        validateDigitsLength(this, 8);
        break;

      case 'register-address-number':
        validateLengthRange(this, 1, 10);
        break;

      case 'register-address-uf':
        validateLengthRange(this, 2, 2);
        break;

      case 'register-phone':
        validateLengthRange(this, 10, 11);
        break;

      case 'register-password':
        validatePassword(this);
        break;

      case 'register-confirmation':
        validatePasswordConfirmation(this, document.querySelector('#register-password'));
        break;

      default:
        validateLengthRange(this, 2, 200);
        break;
    }
  });
});

// Validate form before submit
let hasBlankInput = true;
const registerForm = document.querySelector('form.register-form');
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Reset previous errors
  hasBlankInput = false;
  // Check for blank inputs
  const inputFieldsToSubmit = document.querySelectorAll('.register-form .visible-flex input');
  inputFieldsToSubmit.forEach(input => {
    if (!input.value.trim() && !findErrorMessages(input, '.input-error-msg')) {
      // removeLocalErrorMessages(input, '.input-error-msg');
      createErrorMsg(input, 'input-error-msg', 'O campo deve ser preenchido.');
      hasBlankInput = true;
    }
  });
  console.log(inputFieldsToSubmit.length);
  console.log(findInputError(inputError));
  console.log(hasBlankInput);
  if (inputFieldsToSubmit.length > 10 && !findInputError(inputError) && !hasBlankInput) {
    console.log('SUBMITED!!!')
    // registerForm.submit();
  }
});
