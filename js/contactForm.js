// DOM ELEMENTS
// OUTSIDE FORM
const header = document.querySelector("header");
const main = document.querySelector("main");
const modalBtn = document.querySelector(".photographer__button");
const modalForm = document.querySelector(".modal-contact");

// INSIDE FORM
let subBtn = document.querySelector(".form__button");
let inputs = document.querySelectorAll(".modal-contact input");
let inputFirstName = document.querySelector("#first");
let inputLastName = document.querySelector("#last");
let inputEmail = document.querySelector("#email");
let inputSubject = document.querySelector("#subject");

// REGEX
const regExEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regExDate = new RegExp(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/);
const regExNb = new RegExp(/^[0-9]+$/);

// EVENTLISTENER TO SHOW CONTACT FORM
modalBtn.addEventListener('click', event => {
    header.style.opacity = "0.5";
    main.style.opacity = "0.5";
    modalForm.style = "opacity : 1";
    modalForm.style.display = "block";
});

// EVENTLISTENER TO HIDE CONTACT FORM
subBtn.addEventListener('click', event => {
    event.preventDefault();
    let state;
    inputs.forEach(element => {
        if (element.value.length >= 2 && inputEmail.value.match(regExEmail)) {
            state = true;
            return state;
        } else {
            element.placeholder = "Veuillez remplir ce champ";
            element.style = "border: 4px solid #901C1C";
            state = false;
            return state;
        }
    });
    if (state === true) {
        console.log(returnFormInfos(inputFirstName.value, inputLastName.value, inputEmail.value, inputSubject.value));
        header.style.opacity = "1";
        main.style.opacity = "1";
        modalForm.style.display = "none";
    } else {
        console.log("Merci de remplir les champs");
    }
});

function returnFormInfos(firstName, lastName, email, message) {
    let object = {};
    object.Prenom = firstName;
    object.Nom = lastName;
    object.Email = email;
    object.Message = message;
    return object;
}