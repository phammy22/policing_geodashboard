library(ipumsr)
library(tidyverse)
library(knitr)
library(scales)
library(sf)


# Change these directories to where your data file is stored and to where you want to save plots; these are in a subdirectory of the R project where the .Rmd file is located.
dataDir <- "./final_proj_data"  #read data file dir
dataDir2 <- "./output"  #save plot files dir

ddi <- read_ipums_ddi(file.path(dataDir,"usa_00007.xml")) # ACS download
data <- read_ipums_micro(ddi, verbose=FALSE)

# display first few rows of data file 
#kable(head(data))

# extract variable names the traditional way
varname <- as.data.frame(colnames(data))

# interactively view variables, labels/descriptions, values, generates a web page
# ipums_view(ddi, "ACS2019_codebook.html", launch=FALSE)


# make a new variable from STATENAME from STATEFIP labels
STATEFIP <- ipums_val_labels(ddi, STATEFIP)  

# add STATEFIP labels to our data extract as new variable STATENAME
data$STATENAME <- as_factor(data$STATEFIP)

# extract variable names the traditional way
varname <- as.data.frame(colnames(data))

state_split <- data %>% 
  group_by(STATENAME, YEAR) %>% 
  mutate(StatePop=sum(PERWT)) %>% 
  ungroup()

state_split <- state_split %>% 
  mutate(Race=case_when(
    HISPAN > 0 & HISPAN < 9 ~ "Latine", # People who report Hispanic heritage
    RACE == 1 ~ "White", #People who are not Hispanic and are White
    RACE == 2 ~ "Black", #People who are not Hispanic and are Black
    RACE >= 4 & RACE <= 6 ~ "Asian")) %>%  #People who are not Hispanic and are Asian
  filter(!is.na(Race)) %>% 
  group_by(Race, STATENAME, YEAR) %>% 
  mutate(RaceProp=sum(PERWT)/StatePop) %>% 
  distinct(STATENAME, RaceProp, YEAR) %>% 
  select(STATENAME, Race, RaceProp, YEAR) %>% 
  pivot_wider(names_from = Race, 
              values_from = RaceProp)

write.csv(state_split, file=file.path(dataDir2, "ACS_Demographics_2013-21.csv"), row.names=FALSE)
  