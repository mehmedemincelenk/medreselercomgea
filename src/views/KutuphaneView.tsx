import { Component } from '@geajs/core'
import libraryStore from '../library-store'
import PrintService from '../services/PrintService'

export default class KutuphaneView extends Component {
  handleViewPdf(book: any) {
    // In a real app this would open a PDF viewer. Here we simulate.
    alert(`[Simülasyon] ${book.title} PDF dosyası tarayıcıda açılıyor...`)
  }

  handleDownloadPdf(book: any) {
    const content = `
      KİTAP: ${book.title}
      YAZAR: ${book.author}
      KATEGORİ: ${book.category}

      ${book.description}

      (Not: Bu bir PDF indirme simülasyonudur.)
    `
    PrintService.downloadAsFile(content, book.title.replace(/\s+/g, '_'))
  }

  template() {
    const { categories, selectedCategory, searchQuery, filteredBooks } = libraryStore

    return (
      <div class="container" style="padding: 4rem 0 10rem;">
        <hgroup style="text-align: center; margin-bottom: 4rem;">
          <h1 class="hero-title" style="font-size: 4rem;">Dijital Kütüphane</h1>
          <p class="hero-subtitle">Manevi ve maddi ilimlere dair temel eserler ve ders notları.</p>
        </hgroup>

        <div class="search-section" style="max-width: 800px; margin: 0 auto 4rem;">
          <input
            type="search"
            class="search-input-custom"
            placeholder="Kitap adı veya yazar arayın..."
            value={searchQuery}
            input={(e: any) => libraryStore.setSearchQuery(e.target.value)}
            style="width: 100%; display: block; margin-bottom: 2rem;"
          />

          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            {categories.map(cat => (
              <button
                key={cat}
                class={`tab-button ${selectedCategory === cat ? 'active' : ''}`}
                click={() => libraryStore.setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div class="empty-state">
            <div style="font-size: 5rem; margin-bottom: 2rem;">📚</div>
            <h2 style="color: var(--text-muted);">Aramanıza uygun eser bulunamadı.</h2>
          </div>
        ) : (
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2.5rem;">
            {filteredBooks.map(book => (
              <article key={book.id} class="glass-card" style="display: flex; flex-direction: column; overflow: hidden; border-radius: 20px;">
                <div style="position: relative; height: 200px; overflow: hidden; background: #e2e8f0; display: flex; align-items: center; justify-content: center;">
                  <img src={book.image} alt={book.title} style="width: 100%; height: 100%; object-fit: cover;" />
                  <div style="position: absolute; top: 1rem; left: 1rem;">
                    <span class="badge" style="background: rgba(255,255,255,0.9); color: var(--primary);">{book.category}</span>
                  </div>
                </div>

                <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column;">
                  <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; line-height: 1.3;">{book.title}</h3>
                  <p style="color: var(--text-muted); font-weight: 600; margin-bottom: 1rem;">{book.author}</p>
                  <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem; flex: 1; line-height: 1.5;">{book.description}</p>

                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px dashed rgba(0,0,0,0.1);">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #94a3b8;">PDF • {book.size}</span>
                  </div>

                  <div style="display: flex; gap: 0.5rem;">
                    <button class="outline" style="flex: 1; padding: 0.75rem; border-radius: 12px; font-weight: 600; font-size: 0.9rem;" click={() => this.handleViewPdf(book)}>Oku</button>
                    <button class="primary" style="flex: 1; padding: 0.75rem; border-radius: 12px; font-weight: 600; border: none; font-size: 0.9rem;" click={() => this.handleDownloadPdf(book)}>İndir</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    )
  }
}
