// DOM ELEMENTS
let sortByBtn = document.querySelector(".filter-list");
// EVENTLISTENER
sortByBtn.addEventListener("change", sortBy);

// FUNCTION TO SORT ELEMENTS IN THE GALLERY
function sortBy() {
    //DOM ELEMENTS
    let divCards = gridGallery.children;
    divCards = Array.prototype.slice.call(divCards);
    // CHECK VALUE
    switch (sortByBtn.value) {
        // IF VALUE IS DATE
        case "date":
            divCards.sort(function(a, b) {
                if (a.childNodes[0].date < b.childNodes[0].date) {
                    return -1;
                } else {
                    return 1;
                }
            });
            for (let i = 0; i < divCards.length; i++) {
                gridGallery.appendChild(divCards[i]);
            }
            break;
            // IF VALUE IS POPULARITY
        case "popularity":
            divCards.sort(function(a, b) {
                return b.childNodes[3].textContent - a.childNodes[3].textContent;
            });
            for (let i = 0; i < divCards.length; i++) {
                gridGallery.appendChild(divCards[i]);
            }
            break;
            // IF VALUE IS TITLE
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
    // REMOVE ELEMENTS
    gridGallery.innerHTML = "";
    // ADD ELEMENTS FROM SWITCH CASE'S RESULT
    for (let i = 0; i < divCards.length; i++) {
        gridGallery.appendChild(divCards[i]);
    }
}