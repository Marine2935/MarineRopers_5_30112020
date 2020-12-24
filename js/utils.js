function ajax(url, options) {
    return fetch('http://localhost:3000/api/furniture/' + url, options).then(response => response.json());
}

function changeDisplay(id, display) {
    document.getElementById(id).style.display = display;
}

function countArticles() {
    if (!storage.has('products')) {
        return 0
    }

    let initialValue = 0;

    return storage.get('products').reduce((acc, product) => 
        acc + product.quantity, initialValue
    )
}

function htmlFurniture(furniture, type) {
    if(type == 'card') {
        return `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card border-0 my-4 mx-4">
                    <img src="${furniture.imageUrl}" class="rounded furniture__img" height="200">
                    <div class="card-body px-1 ">
                        <a class="stretched-link text-dark" href="product.html?id=${furniture._id}">
                            <h2 class="card-title text-center furniture__name">${furniture.name}</h2>
                        </a>
                        <p class="card-text px-3 text-justify furniture__description">${furniture.description}</p>
                        <p class="card-text text-right font-weight-bold mb-4 pr-3 furniture__price">${money(furniture.price)}</p><hr>
                    </div>
                </div>
            </div>`
    } 

    if(type == 'carousel') {
        return `
            <div class="col-6 col-md-3 col-lg-2 mb-3">
                <div class="card rounded bg-light shadow-sm border-0">
                    <img src="${furniture.imageUrl}" class="d-block furniture__img" height="110">
                    <div class="card-body p-3 carousel_card rounded-bottom">                            
                            <h5 class="card-title text-center carousel_card__title mb-0">
                                <a class="stretched-link text-dark" href="product.html?id=${furniture._id}">
                                    ${furniture.name}
                                </a>
                            </h5>                            
                        <p class="card-text text-center font-weight-bold">${money(furniture.price)}</p>
                    </div>
                </div>
            </div>`
    }

    if(type == 'cart') {
        return `
        <div id="${furniture._id}">
            <div class="row align-items-center">            
                <div class="col-2">
                    <a href="product.html?id=${furniture._id}">
                        <img src="${furniture.imageUrl}" class="rounded" width="60" height="60">
                    </a>
                </div>
                <div class="col-3 text-left">
                    <p class="h5">${furniture.name}</p>
                </div>
                <div class="col-2">
                    <p class="h5">${money(furniture.price)}</p>
                </div>
                <div class="col-2 input-group">
                    <div class="input-group-prepend">
                        <button id="less-${furniture._id}" class="btn btn-light rounded-left border btn_input" type="button">-</button>
                    </div>
                    <input id="inputQuantity-${furniture._id}" class="form-control input_spinner text-center" type="number" value="${furniture.quantity}">
                    <div class="input-group-append">
                        <button id="more-${furniture._id}" class="btn btn-light rounded-right border btn_input" type="button">+</button>
                    </div>
                </div>
                <div class="col-2">
                    <p class="font-weight-bold h5">${money(furniture.price * furniture.quantity)}</p>
                </div>
                <div class="col-1 pr-5">
                    <button id="remove-${furniture._id}" class="border-0 bg-0 btn_remove"><i class="fas fa-trash-alt"></i></button>
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
                        <p class="meuble__description mt-5">${furniture.description}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4 mt-4 mt-lg-3 mt-xl-4">
                        <form method="post" action ="" aria-label="Choix de vernis">
                            <select id="furnitureVarnish" class="form-control" name="varnish"></select>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div id="furniturePrice">
                            <p class="h4 text-right font-weight-bold my-4 my-lg-3 my-xl-4">${money(furniture.price)}</p>
                        </div> 
                    </div>
                </div>
                <div class="row text-right justify-content-end">
                    <div class="col-3 align-self-center input-group">
                        <div class="input-group-prepend">
                            <button id="reduceButton" class="btn btn-light rounded-left border btn_input" type="button">-</button>
                        </div>
                        <input id="inputQuantity" class="form-control input_spinner text-center" type="number" min="1" value="1">
                        <div class="input-group-append">
                            <button id="increaseButton" class="btn btn-light rounded-right border btn_input" type="button">+</button>
                        </div>
                    </div>
                    <div class="col col-md-4 col-lg-5 col-xl-4">
                        <button id="addToCart" class="btn btn-info">Ajouter au panier</button>
                    </div>       
                </div>
            </div>`
    }
    
}

function displayFurnitures(array, type, id, option) {
    let html = '';
        
    array.forEach((furniture) => {
        html += htmlFurniture(furniture, type);
    });
    displayHTML(id, html + option);
}

function displayHTML(id, html) {
    getElement(id).innerHTML = html;
}

function displayItemsInCart() {
    let articlesQuantity = countArticles();
    getElement('quantityProductsInCart').innerText = articlesQuantity;
}

function getElement(id) {
    return document.getElementById(id);
}

function getIdFromUrl(id) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(id);
}

function money(value) {
    return `${euro.format(value / 100)}`
}

function removeItemFromArray(array, id) {
    let index = array.indexOf(id);
    array.splice(index, 1);
}