mapboxgl.accessToken = 'pk.eyJ1IjoicGhhbW15MjIiLCJhIjoiY2xhZ2JoNmEwMHI2azN1bzFwczlkMTNqdiJ9.T2vpz0gVbuFh7jAZJo67QA';

//initialize map and details
const map = new mapboxgl.Map({
    container: 'map', //container id
    style: 'mapbox://styles/phammy22/cles4fq22002601qghfyvqfpq', //map style
    center: [-95.7129, 39.7], //starting coordinates
    zoom: 4 //starting zoom level
});

//load violence data
map.on('load', () => {
    map.addSource('reports', {
        type: 'geojson',
        data: '../assets/police_violence.geojson'
    });

    map.addLayer({
        'id': 'report-points',
        'type': 'circle',
        'source': 'reports',
        'paint': {
            'circle-radius': 4,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white'
        }
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
        
    map.on('mouseenter', 'report-points', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const name = e.features[0].properties.name;
        const age = e.features[0].properties.age;
        const date = e.features[0].properties.date;
        const city = e.features[0].properties.city;
        const state = e.features[0].properties.state;
        const agency = e.features[0].properties.agency_resposible;
        const circumstances = e.features[0].properties.circumstances;
        const news = e.features[0].properties.news_urls;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML
            (name + ", " + age + " y/o" + "<br>" + city + ", " + state + "<br>" + date + "<br>" + circumstances + "<br>").addTo(map);
    });
        
    map.on('mouseleave', 'report-points', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});



