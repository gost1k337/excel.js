import { $ } from '@core/Dom'
import { EventEmitter } from '@core/EventEmitter'
import { StoreSubscriber } from '@core/storeSubscriber'
import { updateDate } from '@/redux/actions'
import { preventDefault } from '@core/utils'

export class Excel {
  constructor(options) { // Инициализирует приложение (#app)
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
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root.$el
  }

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault)
    }
    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init()) // Инициализация DOMListener`ов
    this.components.forEach(component => component.mounted())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
    document.removeEventListener('contextmenu', preventDefault)
  }
}
