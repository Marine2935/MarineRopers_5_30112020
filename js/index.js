const euro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
});

let request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/furniture');
request.addEventListener('load', function() {
    if(request.status >= 200) {
        let furnitures = JSON.parse(request.responseText);
        let html = '';
        
        furnitures.forEach((furniture) => {
            html += displayMeuble(furniture);
        });
        document.getElementById('furnitureList').innerHTML = html;
    }
});
request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
request.send();

//  ---------------  FONCTIONS  ---------------  //

function displayMeuble(furniture) {
    return `<div class="col-12 col-md-6 col-lg-4">
                <div class="card my-4 shadow-sm">
                    <img src="${furniture.imageUrl}" height="300">
                    <div class="card-body">
                        <a class="stretched-link text-dark" href="product.html?${furniture._id}">
                            <h2 class="card-title text-center meuble__name">${furniture.name}</h2>
                        </a>
                        <p class="card-text px-3 text-justify meuble__description">${furniture.description}</p>
                        <p class="card-text text-right font-weight-bold pr-3 meuble__price">${euro.format(furniture.price / 100)}</p>
                    </div>
                </div>
            </div>`
};
