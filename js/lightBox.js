function lightBox() {

    let body = document.querySelector("body");
    let lightBox = document.querySelector(".modal-lightbox");
    let closeLightBox = document.querySelector(".close");
    let lightBoxImg = document.querySelector(".lightbox__photo");
    let lightBoxTxt = document.querySelector(".lightbox__caption");
    let lightBoxPrev = document.querySelector(".prev");
    let lightBoxNext = document.querySelector(".next");
    let lightBoxArrows = document.querySelectorAll(".lightbox-content a");
    let galeryPhotos = document.querySelectorAll(".grid-card a");

    function cleanElements() {
        lightBoxImg.innerHTML = "";
        lightBoxTxt.innerHTML = "";
    }

    closeLightBox.addEventListener("click", function() {
        cleanElements();
        lightBox.style = "display:none";
        body.style = "overflow-y: visible;overflow-x: visible;";
    });

    galeryPhotos.forEach(item => item.addEventListener('click', pushToLightBox));

    function pushToLightBox() {
        cleanElements();
        let cloneNode = this.lastChild.cloneNode(true);
        lightBoxImg.append(cloneNode);
        lightBoxTxt.innerHTML = this.lastChild.title;
        lightBox.style = "display:block";
        body.style = "overflow-y: hidden;overflow-x: hidden;";
    }

    function findNextSlide() {
        let collection = gridGallery.children;
        for (i = 0; i < collection.length; i++) {
            if (collection[i].firstChild.firstChild.title == lightBoxTxt.textContent) {
                let prevNode = collection[i].previousSibling.firstChild;
                let nextNode = collection[i].nextSibling.firstChild;
                let state = result(prevNode);
                if (state == true) {
                    let prevClonedNode = prevNode.firstChild.cloneNode(true);
                    let nextClonedNode = nextNode.firstChild.cloneNode(true);
                    return [prevClonedNode, nextClonedNode];
                } else {
                    console.log("error");
                }
            }
        }
    }

    function result(test) {
        if (test !== null || test !== undefined) {
            return true;
        } else {
            return false;
        }
    }


    lightBoxArrows.forEach((event) => event.addEventListener("click", showNewSlide));

    function showNewSlide(target) {
        let arrow = target.originalTarget.className;
        if (arrow == "prev") {
            let newSlide = findNextSlide()[0];
            cleanElements();
            lightBoxImg.append(newSlide);
            lightBoxTxt.innerHTML = newSlide.title;
        } else if (arrow == "next") {
            let newSlide = findNextSlide()[1];
            cleanElements();
            lightBoxImg.append(newSlide);
            lightBoxTxt.innerHTML = newSlide.title;
        }
    }
}