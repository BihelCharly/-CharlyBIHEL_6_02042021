// DOM SELECTORS
// SECTION PHOTOGRAPHER PROFIL
let photographerName = document.querySelector(".photographer-description h1");
let photographerCity = document.querySelector(".photographer-description h2");
let photographerHook = document.querySelector(".photographer-description p");
let photographerTags = document.querySelector(".photographer-description .tag-list");
let photographerPhoto = document.querySelector(".photographer-description .photographer__photo");
// SECTION PHOTOGRAPHER PHOTOS
const getGalleryGrid = document.querySelector(".gallery .grid");

// GET JSON
function loadJSON(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("/application/json");
    xobj.open('GET', 'js/photographers.json', true);
    xobj.setRequestHeader('Content-type', 'application/json');
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

// INJECTIONS
loadJSON(function(json) {


    function photographerProfil(name, city, hook, who, imgProfil) {
        // page title
        window.document.title = "FishEye - " + name;
        // add name
        photographerName.innerHTML = name;
        // add city
        photographerCity.innerHTML = city;
        // add hook
        photographerHook.innerHTML = hook;
        // add tags
        who.tags.forEach(element => {
            let createTag = '<li class="tag--static">' + element + '</li>';
            photographerTags.insertAdjacentHTML("beforeend", createTag);
        });
        // add photo
        photographerPhoto.src = './public/ID/' + imgProfil + '.jpg';
        photographerPhoto.title = 'Photo de profil de ' + name;
        photographerPhoto.alt = 'Photo de profil de ' + name;
    }
    photographerProfil(json[0].name, json[0].city, json[0].hook, json[0], json[0].photo);

    // ADD PHOTOS IN THE GALLERY SECTION
    function addIMG(src, alt, title, price, likes) {
        // CREATE NEW CARD TO PUT IMG INSIDE
        let card = document.createElement("div");
        card.className = "grid-card";
        let cardTitle = document.createElement("h3");
        cardTitle.className = "card__title";
        cardTitle.setAttribute("aria-label", "titre de la photo");
        let cardPrice = document.createElement("p");
        cardPrice.className = "card__price";
        cardPrice.setAttribute("aria-label", "prix de la photo");
        let cardLikes = document.createElement("p");
        cardLikes.className = "card__likes";
        cardLikes.setAttribute("aria-label", "compteur de j'aime");
        let cardIconHeart = document.createElement("i");
        cardIconHeart.className = "fas fa-heart fa-xs";
        cardIconHeart.setAttribute("aria-label", "bouton j'aime");
        // IMG CLASS NAME
        let imgClass = "card__photo hover-shadow cursor";
        // CREATE NEW ELEMENT
        let img = new Image();
        img.className = imgClass;
        img.src = src;
        img.alt = alt;
        img.title = title;
        cardTitle.innerHTML = title;
        cardPrice.innerHTML = price;
        cardLikes.innerHTML = likes;

        // ADD ELEMENT INTO THE DOM
        card.append(img);
        card.append(cardTitle);
        card.append(cardPrice);
        card.append(cardLikes);
        card.append(cardIconHeart);
        getGalleryGrid.appendChild(card);
    }

    json[0].img.forEach(element => {
        addIMG(element.src, element.alt, element.title, element.price, element.likes);
    });
});