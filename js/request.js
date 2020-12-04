function get(url) {
    const promise = fetch(url)
                        .then(response => response.json());
    return promise
}