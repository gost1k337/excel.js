import { Page } from '@core/page/Page'
import { Table } from '@/components/table/Table'
import { Formula } from '@/components/formula/Formula'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Header } from '@/components/header/Header'
import { Excel } from '@/components/excel/Excel'
import { normalizeInitialState } from '@/redux/initialState'
import { rootReducer } from '@/redux/rootReducer'
import { createStore } from '@core/store/createStore'
import { StateProcessor } from '@core/page/StateProcessor'
import { LocalStorageClient } from '@/shared/LocalStorageClient'


export class ExcelPage extends Page {
  constructor(param) {
    super(param)
    this.storeSub = null
    this.processor = new StateProcessor(
        new LocalStorageClient(this.params)
    )
  }
  async getRoot() {
    const state = await this.processor.get()
    const store = createStore(rootReducer, normalizeInitialState(state))

    this.storeSub = store.subscribe(this.processor.listen)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}
