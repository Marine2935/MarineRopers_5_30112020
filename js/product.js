ajax(getIdFromUrl())
.then((furniture) => {
    let htmlVarnish = '';

    document.title = title(furniture);

    display('furnitureDetails', displayFurniture(furniture, 'single'));

    furniture.varnish.forEach((varnish) => {
        htmlVarnish += displayVarnish(varnish)
    });

    display('furnitureVarnish', htmlVarnish);

    getElement('addToCart').addEventListener('click', function() {
        let products = [];

        if(isStored('products')) {
            products = get('products')
        }

        products.push(getIdFromUrl());

        save('products', products);   
        changeDisplay('popUp', 'flex');
        display('popUpAlert', displayPopUp('popUp'))

        getElement('buttonClose').addEventListener('click', function() {
            changeDisplay('popUp', 'none')
        })
    })
});

// bloc 'Vous aimerez aussi'

ajax('')
.then((furnitures) => {
    let product = '';
        
    furnitures.forEach((furniture) => {
        if(furniture._id !== getIdFromUrl()) {
        product += displayFurniture(furniture, 'carousel')
        }
    });

    display('carousel', product);
});