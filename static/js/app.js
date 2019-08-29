// Initializing functions to capitalize the first letter of a word
function capitalizeFirstLetter(str) {
  if (str.charAt(0) === "(") {
    return "(" + str.charAt(1).toUpperCase() + str.slice(2)}
  else {
    return str.charAt(0).toUpperCase() + str.slice(1)}
};
// Initializing a function to format str data into title case
function titleCase(str) {
    return str.split(" ").map(x => capitalizeFirstLetter(x)).join(" ")
};
// Initializing a function to format the names of countries into title case, or
// all caps in the case of the US
function countryNameFormatter(str) {
  if (str === "us") {
    return str.toUpperCase()}
  else {
    return titleCase(str)}
};
//Initializing a funtion to format duration data into mintutes
function timeToMinutes(str) {
  function dashSplitter(str) {
    firstSplit = str.split("min")[0]
    return (parseInt(firstSplit.split("-")[1]) + parseInt(firstSplit.split("-")[0]))/2
  }
  if (str.includes("min")) {
    if (str.includes("-")) {
      return dashSplitter(str).toFixed(2)}
    else {
      return (parseInt(str.split("min")[0]).toFixed(2))}}
  else if (str.includes("sec")) {
    if (str.includes("-")) {
      return (dashSplitter(str)/60).toFixed(2)}
    else {
      return (parseInt(str.split("sec")[0])/60).toFixed(2)}}
  else if (str.includes("hour")) {
    if (str.includes("-")) {
      return (dashSplitter(str)*60).toFixed(2)}
    else {
      return (parseInt(str.split("hour")[0])*60).toFixed(2)}}
  else if (str.includes("day")) {
    if (str.includes("-")) {
      return (dashSplitter(str)*1440).toFixed(2)}
    else {
      return (parseInt(str.split("day")[0])*1440).toFixed(2)}}
  else if (str.includes("week")) {
    if (str.includes("-")) {
      return (dashSplitter(str)*10080).toFixed(2)}
    else {
      return (parseInt(str.split("week")[0])*10080).toFixed(2)}}
  else {
    return str}
};
// Initializing a function that will allow uniqueDurations to be sorted in
// numerically ascending order
function sortNumber(a, b) {
  return a - b;
};
// Formatting the sighting data held in data so that the formatted search terms
// that the user selects can be matched to it
let formattedData = []
data.forEach(sighting => {
  formattedData.push({
    datetime: sighting.datetime,
    city: titleCase(sighting.city) + ", " + sighting.state.toUpperCase(),
    state: sighting.state.toUpperCase(),
    country: countryNameFormatter(sighting.country),
    shape: titleCase(sighting.shape),
    durationMinutes: timeToMinutes(sighting.durationMinutes),
    comments: sighting.comments
  })
});
// Initializing arrays to hold the unique values for each field
const dates = formattedData.map(sighting => sighting.datetime);
const uniqueDates = [...new Set(dates)];
const cities = formattedData.map(sighting => sighting.city);
const uniqueCities = [...new Set(cities)].sort();
const states = formattedData.map(sighting => sighting.state);
const uniqueStates = [...new Set(states)].sort();
const countries = formattedData.map(sighting => sighting.country);
const uniqueCountries = [...new Set(countries)];
const shapes = formattedData.map(sighting => sighting.shape);
const uniqueShapes = [...new Set(shapes)].sort();
const durations = formattedData.map(sighting => sighting.durationMinutes);
const uniqueDurations = [...new Set(durations)].sort(sortNumber);
// Initializing a dictionary of the arrays of unique values for
// each field
const uniqueLists = {
  "#date": uniqueDates,
  "#city": uniqueCities,
  "#state": uniqueStates,
  "#country": uniqueCountries,
  "#shape": uniqueShapes,
  "#duration": uniqueDurations};
