let display = document.getElementById("display")
let deleteForm = document.getElementById("deleteSingleProduct")
let deleteId = document.getElementById("deleteProductId")

deleteForm.onsubmit = event => {
    event.preventDefault();
    while (display.firstChild) {
        display.firstChild.remove()
    }
    VerifyDelete();
}

//deletes product by Id
async function DeleteProduct() {
    await fetch(`https://localhost:7040/api/Products/${deleteId.value}`, {

        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(deleteId.value)
    })
        .then(response => {
            console.log(response)
            if (response.status == 200) {
                let success = document.createElement("div")
                success.innerText = `Product with id: ${deleteId.value} successfully deleted.`
                display.appendChild(success)
            }
            else if (response.status == 404) {
                let error = document.createElement("div")
                error.innerText = `Product with id: ${deleteId.value} not found in database.`
                display.appendChild(error)
            }
            else {
                let error = document.createElement("div")
                error.innerText = "Something went wrong."
                display.appendChild(error)
            }
        })
}

//fetches the item from the database and adds confirm and cancel buttons to 
//verify deletion, then calls the delete method
async function VerifyDelete() {
    let response = await fetch(`https://localhost:7040/api/Products/${deleteId.value}`)
    if (response.status == 200) {
        response = await response.json();
        let showProduct = document.createElement("p")
        showProduct.innerText = `Are you sure you want to delete: ${response.id} ${response.name} ${response.price}$ ?`

        let confirmButton = document.createElement("button")
        confirmButton.setAttribute("id", "confirmButton")
        let confirm = document.createTextNode("Confirm")
        confirmButton.appendChild(confirm)

        let cancelButton = document.createElement("button")
        cancelButton.setAttribute("id", "cancelButton")
        let cancel = document.createTextNode("Cancel")
        cancelButton.appendChild(cancel)

        display.appendChild(showProduct)
        display.appendChild(confirmButton)
        display.appendChild(cancelButton)

        confirmButton.onclick = event => {
            while (display.firstChild) {
                display.firstChild.remove()
            }
            DeleteProduct();
        }
        cancelButton.onclick = event => {
            location.reload();
        }
    }
    else if (response.status == 404) {
        let error = document.createElement("div")
        error.innerText = `Product with id: ${deleteId.value} not found in database.`
        display.appendChild(error)
    }
    else {
        let error = document.createElement("div")
        error.innerText = "Something went wrong."
        display.appendChild(error)
    }

}