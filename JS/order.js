let tableBody = document.querySelector('#ordertable tbody');
const quantityInputs = document.querySelectorAll("input[type='number']");

//Function to update the total of the items in the cart
function updateTotal(){
    let total = 0;
    quantityInputs.forEach(quantityInput => {
        let itemPrice = parseFloat(quantityInput.getAttribute("data-item-price"));
        let itemQuantity = parseFloat(quantityInput.value);

        if (itemQuantity > 0) { 
            let itemAmount = (itemPrice * itemQuantity).toFixed(2);
            total += parseFloat(itemAmount);
        }
    });
    document.getElementById("totalamount").textContent = total.toFixed(2);
}

//The updateCart function is called whenever the value of an input field changes
quantityInputs.forEach(quantityInput =>{
    quantityInput.addEventListener("input", updateCart); 
});

//Function to update the table with the selected items
function updateCart(event) {
    document.getElementById("ordertablesection").style.display = "block";
    document.getElementById("emptycarttext").style.display = "none";
    document.getElementById("buybtn").style.visibility = "visible";
    document.getElementById("favbtn").style.visibility = "visible";

    tableBody.innerHTML = '';

    quantityInputs.forEach(quantityInput => {
        let itemName = quantityInput.getAttribute("data-item-name");
        let itemPrice = parseFloat(quantityInput.getAttribute("data-item-price"));
        let itemQuantity = parseFloat(quantityInput.value);

        if (itemQuantity > 0) {
            let itemAmount = (itemPrice * itemQuantity).toFixed(2);

            const row = tableBody.insertRow();
            row.insertCell().textContent = itemName;
            row.insertCell().textContent = itemPrice.toFixed(2);
            row.insertCell().textContent = itemQuantity;
            row.insertCell().textContent = itemAmount;

            const removeCell = row.insertCell();
            const removeRowButton = document.createElement('button');
            removeRowButton.textContent = 'Remove';
            removeRowButton.className = 'removerowbtn';
            removeCell.appendChild(removeRowButton);
                
            removeRowButton.addEventListener('click', function() {
                quantityInput.value = 0;
                updateCart();
            });
        }
    });

    //The table gets hidden if there are no items in the cart (table)
    if (tableBody.rows.length === 0){
        document.getElementById("ordertablesection").style.display = "none";
        document.getElementById("emptycarttext").style.display = "block";
        document.getElementById("buybtn").style.visibility = "hidden";
        document.getElementById("favbtn").style.visibility = "hidden";
    }

    updateTotal();
}

//The clearTable function is called whenever the user clicks on the 'Clear Cart' button
document.getElementById('removetablebtn').addEventListener('click', clearTable);

//Function to clear the cart (table)
function clearTable(){
    const table = document.getElementById('ordertable');
    const rowCount = table.rows.length;
    for (let i = rowCount - 2; i > 0; i--) {
        table.deleteRow(i);
    }

    quantityInputs.forEach(quantityInput => {
        quantityInput.value = 0;
    });

    //The table gets hidden as there are no items in the cart(table)
    document.getElementById("ordertablesection").style.display = "none";
    document.getElementById("emptycarttext").style.display = "block";
    document.getElementById("buybtn").style.visibility = "hidden";
    document.getElementById("favbtn").style.visibility = "hidden";
    updateTotal(); 
}

//The user is directed to the Payment page and the storeCart function is called when the buy button is clicked
document.getElementById('buybtn').addEventListener('click', function() {
    window.location.href = 'payment.html';
    storeCart();
});

//Function to store the cart (table) in local storage
function storeCart() {
    const table = document.getElementById('ordertable');
    const rows = table.rows;
    let cartStorage = [];

    for (let i = 0; i < rows.length; i++) {
        let cartItems = [];
        let cells = rows[i].cells;

        for (let j = 0; j < cells.length; j++) {
            cartItems.push(cells[j].textContent);
        }
        cartStorage.push(cartItems);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cartStorage));
}

//The addToFavourites function is called when the Add to Favourites button is clicked
document.getElementById('favbtn').addEventListener('click', addToFavourites);

//Function to add a cart(table) to favourite
function addToFavourites(){
    let table = document.getElementById('ordertable');
    const rows = table.rows;
    let favouriteCart = [];
    
    for (let i = 0; i < rows.length; i++) {
        let favouriteCartItems = [];
        let cells = rows[i].cells;

        for (let j = 0; j < cells.length; j++) {
            favouriteCartItems.push(cells[j].textContent);
        }
        favouriteCart.push(favouriteCartItems);
    }
    localStorage.setItem('favouriteCart', JSON.stringify(favouriteCart));
    alert('The cart was added to your favourites'); //The user gets an alert
}

//The applyFavourites function is called when the Apply Favourites button is clicked
document.getElementById('applyfavbtn').addEventListener('click', applyFavourites);

//Function to display the user's favourite cart
function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favouriteCart'));
   
    if (favourites) {
        quantityInputs.forEach(quantityInput => {
            quantityInput.value = 0;
        });

        favourites.forEach((rowData, index) => {
            if (index === 0) return; // Skip header row

            const itemName = rowData[0];
            const itemQuantity = rowData[2];

            quantityInputs.forEach(quantityInput => {
                if (quantityInput.getAttribute("data-item-name") === itemName) {
                    quantityInput.value = itemQuantity;
                }
            });
        });

        updateCart();
    }
    alert('Your favourite cart will now be shown'); //The user gets an alert
}
