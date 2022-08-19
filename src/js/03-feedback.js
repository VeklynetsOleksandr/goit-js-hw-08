import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('input[name="email"]');
const messageRef = document.querySelector('textarea[name="message"]');
const dataBase = {
  email: '',
  message: '',
};
const STORAGE_KEY = 'feedback-form-state';

// --------------------------СЛУХАЧІ ПОДІЇ-------------------------------------
formRef.addEventListener('submit', submitForm);
formRef.addEventListener('input', throttle(validateForm, 500));

// --------------------------ФУНКЦІЇ-------------------------------------
function validateForm(e) {
  const { name, value } = e.target;
  dataBase[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataBase));
}
function submitForm(e) {
  e.preventDefault();
  e.currentTarget.reset();
  console.log(dataBase);
}
function getDataBase() {
  const getData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(getData);
  if (parsedData) {
    emailRef.value = parsedData.email;
    messageRef.value = parsedData.message;
  }
}

getDataBase();
