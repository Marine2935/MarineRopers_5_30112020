get('http://localhost:3000/api/furniture')
    .then((furnitures) => {
        let html = '';
            
        furnitures.forEach((furniture) => {
            html += displayMeuble(furniture);
        });
        document.getElementById('furnitureList').innerHTML = html;
    });

//  ---------------  FONCTIONS  ---------------  //

function displayMeuble(furniture) {
    return `<div class="col-12 col-md-6 col-lg-4">
                <div class="card border-0 my-4 mx-4">
                    <img src="${furniture.imageUrl}" class="rounded" height="200">
                    <div class="card-body px-1 ">
                        <a id="link" class="stretched-link text-dark" href="product.html?${furniture._id}">
                            <h2 class="card-title text-center meuble__name">${furniture.name}</h2>
                        </a>
                        <p class="card-text px-3 text-justify meuble__description">${furniture.description}</p>
                        <p class="card-text text-right font-weight-bold mb-4 pr-3 meuble__price">${euro.format(furniture.price / 100)}</p><hr>
                    </div>
                </div>
            </div>`
};
