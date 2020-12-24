if(!storage.has('products')) {   
    emptyCart();
}   

let products = storage.get('products');
let totalPrice = 0;

displayCart(products);
displayItemsInCart();

products.forEach((product) => {
    listenForDeletion(product._id);
    listenForLessQuantity(product._id);
    listenForMoreQuantity(product._id);
});   
listenRemoveAll('removeAll');
listenForCartSubmission();



///////// FONCTIONS

function listenForDeletion(productId) {
    getElement(`remove-${productId}`).addEventListener('click', () => {     
        removeItemFromArray(products, productId);
        refreshStorage('products');
        window.location.reload();
    })           
}

function countTotal(products) {
    let initialValue = 0;
    return products.reduce((acc, product) => 
        acc + product.price * product.quantity, initialValue
    )
}

function delivery(value) {
    if((value / 100) >= 1000) {
        displayHTML('deliveryCosts', 'OFFERTS');
        getElement('deliveryCosts').style.fontWeight = 'bold';
        getElement('delivery').style.color = '#0AA32D';
        return 0
    } else {
        displayHTML('deliveryCosts', money(7500));
        return 7500
    } 
}

function displayCart(products) {
    displayFurnitures(products, 'cart', 'cartList', htmlButtonRemoveAll());
    displaySummary(products);
}

function displaySummary(products) {
    let total = countTotal(products);
    totalPrice = money(total + delivery(total))

    displayHTML('productNumber', countArticles());
    displayHTML('totalCart', money(total));
    displayHTML('totalPrice', totalPrice)
}

function emptyCart() {
    displayHTML('emptyCart', emptyCartMessage());
    changeDisplay('cart', 'none');
}

function emptyCartMessage() {    
    return `
        <h1 class="mb-5 text-dark font-weight-bold">Votre panier est vide</h1>
        <a class="btn btn-info" role="button" href="index.html">Continuer mes achats</a>`
}

function htmlButtonRemoveAll() {
    return `
        <div class="text-right">
            <button id="removeAll" class="btn btn-light shadow-sm">Vider le panier</button>
        </div>`        
}

function listenForCartSubmission() {    
    getElement('buttonSubmit').addEventListener('click', (event) => {
        event.preventDefault();
        const contact = {
            firstName : getElement('firstName').value,
            lastName : getElement('lastName').value,            
            address : getElement('address').value,
            postal : getElement('postal').value,
            city : getElement('city').value,
            phone : getElement('phone').value,
            email : getElement('email').value
        }    
        

        ajax('order', optionsPost({contact, products}))
        .then((result) => {
            storage.remove('products');
            document.location.href=`confirmation.html?order_id=${result.orderId}&total=${totalPrice}`
        })
    })
}

function listenForLessQuantity(productId) {
    getElement(`less-${productId}`).addEventListener('click', () => {
        let input = getElement(`inputQuantity-${productId}`);

        products.forEach((item) => {
            if(item._id === productId && input.value > 1) {
                item.quantity--
            }
        })
        storage.save('products', products);
        window.location.reload();
    })
}

function listenForMoreQuantity(productId) {
    getElement(`more-${productId}`).addEventListener('click', () => {
        products.forEach((item) => {
            if(item._id === productId) {
                item.quantity++
            }
        })
        storage.save('products', products); 
        window.location.reload();
    })
}

function listenRemoveAll(id) {
    getElement(id).addEventListener('click', () => {
        storage.remove('products');
        emptyCart();
        displayItemsInCart();
    })
}

function optionsPost(object) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    }
}

function refreshStorage(name) {
    storage.remove(name);
    if(products.length !== 0) {
        storage.save(name, products);
    } 
}