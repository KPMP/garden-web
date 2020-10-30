USE `arranger`;
LOAD DATA INFILE 'search_keyword.csv' 
INTO TABLE search_keyword
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;