const CSV = require('../index.js');

test('Create a new CSV', function () {
  const csv = new CSV();
  expect(csv.headers).toBe(null);
  expect(csv.rows).toBe(null);
});

test('Create a CSV with headers and rows', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6]]);
  expect(csv.headers.length).toBe(3);
  expect(csv.rows.length).toBe(2);
});

test('Create a CSV and then add data', function () {
  const csv = new CSV();
  csv.createTable(['a', 'b', 'c'], [[1,2,3], [4,5,6]]);
  expect(csv.headers.length).toBe(3);
  expect(csv.rows.length).toBe(2);
});

test('Create a CSV and then set headers', function () {
  const csv = new CSV();
  csv.setHeaders(['a', 'b', 'c']);
  expect(csv.headers.length).toBe(3);
});

test('Throw error if headers are not array', function () {
  const csv = new CSV();
  expect(() => { csv.setHeaders('a,b,c') }).toThrow();
});

test('Add a first column header', function () {
  const csv = new CSV();
  csv.addColumn('a');
  expect(csv.headers.length).toBe(1);
});

test('Add a column header', function () {
  const csv = new CSV(['a', 'b']);
  csv.addColumn('c');
  expect(csv.headers.length).toBe(3);
});

test('Add a first column', function () {
  const csv = new CSV();
  csv.addColumn('a', [1,2,3]);
  expect(csv.headers.length).toBe(1);
  expect(csv.rows.length).toBe(3);
});

test('Add a column', function () {
  const csv = new CSV();
  csv.addColumn('a', [1,2,3]);
  csv.addColumn('b', [4,5,6]);
  expect(csv.headers.length).toBe(2);
  expect(csv.rows.length).toBe(3);
});

test('Throw error when add a column with array headers', function () {
  const csv = new CSV();
  expect(() => { csv.addColumn(['a'], [1,2,3]) }).toThrow();
})

test('Add a first row', function () {
  const csv = new CSV();
  csv.addRow([1,2,3]);
  expect(csv.rows.length).toBe(1);
});

test('Add a row', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6]]);
  csv.addRow([7,8,9]);
  expect(csv.rows.length).toBe(3);
});

test('Throw error if row is not valid array', function () {
  const csv = new CSV();
  expect(() => { csv.addRow('a,b,c') }).toThrow();
})

test('Get a cell value with headers', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  expect(csv.getCell(0, 1)).toBe(1);
  expect(csv.getCell(0, 2)).toBe(4);
  expect(csv.getCell(0, 3)).toBe(7);
})

test('Get a cell value without headers', function () {
  const csv = new CSV();
  csv.addRow([1,2,3]);
  csv.addRow([4,5,6]);
  csv.addRow([7,8,9]);
  expect(csv.getCell(0, 1)).toBe(1);
  expect(csv.getCell(0, 2)).toBe(4);
  expect(csv.getCell(0, 3)).toBe(7);
})

test('Get a cell header value', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  expect(csv.getCell(0, 0)).toBe('a');
  expect(csv.getCell(1, 0)).toBe('b');
  expect(csv.getCell(2, 0)).toBe('c');
})

test('Throw error if search value is negative', function () {
  const csv = new CSV();
  expect(() => { csv.getCell(-1, 0) }).toThrow();
})

test('Set cell value', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  csv.setCell(0, 1, 10);
  expect(csv.getCell(0, 1)).toBe(10);
})

test('Set cell value to inexistent position', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  csv.setCell(0, 10, 10);
  expect(csv.getCell(0, 10)).toBe(10);
})

test('Change cell header value', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  csv.setCell(0, 0, 'd');
  expect(csv.getCell(0, 0)).toBe('d');
})

test('Set cell header value', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  csv.setCell(10, 0, 'd');
  expect(csv.getCell(10, 0)).toBe('d');
})

test('Throw error if set positions is negative', function () {
  const csv = new CSV();
  expect(() => { csv.setCell(-1, 0, 10) }).toThrow();
  expect(() => { csv.setCell(0, -1, 10) }).toThrow();
})

test('Get column by header name', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  expect(csv.getColumn('b')).toEqual([2,5,8]);
})

test('Get column by index', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  expect(csv.getColumn(1)).toEqual([2,5,8]);
})

test('Get row', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  expect(csv.getRow(1)).toEqual([4,5,6]);
})

test('Get csv file', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  expect(csv.file).toMatch('a,b,c\n1,2,3\n4,5,6\n7,8,9');
})

test('Get csv as json', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  expect(csv.json).toEqual([
    { a: '1', b: '2', c: '3' },
    { a: '4', b: '5', c: '6' },
    { a: '7', b: '8', c: '9' }
  ]);
})

test('Parse a csv string as json', function () {
  expect(CSV.toJson('a,b,c\n1,2,3\n4,5,6\n7,8,9')).toEqual([
    { a: '1', b: '2', c: '3' },
    { a: '4', b: '5', c: '6' },
    { a: '7', b: '8', c: '9' }
  ]);
})

test('Throw error if csv is not provided to json parser', function () {
  expect(() => { CSV.toJson() }).toThrow();
})

test('Set empty spaces if set value to inexistent position', function () {
  const csv = new CSV(['a', 'b', 'c'], [[1,2,3], [4,5,6], [7,8,9]]);
  csv.setCell(4, 4, 10);
  expect(csv.json).toStrictEqual([
    { a: '1', b: '2', c: '3', '': '' },
    { a: '4', b: '5', c: '6', '': '' },
    { a: '7', b: '8', c: '9', '': '' },
    { a: '', b: '', c: '', '': '10' }
  ]);
})

test('Throw error to get json if theres not headers defined', function () {
  const csv = new CSV();
  csv.addRow([1,2,3]);
  csv.addRow([4,5,6]);
  csv.addRow([7,8,9]);
  expect(() => { csv.json; }).toThrow();
})

test('Get file without headers', function () {
  const csv = new CSV();
  csv.addRow([1,2,3]);
  csv.addRow([4,5,6]);
  csv.addRow([7,8,9]);
  expect(csv.file).toMatch('1,2,3\n4,5,6\n7,8,9');
})