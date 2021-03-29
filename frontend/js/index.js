ajax('')
.then((furnitures) => {
    displayFurnitures(furnitures, 'card', 'furnitureList', '')   
})
.catch(error => console.log(error));

displayItemsInCart();