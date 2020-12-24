let error = 0;

listenForFormErrors();

function activateButtonSubmit() {
    if(error == 0) {
        getElement('buttonSubmit').disabled = false;
    } else {
        getElement('buttonSubmit').disabled = true;
    }
}

function listenForFormErrors() { 
    listenForInputError('firstName');
    listenForInputError('lastName');
    listenForInputError('address');
    listenForInputError('postal');
    listenForInputError('city');
    listenForInputError('phone');
    listenForInputError('email');  
}

function listenForInputError(id) {
    let input = getElement(id);

    if (input.validity.valueMissing) {
        error++
    }

    input.addEventListener('change', () => {
        if (input.checkValidity()) {
            error-- 
            activateButtonSubmit()          
        }  
        if (input.validity.valueMissing) {
            error++
            activateButtonSubmit() 
        }             
    })
}