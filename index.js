class CSV {
  constructor (headers = null, rows = null) {
    this.headers = headers
    this.rows = rows
  }

  get file () {
    this._equalizeHeaders()
    this._equalizeRows()
    return [this.headers, this.rows.join('\n')].join('\n')
  }

  get json () {
    if (!this.headers) {
      throw new Error('CSV headers are not defined')
    }
    return CSV.toJson(this.file)
  }

  static toJson (csv) {
    if (!csv) {
      throw new Error('CSV file is required')
    }
    const text = csv.split(/[\r\n|\r|\n]/).filter(row => row)

    const headers = text.shift().split(',')
    const rows = text.map(row => row.split(','))

    const result = rows.map(row => {
      const obj = {}
      headers.forEach((header, index) => {
        obj[header] = row[index]
      })
      return obj
    })

    return result
  }

  createTable (headers, rows) {
    this.headers = headers
    this.rows = rows
    return this
  }

  setHeaders (headers) {
    this._validArray(headers, 'Headers')
    this.headers = headers
  }

  addColumn (header, rows = []) {
    if (Array.isArray(header)) {
      throw Error('Cannot set a column with array')
    }

    this._validArray(rows, 'Rows')
    if(this.isFirstColumn()) {
      this.headers = [header]
      rows.forEach((row, index) => this.setCell(0, index + 1, row))
    } else {
      const headersLastIndex = this.headers.length
      this.headers.push(header)
      rows.forEach((row, index) => this.setCell(headersLastIndex, index + 1, row))
    }
  }

  addRow (row) {
    this._validArray(row, 'Row')
    if(this.isFirstRow()) {
      this.rows = [row]
    } else {
      this.rows.push(row)
    }
  }

  getCell (x, y) {
    if (x < 0 || y < 0) {
      throw Error('Only positive values')
    }

    if (y === 0) {
      return this.headers[x]
    } else {
      return this.rows[y - 1][x]
    }
  }

  setCell (x, y, val) {
    if (x < 0 || y < 0) {
      throw Error('Only positive values')
    }

    if (y === 0) {
      this.headers[x] = val
    } else {
      const rowsLength = (this.rows || []).length
      const startRow = (y - 1) - rowsLength
      if (startRow >= 0) {
        for (let index = 0; index <= startRow; index++) {
          this.addRow([])
        }
      }
      this.rows[y - 1][x] = val
    }
  }

  getColumn (x) {
    let headerIndex = this.headers.findIndex(header => header === x)
    if (headerIndex === -1) {
      headerIndex = x
    }
    return this.rows.map(row => row[headerIndex])
  }

  getRow (y) {
    return this.rows[y]
  }

  isFirstRow () {
    return !this.rows
  }

  isFirstColumn () {
    return !this.headers
  }

  _validArray (val, type) {
    if (!Array.isArray(val)) {
      throw new Error(`${type} must be an array.`)
    }
    return true
  }

  _equalizeHeaders () {
    if (this.headers) {
      const max = Math.max(...this.rows.map(row => row.length))
      if (max > this.headers.length) {
        const diff = max - this.headers.length
        for (let index = 0; index < diff; index++) {
          this.addColumn('')
        }
      }
    }
  }

  _equalizeRows () {
    const headersLength = (this.headers || []).length
    const max = Math.max(headersLength, ...this.rows.map(row => row.length))
    for (const row of this.rows) {
      if (max > row.length) {
        const diff = max - row.length
        const start = row.length
        for (let index = 0; index < diff; index++) {
          row.splice(start, 0, '')
        }
      }
    }
  }
}

module.exports = CSV;