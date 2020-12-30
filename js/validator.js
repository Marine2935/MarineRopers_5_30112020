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
                this.validate();
            })
        })
    }

    validate() {
        let errors = 0;
        this.button.disabled = true;

        this.inputs.forEach((id) => {
            let input = document.getElementById(id);

            if (input.validity.valueMissing || !input.checkValidity()) {
                errors++;
            }
        });

        if (errors === 0) {
            this.button.disabled = false;
        } 
    }
}