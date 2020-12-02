let requestProduct = new XMLHttpRequest();
requestProduct.open('GET', 'http://localhost:3000/api/furniture/5be9cc611c9d440000c1421e');
requestProduct.addEventListener('load', function() {
    if(requestProduct.status >= 200) {
        let furnitures = JSON.parse(requestProduct.responseText);
        let htmlVarnish = '';
        console.log(requestProduct.responseText);

        

        document.getElementById('furnitureImage').innerHTML = displayImage(furnitures);

        document.getElementById('furnitureDescription').innerHTML = displayDescription(furnitures);

        document.getElementById('furniturePrice').innerHTML = displayPrice(furnitures);

        furnitures.varnish.forEach((varnish) => {
            htmlVarnish += displayVarnish(varnish)
        });

        document.getElementById('furnitureVarnish').innerHTML = htmlVarnish;
    }

});
requestProduct.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
requestProduct.send();

//  ---------------  FONCTIONS  ---------------  //

function displayDescription(furniture) {
    return `<h2 class="text-center my-3 meuble__name">${furniture.name}</h2>
            <p class="meuble__description">${furniture.description}</p>`
};

function displayImage(furniture) {
    return `<div class="card"><img src="${furniture.imageUrl}"></div>`
};

function displayPrice(furniture) {
    return `<p class="text-right meuble__price">${furniture.price}€</p>`
}
function displayVarnish(varnish) {
   return `<option>${varnish}</option>`
}