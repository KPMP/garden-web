# for ssconvert
# http://www.gnumeric.org/

# converts xlsx to csv, 1 csv per tab
ssconvert -S ./test-datasets/excel-file-testcase.xlsx ./test-outputs/excel-file-testcase.csv


# read all data from sheet
awk -F"," '{print $0, $NF}' excel-file-testcase.csv.0
