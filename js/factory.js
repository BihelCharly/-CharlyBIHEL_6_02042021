function factory(object, src, price, likes, date, tags) {

    // TITLE MODIFICATOR
    const newTitle = (function() {
        let step1 = src.slice(src.lastIndexOf('_') + 1, src.lastIndexOf('.'));
        let step2 = step1.replace(/([A-Z])/g, ' $1').trim();
        return step2;
    })();
    // CONTAINER
    const cardContainer = (function() {
        let element = document.createElement("div");
        element.className = "grid-card";
        return element;
    })();
    // LIGHTBOX
    const cardLightbox = (function() {
        let element = document.createElement("a");
        element.className = "card__photo hover-shadow cursor";
        return element;
    })();
    // TITLE
    const cardTitle = (function(newTitle) {
        let element = document.createElement("h2");
        element.className = "card__title";
        element.setAttribute("aria-label", "titre de la photo");
        element.innerHTML = newTitle;
        return element;
    })(newTitle);
    // PRICE
    const cardPrice = (function(price) {
        let element = document.createElement("p");
        element.className = "card__price";
        element.setAttribute("aria-label", "prix de la photo");
        element.innerHTML = price + "€";
        return element;
    })(price);
    // LIKES
    const cardLikes = (function() {
        let element = document.createElement("p");
        element.className = "card__likes";
        element.setAttribute("aria-label", "compteur de j'aime");
        element.innerHTML = likes;
        return element;
    })(likes);
    // HEART ICON
    const cardIcon = (function(likes) {
        let element = document.createElement("button");
        element.className = "fas fa-heart fa-xs";
        element.setAttribute("aria-label", "bouton j'aime");
        element.setAttribute("value", likes);
        return element;
    })(likes);
    // IMG
    const cardImg = (function() {
        let image = new Image();
        image.src = "./public/" + object.name + "/" + src;
        image.className = "card__photo";
        image.title = newTitle;
        image.alt = newTitle;
        image.date = date;
        return image;
    })();

    return {
        newTitle,
        cardContainer,
        cardLightbox,
        cardTitle,
        cardPrice,
        cardLikes,
        cardIcon,
        cardImg
    };
}



// const mediaType = src.split('.')[1];

// switch (mediaType) {
//     case "jpg":
//         createImg();
//         break;
//     case "mp4":
//         createVideo();
//         break;
// }