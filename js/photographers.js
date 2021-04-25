// GET JSON
function loadJSON(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("/application/json");
    xobj.open('GET', 'js/FishEyeDataFR.json', true);
    xobj.setRequestHeader('Content-type', 'application/json');
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

// DOM ELEMENTS
const cardsBlock = document.querySelector(".photographers .cards-block");

// INJECTIONS
loadJSON(function(json) {

    // FOR EACH ELEMENTS IN PHOTOGRAPHERS OBJECT FROM JSON
    json.photographers.forEach(element => {

        // 0 ⇒ CREATE A DIV CARD
        let divCards = document.createElement("article");
        divCards.className = "cards";
        let comment = document.createComment("Photographer profile");
        cardsBlock.appendChild(comment);
        cardsBlock.append(divCards);

        // 1 ⇒ FIRST DIV INSIDE CARD
        let firstDivInsideCards = document.createElement("div");
        firstDivInsideCards.className = "photographer";
        firstDivInsideCards.setAttribute("aria-label", "Profil de " + element.name);
        divCards.appendChild(firstDivInsideCards);
        //// ↳ CREATE LINK
        let divCardsLink = document.createElement("a");
        divCardsLink.href = "photographer_profil.html?id=" + element.id;
        firstDivInsideCards.append(divCardsLink);
        //// ↳ CREATE IMG
        let photographerPortrait = new Image();
        photographerPortrait.src = "./public/ID/" + element.portrait;
        photographerPortrait.className = "photographer__photo";
        photographerPortrait.title = "test";
        photographerPortrait.alt = "test";
        divCardsLink.append(photographerPortrait);
        //// ↳ CREATE NAME
        let divCardsPhotographerName = document.createElement("h2");
        divCardsPhotographerName.append(element.name);
        divCardsLink.append(divCardsPhotographerName);

        // 2 ⇒ SECOND DIV INSIDE CARD
        let divCardsDescription = document.createElement("div");
        divCardsDescription.className = "photographer__description";
        divCardsDescription.setAttribute("aria-label", "Description et tarifs de " + element.name);
        divCards.append(divCardsDescription);
        //// ↳ CREATE CITY
        let cardsDescriptionCity = document.createElement("p");
        cardsDescriptionCity.innerHTML = element.city + ", " + element.country;
        divCardsDescription.append(cardsDescriptionCity);
        //// ↳ CREATE TAGLINE
        let cardsDescriptionTagline = document.createElement("p");
        cardsDescriptionTagline.innerHTML = element.tagline;
        divCardsDescription.append(cardsDescriptionTagline);
        //// ↳ CREATE TAGLINE
        let cardsDescriptionPrice = document.createElement("p");
        cardsDescriptionPrice.innerHTML = element.price + "€/jour";
        divCardsDescription.append(cardsDescriptionPrice);

        // 3 ⇒ THIRD DIV INSIDE CARD
        let divCardsTags = document.createElement("div");
        divCardsTags.className = "photographer__tags";
        divCards.appendChild(divCardsTags);
        //// ↳ CREATE UL
        let ulTaglist = document.createElement("ul");
        ulTaglist.className = "tag-list";
        divCardsTags.append(ulTaglist);
        //// ↳ CREATE LI + BUTTONS
        element.tags.forEach(element => {
            let liTagList = document.createElement("li");
            let btnTagList = document.createElement("button");
            btnTagList.className = "tag--static";
            btnTagList.innerHTML = "#" + element;
            btnTagList.value = element;
            liTagList.append(btnTagList);
            ulTaglist.append(liTagList);
        });
    });
    // CALL FILTERBYTAGS FROM ./JS/FILTERBYTAGS.JS
    filterByTags();
});