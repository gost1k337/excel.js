import { $ } from '@core/Dom'
import { EventEmitter } from '@core/EventEmitter'
import { StoreSubscriber } from '@core/storeSubscriber'

export class Excel {
  constructor(selector, options) { // Инициализирует приложение (#app)
    this.$el = $(selector)
    this.components = options.components || []
    this.store = options.store
    this.emitter = new EventEmitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      store: this.store,
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
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init()) // Инициализация DOMListener`ов
    this.components.forEach(component => component.mounted())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
