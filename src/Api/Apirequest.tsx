// export async function Productget() {
//     try{
//         let url = 'https://fakestoreapi.com/products';
//         let response = await fetch(url);
//         console.log(response.json)
//         return await response.json();

//     } catch (error) {
//         console.log(error)
//     }
// }

export async function Productget() {
    let url = 'https://fakestoreapi.com/products';
    let response = await fetch(url)
        .then(
            res => res.json()
            )
        .then(json => (json))
        return response;

}
