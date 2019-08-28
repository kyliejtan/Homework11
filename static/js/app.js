// Initializing functions to capitalize the first letter of a word
function capitalizeFirstLetter(str) {
  if (str.charAt(0) === "(") {
    return "(" + str.charAt(1).toUpperCase() + str.slice(2)}
  else {
    return str.charAt(0).toUpperCase() + str.slice(1)}
};
// Initializing functions to format str data into title case
function titleCase(str) {
    return str.split(" ").map(x => capitalizeFirstLetter(x)).join(" ");
}
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

function sortNumber(a, b) {
  return a - b;
}

const dates = data.map(sighting => sighting.datetime)
const uniqueDates = [...new Set(dates)];
const cities = data.map(sighting => titleCase(sighting.city) + ", " + sighting.state.toUpperCase())
const uniqueCities = [...new Set(cities)].sort();
const states = data.map(sighting => sighting.state.toUpperCase())
const uniqueStates = [...new Set(states)].sort();
const countries = data.map(sighting => sighting.country.toUpperCase())
const uniqueCountries = [...new Set(countries)];
const shapes = data.map(sighting => titleCase(sighting.shape))
const uniqueShapes = [...new Set(shapes)].sort();
const durations = data.map(sighting => timeToMinutes(sighting.durationMinutes))
const uniqueDurations = [...new Set(durations)].sort(sortNumber);

const uniqueLists = [
  {"#date": uniqueDates},
  {"#city": uniqueCities},
  {"#state": uniqueStates},
  {"#country": uniqueCountries},
  {"#shape": uniqueShapes},
  {"#duration": uniqueDurations}];

uniqueLists.forEach((uniqueList) => {
  // Iterate through each key and value
  Object.entries(uniqueList).forEach(([key, value]) => {
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
});

// This prevents the dropdown from closing after a link is clicked
$('.dropdown-menu').on('click', function(e) {
  e.stopPropagation();
});

//
let checkedArray = []
//
const searchButton = d3.select(".search")
//
function handleClick() {
  let checkedArray = []
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

  for (var i = 0; i < checkboxes.length; i++) {
    let valuee = checkboxes[i].value;
    let id = checkboxes[i].id;
    checkedArray.push({
        key:   id,
        value: valuee
    });
  }
  console.log(checkedArray);
};
searchButton.on("click", handleClick);
