if(!storage.has('products')) {   
    emptyCart();
}   

let products = storage.get('products');

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
    city : getElement('city').value,
    email : getElement('email').value
}

console.log(getElement('totalPrice'))

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

        storage.remove('products');
        storage.save('products', products);

        removeItemFromCart(product);

        window.location.reload;
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
        display('deliveryCosts', 'Offerts');
        getElement('deliveryCosts').style.fontWeight = 'bold';
        getElement('delivery').style.color = '#0AA32D';
        return 0
    } else {
        display('deliveryCosts', money(7500));
        return 7500
    } 
}

function displayCart(allProducts) {
    let productsInCart = filterProducts(allProducts)    
    let html = '';

    productsInCart.forEach((product) => {
        html += displayFurniture(product, 'cart')
    })  
    
    display('cartList', html + htmlButtonRemoveAll());
    displaySummary(productsInCart);
}

function displaySummary(products) {
    let total = countTotal(products);
    let totalPrice = money(total + delivery(total))

    display('productNumber', products.length);
    display('totalCart', money(total));
    display('totalPrice', totalPrice)
    storage.save('totalPrice', totalPrice)
}

function emptyCart() {
    display('cartList', emptyCartMessage());
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

function removeItemFromArray(array, id) {
    let index = array.indexOf(id);
    array.splice(index, 1);
}

function removeItemFromCart(id) { 
    let node = getElement(id);
    if(node.parentNode) {
        node.parentNode.removeChild(node)
    };
}