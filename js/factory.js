function Factory(object, media, price, likes, date) {

    // STEP 1 - CREATE OBJ TYPE FROM MEDIA
    this.createMediaType = function(media) {
        let type;
        if (media.hasOwnProperty('image')) {
            type = new MediaImage();
        } else if (media.hasOwnProperty('video')) {
            type = new MediaVideo();
        }
        return type;
    };
    // FOR IMAGE
    const MediaImage = function() {
        this.profil = 'image';
        this.path = media.image;
    };
    // FOR VIDEO
    const MediaVideo = function() {
        this.profil = 'video';
        this.path = media.video;
    };
    // SOURCE & MEDIA TYPE
    const mediaPath = createMediaType(media).path;
    const mediaProfil = createMediaType(media).profil;

    // STEP 2 - CREATE TITLE FROM MEDIA
    this.newTitle = (function(mediaPath) {
        let step1 = mediaPath.slice(mediaPath.lastIndexOf('_') + 1, mediaPath.lastIndexOf('.'));
        let step2 = step1.replace(/([A-Z])/g, ' $1').trim();
        let step3 = step2.charAt(0).toUpperCase() + step2.slice(1);
        return step3;
    })(mediaPath);

    // STEP 3 - CREATE CARD TYPE FROM MEDIA TYPE
    this.cardMedia = (() => {
        const cardMediaType = ((mediaProfil) => {
            if (mediaProfil == 'image') {
                let mediaImage = document.createElement('img');
                mediaImage.src = './public/' + object.name + '/' + mediaPath;
                return mediaImage;
            } else if (mediaProfil == 'video') {
                let mediaVideo = document.createElement('video');
                mediaVideo.src = './public/' + object.name + '/' + mediaPath;
                mediaVideo.poster = './public/' + object.name + '/' + mediaPath.split('.')[0] + '.jpg';
                mediaVideo.setAttribute('preload', 'none');
                return mediaVideo;
            }
        })(mediaProfil);
        // ATTRIBUTES SHARED BY BOTH MEDIA
        cardMediaType.className = 'card__photo hover-shadow cursor';
        cardMediaType.title = newTitle;
        cardMediaType.alt = newTitle;
        cardMediaType.date = date;
        return cardMediaType;
    })();

    // STEP 4 - HTML
    // CONTAINER
    this.cardContainer = (() => {
        let element = document.createElement('div');
        element.className = 'grid-card';
        return element;
    })();
    // LIGHTBOX
    this.cardLightbox = (() => {
        let element = document.createElement('a');
        element.setAttribute('tabindex', '10');
        element.className = 'card__photo hover-shadow cursor';
        return element;
    })();
    // TITLE
    this.cardTitle = (function(newTitle) {
        let element = document.createElement('h2');
        element.setAttribute('tabindex', '11');
        element.className = 'card__title';
        element.innerHTML = newTitle;
        return element;
    })(newTitle);
    // PRICE
    this.cardPrice = (function(price) {
        let element = document.createElement('p');
        element.className = 'card__price';
        element.innerHTML = price + '€';
        return element;
    })(price);
    // LIKES
    this.cardLikes = (function(likes) {
        let element = document.createElement('p');
        element.setAttribute('tabindex', '12');
        element.className = 'card__likes';
        element.innerHTML = likes;
        return element;
    })(likes);
    // HEART ICON
    this.cardIcon = (function(likes) {
        element = document.createElement('button');
        element.className = 'fas fa-heart fa-xs';
        element.setAttribute('tabindex', '13');
        element.setAttribute('value', likes);
        element.setAttribute('aria-label', "bouton j'aime");
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