function Factory(object, media, price, likes, date, tags) {

    // STEP 1 - RETURN IF IMG/VIDEO IN MEDIA PARAMETER
    this.mediaType = (function(media) {
        if (media.hasOwnProperty('image')) {
            let mediaPath = media.image;
            let mediaProfil = 'image';
            return [mediaPath, mediaProfil];
        } else if (media.hasOwnProperty('video')) {
            let mediaPath = media.video;
            let mediaProfil = 'video';
            return [mediaPath, mediaProfil];
        }
    })(media);

    // STEP 2 - CREATE TITLE FROM MEDIA
    const newTitle = (function(mediaType) {
        let step1 = mediaType[0].slice(mediaType[0].lastIndexOf('_') + 1, mediaType[0].lastIndexOf('.'));
        let step2 = step1.replace(/([A-Z])/g, ' $1').trim();
        let step3 = step2.charAt(0).toUpperCase() + step2.slice(1);
        return step3;
    })(mediaType);

    // STEP 3 - CREATE CARD TYPE FROM MEDIA TYPE
    const cardMedia = (function() {
        this.cardMediaType = ((mediaType) => {
            if (mediaType[1] == 'image') {
                let mediaImage = document.createElement('img');
                mediaImage.src = './public/' + object.name + '/' + mediaType[0];
                return mediaImage;
            } else if (mediaType[1] == 'video') {
                let mediaVideo = document.createElement('video');
                mediaVideo.src = './public/' + object.name + '/' + mediaType[0];
                mediaVideo.poster = './public/' + object.name + '/' + mediaType[0].split('.')[0] + '.jpg';
                mediaVideo.setAttribute('preload', 'none');
                return mediaVideo;
            }
        })(mediaType);
        cardMediaType.className = 'card__photo hover-shadow cursor';
        cardMediaType.title = newTitle;
        cardMediaType.alt = newTitle;
        cardMediaType.date = date;
        return cardMediaType;
    })();

    // STEP 4 - HTML ARCHITECTURE
    // CONTAINER
    const cardContainer = (() => {
        let element = document.createElement('div');
        element.className = 'grid-card';
        return element;
    })();
    // LIGHTBOX
    const cardLightbox = (() => {
        let element = document.createElement('a');
        element.className = 'card__photo hover-shadow cursor';
        return element;
    })();
    // TITLE
    const cardTitle = (function(newTitle) {
        let element = document.createElement('h2');
        element.className = 'card__title';
        element.innerHTML = newTitle;
        return element;
    })(newTitle);
    // PRICE
    const cardPrice = (function(price) {
        let element = document.createElement('p');
        element.className = 'card__price';
        element.innerHTML = price + '€';
        return element;
    })(price);
    // LIKES
    const cardLikes = (function(likes) {
        let element = document.createElement('p');
        element.setAttribute('aria-label', "compteur de j'aime");
        element.className = 'card__likes';
        element.innerHTML = likes;
        return element;
    })(likes);
    // HEART ICON
    const cardIcon = (function(likes) {
        element = document.createElement('button');
        element.setAttribute('value', likes);
        element.setAttribute('aria-label', "bouton j'aime");
        element.className = 'fas fa-heart fa-xs';
        return element;
    })(likes);

    return {
        cardMedia,
        cardContainer,
        cardLightbox,
        cardTitle,
        cardPrice,
        cardLikes,
        cardIcon
    };
}

// APPEND ELEMENT TROUGHT THE DOM
function createNewCard(media, container, lightbox, title, price, likes, icon) {
    lightbox.append(media);
    container.append(lightbox);
    container.append(title);
    container.append(price);
    container.append(likes);
    container.append(icon);
    gridGallery.appendChild(container);
}