window.addEventListener("load", init);

function init(){
    const fullname =document.getElementById("fullname")
    const mobilenumber =document.getElementById("mobilenumber")
    const email =document.getElementById("email")
    const gender =document.getElementById("gender")
    const date =document.getElementById("date")
    const duration =document.getElementById("duration")
    const time =document.getElementById("time")
    const summaryTable =document.getElementById("summary-table")
    

    fullname.innerText = localStorage.getItem("fullname")
    mobilenumber.innerText = localStorage.getItem("mobilenumber")
    email.innerText = localStorage.getItem("email")
    gender.innerText = localStorage.getItem("gender")
    date.innerText = localStorage.getItem("selectedDate");
    duration.innerText = localStorage.getItem("duration");
    time.innerText = localStorage.getItem("time");
    summaryTable.innerHTML += localStorage.getItem("newsumtable");
    
}