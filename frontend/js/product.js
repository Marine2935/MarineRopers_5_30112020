let product = {
    _id : getIdFromUrl('id')
};

ajax('')
.then((furnitures) => {
    // On récupère le produit concerné de la requête GET grâce à l'id venant de l'url.
    let furnitureId = ''
    furnitures.forEach((furniture) => {
        if (furniture._id === product._id) {
            return furnitureId = furniture;
        }
    });
    
    document.title = htmlTitle(furnitureId);
    showFurniture(furnitureId);
    displayCarousel(furnitures);

    listenForZoom();  
    listenIncrease();
    listenReduce();
    listenForCartAddition();      
    
    // Stockage des informations du produit dans l'objet 'product'.
    product.name = furnitureId.name;
    product.price = furnitureId.price;
    product.imageUrl = furnitureId.imageUrl;
});

displayItemsInCart();



function closePopup() {
    getElement('buttonClose').addEventListener('click', function() {
        changeDisplay('popUp', 'none');
    })
}

function displayCarousel(furnitures) {
    let product = '';
    let i = 0;

    //La boucle permet d'afficher les autres produits proposés sur le site dans la limite de 4 affichés.
    while (i < 4) {
        for (let furniture of furnitures) {
            if (furniture._id !== getIdFromUrl('id')) {
                i ++;
                product += htmlFurniture(furniture, 'carousel'); 

                if (i === 4) {
                    break
                }  
            } 
        }
    };

    displayHTML('carousel', product);
}

function htmlImagePopup() {
    return `  
        <button id="buttonClose" class="border-0 btn_close text-dark pr-3">
            <i class="fas fa-times"></i>
        </button>    
        <img src="${product.imageUrl}" class="popUp__container__image">`
}

function htmlPopUp(type) {    
    if (type == 'alert') {
        return `
            <div class="popUp__alert rounded pt-5 px-2 p-md-5">
                <h5>L'article a été ajouté à votre panier</h5>
                <button id="buttonClose" class="border-0 btn_close text-dark pr-3">
                    <i class="fas fa-times"></i>
                </button>
                <hr>
                <div class="row mt-5 mb-5 mb-md-0 justify-content-around">
                    <div class="col-12 col-md-6 mb-3 mb-md-0">
                        <a class="btn popUp__btn shadow" role="button" href="index.html">Continuer mes achats</a>
                    </div>
                    <div class="col-12 col-md-5">
                        <a class="btn popUp__btn shadow" role="button" href="cart.html">Voir mon panier</a>
                    </div>
                </div>
            </div>`
    }

    if (type == 'image') {
        return `
            <div id="popUpImage" class="popUp__container"></div>`
    }
}

function htmlTitle(furniture) {
    return `${furniture.name} - Orinoco`
}

function htmlVarnish(varnish) {
   return `<option>${varnish}</option>`
}

function listenForCartAddition() {
    getElement('addToCart').addEventListener('click', () => {
        let products = [];
        let input = getElement('inputQuantity');

        product.quantity = input.valueAsNumber;

        if (storage.has('products')) {
            products = storage.get('products');
            products.forEach((item) => {
                if (item._id === product._id) {                    
                    product.quantity = input.valueAsNumber + item.quantity;
                    removeItemFromArray(products, item)
                }
            })            
        };

        products.push(product); 
        storage.save('products', products);   
        openPopup('alert');
        closePopup();
    })
}

function listenForZoom() {
    getElement('buttonZoom').addEventListener('click', () => {
        openPopup('image');        
        displayHTML('popUpImage', htmlImagePopup());
        closePopup();
    })
}

function listenIncrease() {
    getElement('increaseButton').addEventListener('click', () => {
        let input = getElement('inputQuantity');

        input.setAttribute('value', input.value++);
    })
}

function listenReduce() {
    getElement('reduceButton').addEventListener('click', () => {
        let input = getElement('inputQuantity');

        if (input.value > 1) {
            input.setAttribute('value', input.value--)
        }
    })
}

function openPopup(type) {
    changeDisplay('popUp', 'flex');
    displayHTML('popUp', htmlPopUp(type));    
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

    displayHTML('furnitureVarnish', `<option selected>Choix de vernis</option>` + html);
}