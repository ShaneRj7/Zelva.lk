//Initialization
document.addEventListener("DOMContentLoaded" , ()=>{
    localStorage.clear();
    localStorage.setItem("normalHoursCount" , 1);
    localStorage.setItem("ForeignAdultCount" , "$10");
    localStorage.setItem("ticketcountForeigner Adult" , "1");
    CalculateTotalPayableAmount();
})

//Calendar

const isLeapYear = (year) => {
    return(
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    );
};

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector('.calendar');
const month_names = [
    'January' ,
    'February' ,
    'March' ,
    'April' ,
    'May' ,
    'June' ,
    'July' ,
    'August' ,
    'September' ,
    'October' ,
    'November' ,
    'December'

];

let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
};

let prevSelectedDay = null; 

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];
    let currentDate = new Date();
    month_picker.innerHTML = month_names[month];
    calendar_header_year.innerHTML = year;
    let first_day = new Date(year, month);

     for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');
        if (i >= first_day.getDay()) {
            let selectedDate = i - first_day.getDay() + 1; // The selected date
            day.innerHTML = selectedDate;
            day.addEventListener('click', () => {
                // Get the current date and time
                const currentDate = new Date();
            
                // Create a date object for the selected date
                const selectedDateObj = new Date(year, month, selectedDate);
            
                // Check if the selected date is not in the past
                if (selectedDateObj >= currentDate) {
                    const selectedDateString = `${year}-${month + 1}-${selectedDate}`;
                    localStorage.setItem('selectedDate', selectedDateString);
                    
                    if (prevSelectedDay) {
                        prevSelectedDay.classList.remove('current-date');
                    }
                    day.classList.add('current-date');
                    prevSelectedDay = day;
                    
                    const selecteddate = document.getElementById('selecteddate');
                    selecteddate.innerText = localStorage.getItem('selectedDate');
                } else {
                    // Optionally, you can show an alert or provide visual feedback that the date is in the past
                    console.log('Cannot select past dates.');
                }
            });
            

            if (
                i - first_day.getDay() + 1 === currentDate.getDate() &&
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth()
            ) {
                // day.classList.add('current-date');
            }
        }
        calendar_days.appendChild(day);
    }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}<div>`;
    month_list.append(month);
    month.onclick = () => {
        currentMonth.value = index;
        generateCalendar(currentMonth.value, currentYear.value);
        month_list.classList.replace('show', 'hide');
        dayTextFormate.classList.remove('hideTime');
        dayTextFormate.classList.add('showtime');
        timeFormate.classList.remove('hideTime');
        timeFormate.classList.add('showtime');
        dateFormate.classList.remove('hideTime');
        dateFormate.classList.add('showtime');
        

    };

});

(function () {
    month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = {value : currentDate.getMonth()};
let currentYear = {value : currentDate.getFullYear()};
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
    year : 'numeric',
    month: 'long',
    day: 'numeric',
    weekday : 'long'
};

const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
).format(currshowDate);


setInterval(() => {
    const timer = new Date();
    const option = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    
}, 1000); 

localStorage.setItem('date',currentDateFormate)

//When pages load
window.addEventListener("load", ()=>{
    localStorage.setItem("normalHoursCount" , 1);
})

// Duration update and storing
const time = document.getElementById("duration");
const selectedtime = document.getElementById("selecttime"); // Existing element
const selectedtimes = document.getElementById("selectedduration"); // New element
const peakHours = [4, 5, 6, 9, 10, 11]; // Peak hours values

time.addEventListener("change", selectedduration);

function selectedduration() {
  const selectElement = document.getElementById("duration");
  const selectedOptions = Array.from(selectElement.options).filter(option => option.selected);

  localStorage.setItem("Duration", selectedOptions.map(option => option.value).join(','));

  // Count peak hours, normal hours, and total hours for each selected option
  let peakHoursCount = 0;
  let normalHoursCount = 0;
  const totalHoursCount = selectedOptions.length;

  const selectedTimeTexts = selectedOptions.map(option => option.innerText);
  
  selectedTimeTexts.forEach(selectedTimeText => {
    const isSelectedPeak = peakHours.includes(Number(selectedOptions.find(option => option.innerText === selectedTimeText).value));
    if (isSelectedPeak) {
      peakHoursCount++;
    } else {
      normalHoursCount++;
    }
  });

  selectedtime.innerText = `${selectedTimeTexts.join(', ')}`; // Update the existing element
  selectedtimes.innerText = `${totalHoursCount} hrs (${normalHoursCount} Normal : ${peakHoursCount} Peak)`; // Update the new element
  localStorage.setItem("normalHoursCount" , normalHoursCount)
  localStorage.setItem("peakHoursCount" , peakHoursCount)
  updatenewcharge();
}



//Guests

var incrementButton = document.getElementsByClassName('inc');
var decrementButton = document.getElementsByClassName('dec');
 //console.log(incrementButton);
 //console.log(decrementButton);


// Increment
for (var i = 0; i < incrementButton.length; i++) {
    var button = incrementButton[i];
    button.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        var parentBox = buttonClicked.parentElement;
        var label = parentBox.querySelector('label');
        var labelText = label.textContent.trim();
        var input = parentBox.querySelector('.input-filed');
        
        var inputValue = input.value;
        var newValue = parseInt(inputValue) + 1;
        input.value = newValue;

        // Check and log row content
        localStorage.setItem(`ticketcount${labelText}` , newValue)
        checkAndUpdateRowContent(labelText, newValue);
        CalculateTotalPayableAmount()
    });
}

// Decrement
for (var i = 0; i < decrementButton.length; i++) {
    var button = decrementButton[i];
    button.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        var parentBox = buttonClicked.parentElement;
        var label = parentBox.querySelector('label');
        var labelText = label.textContent.trim();
        var input = parentBox.querySelector('.input-filed');

        if (input.value > 0) {
            var inputValue = input.value;
            var newValue = parseInt(inputValue) - 1;
            input.value = newValue;

            // Check and log row content
            localStorage.setItem(`ticketcount${labelText}` , newValue)
            checkAndUpdateRowContent(labelText, newValue);
            CalculateTotalPayableAmount()
        }
    });
}

// Check if a row exists and log its content
function checkAndUpdateRowContent(labelText, newValue) {
    const sumTable = document.querySelector('.sum-table');
    const rows = sumTable.querySelectorAll('tr');
    normal_h_count = localStorage.getItem("normalHoursCount");
    peak_h_count = localStorage.getItem("peakHoursCount");
    let foundRow = null;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const firstCell = row.querySelector("td:first-child"); // Corrected line
        const span = row.querySelector("span");
        
        if (firstCell && span && span.textContent === labelText) {
            foundRow = row;
            break;
        }
    }

      if (newValue > 0)
      {
      if (foundRow) 
      {
        // If a row exists, update the charge
        calculateCharge(labelText, newValue);
        
        const charge = calculateCharge(labelText, newValue);
        const updatedcategoryName =  newValue + ` <span>${labelText}</span>`;
        foundRow.cells[1].innerText = charge;
        foundRow.cells[0].innerHTML = updatedcategoryName;
      } 
    else 
    {
        // If no row exists, add a new row before the Total Payable row
        const newRow = sumTable.insertRow(rows.length - 1);
        const categoryCell = newRow.insertCell(0);
        const chargeCell = newRow.insertCell(1);
        
        categoryCell.innerHTML = newValue + ` <span>${labelText}</span>` ;
        
        const charge = calculateCharge(labelText, newValue);
        chargeCell.innerText = charge;
    }
  } 
  else 
  {
    // Remove the row if ticketCount is zero
    calculateCharge(labelText, newValue);
  for (let i = 0; i < rows.length; i++) 
  {
  const row = rows[i];
  const cells = row.getElementsByTagName("td");
  if (cells.length === 2) 
  {
    const span = cells[0].querySelector("span");
    if (span && span.textContent === labelText)
     {
      sumTable.deleteRow(i);
      break;
    }
  }
  }
  }
  
}

function calculateCharge(labelText, newValue) {
    const normalHours = localStorage.getItem("normalHoursCount");
    const peakHours = localStorage.getItem("peakHoursCount");
    if (labelText === "Foreigner Adult") {
        let ForeignAdultCount = "$" + (((normalHours * 10)+(peakHours * 13)) * newValue);
        localStorage.setItem("ForeignAdultCount" , ForeignAdultCount);
        return ForeignAdultCount;
    } else if (labelText === "Foreigner Child") {
      let ForeignChildCount = "$" + (((normalHours * 5)+(peakHours * 8)) * newValue);
      localStorage.setItem("ForeignChildCount" , ForeignChildCount);
      return ForeignChildCount;
    } else if (labelText === "SL Adult") {
      let SLAdultCount = "$" + (((normalHours * 4)+(peakHours * 6)) * newValue);
      localStorage.setItem("SLAdultCount" , SLAdultCount);
      return SLAdultCount;
    } else if (labelText === "SL Child") {
      let SLChildCount = "$" + (((normalHours * 2)+(peakHours * 3)) * newValue);
      localStorage.setItem("SLChildCount" , SLChildCount);
      return SLChildCount;
    } else {
      return "Free"
    }
    
  }


  function CalculateTotalPayableAmount() {
    const ForeignAdultCount = localStorage.getItem("ForeignAdultCount");
    const ForeignChildCount = localStorage.getItem("ForeignChildCount");
    const SLAdultCount = localStorage.getItem("SLAdultCount");
    const SLChildCount = localStorage.getItem("SLChildCount");
  
    const totalCharges = (
      (ForeignAdultCount ? parseFloat(ForeignAdultCount.substring(1)) : 0) +
      (ForeignChildCount ? parseFloat(ForeignChildCount.substring(1)) : 0) +
      (SLAdultCount ? parseFloat(SLAdultCount.substring(1)) : 0) +
      (SLChildCount ? parseFloat(SLChildCount.substring(1)) : 0)
    );
  
    console.log(totalCharges);
  
    const totalPayableCell = document.getElementById("totalpayableamount");
    totalPayableCell.textContent = "$" + totalCharges;
  
    localStorage.setItem("totalPayable", totalPayableCell.textContent);
  }

  function updatenewcharge() {
    const sumTable = document.getElementById("sum-table");
    const rows = sumTable.querySelectorAll("tr");
  
    rows.forEach(row => {
      const cells = row.getElementsByTagName("td");
      if (cells.length === 2) {
        const span = cells[0].querySelector("span");
        
  
        // Check if the span element exists before proceeding
        if (span) {
          const labelText = span.textContent.trim();
          
          // Retrieve the ticket count from localStorage
          const ticketCountKey = `ticketcount${labelText}`;
          const newValue = parseInt(localStorage.getItem(ticketCountKey));
  
          // Calculate the charge using the retrieved ticket count
          const charge = calculateCharge(labelText, newValue);
          cells[1].innerText = charge;
        }
      }
    });
  
    CalculateTotalPayableAmount();
  }


// Get the table element
const purchasenow = document.getElementById("purchasenow");
purchasenow.addEventListener("click", ()=>{

    const selecttime = document.getElementById('selecttime');
    const selectedduration = document.getElementById('selectedduration');
    const sumTable = document.querySelector('.sum-table');
    localStorage.setItem("sum-table" , sumTable.innerHTML);
    localStorage.setItem("time" , selecttime.innerText);
    localStorage.setItem("duration" , selectedduration.innerText);
})



