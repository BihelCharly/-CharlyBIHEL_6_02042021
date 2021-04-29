 // ADD EVERYTHING A VIDEO NEED FROM JSON
 // CREATE NEW CARD
 let card = document.createElement("div");
 card.className = "grid-card";
 // LIGHTBOX
 let cardLightBox = document.createElement("a");
 cardLightBox.className = "card__photo hover-shadow cursor";
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
 // CREATE VIDEO ELEMENT
 let newVideo = document.createElement("video");
 newVideo.className = "card__photo card__video hover-shadow cursor";
 // FOR VIDEO ATTRIBUTES => NOPRELOAD+POSTERIMG
 let photographerImgFolder = "./public/" + photographer.name;
 let slicedTitle = element.video.slice(element.video.lastIndexOf('_') + 1, element.video.lastIndexOf('.'));
 let perfectTitle = slicedTitle.replace(/([A-Z])/g, ' $1').trim();
 newVideo.src = photographerImgFolder + "/" + element.video;
 newVideo.setAttribute("preload", "none");
 newVideo.poster = newVideo.src.split('.')[0] + ".jpg";
 newVideo.controls = false;
 newVideo.date = element.date;
 newVideo.title = perfectTitle.charAt(0).toUpperCase() + perfectTitle.slice(1);
 cardTitle.innerHTML = perfectTitle.charAt(0).toUpperCase() + perfectTitle.slice(1);
 cardPrice.innerHTML = element.price + "€";
 cardLikes.innerHTML = element.likes;
 // ADD VIDEO => DOM
 cardLightBox.append(newVideo);
 card.append(cardLightBox);
 card.append(cardTitle);
 card.append(cardPrice);
 card.append(cardLikes);
 card.append(cardIconHeart);
 gridGallery.appendChild(card);