class Storage {
    engine = localStorage;

    get(name) {
        let raw = this.engine.getItem(name);
        return JSON.parse(raw)
    }

    has(name) {
        return this.engine.getItem(name)
    }

    remove(item) {
        this.engine.removeItem(item);
    }

    save(name, value) {
        let values = JSON.stringify(value);
        this.engine.setItem(name, values);
    }
}