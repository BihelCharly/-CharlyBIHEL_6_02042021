// DOM ELEMENTS
// OUTSIDE FORM
const header = document.querySelector('header');
const main = document.querySelector('main');
const modalBtn = document.querySelector('.photographer__button');
const modalForm = document.querySelector('.modal-contact');

// INSIDE FORM
let subBtn = document.querySelector('.form__button');
let inputs = document.querySelectorAll('.modal-contact input');
let inputFirstName = document.querySelector('#first');
let inputLastName = document.querySelector('#last');
let inputEmail = document.querySelector('#email');
let inputSubject = document.querySelector('#subject');
let btnCloseForm = document.querySelector('.close--form');

// REGEX
const regExEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

// TO SHOW CONTACT FORM
modalBtn.addEventListener('click', () => {
    header.style.opacity = '0.5';
    main.style.opacity = '0.5';
    modalForm.style = 'opacity : 1';
    modalForm.style.display = 'block';
    modalBtn.style.display = 'none';
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
});

// TO HIDE CONTACT FORM
btnCloseForm.addEventListener('click', closeForm);

function closeForm() {
    header.style.opacity = '1';
    main.style.opacity = '1';
    modalForm.style = 'opacity : 0';
    modalForm.style.display = 'none';
    modalBtn.style.display = 'block';
}

// CHECK VALIDATION
subBtn.addEventListener('click', event => {
    event.preventDefault();
    let state;
    // CHECK IF INPUTS VALUE ARE > 2
    inputs.forEach(element => {
        // IF YES
        if (element.value.length > 2 && inputEmail.value.match(regExEmail)) {
            state = true;
            return state;
            // OTHERWISE
        } else {
            element.nextElementSibling.textContent = 'Merci de remplir ce champs';
            element.placeholder = 'Veuillez remplir ce champ';
            element.style = 'border: 4px solid #901C1C';
            state = false;
            return state;
        }
    });
    if (state === true) {
        console.log(returnFormInfos(inputFirstName.value, inputLastName.value, inputEmail.value, inputSubject.value));
        closeForm();
        inputs.forEach(element => {
            element.value = '';
            element.nextElementSibling.textContent = '';
            element.placeholder = '';
            element.style = 'border: inherit';
        });
    } else {
        console.log('Merci de remplir les champs');
    }
});

// RETURNED OBJECT IN CONSOLE LOG
function returnFormInfos(firstName, lastName, email, message) {
    const object = {};
    object.Prenom = firstName;
    object.Nom = lastName;
    object.Email = email;
    object.Message = message;
    return object;
}