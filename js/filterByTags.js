// DOM SELECTORS
const navTags = document.querySelectorAll(".header__navbar .tag-list button");
const photographersCards = document.querySelectorAll(".cards-block .cards");

// to get the value on click
navTags.forEach(item => {
    item.addEventListener('click', event => {
        // si on click un tag déjà actif on supprime le filtre et on réaffiche tout les photographes 
        if (item.className.match('tag--active')) {
            item.classList.remove('tag--active');
            photographersCards.forEach(function(item) {
                if (window.getComputedStyle(item).display === "none") {
                    item.style.display = "block";
                }
            });
            // si le tag n'est pas actif alors
        } else {
            // on supprime tout les actifs précédents
            navTags.forEach(function(item) {
                item.classList.remove('tag--active');
            });
            // on rend le dernier tag actif
            item.classList.add('tag--active');
            // on recupère la valeur du dernier tag
            let value = item.value;
            // from the value i got
            photographersCards.forEach(function(item) {
                // get li from the current item(here photographersCards)
                let tagLists = item.querySelectorAll("li");
                // create array to push values
                let array = [];
                for (let i = 0; i < tagLists.length; i++) {
                    array.push(tagLists[i].innerHTML);
                    // check if one element in list include the same value than the navbar
                    // if yes show the element
                    if (array.includes("#" + value)) {
                        item.style = "display: block";
                        // otherwise hide it
                    } else {
                        item.style = "display: none";
                    }
                }
            });
        }
    });
});