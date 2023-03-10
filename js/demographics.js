mapboxgl.accessToken = 'pk.eyJ1IjoicGhhbW15MjIiLCJhIjoiY2xhZ2JoNmEwMHI2azN1bzFwczlkMTNqdiJ9.T2vpz0gVbuFh7jAZJo67QA';

//initialize map and details
let map = new mapboxgl.Map({
    container: 'map', //container id
    style: 'mapbox://styles/phammy22/cles4fq22002601qghfyvqfpq', //map style
    center: [-95.7129, 39.7], //starting coordinates
    zoom: 4 //starting zoom level
});

async function geojsonFetch() {
  let response = await fetch('assets/covid-rates.json');
  let states = await response.json();
  
map.on('load', function() {
  // Add a GeoJSON source containing your data
  map.addSource('states', {
    'type': 'geojson',
    'data': 'states'
  });


  
  map.once('sourcedata', function() {
    console.log('Data loaded successfully!');
  });
  
  /*
  map.addLayer({
    'id': 'state-layer',
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
*/

map.addLayer({
  'id': 'states-layer',
  'type': 'fill',
  'source': 'states',
  'paint': {
      'fill-color': [
          'match',
          ['get', 'STATE'],
          'Alabama', '#FEB24C',
  'Alaska', '#FD8D3C',
  'Arizona', '#FC4E2A',
  'Arkansas', '#E31A1C',
  'California', '#BD0026',
  'Colorado', '#800026',
  'Connecticut', '#BD0026',
  'Delaware', '#800026',
  'Florida', '#FEB24C',
  'Georgia', '#FC4E2A',
  'Hawaii', '#FD8D3C',
  'Idaho', '#E31A1C',
  'Illinois', '#BD0026',
  'Indiana', '#800026',
  'Iowa', '#BD0026',
  'Kansas', '#800026',
  'Kentucky', '#FEB24C',
  'Louisiana', '#FC4E2A',
  'Maine','#FD8D3C',
  'Maryland','#E31A1C',
  'Massachusetts', '#BD0026',
  'Michigan', '#800026',
  'Minnesota', '#BD0026',
  'Mississippi', '#800026',
  'Missouri', '#FEB24C',
  'Montana', '#FC4E2A',
  'Nebraska', '#FD8D3C',
  'Nevada', '#E31A1C',
  'New Hampshire', '#BD0026',
  'New Jersey', '#800026',
  'New Mexico', '#BD0026',
  'New York', '#800026',
  'North Carolina','#FEB24C',
  'North Dakota','#FC4E2A',
  'Ohio', '#FD8D3C',
  'Oklahoma', '#E31A1C',
  'Oregon', '#BD0026',
  'Pennsylvania', '#800026',
  'Rhode Island', '#BD0026',
  'South Carolina','#800026',
  'South Dakota', '#FEB24C',
  'Tennessee', '#FC4E2A',
  'Texas', '#FD8D3C',
  'Utah', '#E31A1C',
  'Vermont', '#BD0026',
  'Virginia', '#800026',
  'Washington', '#BD0026',
  'West Virginia', '#800026',
  'Wisconsin','#FEB24C',
  'Wyoming', '#FC4E2A'
      ],
      'fill-opacity': 0.8
  }
});


  // Create a popup object for displaying state demographic data
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });


  map.on('mousemove', ({point}) => {
    const state = map.queryRenderedFeatures(point, {
        layers: ['states_layer']
    });
    //var state = e.features[0].properties.STATE;
    var white = Math.round(e.features[0].properties.White * 100);
    var black = Math.round(e.features[0].properties.Black * 100);
    var latine = Math.round(e.features[0].properties.Latine * 100);
    var asian = Math.round(e.features[0].properties.Asian * 100);

    // Set the popup HTML to display the state demographic data
    popup.setHTML('<h3>' + state + '</h3>' +
      '<p>White: ' + white + '%</p>' +
      '<p>Black: ' + black + '%</p>' +
      '<p>Latine: ' + latine + '%</p>' +
      '<p>Asian: ' + asian + '%</p>');

    // Set the popup location and open it
    popup.setLngLat(e.lngLat).addTo(map);

    
   
});

  // Remove the popup when the mouse leaves the states-layer
  map.on('mouseleave', 'states-layer', function() {
    popup.remove();
  });

});
}
geojsonFetch();