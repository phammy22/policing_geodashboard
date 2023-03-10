mapboxgl.accessToken = 'pk.eyJ1IjoicGhhbW15MjIiLCJhIjoiY2xhZ2JoNmEwMHI2azN1bzFwczlkMTNqdiJ9.T2vpz0gVbuFh7jAZJo67QA';

//initialize map and details
const map = new mapboxgl.Map({
    container: 'map', //container id
    style: 'mapbox://styles/phammy22/cles4fq22002601qghfyvqfpq', //map style
    center: [-95.7129, 39.7], //starting coordinates
    zoom: 3.5 //starting zoom level
});

// define the asynchronous function to load geojson data.
async function geojsonFetch() {

    // Await operator is used to wait for a promise. 
    // An await can cause an async function to pause until a Promise is settled.
    let response;
    response = await fetch('assets/police_violence.geojson');
    reports = await response.json();

    //load violence data
    map.on('load', () => {
        map.addSource('reports', {
            type: 'geojson',
            data: 'assets/police_violence.geojson'
        });

        map.addLayer({
            'id': 'report-points',
            'type': 'circle',
            'source': 'reports',
            'paint': {
                'circle-radius': 4,
                'circle-stroke-width': 2,
                'circle-color': [
                    'match',
                    ['get', 'race'],
                    'White',
                    '#F69697',
                    '',
                    '#000',
                    '#D21404'
                ],
                'circle-stroke-color': 'white'
            }
        });

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: true
        });

        map.on('click', 'report-points', (e) => {
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
            const race = e.features[0].properties.race;
            const gender = e.features[0].properties.gender;
            
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML
                (name + ", " + age + " y/o " + race + " " + gender + "<br>" + "Date: " + date + "<br>" + circumstances + "<br>" + "<a href='" + news + "' target='_blank' rel='noopener noreferer'>Read More</a>").addTo(map);
        });
        // Change the cursor style to pointer on hover of points
        map.on('mouseenter', 'report-points', () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'report-points', () => {
            map.getCanvas().style.cursor = '';
        });
        // the coordinated chart relevant operations

        // found the the reports in the displayed map view.        
        displReports = calReports(reports, map.getBounds());

        // enumerate the number of reports.

        //*not sure how to enumerate race types
        numReports = displReports[1];

        // update the content of the element reports-count.
        document.getElementById("reports-count").innerHTML = numReports;

        // add "report" to the beginning of the x variable - the reports, and "#" to the beginning of the y variable - the number of reports.
        x = Object.keys(reports);
        x.unshift("reports")
        y = Object.values(reports);
        y.unshift("#")


        // generate the chart
        reportChart = c3.generate({
            size: {
                height: 350,
                width: 460
            },
            data: {
                x: 'reports',
                columns: [x, y],
                type: 'bar', // make a bar chart.
                colors: {
                    '#': (d) => {
                        return colors[d["x"]];
                    }
                },
                onclick: function (
                d) { // update the map and sidebar once the bar is clicked.
                    let floor = parseInt(x[1 + d["x"]]),
                        ceiling = floor + 1;
                    // combine two filters, the first is ['>=', 'mag', floor], the second is ['<', 'mag', ceiling]
                    // the first indicates all the earthquakes with magnitude greater than floor, the second indicates
                    // all the earthquakes with magnitude smaller than the ceiling.

                    //don't know what to filter here
                    // map.setFilter('reports-point',
                    //     ['all',
                    //         ['>=', 'mag', floor],
                    //         ['<', 'mag', ceiling]
                    //     ]);
                }
            },
            axis: {
                x: { //reports
                    type: 'category',
                },
                y: { //count
                    tick: {
                        values: [10, 20, 30, 40]
                    }
                }
            },
            legend: {
                show: false
            },
            bindto: "#report-chart" //bind the chart to the place holder element "report-chart".
        });

    });



    //load data to the map as new layers.
    //map.on('load', function loadingData() {
    map.on('idle', () => { //simplifying the function statement: arrow with brackets to define a function

        reports = calReports(reports, map.getBounds());
        numReports = displReports[1];
        document.getElementById("reports-count").innerHTML = numReports;


        x = Object.keys(reports);
        x.unshift("reports")
        y = Object.values(reports);
        y.unshift("#")

        // after finishing each map reaction, the chart will be rendered in case the current bbox changes.
        reportChart.load({
            columns: [x, y]
        });
    });
}

//load legend with map details
const legend = document.getElementById('legend');

//set up content and labels
let labels = [
    '<strong style="color: #fff; font-size:15pt">Race</strong><br></br>', 
    '<p class="break"><i class="dot" style="' +
        'background: #F69697;' + 
        ' "></i> White</p></br>',

    '<p class="break"><i class="dot" style=' +
        '"background: #D21404;' +  
        ' "></i> Person of Color</p></br>',

    '<p class="break"><i class="dot" style=' +
        '"background: #000;' + 
        ' "></i> Unknown</p><br>',
];

const source =
    '<p style="text-align: left; font-size:9pt; ">Source: <a href="https://airtable.com/shroOenW19l1m3w0H/tblxearKzw8W7ViN8">Mapping Police Violence</a></p>';

//combine content/labels
legend.innerHTML = labels.join('') + source;

// Filter by year
var filterYearEl = document.getElementById('year-filter');
filterYearEl.addEventListener('change', function() {
  var year = filterYearEl.value;
  if (year !== 'Select a year') {
    map.setFilter('report-points', 
    ['all',
        ['==', 'yr', year]
    ]);
  } else {
    map.setFilter('report-points');
  }
});

// call the geojson loading function
geojsonFetch();

function calReports(currentReports, currentMapBounds) {
    let reportsClasses = {
        White: 0,
        Unknown: 0
    };
    currentReports.features.forEach(function (d) { // d indicate a feature of currentReports
        // contains is a spatial operation to determine whether a point within a bbox or not.
        if (currentMapBounds.contains(d.geometry.coordinates)) {
            // if within, the # of the report in the same race increase by 1.
            reportsClasses[Math.floor(d.properties.race)] += 1;
        }
    })
    return reportsClasses;
}

// capture the element reset and add a click event to it.
const reset = document.getElementById('reset');
reset.addEventListener('click', event => {

    // this event will trigger the map fly to its origin location and zoom level.
    map.flyTo({
        zoom: 3.5,
        center: [-106.7129, 39.7]
    });
});
