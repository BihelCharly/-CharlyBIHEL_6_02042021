function factory(object, src, title, alt, price, likes, date, tags) {

    // TITLE MODIFICATOR
    const newTitle = (function() {
        let step1 = title.slice(title.lastIndexOf('_') + 1, title.lastIndexOf('.'));
        let step2 = step1.replace(/([A-Z])/g, ' $1').trim();
        return step2;
    })();
    // CONTAINER
    let cardContainer = (function() {
        let element = document.createElement("div");
        element.className = "grid-card";
        return element;
    })();
    // LIGHTBOX
    let cardLightbox = (function() {
        let element = document.createElement("a");
        element.className = "card__photo hover-shadow cursor";
        return element;
    })();
    // TITLE
    let cardTitle = (function(newTitle) {
        let element = document.createElement("h2");
        element.className = "card__title";
        element.setAttribute("aria-label", "titre de la photo");
        element.innerHTML = newTitle;
        return element;
    })(newTitle);
    // PRICE
    let cardPrice = (function(price) {
        let element = document.createElement("p");
        element.className = "card__price";
        element.setAttribute("aria-label", "prix de la photo");
        element.innerHTML = price + "€";
        return element;
    })(price);
    // LIKES
    let cardLikes = (function() {
        let element = document.createElement("p");
        element.className = "card__likes";
        element.setAttribute("aria-label", "compteur de j'aime");
        element.innerHTML = likes;
        return element;
    })(likes);
    // HEART ICON
    let cardIcon = (function(likes) {
        let element = document.createElement("button");
        element.className = "fas fa-heart fa-xs";
        element.setAttribute("aria-label", "bouton j'aime");
        element.setAttribute("value", likes);
        return element;
    })(likes);

    // IMG
    let cardImg = (function() {
        let image = new Image();
        image.src = "./public/" + object.name + "/" + src;
        image.className = "card__photo";
        image.title = newTitle;
        image.alt = newTitle;
        image.date = date;
        return image;
    })();

    // ADD ELEMENT INTO THE DOM
    createNewCard(cardContainer, cardLightbox, cardTitle, cardPrice, cardLikes, cardIcon, cardImg);

    function createNewCard(container, lightbox, title, price, likes, icon, img) {
        lightbox.append(img);
        container.append(lightbox);
        container.append(title);
        container.append(price);
        container.append(likes);
        container.append(icon);
        gridGallery.appendChild(container);
    }

    return {
        src,
        title,
        alt,
        price,
        likes,
        date,
        tags
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