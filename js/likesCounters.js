function likesCounters() {
    // DOM SELECTORS
    let gridCard = document.querySelectorAll(".grid-card");

    gridCard.forEach(function(element) {
        let i = 1;
        // DOM SELECTORS
        let cardHeart = element.querySelector("button");
        let cardHeartValue = cardHeart.value;
        let cardCounter = element.querySelector(".card__likes");
        cardHeart.addEventListener('click', function() {

            // UP COUNTERS FOR HIMSELF
            cardHeartValueParsed = parseInt(cardHeartValue);
            let upCounters = cardHeartValueParsed + i++;
            let upCountersToString = upCounters.toString();
            cardCounter.innerHTML = upCountersToString;
            cardHeart.setAttribute("value", upCountersToString);
            // UP COUNTERS FOR TOTAL LIKES
            //DOM ELEMENTS
            let totalLikes = document.querySelector(".total-likes");
            let totalLikesFstChild = document.querySelector(".total-likes").firstChild;
            let totalLikesFstChildContent = totalLikesFstChild.textContent;
            let totalLikesFstChildParsed = parseInt(totalLikesFstChildContent);
            let upTotalCounters = totalLikesFstChildParsed + 1;
            let totalCountersString = upTotalCounters.toString();
            var stringToNode = document.createTextNode(totalCountersString);
            totalLikes.replaceChild(stringToNode, totalLikesFstChild);
        });
    });
}