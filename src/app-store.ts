import { Store } from '@geajs/core'

class AppStore extends Store {
  currentView = 'anasayfa' // 'anasayfa', 'camii', 'etkinlikler', 'kutuphane'

  setView(view: string) {
    this.currentView = view
  }
}

export default new AppStore()
