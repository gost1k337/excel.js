import { $ } from '@core/Dom'
import { EventEmitter } from '@core/EventEmitter'

export class Excel {
  constructor(selector, options) { // Инициализирует приложение (#app)
    this.$el = $(selector)
    this.components = options.components || []
    this.emitter = new EventEmitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter
    }
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions) // prepare hook закончен
      if (component.name) {
        window['c'+component.name] = component
      }
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot()) // Рендерит шаблоны компонентов в корневой див (#app)
    this.components.forEach(component => component.init()) // Инициализация DOMListener`ов
    // this.components.forEach(component => component.mounted())
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
