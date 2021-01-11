class Storage {
    engine = localStorage;

    // Récupère l'élément du localStorage et le convertit en Javascript.
    get(name) {
        let raw = this.engine.getItem(name);
        return JSON.parse(raw)
    }

    // Permet de vérifier si l'élément est présent dans le localStorage.
    has(name) {
        return this.engine.getItem(name)
    }

    // Supprime l'élément du localStorage.
    remove(item) {
        this.engine.removeItem(item);
    }

    // Stocke la valeur convertie en JSON dans le localStorage sous le nom choisi.
    save(name, value) {
        let values = JSON.stringify(value);
        this.engine.setItem(name, values);
    }
}