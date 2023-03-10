mapboxgl.accessToken = 'pk.eyJ1IjoicGhhbW15MjIiLCJhIjoiY2xhZ2JoNmEwMHI2azN1bzFwczlkMTNqdiJ9.T2vpz0gVbuFh7jAZJo67QA';

//initialize map and details
let map = new mapboxgl.Map({
    container: 'map', //container id
    style: 'mapbox://styles/phammy22/cles4fq22002601qghfyvqfpq', //map style
    center: [-95.7129, 39.7], //starting coordinates
    zoom: 3.5 //starting zoom level
});
/*
// Load the GeoJSON data
map.on('load', function () {
    map.addSource('states', {
      type: 'geojson',
      data: 'assets/demographics.geojson'
    });
  
    // Create a layer to display the state polygons
    map.addLayer({
      id: 'states-layer',
      type: 'fill',
      source: 'states',
      paint: {
        'fill-color': '#f2f0f7',
        'fill-opacity': 0.8
      }
    });
  
    // Add a click event listener to the state polygons
    map.on('click', 'states-layer', function (e) {
      var stateName = e.features[0].properties.STATE;
      var whitePercentage = e.features[0].properties.White;
      var blackPercentage = e.features[0].properties.Black;
      var latinePercentage = e.features[0].properties.Latine;
      var asianPercentage = e.features[0].properties.Asian;
  
      // Display the racial breakdown in a popup
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h3>' + stateName + '</h3>' +
                 '<p>White: ' + whitePercentage + '%</p>' +
                 '<p>Black: ' + blackPercentage + '%</p>' +
                 '<p>Latine: ' + latinePercentage + '%</p>' +
                 '<p>Asian: ' + asianPercentage + '%</p>')
        .addTo(map);
    });
  });


*/
  
map.on('load', function() {
  // Add a GeoJSON source containing your data
  map.addSource('states', {
    'type': 'geojson',
    'data': 'assets/demographics.geojson'
  });


  
  map.once('sourcedata', function() {
    console.log('Data loaded successfully!');
  });
  
  // Add a layer for your data
  /*
  map.addLayer({
    'id': 'states-layer',
    'type': 'fill',
    'source': 'states',
    'paint': {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'STATE'],
        0, '#ffffcc',
        0.2, '#c2e699',
        0.4, '#78c679',
        0.6, '#31a354',
        0.8, '#006837'
      ],
      'fill-opacity': 0.7
    }
  });
  */
  map.addLayer({
    'id': 'state-points',
    'type': 'circle',
    'source': 'states',
    'paint': {
        'circle-radius': 4,
        'circle-stroke-width': 2,
        'circle-color': [
            'match',
            ['get', 'STATE'],
            'White',
            '#F69697',
            '',
            '#000',
            '#D21404'
        ],
        'circle-stroke-color': 'white'
    }
});
  // Create a popup object for displaying state demographic data
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
  });

  // Create an event listener for the 'click' event on the states-layer
  map.on('click', 'state-points', function(e) {
    var state = e.features[0].properties.STATE;
    var white = Math.round(e.features[0].properties.White *100);
    var black = Math.round(e.features[0].properties.Black * 100);
    var latine = Math.round(e.features[0].properties.Latine*100);
    var asian = Math.round(e.features[0].properties.Asian*100);

    // Set the popup HTML to display the state demographic data
    popup.setHTML('<h3>' + state + '</h3>' +
      '<p>White: ' + white + '%</p>' +
      '<p>Black: ' + black + '%</p>' +
      '<p>Latine: ' + latine + '%</p>' +
      '<p>Asian: ' + asian + '%</p>');

    // Set the popup location and open it
    popup.setLngLat(e.lngLat).addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the states-layer
  map.on('mouseenter', 'state-points', function() {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change the cursor back to the default when the mouse leaves the states-layer
  map.on('mouseleave', 'state-points', function() {
    map.getCanvas().style.cursor = '';
  });
});

