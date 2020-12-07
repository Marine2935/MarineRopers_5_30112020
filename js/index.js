ajax('')
.then((furnitures) => {
    let html = '';
        
    furnitures.forEach((furniture) => {
        html += displayMeuble(furniture, 'card');
    });
    display('furnitureList', html);
});