ajax('')
.then((furnitures) => {
    displayFurnitures(furnitures, 'card', 'furnitureList', '')   
});