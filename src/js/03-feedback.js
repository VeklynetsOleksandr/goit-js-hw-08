import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(validateForm, 500));
formRef.addEventListener('submit', submitForm);

let dataBase = {};

getDataBase();

function submitForm(evt) {
  evt.preventDefault();
  console.log(dataBase);
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function validateForm(evt) {
  dataBase[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataBase));
}

function getDataBase() {
  let savedLocalStorageValue = localStorage.getItem(STORAGE_KEY);

  if (savedLocalStorageValue) {
    savedLocalStorageValue = JSON.parse(savedLocalStorageValue);
    Object.entries(savedLocalStorageValue).forEach(([name, value]) => {
      dataBase[name] = value;
      formRef.elements[name].value = value;
    });
  }
}
