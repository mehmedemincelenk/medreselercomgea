import { Component } from '@geajs/core'
import medreseStore from './medrese-store'
import Navbar from './components/Navbar'
import MedreseCard from './components/MedreseCard'

export default class App extends Component {
  template() {
    const { query, selectedCategory, stats } = medreseStore
    const categories = ['Tümü', 'İslami İlimler', 'Hafızlık', 'Eğitim ve Kültür']

    return (
      <div class="app-layout">
        <div class="notice-bar" style="background: var(--primary); color: white; text-align: center; padding: 0.5rem; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.05em;">
          📣 Ramazan ayı boyunca tüm bağışlarda %100 şeffaflık garantisi! 🌙
        </div>
        
        <Navbar />

        <header class="container" style="padding: 6rem 0 2rem; text-align: center;">
          <hgroup style="margin-bottom: 4rem;">
            <h1 class="hero-title">Medrese Rehberi</h1>
            <p class="hero-subtitle">
              Türkiye'nin kadim ilim yuvalarını keşfedin, manevi mirasa ortak olun.
            </p>
          </hgroup>

          {/* Stats Bar */}
          <div class="stats-bar container" style="display: flex; justify-content: center; gap: 4rem; margin-bottom: 4rem; padding: 2rem; background: rgba(255,255,255,0.4); backdrop-filter: blur(10px); border-radius: 32px; border: 1px solid rgba(255,255,255,0.2);">
            <div class="stat-item">
              <div class="stat-value">{stats.total}</div>
              <div class="stat-label">Kurum</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value">{stats.cities}</div>
              <div class="stat-label">Şehir</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value">{stats.students.toLocaleString()}</div>
              <div class="stat-label">Aktif Talebe</div>
            </div>
          </div>

          <div class="search-section" style="max-width: 800px; margin: 0 auto;">
            <input 
              type="search" 
              class="search-input-custom"
              placeholder="Şehir, medrese veya ilim dalı arayın..." 
              value={query}
              input={(e: any) => medreseStore.setQuery(e.target.value)}
            />
            
            {/* Category Tabs */}
            <div class="category-tabs" style="margin-top: 2.5rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
              {categories.map(cat => (
                <button 
                  key={cat}
                  class={`tab-button ${selectedCategory === cat ? 'active' : ''}`}
                  click={() => medreseStore.setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main class="container" style="padding-bottom: 10rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
            <h2 style="font-size: 2.5rem; margin-bottom: 0;">Öne Çıkan Kurumlar</h2>
            <p style="color: var(--text-muted); font-weight: 600;">{medreseStore.filteredList.length} kurum listeleniyor</p>
          </div>

          {medreseStore.filteredList.length === 0 ? (
            <div class="empty-state">
              <div style="font-size: 5rem; margin-bottom: 2rem;">🕊️</div>
              <h2 style="color: var(--text-muted);">Aradığınız kriterlere uygun bir kurum bulamadık.</h2>
              <button class="outline primary" style="margin-top: 2rem; border-radius: 16px; padding: 0.8rem 2rem;" click={() => { medreseStore.setQuery(''); medreseStore.setCategory('Tümü'); }}>
                Aramayı Sıfırla
              </button>
            </div>
          ) : (
            <div class="medrese-grid">
              {medreseStore.filteredList.map(medrese => (
                <MedreseCard key={medrese.id} medrese={medrese} />
              ))}
            </div>
          )}

          {/* Call to Action Section */}
          <section class="cta-section" style="margin-top: 10rem; padding: 5rem; border-radius: 40px; background: linear-gradient(135deg, var(--primary) 0%, #1a3f1b 100%); color: white; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50px; right: -50px; font-size: 15rem; opacity: 0.1;">🌙</div>
            <h2 style="color: white; font-size: 3rem; margin-bottom: 1.5rem;">Siz de İlim Kervanına Katılın</h2>
            <p style="font-size: 1.3rem; opacity: 0.9; max-width: 700px; margin: 0 auto 3rem; line-height: 1.7;">
              Medresenizi veya vakfınızı sisteme kaydedin, binlerce hayırsever ve talebe ile buluşun.
            </p>
            <div style="display: flex; justify-content: center; gap: 1.5rem;">
              <button style="background: white; color: var(--primary); font-weight: 800; border-radius: 16px; padding: 1rem 3rem; border: none;">Kurumunuzu Kaydedin</button>
              <button class="outline contrast" style="border-color: rgba(255,255,255,0.5); color: white; border-radius: 16px; padding: 1rem 3rem;">Daha Fazla Bilgi</button>
            </div>
          </section>
        </main>

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
