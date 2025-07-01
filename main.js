// VARIABLES

/** Left side Variables */
const billInput = document.querySelector("#bill");
const tipBtns = document.querySelectorAll(".tip button");
const ownTipInput = document.querySelector(".tip #own");
const peopleInput = document.querySelector("#people");
const erroMsg = document.querySelector("span");

/** Right side Variables */
const displays = document.querySelectorAll(".rightDisplay h2");
const resetBtn = document.querySelector(".bottom button");

// Global State Variables
let billValue = 0;
let tip = 0;
let numberOfPeople = 0;

// FUNCTIONS

function countTip() {
    if (numberOfPeople === 0) return;

    let tipAmount = (billValue * tip) / numberOfPeople;
    let total = (billValue / numberOfPeople) + tipAmount;

    displays[0].innerHTML = `$ ${tipAmount.toFixed(2)}`;
    displays[1].innerHTML = `$ ${total.toFixed(2)}`;

    if (billValue !== 0) {
        resetBtn.classList.add("active");
    } else {
        resetBtn.classList.remove("active");
    }
}

function resetCalculator() {
    billInput.value = "";
    peopleInput.value = "";
    ownTipInput.value = "";

    tipBtns.forEach(btn => btn.classList.remove("active"));

    erroMsg.style.display = "none";
    peopleInput.style.outline = "none";

    displays[0].innerHTML = "$ 0.00";
    displays[1].innerHTML = "$ 0.00";

    billValue = 0;
    tip = 0;
    numberOfPeople = 0;

    resetBtn.classList.remove("active");
}

// EVENT LISTENERS

billInput.addEventListener("input", () => {
    billValue = parseFloat(billInput.value) || 0;
    if (tip !== 0 && numberOfPeople !== 0) {
        countTip();
    }
});

peopleInput.addEventListener("input", () => {
    numberOfPeople = parseInt(peopleInput.value) || 0;

    if (numberOfPeople === 0) {
        erroMsg.style.display = "block";
        peopleInput.style.outline = `3px solid red`;
    } else {
        erroMsg.style.display = "none";
        peopleInput.style.outline = `none`;
        countTip();
    }
});

tipBtns.forEach(function (btn) {
    btn.addEventListener("click", (event) => {
        event.preventDefault();

        ownTipInput.value = "";

        tipBtns.forEach((tipBtn) => tipBtn.classList.remove("active"));
        event.target.classList.add("active");

        tip = parseFloat(event.target.innerHTML) / 100;

        if (billValue !== 0 && numberOfPeople !== 0) {
            countTip();
        }
    });
});

ownTipInput.addEventListener("input", () => {
    tipBtns.forEach((tipBtn) => tipBtn.classList.remove("active"));

    tip = parseFloat(ownTipInput.value) / 100 || 0;

    if (billValue !== 0 && numberOfPeople !== 0) {
        countTip();
    }
});

resetBtn.addEventListener("click", resetCalculator);
