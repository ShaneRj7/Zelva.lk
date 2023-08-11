const fullName = document.getElementById("full-Name");
const email = document.getElementById("email");
const mobilenumber = document.getElementById("mobilenumber");
const confirmemail = document.getElementById("confirmemail");
const Gender = document.getElementById("Gender");
const form = document.getElementById("myForm");
const sumTable = document.getElementById("summary-t");

document.addEventListener("DOMContentLoaded" , ()=>{
    sumTable.innerHTML = localStorage.getItem("sum-table")
})

const purchasenow = document.getElementById("purchasenow");

// Add input event listener to each input field separately
fullName.addEventListener("input", () => {
    validatefullName();
    validateForm();
});

email.addEventListener("input", () => {
    validateemail();
    validateForm();
});

mobilenumber.addEventListener("input", () => {
    validateMobileNum();
    validateForm();
});

confirmemail.addEventListener("input", () => {
    validateConfirmEmail();
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

const isValidemail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatefullName = () => {
    const FullNameValue = fullName.value.trim();
    const FullNameRegex = /^[A-Za-z ]+$/;


    if (FullNameValue === '') {
        setError(fullName, 'Full Name is required');
    } else if(!FullNameRegex.test(FullNameValue)) {
        setError(fullName, 'Invalid (Use only alphabetic characters and spaces)');
    } else {
        setSuccess(fullName);
    }
};

const validateemail = () => {
    const EmailValue = email.value.trim();

    if (EmailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidemail(EmailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }
};

const validateConfirmEmail = () => {
    const confirmemailValue = confirmemail.value.trim();
    const EmailValue = email.value.trim();

    if (confirmemailValue === '') {
        setError(confirmemail, 'Please confirm your email');
    } else if (confirmemailValue !== EmailValue) {
        setError(confirmemail, 'Emails must match.')
    } else {
        setSuccess(confirmemail);
    }
};

const validateMobileNum = () => {
    const MobileNumValue = mobilenumber.value.trim();

    if (MobileNumValue === '') {
        setError(mobilenumber, 'Mobile number is required');
    } else if (MobileNumValue.length !== 10) {
        setError(mobilenumber, 'Enter a valid phone number');
    } else {
        setSuccess(mobilenumber);
    }
};

const validateForm = () => {
    const allFieldsValid = (
        fullName.parentElement.classList.contains('success') &&
        email.parentElement.classList.contains('success') &&
        confirmemail.parentElement.classList.contains('success') &&
        mobilenumber.parentElement.classList.contains('success')
    );

    purchasenow.disabled = !allFieldsValid;
};

purchasenow.addEventListener("click", (e) => {
    e.preventDefault();
    let summaryTable = document.getElementById("summary-t");
    let rows = summaryTable.getElementsByTagName("tr");
    
    // let partialTable = document.createElement("table");
    let tbody = document.createElement("tbody");
    
    for (let i = 3; i < rows.length; i++) { // Start from the 4th row
      let newRow = document.createElement("tr");
      newRow.innerHTML = rows[i].innerHTML;
      tbody.appendChild(newRow);
    }
    
    // partialTable.appendChild(tbody);
    
    localStorage.setItem("newsumtable", tbody.innerHTML);
    localStorage.setItem("fullname", fullName.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("mobilenumber", mobilenumber.value);
    localStorage.setItem("gender", Gender.value);
    window.location.href = 'Payment.html';

});

function updateSelectedDialCode() {
    // Find the selected country element with class "iti__active"
    const selectedCountryElement = document.querySelector('.iti__active');

    if (selectedCountryElement) {
        // Extract the dial code from the selected element
        const dialCodeElement = selectedCountryElement.querySelector('.iti__dial-code');
        const selectedDialCode = dialCodeElement ? dialCodeElement.textContent : null;

        // Display the selected dial code (without plus symbol) in the input
        const inputElement = document.getElementById('mobilenumber');
        if (inputElement) {
            inputElement.value = selectedDialCode.replace('+', ''); // Remove plus symbol and set dial code as the new input value
        }
    }
}

// Initial update when the page loads
updateSelectedDialCode();

// Set up an event listener for changes in the selected country
document.addEventListener('click', function(event) {
    const targetElement = event.target;

    // Check if the clicked element is part of the country list
    if (targetElement.closest('.iti__country')) {
        // Clear the input field and update the selected dial code
        const inputElement = document.getElementById('mobilenumber');
        if (inputElement) {
            inputElement.value = ''; // Clear the input field
            setTimeout(updateSelectedDialCode, 100); // Update the selected dial code after clearing
        }
    }
});
