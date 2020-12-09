ajax(getIdFromUrl())
.then((furniture) => {
    let htmlVarnish = '';

    document.title = title(furniture);

    display('furnitureDetails', displayFurniture(furniture, 'single'));

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
        document.getElementById('popUp').style.display = 'flex';
        display('popUpAlert', displayPopUp('popUp'))
        document.getElementById('buttonClose').addEventListener('click', function() {
            displayNone('popUp')
        })
    })
});

function displayPopUp() {    
    return `
        <h4>L'article a été ajouté à votre panier</h4>
        <button id="buttonClose" class="border-0 btn_close text-dark pr-3"><i class="fas fa-times"></i></button>
        <hr>
        <div class="row my-5">
            <div class="col">
                <a class="btn btn-info" role="button" href="index.html">Continuer mes achats</a>
            </div>
            <div class="col text-right">
                <a class="btn btn-info" role="button" href="cart.html">Voir mon panier</a>
            </div>
        </div>`
}

// bloc 'Vous aimerez aussi'

ajax('')
.then((furnitures) => {
    let product = '';
        
    furnitures.forEach((furniture) => {
        if(furniture._id !== getIdFromUrl()) {
        product += displayFurniture(furniture, 'carousel')
        }
    });

    display('carouselControls', product);
});


//  ---------------  FONCTIONS  ---------------  //

function displayVarnish(varnish) {
   return `<option>${varnish}</option>`
}

function title(furniture) {
    return `${furniture.name} - Orinoco`
}