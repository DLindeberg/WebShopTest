let getAllButton = document.getElementById("getAllProductsButton")
let display = document.getElementById("display");

getAllButton.onclick = event => {
    while (display.firstChild) {
        display.firstChild.remove()
    }
    event.preventDefault();
    GetAllProducts();
}

//fetches all products from the API and displays them inside the display div
async function GetAllProducts() {
    let response = await fetch("https://localhost:7040/api/Products");

    response = await response.json();
    
    let products = document.createElement("ul")
    products.className = "productDisplay"
    display.appendChild(products)

    for (let i = 0; i < response.length; i++) {

        let list = document.createElement("li")

        list.innerText = `${response[i].id} ${response[i].name} ${response[i].price}$`
        products.appendChild(list)
    }
}