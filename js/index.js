let request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/furniture');
request.addEventListener('load', function() {
    if(request.status >= 200) {
        let meubles = JSON.parse(request.responseText);
        let html = '';
        
        meubles.forEach((meuble) => {
            html += displayMeuble(meuble);
        })
        document.getElementById('furnitureList').innerHTML = html;
    }
});
request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
request.send();

function displayMeuble(meuble) {
    return `<div class="col-12 col-md-6 col-lg-4">
                <div class="card my-4 shadow-sm">
                    <img src="${meuble.imageUrl}" height="300">
                    <br>
                    <a class="stretched-link" href="#"><h2 class="text-center my-3 meuble__name">${meuble.name}</h2></a>
                    <p class="meuble__description">${meuble.description}</p>
                    <p class="text-right meuble__price">${meuble.price}€</p>
                </div>
            </div>`;
}