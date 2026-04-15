import { Component } from '@geajs/core'
import appStore from './app-store'
import Navbar from './components/Navbar'
import AnasayfaView from './views/AnasayfaView'
import CamiiView from './views/CamiiView'
import EtkinliklerView from './views/EtkinliklerView'
import KutuphaneView from './views/KutuphaneView'

export default class App extends Component {
  template() {
    return (
      <div class="app-layout">
        <div class="notice-bar" style="background: var(--primary); color: white; text-align: center; padding: 0.5rem; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.05em;">
          📣 Ramazan ayı boyunca tüm bağışlarda %100 şeffaflık garantisi! 🌙
        </div>
        
        <Navbar />

        {appStore.currentView === 'anasayfa' && <AnasayfaView />}
        {appStore.currentView === 'camii' && <CamiiView />}
        {appStore.currentView === 'etkinlikler' && <EtkinliklerView />}
        {appStore.currentView === 'kutuphane' && <KutuphaneView />}

        <footer class="footer-glass">
          <div class="container" style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="max-width: 400px;">
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="background: var(--primary); color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🌙</div>
                <span style="font-size: 1.5rem; font-weight: 800;">Medrese Rehberi</span>
              </div>
              <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.7;">
                Türkiye'nin en kapsamlı ilim merkezleri rehberi. Gönül köprüleri kuruyoruz, geleceği inşa ediyoruz.
              </p>
            </div>
            <div style="display: flex; gap: 5rem;">
              <div class="footer-links">
                <h4 style="margin-bottom: 1.5rem;">Kurumsal</h4>
                <a href="#">Hakkımızda</a>
                <a href="#">Vizyonumuz</a>
                <a href="#">İletişim</a>
              </div>
              <div class="footer-links">
                <h4 style="margin-bottom: 1.5rem;">Kategoriler</h4>
                <a href="#">İslami İlimler</a>
                <a href="#">Hafızlık</a>
                <a href="#">Külliyeler</a>
              </div>
            </div>
          </div>
          <div class="container" style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(0,0,0,0.05); display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-muted);">
            <p>&copy; 2026 Tüm Hakları Saklıdır.</p>
            <div style="display: flex; gap: 2rem;">
              <a href="#" style="color: inherit;">Gizlilik Politikası</a>
              <a href="#" style="color: inherit;">Kullanım Şartları</a>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
