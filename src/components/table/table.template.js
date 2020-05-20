const CODES = {
  A: 65,
  Z: 90
}


const toCell = () => `<div class='cell' contenteditable></div>`

const toColumn = col => `<div class='column'>${col}</div>`

const createRow = (index, content) => `
  <div class='row'>
    <div class='row-info'>${index ? index : ''}</div>
    <div class='row-data'>${content}</div>
  </div>
`

const toChar = (_, index) => String.fromCharCode(CODES.A + index)

export function createTable(rowsCount=15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  console.log(cols)


  rows.push(createRow(null, cols))

  for (let i=0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i+1, cells))
  }

  return rows.join('')
}
