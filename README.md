
# CSV Blink

An easy an lightweight library to generate CSV strings and parse to json.





[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

[![codecov](https://codecov.io/gh/amaruri/csv-generator/branch/main/graph/badge.svg?token=3DHZ10RAF9)](https://codecov.io/gh/amaruri/csv-generator)

![GitHub top language](https://img.shields.io/github/languages/top/amaruri/csv-generator?color=magenta)

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/amaruri/csv-generator?color=green&style=flat-square)
## Installation

Install csv-blink with npm

```bash
  npm install csv-blink
```
    
## Usage

You can create a CSV with headers and rows as a parameters.

```javascript
const CSV = require('csv-blink')

// Create an instance

const csv = new CSV(
  ['a','b','c'], 
  [
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ])
```

To render the csv just use de file getter

```javascript
csv.file
```

It returns a parsed string with new lines:

```
a,b,c
1,2,3
4,5,6
7,8,9
```

To get the csv as json just use de json getter

```javascript
csv.json
```

It returns a parsed json with headers as a key:

#### Note: To use the json getter the headers are required

```
[
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
  { a: 7, b: 8, c: 9 }
]
```

### Also can initialize only with headers:

```javascript
const csv = new CSV(['a','b','c'])
```
or
```js
const csv = new CSV()

csv.setHeaders(['a','b','c'])
```

### Add each row

```js
csv.addRow([1,2,3])
csv.addRow([4,5,6])
csv.addRow([7,8,9])
```

### Get a row

```js
csv.getRow(2)
```

### Add a column

```js
csv.addColumn('d', [10,11,12])
```

### Get a column

You can get a column by index or header name

```js
csv.getColumn('a')
```

or

```js
csv.getColumn(3)
```

### Set an individual cell

```js
csv.setCell(1, 1, 10)
```

## API Reference

#### Class constructor

```http
  new CSV()
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `headers` | `array` | **Optional**. example `['a','b','c']` |
| `rows` | `array` | **Optional**. example `[[1,2,3], [2,3,4]]` |

#### API

| Methods | Parameters     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `.setHeaders(headers)` | `array` | Set the headers of a csv. |
| `.addRow(row)` | `array` | Add a single row of values, example `[[1,2,3], [4,5,6]]`. |
| `.getRow(index)` | `number` | Returns the values of a row. |
| `.addColumn(header, row)` | `header: string, row: array` | Add a header and a column of values of this header. |
| `.getColumn(column)` | `string \| number` | Returns the values of a column, it search by index or header name. |
| `.setCell(x, y, value)` | `x: number, y:number, val: value` | Sets the value to specified `x, y` position. |
| `.getCell(x, y)` | `number` | Returns the value of the `x, y` specified cell. |
| `.toJson(csv) \| Static` | `string` | Returns the csv passed to param as a json format, the headers of the csv are required. |

| Getters | Returns  | Description |
| :-------- | :------- | :------- |
| `.file` | `string` | Returns the headers and rows as a csv string. |
| `.json` | `json` | Returns the csv values as json format. |



## Readme generated with

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

