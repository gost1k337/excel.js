import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name = options.name || ''
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  mounted() {}

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
