// Set up Mapbox access token and create map
mapboxgl.accessToken = 'pk.eyJ1IjoicGhhbW15MjIiLCJhIjoiY2xhZ2JoNmEwMHI2azN1bzFwczlkMTNqdiJ9.T2vpz0gVbuFh7jAZJo67QA';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/phammy22/cles4fq22002601qghfyvqfpq',
  center: [-95.7129, 39.7],
  zoom: 3.5
});



// Load data
map.on('load', function () {
  map.addSource('states', {
    type: 'geojson',
    data: 'assets/output4.json'
  });

  // Add layer for data
  map.addLayer({
    id: 'state-layer',
    type: 'fill',
    source: 'states',
    paint: {
        'fill-opacity': 0.2,
        'fill-outline-color': '#fff'
    }
  });
  
  //initialize statbox
  const statbox = document.getElementById('statbox');

  statbox.setHTML('<h4>Hover over a state to see its demographic data</h4>')

  // Add hover effects
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mousemove', 'state-layer', function(e) {
    var state = e.features[0].properties.STATE;
    var white = Math.round(e.features[0].properties.White * 100);
    var black = Math.round(e.features[0].properties.Black * 100);
    var latine = Math.round(e.features[0].properties.Latine * 100);
    var asian = Math.round(e.features[0].properties.Asian * 100);

    map.getCanvas().style.cursor = 'pointer';
    statbox.setHTML('<h4>' + state + '</h4>' +
                  '<p>White: ' + white + '%</p>' +
                  '<p>Black: ' + black + '%</p>' +
                  '<p>Latine: ' + latine + '%</p>' +
                  '<p>Asian: ' + asian + '%</p>')
  });

  map.on('mouseleave', 'state-layer', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  // Filter by year
  var filterYearEl = document.getElementById('year-filter');
  filterYearEl.addEventListener('change', function() {
    var year = filterYearEl.value;
    if (year !== 'Select a year') {
      map.setFilter('state-layer', ['==', ['get', 'YEAR'], year]);
    } else {
      map.setFilter('state-layer', null);
    }
  });

  // Reset the data source to show all years when the reset button is clicked
  var resetBtnEl = document.getElementById('reset-btn');
  resetBtnEl.addEventListener('click', function() {
    map.setFilter('state-layer', null);
    filterYearEl.selectedIndex = 0;
  });

});


