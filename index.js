// HTML references
let htmlNumAutoclickers = document.getElementById("curr-autoclickers");
let htmlAutoclickerCost = document.getElementById("autoclicker-cost");
let htmlNumCookies = document.getElementById("curr-cookies");
let htmlNumCookieMultipliers = document.getElementById("num-multipliers");
let htmlCookiesPerClick = document.getElementById("cookies-per-click");
let htmlCookieMultiplierCost = document.getElementById("multiplier-cost");
let htmlCookiesPerSecond = document.getElementById("cookies-per-second");

// Buttons
const cookieButton = document.getElementById("cookie-button");
const autoclickerButton = document.getElementById("autoclicker-button");
const multiplierButton = document.getElementById("multiplier-button");

// Autoclicker
let numAutoclickers = 0; // numAutoclickers = autoclickerCPS
let autoclickerCost = 100; // Cost goes up by 10%

// Cookie Multiplier
let numCookies = 0;
let numCookieMultipliers = 0;
let cookiesPerClick = 1; // Increase by 1.2 to the nth power (n = numCookieMultipliers) Math.pow(1.2, numCookieMultipliers);
let cookieMultiplierCost = 10; // Cost goes up by 10%

let cookiesPerSecond = 0; // This will be used to determine how many cookies are made per second

// Click a cookie
cookieButton.addEventListener("click", () => {
  numCookies = updateNumCookies(cookiesPerClick);
  updatehtmlNumCookies();
})

// Buy an autoclicker
autoclickerButton.addEventListener("click", () => {
  if (canAffordAutoclicker()) {
    numCookies = updateNumCookies(-autoclickerCost);
    updatehtmlNumCookies();

    numAutoclickers += 1;
    updatehtmlNumAutoclickers();

    autoclickerCost = updateAutoclickerCost();
    updatehtmlAutoclickerCost();

    cookiesPerSecond = updateCookiesPerSecond();
    updatehtmlCookiesPerSecond();
  }
})

// Buy a multiplier
multiplierButton.addEventListener("click", () => {
  if (canAffordMultiplier()) {
    numCookies = updateNumCookies(-cookieMultiplierCost);
    updatehtmlNumCookies();

    numCookieMultipliers += 1;
    updatehtmlNumCookieMultipliers();

    cookiesPerClick = updateCookiesPerClick();
    updatehtmlCookiesPerClick();

    cookieMultiplierCost = updateMultiplierCost();
    updatehtmlCookieMultiplerCost();

    cookiesPerSecond = updateCookiesPerSecond();
    updatehtmlCookiesPerSecond();
  }
})

// Update the number of cookies per second
function updateCookiesPerSecond() {
  return Math.round((numAutoclickers * cookiesPerClick + Number.EPSILON) * 10000) / 10000;
}

// Update autoclicker cost
function updateAutoclickerCost() {
  return Math.round((autoclickerCost * 1.1 + Number.EPSILON) * 10000) / 10000;
}

// Update the cost of the multiplier
function updateMultiplierCost() {
  return Math.round((cookieMultiplierCost * 1.1 + Number.EPSILON) * 10000) / 10000;
}

// Update the number of cookies
function updateNumCookies(change) {
  return Math.round((numCookies + change + Number.EPSILON) * 10000) / 10000;
}

// Update the cookies per click
function updateCookiesPerClick() {
  return Math.round((Math.pow(1.2, numCookieMultipliers) + Number.EPSILON) * 10000) / 10000;
}

// Can afford to buy an autoclicker or multiplier
function canAffordAutoclicker() {
  if (numCookies >= autoclickerCost) {
    return true;
  }
  return false;
}
function canAffordMultiplier() {
  if (numCookies >= cookieMultiplierCost) {
    return true;
  }
  return false;
}

formatNumber = new Intl.NumberFormat('en-US');

// HTML Updaters
function updatehtmlCookiesPerSecond() {
  htmlCookiesPerSecond.innerText = "Cookies per second: " + formatNumber.format(cookiesPerSecond);
}
function updatehtmlNumCookies() {
  htmlNumCookies.innerText = "Cookies: " + formatNumber.format(numCookies);
}
function updatehtmlNumAutoclickers() {
  htmlNumAutoclickers.innerText = "Autoclickers: " + formatNumber.format(numAutoclickers);
}
function updatehtmlAutoclickerCost() {
  htmlAutoclickerCost.innerText = "Autoclicker cost: " + formatNumber.format(autoclickerCost);
}
function updatehtmlNumCookieMultipliers() {
  htmlNumCookieMultipliers.innerText = "Multipliers: " + formatNumber.format(numCookieMultipliers);
}
function updatehtmlCookiesPerClick() {
  htmlCookiesPerClick.innerText = "Cookies per click: " + formatNumber.format(cookiesPerClick);
}
function updatehtmlCookieMultiplerCost() {
  htmlCookieMultiplierCost.innerText = "Multiplier cost: " + formatNumber.format(cookieMultiplierCost);
}

setInterval(() =>{
  for (let i = 0; i < numAutoclickers; i++) {
    numCookies = updateNumCookies(cookiesPerClick);
    updatehtmlNumCookies();
  }
}, 1000)
