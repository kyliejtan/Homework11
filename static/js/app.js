// from data.js
var sightings = data;
// Initializing a variable for the Filter Table button
var filterButton = d3.select("#filter-btn");
// Setting button behavior on click
filterButton.on("click", function() {
  // Initializing a variable for the input field
  var inputElement = d3.select("#datetime");
  // Initializing a variable for the input
  var inputValue = inputElement.property("value");
  // Initializing a variable for the data filtered by input date
  var filteredData = sightings.filter(sighting => sighting.datetime === inputValue);
  // Initializing a variable with the d3 selection of tbody
  var tbody = d3.select("tbody");
  //
  filteredData.forEach((sighting) => {
    console.log(sighting);
    // Append one table row `tr` to the table body
    var row = tbody.append("tr");
    // Append one cell for signting date
    row.append("td").text(sighting.datetime);
    // Append one cell for signting city
    row.append("td").text(sighting.city);
    // Append one cell for signting state
    row.append("td").text(sighting.state);
    // Append one cell for signting country
    row.append("td").text(sighting.country);
    // Append one cell for signting shape
    row.append("td").text(sighting.shape);
    // Append one cell for signting duration
    row.append("td").text(sighting.duration);
    // Append one cell for signting comments
    row.append("td").text(sighting.comments);
  });




});
