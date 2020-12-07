ajax(getIdFromUrl())
.then((furniture) => {
    let htmlVarnish = '';

    document.title = title(furniture);

    display('furnitureDetails', displayMeuble(furniture, 'single'));

    furniture.varnish.forEach((varnish) => {
        htmlVarnish += displayVarnish(varnish)
    });

    display('furnitureVarnish', htmlVarnish);

    document.getElementById('addToCart').addEventListener('click', function() {
        let products = [];

        if(isStored('products')) {
            products = get('products')
        }

        products.push(getIdFromUrl());

        save('products', products);        
    })
});

// bloc 'Vous aimerez aussi'

ajax('')
.then((furnitures) => {
    let product = '';
        
    furnitures.forEach((furniture) => {
        if(furniture._id !== getIdFromUrl()) {
        product += carousel(furniture)
        }
    });

    display('carouselControls', product +  `<a class="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Précédent</span>
                                            </a>
                                            <a class="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Suivant</span>
                                            </a>`);
});


//  ---------------  FONCTIONS  ---------------  //

function carousel(furniture) {
   // if(furniture._id !== furnitures._id) {
        return `<div class="col-4 col-md-3 col-lg-2">
                    <div class="card">
                        <img src="${furniture.imageUrl}" class="d-block" height="100">
                        <div class="card-body p-3 banner_card">                            
                                <h5 class="card-title text-center banner_title mb-0">
                                    <a class="stretched-link text-dark" href="product.html?id=${furniture._id}">
                                        ${furniture.name}
                                    </a>
                                </h5>                            
                            <p class="card-text text-center font-weight-bold">${euro.format(furniture.price / 100)}</p>
                        </div>
                    </div>
                </div>`
    //}
}

function displayVarnish(varnish) {
   return `<option>${varnish}</option>`
}

function title(furniture) {
    return `${furniture.name} - Orinoco`
}