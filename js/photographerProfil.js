// DOM SELECTORS
// SECTION PHOTOGRAPHER PROFIL
let photographerName = document.querySelector(".photographer-description h1");
let photographerCity = document.querySelectorAll(".photographer-description div p")[0];
let photographerTagline = document.querySelectorAll(".photographer-description div p")[1];
let photographerTags = document.querySelector(".photographer-description .tag-list");
let photographerPhoto = document.querySelector(".photographer-description .photographer__photo");
let labelTotalLikes = document.querySelector(".sticky-label .total-likes").firstChild;
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

    // GET ID IN URL
    let url = window.location.href.toString();
    let id = url.slice(url.lastIndexOf('=') + 1);

    // FIND PHOTOGRAPHER OBJECT WITH ID PARAMETER
    const photographer = result(json.photographers, id);

    function result(object, id) {
        for (i = 0; i < object.length; i++) {
            if (object[i].id == id) {
                let result = object[i];
                return result;
            }
        }
    }

    // CREATE PHOTOGRAPHER PROFILE
    (function(name, city, country, tagline, tags, portrait, price) {
        // WINDOW TITLE
        window.document.title = "FishEye - " + name;
        // NAME FOR MODAL
        modalFormName.innerHTML = name;
        // DESCRIPTION
        photographerName.innerHTML = name;
        photographerCity.innerHTML = city + "," + country;
        photographerTagline.innerHTML = tagline;
        tags.forEach(item => { photographerTags.insertAdjacentHTML("beforeend", '<li class="tag--static">#' + item + '</li>'); });
        // PHOTO
        photographerPhoto.src = './public/ID/' + portrait;
        photographerPhoto.title = 'Photo de profil de ' + name;
        photographerPhoto.alt = 'Photo de profil de ' + name;
        // PRICE IN STICKY LABEL
        photographerPrice.textContent = price + "€ / jour";
        photographerPrice.setAttribute("aria-label", "Tarif de" + price + "euros par jour");
        // PARAMETERS FROM JSON
    })(photographer.name, photographer.city, photographer.country, photographer.tagline, photographer.tags, photographer.portrait, photographer.price);

    // TOTAL LIKES
    let totalLikes = 0;

    function totalLike(likes) {
        totalLikes += likes;
        return totalLikes;
    }
    // FOR EACH MEDIA OBJECTS IN JSON
    json.media.forEach(media => {
        // IF ID FROM MEDIA OBJECT IS = ID FROM PHOTOGRAPHERS OBJECT
        if (media.photographerId === photographer.id) {
            // FACTORY METHOD TO BUILD CARDS IN ./JS/FACTORY.JS
            const builder = Factory(photographer, media, media.price, media.likes, media.date);
            createNewCard(builder.cardMedia, builder.cardContainer, builder.cardLightbox, builder.cardTitle, builder.cardPrice, builder.cardLikes, builder.cardIcon);
            totalLike(media.likes);
        }
    });
    // ADD TOTAL LIKES IN THE DOM
    labelTotalLikes.textContent = totalLikes + " ";
    // LIKES COUNTERS IN ./JS/LIKESCOUNTERS.JS
    likesCounters();
    // LIGHTBOX IN ./JS/LIGHTBOX.JS
    lightBox();
});