import pandas as pd

excelPath = './test-datasets/excel-file-testcase.xlsx'

xlsx = pd.ExcelFile(excelPath)
df1 = pd.read_excel(xlsx, 'Sheet1')
df2 = pd.read_excel(xlsx, 'Sheet2')

#print sheet headers
cols1 = df1.columns.ravel()
print(cols1)

#sheet two headers
cols2 = df2.columns.ravel()
print(cols2)

print('------------------------------------------------')
print('\n')
print('Excel values:', df1['A'].tolist())
# Excel values: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15', 'A16', 'A17', 'A18']

print('------------------------------------------------')
print('\n')

# read all data from sheet
for header in cols1:
    print(df1[str(header)].tolist())

# edit data
df1['A'][0] = 'A00000000000'

# converting to other types
print('------------------------------------------------')
print('\n')
print('Convert Data to JSON format - ', df1.to_json(orient='records'))
print('------------------------------------------------')
print('\n')
print('Convert Data to CSV format -', df1.to_csv(index=False))


# write out excel data to file system
df1.to_excel('./test-outputs/pandas-test-data-output.xlsx', engine='xlsxwriter')
