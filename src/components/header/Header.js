import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import * as actions from '@/redux/actions'
import {debounce} from '@core/utils'
import { ActiveRoute} from '@core/router/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }
  toHTML() {
    const tableName = this.store.getState()['tableName']
    return `
      <input value='${tableName}' type="text" class="input">

      <div>
        
        <div class="button" data-button="delete">
          <i class="material-icons" data-button="delete">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

      </div>
    `
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    } else if ($target.data.button === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    }
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$dispatch(actions.changeTableName(text))
  }
}
