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



// Adding event listener to the input field

fullName.addEventListener("input", () => {
    validatefullName();
    validateform();
});

const validatefullName = () => {
    const Fname = fullName.value.trim();
    const FnameR = /^[A-Za-z ]+$/;


    if ( Fname === '') {
        Invalid(fullName, 'Full Name is required');
    } else if(!FnameR.test(Fname)) {
        Invalid(fullName, 'Invalid (Use only alphabetic characters and spaces)');
    } else {
        pass(fullName);
    }
};



email.addEventListener("input", () => {
    validateemail();
    validateform();
});

const validateemail = () => {
    const emailval = email.value.trim();

    if (emailval=== '') {
        Invalid(email, 'Email is required');
    } else if (!legitemail(emailval)) {
        Invalid(email, 'Provide a valid email address');
    } else {
        pass(email);
    }
};

mobilenumber.addEventListener("input", () => {
    validateMobileNum();
    validateform();
});

const validateMobileNum = () => {
    const mobilenumberval = mobilenumber.value.trim();

    if (mobilenumberval === '') {
        Invalid(mobilenumber, 'Mobile number is required');
    } else if (mobilenumberval.length !== 10) {
        Invalid(mobilenumber, 'Enter a valid phone number');
    } else {
        pass(mobilenumber);
    }
};

confirmemail.addEventListener("input", () => {
    validateConfirmEmail();
    validateform();
});


const validateConfirmEmail = () => {
    const conemailval = confirmemail.value.trim();
    const emailval = email.value.trim();

    if (conemailval === '') {
        Invalid(confirmemail, 'Please confirm your email');
    } else if (conemailval !== emailval) {
        Invalid(confirmemail, 'Emails must match.')
    } else {
        pass(confirmemail);
    }
};

const Invalid = (element, message) => {
    const entry = element.parentElement;
    const displayinvalid= entry.querySelector('.invalid');

    displayinvalid.innerText = message;
    entry.classList.add('invalid');
    entry.classList.remove('success');
}

const pass = element => {
    const entry = element.parentElement;
    const displayinvalid = entry.querySelector('.invalid');

    displayinvalid.innerText = '';
    entry.classList.add('success');
    entry.classList.remove('invalid');
};

const legitemail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validateform = () => {
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
