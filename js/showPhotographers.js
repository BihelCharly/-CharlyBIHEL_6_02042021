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

    let getPhotographer = "mimikeel";

    function switchResult(whoIsIt) {
        switch (whoIsIt) {
            case "mimikeel":
                photographer = json[0];
                break;
            case "ellierosewilkens":
                photographer = json[1];
                break;
            case "tracygalindo":
                photographer = json[2];
                break;
            case "nabeelbradford":
                photographer = json[3];
                break;
            case "rhodedubois":
                photographer = json[4];
                break;
            case "marcelnikolic":
                photographer = json[5];
                break;
        }
        return photographer;
    }

    switchResult(getPhotographer);

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
    photographerProfil(photographer.name, photographer.city, photographer.hook, photographer, photographer.photo);

    // ADD PHOTOS IN THE GALLERY SECTION
    function addIMG(src, alt, title, price, likes, indexForModal) {
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
        let cardIconHeart = document.createElement("button");
        cardIconHeart.className = "fas fa-heart fa-xs";
        cardIconHeart.setAttribute("aria-label", "bouton j'aime");
        cardIconHeart.setAttribute("value", likes);

        // IMG CLASS NAME
        let imgClass = "card__photo hover-shadow cursor";
        // CREATE NEW ELEMENT
        let img = new Image();
        img.className = imgClass;
        img.src = src;
        img.alt = alt;
        img.title = title;
        img.setAttribute("onclick", "openModal();currentSlide(" + indexForModal + ")");
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

    photographer.img.forEach(element => {
        // GET INDEX FOR THE LIGHTBOX
        let index = photographer.img.indexOf(element);
        // ADD EVERYTHING A PHOTO NEED FROM THE JSON
        addIMG(element.src, element.alt, element.title, element.price, element.likes, index + 1);
    });

    // LIKES COUNTERS SECTION

    // DOM SELECTORS
    let gridCard = document.querySelectorAll(".grid-card");


    // open the content element when clicking on the buttonsItems
    gridCard.forEach(function(element) {
        let i = 1;
        // DOM SELECTORS
        let cardHeart = element.querySelector("button");
        let cardHeartValue = cardHeart.value;
        let cardCounter = element.querySelector(".card__likes");
        cardHeart.addEventListener('click', function() {
            cardHeartValueParsed = parseInt(cardHeartValue);
            let upCounters = cardHeartValueParsed + i++;
            let upCountersToString = upCounters.toString();
            cardCounter.innerHTML = upCountersToString;
            cardHeart.setAttribute("value", upCountersToString);

            // UP COUNTERS FOR TOTAL LIKES
            let totalLikes = document.querySelector(".total-likes");
            let totalLikesFstChild = document.querySelector(".total-likes").firstChild;
            let totalLikesFstChildContent = totalLikesFstChild.textContent;
            let totalLikesFstChildParsed = parseInt(totalLikesFstChildContent);
            let upTotalCounters = totalLikesFstChildParsed + 1;
            let totalCountersString = upTotalCounters.toString();
            var stringToNode = document.createTextNode(totalCountersString + " ");
            totalLikes.replaceChild(stringToNode, totalLikesFstChild);
        });
    });
});