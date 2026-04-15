import { Component } from '@geajs/core'
import appStore from '../app-store'

export default class Navbar extends Component {
  template() {
    return (
      <nav class="custom-navbar">
        <div style="display: flex; align-items: center; gap: 1rem; cursor: pointer;" click={() => appStore.setView('anasayfa')}>
          <div style="background: var(--primary); color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🌙</div>
          <span style="font-size: 1.5rem; font-weight: 800; color: #1a202c;">Medrese Rehberi</span>
        </div>
        <div style="display: flex; gap: 2rem; align-items: center;">
          <a href="#" style={`color: ${appStore.currentView === 'anasayfa' ? 'var(--primary)' : 'var(--text-main)'}; font-weight: 600; text-decoration: none;`} click={(e: any) => { e.preventDefault(); appStore.setView('anasayfa'); }}>Anasayfa</a>
          <a href="#" style={`color: ${appStore.currentView === 'camii' ? 'var(--primary)' : 'var(--text-main)'}; font-weight: 600; text-decoration: none;`} click={(e: any) => { e.preventDefault(); appStore.setView('camii'); }}>Camii</a>
          <a href="#" style={`color: ${appStore.currentView === 'etkinlikler' ? 'var(--primary)' : 'var(--text-main)'}; font-weight: 600; text-decoration: none;`} click={(e: any) => { e.preventDefault(); appStore.setView('etkinlikler'); }}>Etkinlikler</a>
          <a href="#" style={`color: ${appStore.currentView === 'kutuphane' ? 'var(--primary)' : 'var(--text-main)'}; font-weight: 600; text-decoration: none;`} click={(e: any) => { e.preventDefault(); appStore.setView('kutuphane'); }}>Kütüphane</a>
          <button class="outline contrast" style="border-radius: 12px; margin-bottom: 0; font-weight: 700; padding: 0.5rem 1.5rem;">Giriş Yap</button>
        </div>
      </nav>
    )
  }
}
