import {CHANGE_TABLE_NAME, CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, UPDATE_DATE} from './types'

export function rootReducer(state, action) {
	let field
	switch (action.type) {
		case TABLE_RESIZE:
			field = action.data.type === 'col' ? 'colState' : 'rowState'
			return {...state, [field]: value(state, field, action)}
		case CHANGE_TEXT:
			field = 'dataState'
			return {
				...state,
				currentText: action.data.value,
				[field]: value(state, field, action)
			}
		case CHANGE_TABLE_NAME:
			return {...state, tableName: action.data}
		case CHANGE_STYLES:
			return {...state, currentStyles: action.data}
		case APPLY_STYLE:
			field = 'stylesState'
			const val = state[field] || {}
			action.data.ids.forEach(id => {
				val[id] = {...val[id], ...action.data.value}
			})
			return {
				...state, [field]: val, currentStyles: {...state.currentStyles, ...action.data.value}
			}
		case UPDATE_DATE:
			return {...state, dateState: new Date().toJSON()}
		default: return state
	}
}

function value(state, field, action) {
	const val = state[field] || {}
	val[action.data.id] = action.data.value
	return val
}
