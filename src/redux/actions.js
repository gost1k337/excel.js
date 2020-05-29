import {CHANGE_TEXT, TABLE_RESIZE, CHANGE_TABLE_NAME, CHANGE_STYLES, APPLY_STYLE, UPDATE_DATE} from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function changeTableName(data) {
  return {
    type: CHANGE_TABLE_NAME,
    data
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  }
}

export function updateDate() {
  return {
    type: UPDATE_DATE
  }
}
