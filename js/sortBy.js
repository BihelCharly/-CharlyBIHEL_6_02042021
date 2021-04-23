// DOM ELEMENTS
let sortByBtn = document.querySelector(".filter-list");
// EVENTLISTENER
sortByBtn.addEventListener("change", sortBy);

function sortBy() {
    //DOM ELEMENTS
<<<<<<< HEAD
    let divCards = gridGallery.children;
    divCards = Array.prototype.slice.call(divCards);
=======
    var divCards = gridGallery.children;
    divCards = Array.prototype.slice.call(divCards);

>>>>>>> 7873be5c46e6bcd8cde5192023d10b042236e786
    switch (sortByBtn.value) {
        case "date":
            divCards.sort(function(a, b) {
                if (a.childNodes[0].date < b.childNodes[0].date) {
                    return -1;
                } else {
                    return 1;
                }
            });
<<<<<<< HEAD
=======
            gridGallery.innerHTML = "";
            for (let i = 0; i < divCards.length; i++) {
                gridGallery.appendChild(divCards[i]);
            }
>>>>>>> 7873be5c46e6bcd8cde5192023d10b042236e786
            break;
        case "popularity":
            divCards.sort(function(a, b) {
                return b.childNodes[3].textContent - a.childNodes[3].textContent;
            });
<<<<<<< HEAD
=======
            gridGallery.innerHTML = "";
            for (let i = 0; i < divCards.length; i++) {
                gridGallery.appendChild(divCards[i]);
            }
>>>>>>> 7873be5c46e6bcd8cde5192023d10b042236e786
            break;
        case "title":
            divCards.sort(function(a, b) {
                if (a.childNodes[1].textContent < b.childNodes[1].textContent) {
                    return -1;
                } else {
                    return 1;
                }
            });
<<<<<<< HEAD
            break;
    }
    for (let i = 0; i < divCards.length; i++) {
        gridGallery.appendChild(divCards[i]);
    }
=======
            gridGallery.innerHTML = "";
            for (let i = 0; i < divCards.length; i++) {
                gridGallery.appendChild(divCards[i]);
            }
            break;
    }
>>>>>>> 7873be5c46e6bcd8cde5192023d10b042236e786
}