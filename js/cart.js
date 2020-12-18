let products = storage.get('products');

if(!storage.has('products')) {   
    emptyCart();
}   

ajax('')
.then((allProducts) => {  
    displayCart(allProducts);    
})
.then(() => {    
    products.forEach((product) => {
        addDeletion(product);
    })
        
    listenRemoveAll('removeAll');
})


//////////// FORMULAIRE

const contact = {
    firstName : getElement('firstName').value,
    lastName : getElement('lastName').value,            
    address : getElement('address').value,
    postal : getElement('postal').value,
    city : getElement('city').value,
    phone : getElement('phone').value,
    email : getElement('email').value
}

getElement('buttonSubmit').addEventListener('click', (event) => {
    event.preventDefault();
    ajax('order', optionsPost({contact, products}))
    .then((result) => {
        storage.save('orderId', result.orderId);
        document.location.href="confirmation.html"
    })
})


///////// FONCTIONS

function addDeletion(product) {
    getElement(`remove-${product}`).addEventListener('click', () => {     
        removeItemFromArray(products, product);
        refreshStorage('products');
        window.location.reload();
    })           
}

function countTotal(products) {
    let initialValue = 0;
    return products.reduce((acc, product) => 
        acc + product.price, initialValue
    )
}

function delivery(value) {
    if((value / 100) >= 1000) {
        displayHTML('deliveryCosts', 'Offerts');
        getElement('deliveryCosts').style.fontWeight = 'bold';
        getElement('delivery').style.color = '#0AA32D';
        return 0
    } else {
        displayHTML('deliveryCosts', money(7500));
        return 7500
    } 
}

function displayCart(allProducts) {
    let productsInCart = filterProducts(allProducts)   
    
    displayFurnitures(productsInCart, 'cart', 'cartList', htmlButtonRemoveAll());
    displaySummary(productsInCart);
}

function displaySummary(products) {
    let total = countTotal(products);
    let totalPrice = money(total + delivery(total))

    displayHTML('productNumber', products.length);
    displayHTML('totalCart', money(total));
    displayHTML('totalPrice', totalPrice)
    storage.save('totalPrice', totalPrice)
}

function emptyCart() {
    displayHTML('cartList', emptyCartMessage());
    changeDisplay('summary', 'none');
    changeDisplay('form', 'none');
    changeDisplay('cartTitle', 'none');
}

function emptyCartMessage() {    
    return `
        <h1 class="mb-5 text-dark font-weight-bold">Votre panier est vide</h1>
        <a class="btn btn-info" role="button" href="index.html">Continuer mes achats</a>`
}

function filterProducts(productsIds) { 
    return productsIds.filter((product) => {
        return (products.includes(product._id));
    })
}

function htmlButtonRemoveAll() {
    return `
        <div class="text-right">
            <button id="removeAll" class="btn btn-light shadow-sm">Vider le panier</button>
        </div>`        
}

function listenRemoveAll(id) {
    getElement(id).addEventListener('click', () => {
        storage.remove('products');
        emptyCart();
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

function removeItemFromArray(array, id) {
    let index = array.indexOf(id);
    array.splice(index, 1);
}