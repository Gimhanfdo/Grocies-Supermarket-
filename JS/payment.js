window.addEventListener('load', function() {
    const cartData = JSON.parse(localStorage.getItem('shoppingCart'));
    if (cartData) {
        const tableBody = document.querySelector('#ordertable tbody');
        cartData.forEach(rowData => {
            const row = tableBody.insertRow();
            rowData.forEach(cellData => {
                const cell = row.insertCell();
                cell.textContent = cellData;
            });
        });
    }
    styleTable();
});

function styleTable(){
    const table = document.getElementById('ordertable');
    let lastRow = table.rows[table.rows.length - 1];
 
    let lastRowFirstCell = lastRow.cells[0];
    lastRowFirstCell.style.color = 'black';
    lastRowFirstCell.style.backgroundColor = '#f3f3f3';

    let lastRowSecondCell = lastRow.cells[1];
    lastRowSecondCell.colSpan = 3;
    lastRowSecondCell.style.color = 'darkgreen';
    lastRowSecondCell.style.fontWeight = 'bold'
    
    let firstRow = table.rows[0];
    for (var i = 0; i < firstRow.cells.length; i++) {
        firstRow.cells[i].style.color = 'black'; 
        firstRow.cells[i].style.fontWeight = 'bold';
    }
}

const paymentMethods = document.getElementsByName('paymentmethod');

paymentMethods.forEach(function(item) {
    item.addEventListener('change', displayCardDetails);
});

function displayCardDetails() {
    if (this.value == 'card') {
        document.getElementById('card-details-fieldset').style.display = 'block';
    } else {
        document.getElementById('card-details-fieldset').style.display = 'none';
    }
}

const form = document.getElementById('details-form');
const userName = document.getElementById('text01');
const number = document.getElementById('text02');
const email = document.getElementById('email01');
const recipientName = document.getElementById('text03');
const recipientNumber = document.getElementById('text04');
const houseNumber = document.getElementById('text05');
const streetName = document.getElementById('text06');
const city = document.getElementById('text07');
const cardNumber = document.getElementById('text08');
const expiryDate = document.getElementById('date01');
const cvv = document.getElementById('text09');

document.getElementById('paybtn').addEventListener('click', e => {
    e.preventDefault();

    if (validateInputs()) {
        const paymentMethodValue = document.querySelector('input[name="paymentmethod"]:checked').value;
        if (paymentMethodValue == 'card') {
            if (validateCardDetails()) {
                displayDeliveryDate();
            }
        } else {
            displayDeliveryDate();
        }
    }
    else{
        alert("Invalid or empty fields found. Please check and try again.")
    }
});

function setError(element, message) {
    const inputValidate = element.parentElement;
    const errorDisplay = inputValidate.querySelector('.error');

    errorDisplay.innerText = message;
    inputValidate.classList.add('error');
    inputValidate.classList.remove('success');
}

function setSuccess(element) {
    const inputValidate = element.parentElement;
    const errorDisplay = inputValidate.querySelector('.error');

    errorDisplay.innerText = '';
    inputValidate.classList.add('success');
    inputValidate.classList.remove('error');
}

function validateInputs() {
    const nameValue = userName.value.trim();
    const numberValue = number.value.trim();
    const emailValue = email.value.trim();
    const recipientNameValue = recipientName.value.trim();
    const recipientNumberValue = recipientNumber.value.trim();
    const houseNumberValue = houseNumber.value.trim();
    const streetNameValue = streetName.value.trim();
    const cityValue = city.value.trim();

    let validated = true;

    if (nameValue === '') {
        setError(userName, 'Name is required');
        validated = false;
    } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
        setError(userName, 'Name should contain only letters and spaces');
        validated = false;
    } else {
        setSuccess(userName);
    }

    if (numberValue === '') {
        setError(number, 'Contact number is required');
        validated = false;
    } else if (!/^\d+$/.test(numberValue)) {
        setError(number, 'Contact number should contain only digits');
        validated = false;
    } else if (numberValue.length !== 10) {
        setError(number, 'Contact number should contain exactly 10 digits');
        validated = false;
    } else {
        setSuccess(number);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        validated = false;
    } else {
        setSuccess(email);
    }

    if (recipientNameValue === '') {
        setError(recipientName, 'Recipient name is required');
        validated = false;
    } else if (!/^[A-Za-z\s]+$/.test(recipientNameValue)) {
        setError(recipientName, 'Name should contain only letters and spaces');
        validated = false;
    } else {
        setSuccess(recipientName);
    }

    if (recipientNumberValue === '') {
        setError(recipientNumber, 'Recipient number is required');
        validated = false;
    } else if (!/^\d+$/.test(recipientNumberValue)) {
        setError(recipientNumber, 'Contact number should contain only digits');
        validated = false;
    } else if (recipientNumberValue.length !== 10) {
        setError(recipientNumber, 'Recipient number should contain exactly 10 digits');
        validated = false;
    } else {
        setSuccess(recipientNumber);
    }

    if (houseNumberValue === '') {
        setError(houseNumber, 'House number is required');
        validated = false;
    } else {
        setSuccess(houseNumber);
    }

    if (streetNameValue === '') {
        setError(streetName, 'Street name is required');
        validated = false;
    } else {
        setSuccess(streetName);
    }

    if (cityValue === '') {
        setError(city, 'City is required');
        validated = false;
    } else {
        setSuccess(city);
    }

    return validated;
}

function validateCardDetails() {
    const cardNumberValue = cardNumber.value.trim();
    const expiryDateValue = expiryDate.value.trim();
    const cvvValue = cvv.value.trim();

    let validated = true;

    if (cardNumberValue === '') {
        setError(cardNumber, 'Credit card number is required');
        validated = false;
    } else if (!/^\d+$/.test(cardNumberValue)) {
        setError(cardNumber, 'Credit card number should contain only digits');
        validated = false;
    } else {
        setSuccess(cardNumber);
    }

    if (expiryDateValue === '') {
        setError(expiryDate, 'Expiry date is required');
        validated = false;
    } else {
        setSuccess(expiryDate);
    }

    if (cvvValue === '') {
        setError(cvv, 'CVV is required');
        validated = false;
    } else if (!/^\d+$/.test(cvvValue)) {
        setError(cvv, 'CVV should contain only digits');
        validated = false;
    } else if (cvvValue.length !== 3) {
        setError(cvv, 'CVV should contain exactly 3 digits');
        validated = false;
    } else {
        setSuccess(cvv);
    }

    return validated;
}

function displayDeliveryDate() {
    var today = new Date();
    var deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 2);

    var date = deliveryDate.getDate();
    var month = deliveryDate.getMonth() + 1; // Months are zero-based
    var year = deliveryDate.getFullYear();

    // Adding leading zero if month or date is less than 10
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }

    var formattedDeliveryDate = date + '/' + month + '/' + year;
    confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = 'block';
    confirm("Order placed successfully.");
    confirmationMessage.innerText = "Thank you for your purchase. Your order will be delivered on or before " + formattedDeliveryDate;
}