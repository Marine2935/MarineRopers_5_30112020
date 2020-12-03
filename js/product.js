const euro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
});

let requestProduct = new XMLHttpRequest();
requestProduct.open('GET', 'http://localhost:3000/api/furniture/5be9cc611c9d440000c1421e');
requestProduct.addEventListener('load', function() {
    if(requestProduct.status >= 200) {
        let furnitures = JSON.parse(requestProduct.responseText);
        let htmlVarnish = '';

        document.getElementById('furnitureImage').innerHTML = displayImage(furnitures);

        document.getElementById('furnitureDescription').innerHTML = displayDescription(furnitures);

        document.getElementById('furniturePrice').innerHTML = displayPrice(furnitures);

        furnitures.varnish.forEach((varnish) => {
            htmlVarnish += displayVarnish(varnish)
        });

        document.getElementById('furnitureVarnish').innerHTML = htmlVarnish;

        document.title = title(furnitures);
    }

});
requestProduct.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
requestProduct.send();



let request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/furniture');
request.addEventListener('load', function() {
    if(request.status >= 200) {
        let furnitures = JSON.parse(request.responseText);
        let product = '';
        
        furnitures.forEach((furniture) => {
            product += carousel(furniture)
        });

        document.getElementById('carouselControls').innerHTML = product +  `<a class="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
                                                                                <span class="carousel-control-prev-icon mr-5" aria-hidden="true"></span>
                                                                                <span class="sr-only">Précédent</span>
                                                                            </a>
                                                                            <a class="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
                                                                                <span class="carousel-control-next-icon ml-5" aria-hidden="true"></span>
                                                                                <span class="sr-only">Suivant</span>
                                                                            </a>`;
    }
});
request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
request.send();


//  ---------------  FONCTIONS  ---------------  //

function carousel(furniture) {
   // if(furniture._id !== furnitures._id) {
        return `<div class="col-md-2">
                    <div class="card">
                        <img src="${furniture.imageUrl}" class="d-block" height="100">
                        <div class="card-body p-3 banner_card">                            
                                <h5 class="card-title text-center banner_title mb-0">
                                    <a class="stretched-link text-dark" href="product.html?${furniture._id}">
                                        ${furniture.name}
                                    </a>
                                </h5>                            
                            <p class="card-text text-center font-weight-bold">${euro.format(furniture.price / 100)}</p>
                        </div>
                    </div>
                </div>`
    //}
}

function displayDescription(furniture) {
    return `<h2 class="text-center text-dark font-weight-bold my-4 meuble__name">${furniture.name}</h2>
            <p class="meuble__description">${furniture.description}</p>`
};

function displayImage(furniture) {
    return `<div class="card"><img src="${furniture.imageUrl}">
                <a href="${furniture.imageUrl}" data-toggle="lightbox">
                    <i class="fas fa-search-plus mr-2 mb-2 text-light icon_zoom"></i>
                </a>
            </div>`
};

function displayPrice(furniture) {
    return `<p class="text-right font-weight-bold mt-4 meuble__price">${euro.format(furniture.price / 100)}</p>`
}
function displayVarnish(varnish) {
   return `<option>${varnish}</option>`
}

function title(furniture) {
    return `${furniture.name} - Orinoco`
}