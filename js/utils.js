function ajax(url, options) {
    return fetch('http://localhost:3000/api/furniture/' + url, options).then(response => response.json());
}

function changeDisplay(id, display) {
    document.getElementById(id).style.display = display;
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
            <div class="row">            
                <div class="col-4 col-sm-2">
                    <a href="product.html?id=${furniture._id}">
                        <img src="${furniture.imageUrl}" class="rounded" width="60" height="60">
                    </a>
                </div>
                <div class="col-7 col-sm-4 align-self-center">
                    <p class="h5">${furniture.name}</p>
                </div>
                <div class="col-9 col-sm-4 align-self-center text-right">
                    <p class="font-weight-bold h5">${money(furniture.price)}</p>
                </div>
                <div class="col-3 col-sm-1 align-self-center text-right pr-5">
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
                            <p class="h4 text-right font-weight-bold my-4 my-lg-3 my-xl-4">${money(furniture.price)}</p>
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

function getElement(id) {
    return document.getElementById(id);
}

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function money(value) {
    return `${euro.format(value / 100)}`
}