function ajax(url) {
    return fetch('http://localhost:3000/api/furniture/' + url).then(response => response.json());
}

function changeDisplay(id, display) {
    document.getElementById(id).style.display = display;
}

function delivery(value) {
    if((value / 100) >= 1000) {
        display('deliveryCosts', 'Offerts');
        document.getElementById('deliveryCosts').style.fontWeight = 'bold';
        document.getElementById('delivery').style.color = '#0AA32D';
        display('total', euro.format(value/100))
    } else {
        display('deliveryCosts', euro.format(75));
        display('total', euro.format(value/100 + 75))
    } 
}

function display(id, html) {
    document.getElementById(id).innerHTML = html;
}

function displayButtonRemoveAll() {
    return `
        <div class="text-right">
            <button id="removeAll" class="btn btn-light shadow-sm">Vider le panier</button>
        </div>`        
}

function displayCart(array) {
    let htmlCart = '';
    let total = 0;

    array.forEach((idProduct) => {
        ajax(idProduct)
        .then((product) => {
            htmlCart += displayFurniture(product, 'cart'); 
            display('cartList', htmlCart + displayButtonRemoveAll());

            total += product.price;
            display('totalCart', euro.format(total/100))
            
            delivery(total)                    
        })
    })   
}

function displayFurniture(furniture, type) {
    if(type == 'card') {
        return `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card border-0 my-4 mx-4">
                    <img src="${furniture.imageUrl}" class="rounded furniture__img" height="200">
                    <div class="card-body px-1 ">
                        <a id="link" class="stretched-link text-dark" href="product.html?id=${furniture._id}">
                            <h2 class="card-title text-center furniture__name">${furniture.name}</h2>
                        </a>
                        <p class="card-text px-3 text-justify furniture__description">${furniture.description}</p>
                        <p class="card-text text-right font-weight-bold mb-4 pr-3 furniture__price">${euro.format(furniture.price / 100)}</p><hr>
                    </div>
                </div>
            </div>`
    } 
    if(type == 'carousel') {
        return `
            <div class="col-4 col-md-3 col-lg-2">
                <div class="card border-0">
                    <img src="${furniture.imageUrl}" class="d-block furniture__img" height="100">
                    <div class="card-body p-3 carousel_card">                            
                            <h5 class="card-title text-center carousel_card__title mb-0">
                                <a class="stretched-link text-dark" href="product.html?id=${furniture._id}">
                                    ${furniture.name}
                                </a>
                            </h5>                            
                        <p class="card-text text-center font-weight-bold">${euro.format(furniture.price / 100)}</p>
                    </div>
                </div>
            </div>`
    }
    if(type == 'cart') {
        return `
        <div id="${furniture._id}">
            <div class="row">            
                <div class="col">
                    <img src="${furniture.imageUrl}" class="rounded" width="60" height="60">
                </div>
                <div class="col align-self-center">
                    <p class="h5">${furniture.name}</p>
                </div>
                <div class="col align-self-center text-right">
                    <p class="font-weight-bold h5">${euro.format(furniture.price / 100)}</p>
                </div>
                <div class="col-2 align-self-center text-right pr-5">
                    <button data-id="${furniture._id}" class="border-0 bg-0 btn_remove"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>                      
            <hr> 
        </div>`
    }
    if(type == 'single') {
       return `
            <div class="col-12 col-md-10 col-lg-6 px-0 pt-lg-5 pt-xl-3">  
                <img src="${furniture.imageUrl}" class=" furniture__img">
                <a href="${furniture.imageUrl}" data-toggle="lightbox">
                    <i class="fas fa-search-plus mr-2 mb-2 text-dark icon_zoom"></i>
                </a>            
            </div>
            <div class="col-md-12 col-lg-6 pl-4 pt-lg-4 pt-xl-0">
                <div class="row">
                    <div class="col">
                        <h1 id="furnitureName" class="h2 text-center text-dark font-weight-bold my-3">${furniture.name}</h1>
                        <hr>
                        <p class="meuble__description">${furniture.description}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col mt-4 mt-lg-3 mt-xl-4">
                        <form method="post" action ="">
                            <label for="varnish">Choix de vernis</label>
                            <br>
                            <select id="furnitureVarnish" name="varnish">
                            </select>
                        </form>
                        <div id="furniturePrice">
                            <p class="h4 text-right font-weight-bold my-4 my-lg-3 my-xl-4">${euro.format(furniture.price / 100)}</p>
                        </div> 
                    </div>
                </div>
                <div class="row text-right justify-content-end">
                    <div class="col col-md-4 col-lg-5 col-xl-4">
                        <button id="addToCart" class="btn btn-info">Ajouter au panier</button>
                    </div>       
                </div>
            </div>`
    }
    
}

function displayPopUp() {    
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

function displayVarnish(varnish) {
   return `<option>${varnish}</option>`
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

function get(name) {
    let raw = localStorage.getItem(name);
    return JSON.parse(raw)
}

function getElement(id) {
    return document.getElementById(id);
}

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function isStored(name) {
    return localStorage.getItem(name)
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

function save(name, value) {
    let values = JSON.stringify(value);
    localStorage.setItem(name, values);
}

function title(furniture) {
    return `${furniture.name} - Orinoco`
}
