ajax(getIdFromUrl())
.then((furniture) => {
    showFurniture(furniture);
    
    listenForCartAddition();

    document.title = htmlTitle(furniture);  
});

// bloc 'Vous aimerez aussi'

ajax('')
.then((furnitures) => {
    displayCarousel(furnitures);
});


///////// FONCTIONS

function closePopup() {
    getElement('buttonClose').addEventListener('click', function() {
            changeDisplay('popUp', 'none')
        })
}

function displayCarousel(furnitures) {
    let product = '';
        
    furnitures.forEach((furniture) => {
        if(furniture._id !== getIdFromUrl()) {
        product += displayFurniture(furniture, 'carousel')
        }
    });

    display('carousel', product);
}

function htmlPopUp() {    
    return `
        <h4>L'article a été ajouté à votre panier</h4>
        <button id="buttonClose" class="border-0 btn_close text-dark pr-3"><i class="fas fa-times"></i></button>
        <hr>
        <div class="row my-5">
            <div class="col">
                <a class="btn popUp__btn" role="button" href="index.html">Continuer mes achats</a>
            </div>
            <div class="col">
                <a class="btn popUp__btn" role="button" href="cart.html">Voir mon panier</a>
            </div>
        </div>`
}

function htmlTitle(furniture) {
    return `${furniture.name} - Orinoco`
}

function htmlVarnish(varnish) {
   return `<option>${varnish}</option>`
}

function listenForCartAddition() {
    getElement('addToCart').addEventListener('click', function() {
        let products = [];

        if(storage.has('products')) {
            products = storage.get('products')
        }

        products.push(getIdFromUrl());

        storage.save('products', products);   
        openPopup();
        closePopup();
    })
}

function openPopup() {
    changeDisplay('popUp', 'flex');
    display('popUpAlert', htmlPopUp('popUp'))
}

function showFurniture(furniture) {
    display('furnitureDetails', displayFurniture(furniture, 'single'));
    displayVarnish(furniture);
}

function displayVarnish(furniture) {
    let html = '';

    furniture.varnish.forEach((varnish) => {
        html += htmlVarnish(varnish)
    });

    display('furnitureVarnish', html);
}