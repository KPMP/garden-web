const XLSX = require('xlsx');
// https://www.npmjs.com/package/xlsx
// https://docs.sheetjs.com/
// 781,485 weekly downloads
// 0.17.4 • Public • Published 2 months ago

excelPath = './test-datasets/excel-file-testcase.xlsx'
const workbook = XLSX.readFile(excelPath);

const sheet_name_list = workbook.SheetNames;

console.log('------------------------------------------------')
console.log('\n')
console.log('Sheet names:', sheet_name_list)

const sheet1 = workbook.Sheets['Sheet1']

/* Find desired cell and get the value */
const desired_cell = sheet1['A1'];
const desired_value = (desired_cell ? desired_cell.v : undefined);

console.log('------------------------------------------------')
console.log('\n')
console.log('Desired value:', desired_value)


// read all data from sheet
console.log('------------------------------------------------')
console.log('\n')
console.log('All sheet data:', sheet1)


// edit data
sheet1['A1'].v = 'A00000000000'
console.log('------------------------------------------------')
console.log('\n')
console.log(sheet1['A1'].v)

// write out excel data to file system
XLSX.writeFile(workbook, './test-outputs/xlsx-test-data-output.xlsx')