let products = get('products');  

if(isStored('products')) {         
    
    displayCart(products);

    new Promise(() => {
       setTimeout(() => {
           document.querySelectorAll('.btn_remove').forEach(button => {
                button.addEventListener('click', () => {;     
                removeItemFromArray(products, this.dataset.id);

                localStorage.removeItem('products');
                save('products', products);

                removeItemFromCart(this.dataset.id); 

                displayCart(products)
                display('productNumber', products.length);    
           })           
       })
       getElement('removeAll').addEventListener('click', () => {
            localStorage.removeItem('products');
            emptyCart();
        })
    }, 1000)
})

display('productNumber', products.length);

} else {    
    emptyCart();
}

//////////// FORMULAIRE

class Contact {
    constructor(name, firstName, adress, postal, city, phone, email) {
        this.name = name;
        this.firstName = firstName;
        this.adress = adress;
        this.postal = postal;
        this.city = city;
        this.phone = phone;
        this.email = email
    }
}

let contact = new Contact()

getElement('name').addEventListener('change', (event) => {
    contact.name = event.target.value;       
});

getElement('first_name').addEventListener('change', (event) => {
    contact.firstName = event.target.value;       
});

getElement('adress').addEventListener('change', (event) => {
    contact.adress = event.target.value;       
});

getElement('postal').addEventListener('change', (event) => {
    contact.postal = event.target.value;       
});

getElement('city').addEventListener('change', (event) => {
    contact.city = event.target.value;       
});

getElement('phone').addEventListener('change', (event) => {
    contact.phone = event.target.value;       
});

getElement('email').addEventListener('change', (event) => {
    contact.email = event.target.value;       
});

getElement('buttonSubmit').addEventListener('click', () => {
    //ajaxPost(contact, products);
})

function ajaxPost(form, array) {
    let order_id = 'order_2569';
    fetch('http://localhost:3000/api/furniture/order/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({form, array, order_id})
    })
}