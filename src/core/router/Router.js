import { $ } from '../dom'
import { ActiveRoute } from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)
    this.page = null
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler(event) {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear()

    const viewPage = ActiveRoute.path.split('/')[0]
    const Page = this.routes[viewPage] || this.routes[Object.keys(this.routes)[0]]
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }

  destroy() {
    window.remove('hashchange', this.changePageHandler)
  }
}
