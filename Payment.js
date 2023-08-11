const cardnumber = document.getElementById("cardnumber");
const expirydate = document.getElementById("expirydate");
const CVV = document.getElementById("CVV");
const nameoncard = document.getElementById("nameoncard");
const form = document.getElementById("myForm");
const sumTable = document.getElementById("summary-t");
const payable = document.getElementById("payable");

payable.innerText = localStorage.getItem("totalPayable");

document.addEventListener("DOMContentLoaded" , ()=>{
    sumTable.innerHTML = localStorage.getItem("sum-table")
})

const purchasenow = document.getElementById("purchasenow");

cardnumber.addEventListener("input", () => {
    validateCardNumber();
    validateForm();
});

expirydate.addEventListener("input", () => {
    validateExpiryDate();
    validateForm();
});

CVV.addEventListener("input", () => {
    validateCVV();
    validateForm();
});

nameoncard.addEventListener("input", () => {
    validateCardName();
    validateForm();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.invalid');

    errorDisplay.innerText = message;
    inputControl.classList.add('invalid');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.invalid');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('invalid');
};

const validateCardNumber = () => {
    const value = cardnumber.value.trim();
    const cardNumRegex = /^[0-9]+$/;


    if (value === '') {
        setError(cardnumber, 'Card Number is required');
    } else if (!cardNumRegex.test(value)) {
        setError(cardnumber, 'Invalid Card Number');
    } else if (value.length !== 16) {
        setError(cardnumber, 'Card Number must contain 16 digits');
    } else {
        setSuccess(cardnumber);
    }
};

const validateExpiryDate = () => {
    const value = expirydate.value.trim();
    // Expiry date validation rule: Check if the date is in the future and matches MM/YY format
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const currentDate = new Date();
    const [enteredMonth, enteredYear] = value.split('/').map(item => parseInt(item, 10));
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (value === '') {
        setError(expirydate, 'Expiry Date is required');
    } else if (!expiryDateRegex.test(value)) {
        setError(expirydate, 'Invalid Expiry Date (use MM/YY format)');
    } else if (enteredYear < currentYear || (enteredYear === currentYear && enteredMonth < currentMonth)) {
        setError(expirydate, 'Card has expired');
    } else {
        setSuccess(expirydate);
    }
};

const validateCVV = () => {
    const value = CVV.value.trim();
    const cvvRegex = /^[0-9]+$/;


    if (value === '') {
        setError(CVV, 'CVV is required');
    } else if (!cvvRegex.test(value)) {
        setError(CVV, 'Invalid CVV');
    } else if (value.length !== 3) {
        setError(CVV, 'Invalid CVV');
    } else {
        setSuccess(CVV);
    }
};

const validateCardName = () => {
    const value = nameoncard.value.trim();
    // Card name validation rule: Only alphabetic characters and spaces
    const cardNameRegex = /^[A-Za-z ]+$/;

    if (value === '') {
        setError(nameoncard, 'Card Name is required');
    } else if (!cardNameRegex.test(value)) {
        setError(nameoncard, 'Invalid Card Name (use only alphabetic characters and spaces)');
    } else {
        setSuccess(nameoncard);
    }
};

const validateForm = () => {
    const allFieldsValid = (
        cardnumber.parentElement.classList.contains('success') &&
        expirydate.parentElement.classList.contains('success') &&
        CVV.parentElement.classList.contains('success') &&
        nameoncard.parentElement.classList.contains('success')
    );

    purchasenow.disabled = !allFieldsValid;
};

purchasenow.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = './confirmation.html';
});