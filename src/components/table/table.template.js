import { toInlineStyles } from '@core/utils'
import { defaultStyles } from '@/constants'
import { parse } from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 25

const toCell = (state, row) => (_, col) => {
  const id = `${row}:${col}`
  const styles = toInlineStyles({
    ...defaultStyles,
    ...state.stylesState[id],
  })
  const data = getCellText(state.dataState, `${id}`)
  return `
    <div class="cell"
    contenteditable 
    data-col='${col}'
    data-id='${id}'
    data-type='cell'
    data-value="${data || ''}"
    style="width:${getWidth(state.colState, col)};${styles}"
    >
    ${parse(data) || ''}
    </div>
  `
}

const toColumn = ({col, index, width}) => `
  <div class='column' data-type='resizable' data-col='${index}' style="width:${width}">
    ${col}
    <div class='col-resize' data-resize="col"></div>
  </div>
`

const createRow = (index, content, state) => `
  <div class='row' data-type="resizable" data-row="${index}" style="height: ${getHeight(state, index)}">
    <div class='row-info'>
      ${index ? index : ''}
      ${index ? '<div class="row-resize" data-resize="row" ></div>' : ''}
    </div>
    <div class='row-data'>${content}</div>
  </div>
`

const toChar = (_, index) => String.fromCharCode(CODES.A + index)

const getWidth = (state, index) => {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

const getHeight = (state, index) => {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

const getCellText = (state, id) => state[id] || ''

const withWidthFrom = state => {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount=15, state={}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let i=0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(withWidthFrom)
        .map(toCell(state, i))
        .join('')
    rows.push(createRow(i+1, cells, state.rowState))
  }

  return rows.join('')
}
