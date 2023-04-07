export async function Productget() {
    let url = 'https://fakestoreapi.com/products';
    let response = await fetch(url)
        .then(
            res => res.json()
            )
        .then(json => (json))
    return response;

}