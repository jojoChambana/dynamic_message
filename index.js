// I exported the HTML to the message.json file and made two entries "ccTransmittal" and "otherPaymentPages". Ideally, this script would live somewhere on BBIS and each credit card, or payment page would have a an empty div element named "annualReminder" where this script would post the message. Is there a more elegant way of handling this? How would I achieve this messaging without having to manually update every single instance of a CC or other payment page? Could I add this script file in one location on BBIS and reference it everywhere?

// declare a variable that identifies the target on the page where the messaging should appear.
const x = document.getElementById("annualReminder");

// declare a variable to instantiate a new date
const d = new Date();

// variable for the current full year
const thisYear = d.getFullYear();

// variable for the start date. this is arbitrary for now. I have it set to "08/30" for now just so it will show up on the page. I'm thinking "11/30"
const beginDay = new Date("08/30/" + thisYear);

// variable for the end date
const endDay = new Date("12/31/" + thisYear);

// variable for the next year
const nextYear = thisYear + 1;

// Only show this message if the date falls between the end of November until 11:59 pm January 31 CST
if (d > beginDay && d < endDay) {
  //console.log('✅ date is between the 2 dates');
  x.style.display = "block";
} else {
  //console.log('⛔️ date is not in the range');
  x.style.display = "none";
}

// had to internalize the code into the async below to insure that the elements in the json file are on the page before an attempt to locate the innerHTML for the "year" and "nextYear"
(async () => {
  // get the external json
  const message = await fetch("/message.json")
    .then((response) => response.json())
    // get the json node "ccTransmittal"
    .then((data) => (x.innerHTML += data.ccTransmittal));

  // Put the current year in the <span id=\"year\"></span>
  document.getElementById("year").innerHTML = thisYear;

  // Put next year in the <span id=\"nextYear\"></span>
  document.getElementById("nextYear").innerHTML = nextYear;
})();
