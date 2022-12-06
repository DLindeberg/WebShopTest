let display = document.getElementById("display");
let addForm = document.getElementById("addProduct")
let addName = document.getElementById("addProductName")
let addPrice = document.getElementById("addProductPrice")

addForm.onsubmit = event => {
    while (display.firstChild) {
        display.firstChild.remove()
    }
    event.preventDefault();
    AddProduct();
}

//adds a product to the db and displays success/error in display div
async function AddProduct() {
    await fetch('https://localhost:7040/api/Products', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Id: 0,
            Name: addName.value,
            Price: addPrice.value
        })
    })
        .then(response => {
            //console.log(response)
            if (response.status == 200) {

                let addedProduct = document.createElement("div")
                addedProduct.id = "addedProductDisplay"
                addedProduct.innerText = `Name:${addName.value} Price:${addPrice.value}$ Added to database`
                display.appendChild(addedProduct)
            }
            else {
                let error = document.createElement("div")
                error.innerText = "Something went wrong."
                display.appendChild(error)
            }

        })
}