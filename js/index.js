

let request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/furniture');
request.addEventListener('load', function() {
    if(request.status >= 200) {
        let furnitures = JSON.parse(request.responseText);
        let html = '';
        
        furnitures.forEach((furniture) => {
            html += displayMeuble(furniture);
        });
        document.getElementById('furnitureList').innerHTML = html;
    }
});
request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
request.send();

//  ---------------  FONCTIONS  ---------------  //

function displayMeuble(furniture) {
    return `<div class="col-12 col-md-6 col-lg-4">
                <div class="card my-4 shadow-sm">
                    <img src="${furniture.imageUrl}" height="300">
                    <a class="stretched-link text-dark" href="product.html?${furniture._id}"><h2 class="text-center my-3 meuble__name">${furniture.name}</h2></a>
                    <p class="meuble__description">${furniture.description}</p>
                    <p class="text-right meuble__price">${furniture.price}€</p>
                </div>
            </div>`
};

