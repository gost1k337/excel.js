import {storage} from '@core/utils'

const storageName = param => `excel:${param}`

export class LocalStorageClient {
	constructor(name) {
		this.name = storageName(name)
	}
	save(state) {
		storage(this.name, state)
		return Promise.resolve()
	}

	get() {
		// return Promise.resolve(storage(this.name))
		return new Promise(res => {
			const state = storage(this.name)

			setTimeout(() => {
				res(state)
			}, 2000)
		})
	}
}
