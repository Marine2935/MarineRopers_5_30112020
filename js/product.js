let product = {
    _id : getIdFromUrl('id')
}

ajax(getIdFromUrl('id'))
.then((furniture) => {
    showFurniture(furniture);  
    listenIncrease();
    listenReduce();
    listenForCartAddition();
    document.title = htmlTitle(furniture);  
    product.name = furniture.name;
    product.price = furniture.price;
    product.imageUrl = furniture.imageUrl;
});
displayItemsInCart();


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
    let i = 0;

    while(i < 4) {
        for(let furniture of furnitures) {
            if(furniture._id !== getIdFromUrl('id')) {
                i ++;
                product += htmlFurniture(furniture, 'carousel'); 
                if(i === 4) {
                    break
                }  
            } 
        }
    }
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
    getElement('addToCart').addEventListener('click', () => {
        let products = [];
        let input = getElement('inputQuantity');

        product.quantity = input.valueAsNumber;

        if(storage.has('products')) {
            products = storage.get('products');
            products.forEach((item) => {
                if(item._id === product._id) {                    
                    product.quantity = input.valueAsNumber + item.quantity
                    removeItemFromArray(products, item)
                }
            })            
        }
        products.push(product);       

        storage.save('products', products);   
        openPopup();
        closePopup();
    })
}

function listenIncrease() {
    getElement('increaseButton').addEventListener('click', () => {
        let input = getElement('inputQuantity');
        input.setAttribute('value', input.value++)
    })
}

function listenReduce() {
    getElement('reduceButton').addEventListener('click', () => {
        let input = getElement('inputQuantity');
        if(input.value > 1) {
            input.setAttribute('value', input.value--)
        }
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

    displayHTML('furnitureVarnish', `<option selected>Choix de vernis</option>` + html);
}