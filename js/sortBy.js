// DOM ELEMENTS
let sortByBtn = document.querySelector(".filter-list");
// EVENTLISTENER
sortByBtn.addEventListener("change", sortBy);

function sortBy() {
    //DOM ELEMENTS
    let divCards = gridGallery.children;
    divCards = Array.prototype.slice.call(divCards);

    switch (sortByBtn.value) {
        case "date":
            divCards.sort(function(a, b) {
                if (a.childNodes[0].date < b.childNodes[0].date) {
                    return -1;
                } else {
                    return 1;
                }
            });
            gridGallery.innerHTML = "";
            for (let i = 0; i < divCards.length; i++) {
                gridGallery.appendChild(divCards[i]);
            }
            break;
        case "popularity":
            divCards.sort(function(a, b) {
                return b.childNodes[3].textContent - a.childNodes[3].textContent;
            });
            gridGallery.innerHTML = "";
            for (let i = 0; i < divCards.length; i++) {
                gridGallery.appendChild(divCards[i]);
            }
            break;
        case "title":
            divCards.sort(function(a, b) {
                if (a.childNodes[1].textContent < b.childNodes[1].textContent) {
                    return -1;
                } else {
                    return 1;
                }
            });
            break;
    }
    gridGallery.innerHTML = "";
    for (let i = 0; i < divCards.length; i++) {
        gridGallery.appendChild(divCards[i]);
    }
}