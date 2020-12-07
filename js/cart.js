if(isStored('products')) {
    let htmlCart = '';
    let idProduct = get('products');  
    let total = 0;  

    idProduct.forEach((idProduct) => {
        ajax(idProduct)
        .then((product) => {
            htmlCart += cartList(product); 
            display('cartList', `<h1 class="mb-5 text-dark font-weight-bold">Votre panier</h1>` + htmlCart);

            total += product.price;
            display('total', euro.format(total/100))
        })
    }) 
    display('productNumber', idProduct.length);
} else {    
    display('cartList', emptyCart());
    document.getElementById('form').style.display = 'none';
}

function cartList(product) {
    return `
        <div class="row">
            <div class="col">
                <img src="${product.imageUrl}" class="rounded" width="100" height="100">
            </div>
            <div class="col align-self-center">
                <p class="h4">${product.name}</p>
            </div>
            <div class="col align-self-center">
                <p class="font-weight-bold h5">${euro.format(product.price / 100)}</h2>
            </div>
        </div>
        <hr>
        `
}

function emptyCart() {    
    return `
        <h1 class="mb-5 text-dark font-weight-bold">Votre panier est vide</h1>
        <a class="btn btn-info" role="button" href="index.html">Continuer mes achats</a>`
}