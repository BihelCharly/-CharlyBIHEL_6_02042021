function factory(object, source, price, likes, date, tags) {

    // TITLE MAKER
    const newTitle = (function() {
        let step1 = source.slice(source.lastIndexOf('_') + 1, source.lastIndexOf('.'));
        let step2 = step1.replace(/([A-Z])/g, ' $1').trim();
        let step3 = step2.charAt(0).toUpperCase() + step2.slice(1);
        return step3;
    })();
    // CONTAINER
    const cardContainer = (function() {
        let element = document.createElement('div');
        element.className = 'grid-card';
        return element;
    })();
    // LIGHTBOX
    const cardLightbox = (function() {
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
        let element = document.createElement('button');
        element.setAttribute('value', likes);
        element.setAttribute('aria-label', "bouton j'aime");
        element.className = 'fas fa-heart fa-xs';
        return element;
    })(likes);
    // IMG
    const cardImage = (function(object, source) {
        let image = new Image();
        image.src = './public/' + object.name + '/' + source;
        image.className = 'card__photo';
        image.title = newTitle;
        image.alt = newTitle;
        image.date = date;
        return image;
    })(object, source);
    // VIDEO
    const cardVideo = (function(object, source) {
        let video = document.createElement('video');
        video.setAttribute('preload', 'none');
        video.src = './public/' + object.name + '/' + source;
        video.className = 'card__photo card__video hover-shadow cursor';
        video.poster = video.src.split('.')[0] + '.jpg';
        video.controls = false;
        video.title = newTitle;
        video.date = date;

        return video;
    })(object, source);

    //RETURNED
    return {
        cardContainer,
        cardLightbox,
        cardTitle,
        cardPrice,
        cardLikes,
        cardIcon,
        cardImage,
        cardVideo
    };
}