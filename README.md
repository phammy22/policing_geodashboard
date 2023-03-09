# United States Police Violece Map
##### Since 2013, many people of all races, genders, and walks of life have rallied around the sweeping American social movement known as Black Lives Matter. Originally stemming from protest against excessive use of force predominantly targeting Black men by police officers around the United States, community members would take to the streets not only to communicate their dissatisfaction with policing in the United States, but also to memorialize the victims of these extreme uses of force.

![images]()
> Image description 

### Project Description
##### 10 years later, BLM has become a household term; families talk about the movement at the dinner table, people of all ages post about it on social media, even businesses fly flags outside their doors to show solidarity with the movement. However in the decade since its inception, some things about the movement have changed. Conversations have shifted. The lives that the movement originally started to memorialize have accumulated into a sea of statistics and numbers in an effort to spur systemic policing reform.
##### The goal of this project is to bring back attention to the individual lives that are being taken through police violence. The main feature of this map is to show the exact locations of police violence reports since the beginning of the BLM movement. Users are able to click on the points on the map to see the names, races, and ages of victims of police violence. And if the reader chooses, they may follow a link to a local news article about the police violence report.

### Data Sources
##### United States racial demographic data was pulled from the annual American Community Survey, which is a 1% sample of the US population taken every year. A clean compiled set of this data was acquired through [IPUMS USA](https://usa.ipums.org/usa/).
##### Police Violence report data was acquired from the [Mapping Police Violence](https://airtable.com/shroOenW19l1m3w0H/tblxearKzw8W7ViN8) website. The site has many great info graphics and statistics on police violence in the US, as well as a collection of specific police violence reports.

### Data Processing 
##### The ACS data is a collection of individual observations with multiple attributes to describe an individual taking the survey. These survey results were compiled into proportional demographic data using a simple [R Script](https://github.com/phammy22/policing_geodashboard/blob/main/assets/data_cleaning.R). These data are then used to make a choropleth Mapbox layer.
##### The data from Mapping Police Violence was already very clean, so the data was usable without any sort of heavy duty processing requirements. Points on the map were frawn with a Mapbox layer using the latitude and longitude fields in the dataset. All demographic and individual data for that point is also taken directly from the data table and formatted into a Mapbox popup for viewing when the reader clicks on a point.

### Credits 
##### This web map was created by Sadiiq Mohamed, Myan Pham, Katherine Poch, and Logan Weidner for the University of Washington.

### Acknowledgments
##### Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor nec feugiat nisl pretium fusce. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Id ornare arcu odio ut. 