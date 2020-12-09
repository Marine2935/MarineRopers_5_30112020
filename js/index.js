ajax('')
.then((furnitures) => {
    let html = '';
        
    furnitures.forEach((furniture) => {
        html += displayFurniture(furniture, 'card');
    });
    display('furnitureList', html);
});