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

    function photographerProfil(who, name, city, country, tagline, portrait, price) {
        // page title
        window.document.title = "FishEye - " + name;
        // contact form name
        modalFormName.innerHTML = name;
        // add name
        photographerName.innerHTML = name;
        // add city
        photographerCity.innerHTML = city + "," + country;
        // add tagline
        photographerTagline.innerHTML = tagline;
        // add tags
        who.tags.forEach(element => {
            let createTag = '<li class="tag--static">#' + element + '</li>';
            photographerTags.insertAdjacentHTML("beforeend", createTag);
        });
        // add photo
        photographerPhoto.src = './public/ID/' + portrait;
        photographerPhoto.title = 'Photo de profil de ' + name;
        photographerPhoto.alt = 'Photo de profil de ' + name;
        // add price to sticky label
        photographerPrice.textContent = price + "€ / jour";
    }
    photographerProfil(photographer, photographer.name, photographer.city, photographer.country, photographer.tagline, photographer.portrait, photographer.price);

    // ADD PHOTOS IN THE GALLERY SECTION
    function addIMG(src, title, alt, price, likes, date, tags) {
        // CALL THE FUNCTION WHO CREATE ELEMENTS FOR
        // CREATE NEW CARD
        let card = document.createElement("div");
        card.className = "grid-card";
        // FOR LIGHTBOX
        let cardLightBox = document.createElement("a");
        cardLightBox.className = "card__photo hover-shadow cursor";
        // FOR TITLE
        let cardTitle = document.createElement("h2");
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
        let imgClass = "card__photo";
        let slicedTitle = title.slice(title.lastIndexOf('_') + 1, title.lastIndexOf('.'));
        let perfectTitle = slicedTitle.replace(/([A-Z])/g, ' $1').trim();
        img.src = photographerImgFolder + "/" + src;
        img.className = imgClass;
        img.alt = perfectTitle;
        img.title = perfectTitle;
        img.date = date;
        cardTitle.innerHTML = perfectTitle.charAt(0).toUpperCase() + perfectTitle.slice(1);
        cardPrice.innerHTML = price;
        cardLikes.innerHTML = likes;

        // ADD ELEMENT INTO THE DOM
        cardLightBox.append(img);
        card.append(cardLightBox);
        card.append(cardTitle);
        card.append(cardPrice);
        card.append(cardLikes);
        card.append(cardIconHeart);
        gridGallery.appendChild(card);
    }
    // VAR TO INCREMENT TOTAL LIKES LATER
    let totalLikes = 0;

    // FOR EACH MEDIA OBJECT IN THE JSON
    json.media.forEach(element => {
        // IF THE ID FROM THE MEDIA OBJECT IS = TO ID FROM PHOTOGRAPHERS OBJECT
        if (element.photographerId === photographer.id) {
            // ADD TOTAL LIKES FROM JSON IN PAGE'S BOTTOM
            if (element.image !== undefined) {
                // ADD EVERYTHING A PHOTO NEED FROM THE JSON
                addIMG(element.image, element.image, element.image, element.price, element.likes, element.date, element.tags);
            } else {
                // ADD EVEYTHING A VIDEO NEED FROM JSON
                // CREATE NEW CARD
                let card = document.createElement("div");
                card.className = "grid-card";
                // FOR TITLE
                let cardTitle = document.createElement("h2");
                cardTitle.className = "card__title";
                cardTitle.setAttribute("aria-label", "titre de la video");
                // FOR PRICE
                let cardPrice = document.createElement("p");
                cardPrice.className = "card__price";
                cardPrice.setAttribute("aria-label", "prix de la video");
                // FOR LIKES
                let cardLikes = document.createElement("p");
                cardLikes.className = "card__likes";
                cardLikes.setAttribute("aria-label", "compteur de j'aime");
                // FOR HEART ICON
                let cardIconHeart = document.createElement("button");
                cardIconHeart.className = "fas fa-heart fa-xs";
                cardIconHeart.setAttribute("aria-label", "bouton j'aime");
                cardIconHeart.setAttribute("value", element.likes);
                // Create an element <video>
                let newVideo = document.createElement("video");
                newVideo.className = "card__photo card__video hover-shadow cursor";
                // Set the attributes of the video
                let photographerImgFolder = "./public/" + photographer.name;
                newVideo.src = photographerImgFolder + "/" + element.video;
                newVideo.controls = false;
                newVideo.date = element.date;
                let slicedTitle = element.video.slice(element.video.lastIndexOf('_') + 1, element.video.lastIndexOf('.'));
                let perfectTitle = slicedTitle.replace(/([A-Z])/g, ' $1').trim();
                cardTitle.innerHTML = perfectTitle.charAt(0).toUpperCase() + perfectTitle.slice(1);
                cardPrice.innerHTML = element.price;
                cardLikes.innerHTML = element.likes;
                // Add the video to <div>
                card.append(newVideo);
                card.append(cardTitle);
                card.append(cardPrice);
                card.append(cardLikes);
                card.append(cardIconHeart);
                gridGallery.appendChild(card);
            }
            // INCREMENTS THE TOTALLIKES VAR WITH EACH LIKES FROM ELEMENTS
            totalLikes += element.likes;
        }
        // ADD TOTAL LIKES TO THE BOTTOMED LABEl
        let test = document.querySelector(".total-likes").firstChild;
        test.textContent = totalLikes;
    });
    // CALL FUNCTION FOR LIKE COUNTERS IN ./JS/LIKESCOUNTERS.JS
    likesCounters();
});