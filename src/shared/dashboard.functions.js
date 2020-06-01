import { storage } from '@core/utils'
function toHTML(key) {
  const id = key.split(':')[1]
  const {tableName, dateState} = storage(key)
  return `
          <li class="db__record">
            <a href="#excel/${id}">${tableName}</a>
            <strong>
                ${new Date(dateState).toLocaleDateString()}
                ${new Date(dateState).toLocaleTimeString()}
            </strong>
          </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i=0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  // const names = keys.map(key => storage(key).tableName)
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`
  }
  return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата Открытия</span>
    </div>

    <ul class="db__list">
        ${ keys.map(key => toHTML(key)).join('') }
    </ul>
  `
}
