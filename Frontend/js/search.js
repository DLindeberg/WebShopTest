let searchString = document.getElementById("searchField")
let searchForm = document.getElementById("searchProduct")
let display = document.getElementById("display");

searchForm.onsubmit = event => {
    event.preventDefault();
    while (display.firstChild) {
        display.firstChild.remove()
    }
    SearchProduct();
}

// sends a seachstring to the API which then searches the db
// displays results or errors in the display div
async function SearchProduct() {
    await fetch('https://localhost:7040/api/Products/Search', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(searchString.value)
    })
        .then(response => {
            if (response.status == "404") {
                let error = document.createElement("div")
                error.innerText = "No results"
                display.appendChild(error)
            }
            response.json().then(function (result) {
                for (let i = 0; i < result.length; i++) {
                    let products = document.createElement("div")
                    products.className = "productDisplay"

                    let list = document.createElement("p")

                    list.innerText = `${result[i].id} ${result[i].name} ${result[i].price}$`
                    products.appendChild(list)

                    display.appendChild(products)
                }
            });
        })

}