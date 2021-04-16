// DOM SELECTORS
// SECTION PHOTOGRAPHER PROFIL
let photographerName = document.querySelector(".photographer-description h1");
let photographerCity = document.querySelector(".photographer-description h2");
let photographerTagline = document.querySelector(".photographer-description p");
let photographerTags = document.querySelector(".photographer-description .tag-list");
let photographerPhoto = document.querySelector(".photographer-description .photographer__photo");
// SECTION PHOTOGRAPHER PHOTOS
const getGalleryGrid = document.querySelector(".gallery .grid");

// GET JSON
function loadJSON(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("/application/json");
    //xobj.open('GET', 'js/photographers.json', true);
    xobj.open('GET', 'js/FishEyeDataFR.json', true);
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

    // Variable got from url parameter
    let getPhotographer = "243";

    // Switch case to know what page is
    switchResult(getPhotographer);

    function switchResult(whoIsIt) {
        switch (whoIsIt) {
            case "243":
                photographer = json.photographers[0];
                break;
            case "930":
                photographer = json.photographers[1];
                break;
            case "82":
                photographer = json.photographers[2];
                break;
            case "527":
                photographer = json.photographers[3];
                break;
            case "925":
                photographer = json.photographers[4];
                break;
            case "195":
                photographer = json.photographers[5];
                break;
        }
        return photographer;
    }

    function photographerProfil(who, name, city, country, tagline, portrait) {
        // page title
        window.document.title = "FishEye - " + name;
        // add name
        photographerName.innerHTML = name;
        // add city
        photographerCity.innerHTML = city + "," + country;
        // add tagline
        photographerTagline.innerHTML = tagline;
        // add tags
        who.tags.forEach(element => {
            let createTag = '<li class="tag--static">' + element + '</li>';
            photographerTags.insertAdjacentHTML("beforeend", createTag);
        });
        // add photo
        photographerPhoto.src = './public/ID/' + portrait;
        photographerPhoto.title = 'Photo de profil de ' + name;
        photographerPhoto.alt = 'Photo de profil de ' + name;
    }
    photographerProfil(photographer, photographer.name, photographer.city, photographer.country, photographer.tagline, photographer.portrait);

    // ADD PHOTOS IN THE GALLERY SECTION
    function addIMG(src, title, alt, price, likes, date, tags) {
        // CREATE NEW CARD
        let card = document.createElement("div");
        card.className = "grid-card";
        // FOR TITLE
        let cardTitle = document.createElement("h3");
        cardTitle.className = "card__title";
        cardTitle.setAttribute("aria-label", "titre de la photo");
        // FOR PRICE
        let cardPrice = document.createElement("p");
        cardPrice.className = "card__price";
        cardPrice.setAttribute("aria-label", "prix de la photo");
        // FOR LIKES
        let cardLikes = document.createElement("p");
        cardLikes.className = "card__likes";
        cardLikes.setAttribute("aria-label", "compteur de j'aime");
        // FOR HEART ICON
        let cardIconHeart = document.createElement("button");
        cardIconHeart.className = "fas fa-heart fa-xs";
        cardIconHeart.setAttribute("aria-label", "bouton j'aime");
        cardIconHeart.setAttribute("value", likes);

        // CREATE NEW ELEMENT
        let img = new Image();
        let photographerImgFolder = "./public/" + photographer.name;
        let imgClass = "card__photo hover-shadow cursor";
        let slicedTitle = title.slice(title.lastIndexOf('_') + 1, title.lastIndexOf('.'));
        let perfectTitle = slicedTitle.replace(/([A-Z])/g, ' $1').trim();
        img.src = photographerImgFolder + "/" + src;
        img.className = imgClass;
        img.alt = perfectTitle;
        img.title = perfectTitle;
        img.date = date;
        cardTitle.innerHTML = perfectTitle;
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

    json.media.forEach(element => {
        if (element.photographerId === photographer.id) {
            // ADD TOTAL LIKES FROM JSON IN PAGE'S BOTTOM
            if (element.image !== undefined) {
                // ADD EVERYTHING A PHOTO NEED FROM THE JSON
                addIMG(element.image, element.image, element.image, element.price, element.likes, element.date, element.tags);
            } else {
                // ADD EVEYTHING A VIDEO NEED FROM JSON
                // A FAIRE
                addIMG(element.video, element.video, element.video, element.price, element.likes, element.date, element.tags);
                console.log(element);
            }
        }
    });
    // CALL FUNCTION FOR LIKE COUNTERS IN ./JS/LIKESCOUNTERS.JS
    likesCounters();
});