function ajax(url) {
    return fetch('http://localhost:3000/api/furniture/' + url).then(response => response.json());
}

function display(id, html) {
    document.getElementById(id).innerHTML = html;
}

function displayMeuble(furniture, type) {
    if(type == 'card') {
        return `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card border-0 my-4 mx-4">
                    <img src="${furniture.imageUrl}" class="rounded" height="200">
                    <div class="card-body px-1 ">
                        <a id="link" class="stretched-link text-dark" href="product.html?id=${furniture._id}">
                            <h2 class="card-title text-center meuble__name">${furniture.name}</h2>
                        </a>
                        <p class="card-text px-3 text-justify meuble__description">${furniture.description}</p>
                        <p class="card-text text-right font-weight-bold mb-4 pr-3 meuble__price">${euro.format(furniture.price / 100)}</p><hr>
                    </div>
                </div>
            </div>`
    } 
    if(type == 'single') {
       return `
            <div class="col-12 col-md-10 col-lg-6">  
                <div class="card"><img src="${furniture.imageUrl}" height="400">
                    <a href="${furniture.imageUrl}" data-toggle="lightbox">
                        <i class="fas fa-search-plus mr-2 mb-2 text-light icon_zoom"></i>
                    </a>
                </div>                  
            </div>
            <div class="col-md-12 col-lg-6">
                <div class="row">
                    <div class="col">
                        <h1 id="furnitureName" class="h2 text-center text-dark font-weight-bold my-3">${furniture.name}</h1>
                        <hr>
                        <p class="meuble__description">${furniture.description}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col mt-4">
                        <form method="post" action ="">
                            <label for="varnish">Choix de vernis</label>
                            <br>
                            <select id="furnitureVarnish" name="varnish">
                            </select>
                        </form>
                        <div id="furniturePrice">
                            <p class="h4 text-right font-weight-bold my-4">${euro.format(furniture.price / 100)}</p>
                        </div> 
                    </div>
                </div>
                <div class="row text-right justify-content-end">
                    <div class="col col-md-3 col-lg-4 pl-4 pl-xl-5">
                        <input type="number" min="1" />
                    </div>
                    <div class="col col-md-4 col-lg-5 col-xl-4">
                        <button id="addToCart" class="btn btn-info">Ajouter au panier</button>
                    </div>       
                </div>
            </div>`
    }
}

function get(name) {
    let raw = localStorage.getItem(name);
    return JSON.parse(raw)
}

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function isStored(name) {
    return localStorage.getItem(name)
}

function save(name, value) {
    let values = JSON.stringify(value);
    localStorage.setItem(name, values);
}