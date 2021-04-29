// DOM SELECTORS
// SECTION PHOTOGRAPHER PROFIL
let photographerName = document.querySelector(".photographer-description h1");
let photographerCity = document.querySelectorAll(".photographer-description p")[0];
let photographerTagline = document.querySelectorAll(".photographer-description p")[1];
let photographerTags = document.querySelector(".photographer-description .tag-list");
let photographerPhoto = document.querySelector(".photographer-description .photographer__photo");
let labelTotalLikes = document.querySelector(".sticky-label .total-likes");
let photographerPrice = document.querySelector(".sticky-label .price");
let modalFormName = document.querySelectorAll(".modal-contact p")[1];
// SECTION PHOTOGRAPHER PHOTOS
const gridGallery = document.querySelector(".gallery .grid");

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

// INJECTIONS
loadJSON(function(json) {

    // TO GET ID SENT INTO THE URL
    let url = window.location.href.toString();
    let getPhotographer = url.slice(url.lastIndexOf('=') + 1);

    // FIND THE PHOTOGRAPHER OBJECT WITH URL PARAMETER
    let photographer = result(json.photographers, getPhotographer);

    function result(object, whoIsIt) {
        for (i = 0; i < object.length; i++) {
            if (object[i].id == whoIsIt) {
                let foundIt = object[i];
                return foundIt;
            }
        }
    }

    // CREATE PHOTOGRAPHER PROFILE
    function photographerProfil(who, name, city, country, tagline, portrait, price) {
        // TITLE
        window.document.title = "FishEye - " + name;
        // NAME FOR THE FORM
        modalFormName.innerHTML = name;
        // NAME
        photographerName.innerHTML = name;
        // CITY
        photographerCity.innerHTML = city + "," + country;
        // TAGLINE
        photographerTagline.innerHTML = tagline;
        // TAGS
        who.tags.forEach(element => {
            let createTag = '<li class="tag--static">#' + element + '</li>';
            photographerTags.insertAdjacentHTML("beforeend", createTag);
        });
        // PORTRAIT PHOTO
        photographerPhoto.src = './public/ID/' + portrait;
        photographerPhoto.title = 'Photo de profil de ' + name;
        photographerPhoto.alt = 'Photo de profil de ' + name;
        // PRICE FOR STICKY LABEL
        photographerPrice.textContent = price + "€ / jour";
    }
    photographerProfil(photographer, photographer.name, photographer.city, photographer.country, photographer.tagline, photographer.portrait, photographer.price);

    // FOR EACH MEDIA OBJECT IN THE JSON
    json.media.forEach(element => {
        // IF THE ID FROM THE MEDIA OBJECT IS = TO ID FROM PHOTOGRAPHERS OBJECT
        if (element.photographerId === photographer.id) {
            // ADD TOTAL LIKES FROM JSON IN PAGE'S BOTTOM
            if (element.image !== undefined) {
                // ADD EVERYTHING A PHOTO NEED FROM FACTORY METHOD
                let factoryMethod = factory(photographer, element.image, element.price, element.likes, element.date, element.tags);
                createNewCard(factoryMethod.cardContainer, factoryMethod.cardLightbox, factoryMethod.cardTitle, factoryMethod.cardPrice, factoryMethod.cardLikes, factoryMethod.cardIcon, factoryMethod.cardImg);
            } else {
                console.log("VIDEO A FAIRE");
            }
        }
    });
    // CALL FUNCTION FOR LIKE COUNTERS IN ./JS/LIKESCOUNTERS.JS
    likesCounters();
    // CALL FUNCTION FOR LIKE LIGHTBOX IN ./JS/LIGHTBOX.JS
    lightBox();
});



function createNewCard(container, lightbox, title, price, likes, icon, img) {
    lightbox.append(img);
    container.append(lightbox);
    container.append(title);
    container.append(price);
    container.append(likes);
    container.append(icon);
    gridGallery.appendChild(container);
}