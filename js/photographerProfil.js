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
        // PARAMETERS FROM JSON
    })(photographer.name, photographer.city, photographer.country, photographer.tagline, photographer.tags, photographer.portrait, photographer.price);

    // FOR EACH MEDIA OBJECT IN THE JSON
    json.media.forEach(object => {
        // IF THE ID FROM THE MEDIA OBJECT IS = TO ID FROM PHOTOGRAPHERS OBJECT
        if (object.photographerId === photographer.id) {
            // ADD TOTAL LIKES FROM JSON IN PAGE'S BOTTOM
            const media = (function(object) {
                if (object.hasOwnProperty('image')) {
                    let media = object.image;
                    return media;
                } else if (object.hasOwnProperty('video')) {
                    let media = object.video;
                    return media;
                }
            })(object);
            // FACTORY METHOD TO BUILD CARDS
            const builder = factory(photographer, media, object.price, object.likes, object.date, object.tags);
            // CHANGE CARD TYPE FROM RETURNED VALUE IN MEDIA
            const cardType = (function(media) {
                switch (media) {
                    case object.image:
                        return builder.cardImage;
                    case object.video:
                        return builder.cardVideo;
                }
            })(media);
            createNewCard(builder.cardContainer, builder.cardLightbox, builder.cardTitle, builder.cardPrice, builder.cardLikes, builder.cardIcon, cardType);
        }
    });
    // LIKES COUNTERS IN ./JS/LIKESCOUNTERS.JS
    likesCounters();
    // LIGHTBOX IN ./JS/LIGHTBOX.JS
    lightBox();
});

// APPEND ELEMENT TROUGHT THE DOM
function createNewCard(container, lightbox, title, price, likes, icon, media) {
    lightbox.append(media);
    container.append(lightbox);
    container.append(title);
    container.append(price);
    container.append(likes);
    container.append(icon);
    gridGallery.appendChild(container);
}