let product = {
    id : getIdFromUrl(),
    quantity : 1
}

ajax(getIdFromUrl())
.then((furniture) => {
    showFurniture(furniture);    
    listenForCartAddition();
    document.title = htmlTitle(furniture);  
    product.name = furniture.name;
    product.price = furniture.price;
    product.imageUrl = furniture.imageUrl
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
        product += htmlFurniture(furniture, 'carousel')
        }
    });

    displayHTML('carousel', product);
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
            products = storage.get('products');
            products.forEach((item) => {
                if(item.id === product.id) {
                    item.quantity++
                }
                if(item.id !== product.id) {
                    products.push(product);
                }
            })            
        }    
        else {
            products.push(product);
        }

        storage.save('products', products);   
        openPopup();
        closePopup();
    })
}

function openPopup() {
    changeDisplay('popUp', 'flex');
    displayHTML('popUpAlert', htmlPopUp('popUp'))
}

function showFurniture(furniture) {
    displayHTML('furnitureDetails', htmlFurniture(furniture, 'single'));
    displayVarnish(furniture);
}

function displayVarnish(furniture) {
    let html = '';

    furniture.varnish.forEach((varnish) => {
        html += htmlVarnish(varnish)
    });

    displayHTML('furnitureVarnish', html);
}