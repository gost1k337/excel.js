import { clone } from '@core/utils'
import { defaultStyles, defaultTitle } from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'hello'}
  stylesState: {},
  currentText: '',
  tableName: defaultTitle,
  currentStyles: defaultStyles,
  dateState: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})


export const normalizeInitialState = state => {
  return state ? normalize(state) : clone(defaultState)
}
