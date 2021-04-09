// DOM SELECTORS
let photographerName = document.querySelector(".photographer-description h1");
let photographerCity = document.querySelector(".photographer-description h2");
let photographerHook = document.querySelector(".photographer-description p");
let photographerTags = document.querySelector(".photographer-description .tag-list");
let photographerPhoto = document.querySelector(".photographer-description .photographer__photo");


// GET JSON
function loadJSON(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("/application/json");
    xobj.open('GET', './js/_photographers.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

// INJECTIONS
loadJSON(function(json) {
    // page title
    window.document.title = "FishEye - " + json[0].name;
    // add name
    photographerName.innerHTML = json[0].name;
    // add city
    photographerCity.innerHTML = json[0].city;
    // add hook
    photographerHook.innerHTML = json[0].hook;
    // add tags
    json[0].tags.forEach(element => {
        let createTag = '<li class="tag--static">' + element + '</li>';
        photographerTags.insertAdjacentHTML("beforeend", createTag);
    });
    // add photo
    photographerPhoto.src = './public/ID/' + json[0].photo + '.jpg';
    photographerPhoto.title = 'Photo de profil de ' + json[0].name;
    photographerPhoto.alt = 'Photo de profil de ' + json[0].name;
});