// Using a for-loop to loop through each dictionary of uniqueLists and build
// the dropdown checkboxes for each field's parameters
// uniqueLists.forEach((uniqueList) => {
  // Iterate through each key and value
  Object.entries(uniqueLists).forEach(([key, value]) => {
    d3.select(key)
      .selectAll(".dropdown-item")
      .data(value)
      .enter()
      .append("label")
      .text(function(d) {return d + " "})
      .classed("dropdown-item",true)
      .append("input")
      .text(function(d) {return d + " "})
      .attr("type", "checkbox")
      .attr("id", key)

      .attr("value", function(d) {return d})
   });
// });
// This prevents the dropdown from closing after a link is clicked
$('.dropdown-menu').on('click', function(e) {
  e.stopPropagation();
});
// Initializing an empty array that will hold all of the user-defined query
// terms for each field
// Initializing a variable with the d3 selected searchButton element
const searchButton = d3.select(".search")
// Initializing variables to hold the d3 selected tr and tbody elements
let tr= d3.select("tr");
let tbody = d3.select("tbody");
// Initializing a function that will store all of the user-selected search
// terms in a dictionaries with each term's type as its key
function searchClick() {
  console.log("Search completed.");
  let termArray = []
  let checkedArray = {"#date": [], "#city": [], "#state": [],
  "#country": [], "#shape": [], "#duration": []};
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  // Using a for-loop to collect all of the values checked by the user and
  // store them as a dictionary in the array, checkedArray
  for (var i = 0; i < checkboxes.length; i++) {
    let val = checkboxes[i].value;
    let id = checkboxes[i].id;
    checkedArray[id].push(val);
    };
  // Using a for-loop to push all possible search terms to each checkedArray
  // key that has length 0
  Object.keys(checkedArray).forEach(id => {
    if (checkedArray[id].length === 0) {
      checkedArray[id]=uniqueLists[id]
    }
    // Concatinating each checkedArray[id] array with termArray in order to
    // create a single array that sighting data in formattedData can be matched
    // to
    termArray = termArray.concat(checkedArray[id])
  })
  // Initializing an empty array to hold data from formattedData that matched
  // with the user-selected search terms
  filteredData = []
  // Using a for-loop to match the values of each sighting in formattedData
  // with the user-selected search terms held in termArray
  formattedData.forEach(sighting => {
    if (
      termArray.includes(sighting.datetime) &&
      termArray.includes(sighting.city) &&
      termArray.includes(sighting.state) &&
      termArray.includes(sighting.country) &&
      termArray.includes(sighting.shape) &&
      termArray.includes(sighting.durationMinutes)) {
      filteredData.push(sighting);
    }
  })
  // Initializing a variable with the d3 selected tr element
  let row = tbody.append("tr");
  // Appending column headers to row
  row.append("th").text("Date");
  row.append("th").text("City");
  row.append("th").text("State");
  row.append("th").text("Country");
  row.append("th").text("Shape");
  row.append("th").text("Duration");
  row.append("th").text("Comments");
  // Using a for-loop to append each sighting matching the user-selected terms
  // to a new row
  filteredData.forEach((sighting) => {
    let row = tbody.append("tr");
    row.append("td").text(sighting.datetime);
    row.append("td").text(sighting.city);
    row.append("td").text(sighting.state);
    row.append("td").text(sighting.country);
    row.append("td").text(sighting.shape);
    row.append("td").text(sighting.duration);
    row.append("td").text(sighting.comments);
  })
};
// Setting searchButton to initiate the searchClick function upon a click
searchButton.on("click", searchClick);
// Initializing a variable with the d3 selected clearButton element
const clearButton = d3.select(".clear")
// Initializing a function that will uncheck all of the user-selected checkboxes
function UnSelectAll() {
  $('input[type=checkbox]').prop('checked',false);
  tr.html("")
  tbody.html("")
  console.log("Form cleared.");
};
// Setting clearButton to initiate the searchClick function upon a click
clearButton.on("click", UnSelectAll);
