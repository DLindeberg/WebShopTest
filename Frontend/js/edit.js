let display = document.getElementById("display")
let editForm = document.getElementById("editProduct")
let editId = document.getElementById("editProductId")
let editName = document.getElementById("editProductName")
let editPrice = document.getElementById("editProductPrice")

editForm.onsubmit = event => {
    event.preventDefault();
    while (display.firstChild) {
        display.firstChild.remove()
    }
    EditProduct();
}

//edits a product and displays the edited product or an error
async function EditProduct() {
    await fetch(`https://localhost:7040/api/Products/${editId.value}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Id: editId.value,
            Name: editName.value,
            Price: editPrice.value
        })
    })
        .then(response => {
            if (response.status == 200) {
                GetAndDisplayEditedProduct()
            }
            else if (response.status == 404) {
                let error = document.createElement("div")
                error.innerText = `Product with id: ${editId.value} not found in database.`
                display.appendChild(error)
            }
            else {
                let error = document.createElement("div")
                error.innerText = "Something went wrong."
                display.appendChild(error)
            }
        })
}

//gets and displays the edited product
async function GetAndDisplayEditedProduct() {
    let response = await fetch(`https://localhost:7040/api/Products/${editId.value}`)
    response = await response.json();
    
    let showProduct = document.createElement("p")
    showProduct.innerText = `Product successfully updated: ${response.id} ${response.name} ${response.price}$`
    display.appendChild(showProduct)
}