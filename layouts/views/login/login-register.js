
function removeErrorMessage(input, className) {
  if (input.nextElementSibling && input.nextElementSibling.classList.contains(className)) {
    input.nextElementSibling.remove();
  }
}

// function removeAllErrorMessages() {
//   const errorMessages = document.querySelectorAll('.form-group .input-error-msg');
//   errorMessages.forEach(message => message.remove());
// }

function createErrorMsg(input, message) {
  const element = document.createElement('p');
  element.classList.add('input-error-msg');
  element.innerText = message;
  input.insertAdjacentElement('afterend', element);
}

// Account Type - radio buttons
document.getElementById('register-type-pf').checked = true;
document.querySelectorAll('.form-item-pj').forEach(item => {
  item.style.display = 'none';
});
// Account Type - event listenner
const radioAccountType = document.querySelectorAll('input[name="account-type"]');
radioAccountType.forEach(input => {
  input.addEventListener('click', () => {
    const formItemPF = document.querySelectorAll('.form-item-pf');
    const formItemPJ = document.querySelectorAll('.form-item-pj');
    if (input.value === 'type-pf') {
      formItemPF.forEach(item => {
        item.style.display = 'flex';
      });
      formItemPJ.forEach(item => {
        item.style.display = 'none';
      });
    } else {
      formItemPF.forEach(item => {
        item.style.display = 'none';
      });
      formItemPJ.forEach(item => {
        item.style.display = 'flex';
      });
    }
  });
});

// Address
const formAdrress = document.querySelectorAll('.form-address');
formAdrress.forEach(item => {
  item.style.display = 'none';
});

// Buuton - CEP
const btnBuscaCEP = document.getElementById('busca-cep');

btnBuscaCEP.addEventListener('click', (event) => {
  event.preventDefault();
  removeErrorMessage(btnBuscaCEP, 'input-error-msg');
  const inputCEP = document.getElementById('register-cep');
  if (inputCEP.value.length !== 8 || isNaN(inputCEP.value)) {
    createErrorMsg(btnBuscaCEP, 'CEP deve conter apenas números');
    return;
  };
  const settings = {
    method: 'get',
    mode: 'cors'
  };
  fetch(`https://viacep.com.br/ws/${inputCEP.value}/json/`, settings)
    .then(response => response.json())
    .then(addressData => {
      formAdrress.forEach(item => {
        item.style.display = 'flex';
      });
      document.querySelector('#register-address').value = addressData.logradouro;
      document.querySelector('#register-address-bairro').value = addressData.bairro;
      document.querySelector('#register-address-city').value = addressData.localidade;
      document.querySelector('#register-address-uf').value = addressData.uf;
    })
    .catch(err => console.log(err));
});
