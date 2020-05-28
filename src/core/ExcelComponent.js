import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.prepare()
  }
  // Настраиваем компонент до init
  prepare() {}
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  // Уведомляем слушателей event'a
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Сюда приходит изменения по тем полям, на которые подписаны
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }
  // Вызывается после полной инициализации компонента
  mounted() {}
  // Инициализация коспонента, Добавляем DOM listeners
  init() {
    this.initDOMListeners()
  }
  // Удаление компонента, Чистим DOM listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
