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
    validatecardnumber();
    validateform();
});

expirydate.addEventListener("input", () => {
    validateexpirydate();
    validateform();
});

CVV.addEventListener("input", () => {
    validateCVV();
    validateform();
});

nameoncard.addEventListener("input", () => {
    validatenameoncard();
    validateform();
});

const Invalid = (element, message) => {
    const entry = element.parentElement;
    const displayinvalid = entry.querySelector('.invalid');

    displayinvalid.innerText = message;
    entry.classList.add('invalid');
    entry.classList.remove('success');
}

const pass = element => {
    const entry= element.parentElement;
    const displayinvalid = entry.querySelector('.invalid');

    displayinvalid.innerText = '';
    entry.classList.add('success');
    entry.classList.remove('invalid');
};

const validatecardnumber = () => {
    const value = cardnumber.value.trim();
    const cardNumRegex = /^[0-9]+$/;


    if (value === '') {
        Invalid(cardnumber, 'Card Number is required');
    } else if (!cardNumRegex.test(value)) {
        Invalid(cardnumber, 'Invalid Card Number');
    } else if (value.length !== 16) {
        Invalid(cardnumber, 'Card Number must contain 16 digits');
    } else {
        pass(cardnumber);
    }
};

const validateexpirydate = () => {
    const value = expirydate.value.trim();
    // Expiry date validation rule: Check if the date is in the future and matches MM/YY format
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const currentDate = new Date();
    const [enteredMonth, enteredYear] = value.split('/').map(item => parseInt(item, 10));
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (value === '') {
        Invalid(expirydate, 'Expiry Date is required');
    } else if (!expiryDateRegex.test(value)) {
        Invalid(expirydate, 'Invalid Expiry Date (use MM/YY format)');
    } else if (enteredYear < currentYear || (enteredYear === currentYear && enteredMonth < currentMonth)) {
        Invalid(expirydate, 'Card has expired');
    } else {
        pass(expirydate);
    }
};

const validateCVV = () => {
    const value = CVV.value.trim();
    const cvvRegex = /^[0-9]+$/;


    if (value === '') {
        Invalid(CVV, 'CVV is required');
    } else if (!cvvRegex.test(value)) {
        Invalid(CVV, 'Invalid CVV');
    } else if (value.length !== 3) {
        Invalid(CVV, 'Invalid CVV');
    } else {
        pass(CVV);
    }
};

const validatenameoncard = () => {
    const value = nameoncard.value.trim();
    // Card name validation rule: Only alphabetic characters and spaces
    const cardNameRegex = /^[A-Za-z ]+$/;

    if (value === '') {
        Invalid(nameoncard, 'Card Name is required');
    } else if (!cardNameRegex.test(value)) {
        Invalid(nameoncard, 'Invalid Card Name (use only alphabetic characters and spaces)');
    } else {
        pass(nameoncard);
    }
};

const validateform = () => {
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