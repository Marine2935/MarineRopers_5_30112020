    let htmlCart = '';
    let total = 0;

if(isStored('products')) {    
    let idProduct = get('products');      
    
    displayCart(idProduct);

    new Promise(() => {
       setTimeout(() => {
           document.querySelectorAll('.btn_remove').forEach(button => {
                button.addEventListener('click', function() {   
                console.log('clic')        
                let index = idProduct.indexOf(this.dataset.id);
                console.log(this.dataset.id);
                idProduct.splice(index, 1);
                console.log(idProduct)
                localStorage.removeItem('products');
                save('products', idProduct)
                let node = document.getElementById(this.dataset.id)
                if(node.parentNode) {
                   node.parentNode.removeChild(node)
                }
                htmlCart= '';
                total = 0;
                displayCart(idProduct)
                display('productNumber', idProduct.length);
           })           
       })
    }, 1000)
})

display('productNumber', idProduct.length);

} else {    
    emptyCart();
}

let removeAll = document.getElementById('removeAll');
removeAll.addEventListener('click', function() {
    localStorage.removeItem('products');
    emptyCart();
})

function displayCart(array) {
    array.forEach((idProduct) => {
        ajax(idProduct)
        .then((product) => {
            htmlCart += displayFurniture(product, 'cart'); 
            display('cartList', htmlCart);

            total += product.price;
            display('totalCart', euro.format(total/100))
            
            delivery(total)
                    
        })
    })   
}

function delivery(value) {
    if((value / 100) >= 1000) {
        display('deliveryCosts', 'Offerts');
        document.getElementById('deliveryCosts').style.fontWeight = 'bold';
        document.getElementById('delivery').style.color = '#0AA32D';
        display('total', euro.format(total/100))
    } else {
        display('deliveryCosts', euro.format(75));
        display('total', euro.format(total/100 + 75))
    } 
}

function emptyCart() {
    display('cartList', emptyCartMessage());
    displayNone('summary');
    displayNone('form');
    displayNone('cartTitle');
    displayNone('removeAll');
}

function emptyCartMessage() {    
    return `
        <h1 class="mb-5 text-dark font-weight-bold">Votre panier est vide</h1>
        <a class="btn btn-info" role="button" href="index.html">Continuer mes achats</a>`
}