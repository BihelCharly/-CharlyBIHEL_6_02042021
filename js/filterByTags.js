function filterByTags() {

    // DOM SELECTORS
    const navTags = document.querySelectorAll(".tag-list button");
    const photographersCards = document.querySelectorAll(".cards-block .cards");

    // FOR EACH ELEMENTS IN NAV
    navTags.forEach(item => {
        item.addEventListener('click', event => {
            // IF ELEMENT IS ALREADY ACTIVE WE DELETE IT
            if (item.className.match('tag--active')) {
                item.classList.remove('tag--active');
                photographersCards.forEach(function(item) {
                    if (window.getComputedStyle(item).display === "none") {
                        item.style.display = "block";
                    }
                });
                // IF IS NOT
            } else {
                // 1ST : WE DELETE THE OLD ONE
                navTags.forEach(function(item) {
                    item.classList.remove('tag--active');
                });
                // 2ND : WE ACTIVE THIS ONE
                item.classList.add('tag--active');
                // 3RD : WE TAKE THE VALUE FROM THE NEW ONE
                let value = item.value;
                // 4TH : WE SEARCH IN EACH CARD
                photographersCards.forEach(function(item) {
                    // FROM THE LI
                    let tagLists = item.querySelectorAll("button");
                    let array = [];
                    // LOOP TO FIND SAME VALUE FROM THE NAVTAG TO THE CARD
                    for (let i = 0; i < tagLists.length; i++) {
                        array.push(tagLists[i].innerHTML);
                        if (array.includes("#" + value)) {
                            // IF IT MATCHS THEN SHOW IT
                            console.log(item);
                            item.style = "display: block";
                        } else {
                            // OTHERWISE HIDE IT
                            item.style = "display: none";
                        }
                    }
                });
            }
        });
    });
}