// Permet de modifier l'affichage du prix, en ayant systématiquement 2 décimales et le sigle €.
const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
});

const storage = new Storage();