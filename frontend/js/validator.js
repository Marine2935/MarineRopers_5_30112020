class Validator {
    inputs = [];

    constructor(inputs, buttonId) {
        this.inputs = inputs;
        this.button = document.getElementById(buttonId)
    }

    watch() {
        this.inputs.forEach((id) => {
            let input = document.getElementById(id);

            input.addEventListener('change', () => {
                input.style.backgroundColor = '';
                changeDisplay(`wrong_${id}`, '');
                changeDisplay(`check_${id}`, '');

                // Si la case du formulaire est vide ou mal remplie, son apparence est modifiée pour que l'utilisateur comprenne qu'il y a une erreur.
                if (input.validity.valueMissing || !input.checkValidity()) {
                    changeDisplay(`wrong_${id}`, 'inline');                
                    input.style.backgroundColor = '#FFE5E3';
                }

                // Si la case du formulaire est bien remplie, son apparence est modifiée pour montrer la validation de son contenu.
                if (input.checkValidity()) {
                    changeDisplay(`check_${id}`, 'inline');
                    input.style.backgroundColor = '#E3FFEB';
                }
                
                this.validate();
            })            
        })
    }

    validate() {
        let errors = 0;
        this.button.disabled = true; 
        
        this.inputs.forEach((id) => {
            let input = document.getElementById(id);

            // Pour chaque case vide ou mal renseignée du formulaire, le nombre d'erreurs augmente.
            if (input.validity.valueMissing || !input.checkValidity()) {
                errors++;
            }
        })

        // S'il n'y a aucune erreur, le bouton d'envoi est activé.
        if (errors === 0) {
            this.button.disabled = false;
        }
    }
}