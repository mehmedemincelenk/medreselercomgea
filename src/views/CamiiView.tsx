import { Component } from '@geajs/core'
import camiiStore from '../camii-store'
import PrintService from '../services/PrintService'

export default class CamiiView extends Component {
  handlePrintMeal() {
    PrintService.printElement('meal-print-area', `Meal_${camiiStore.selectedSurah?.name}`)
  }

  handleDownloadMeal() {
    const text = `
      SURE: ${camiiStore.selectedSurah?.name}
      AYETLER: ${camiiStore.startAyah} - ${camiiStore.endAyah}

      Rahmân ve Rahîm olan Allah'ın adıyla...

      (Not: Bu bir simülasyondur. Gerçek uygulamada API'den meal çekilecektir.)
    `
    PrintService.downloadAsFile(text, `Meal_${camiiStore.selectedSurah?.name}_${camiiStore.startAyah}-${camiiStore.endAyah}`)
  }

  handlePrintEvent(event: any) {
    const tempDiv = document.createElement('div')
    tempDiv.id = 'temp-event-print'
    tempDiv.innerHTML = `
      <div style="text-align: center; border: 2px solid #2d5a27; padding: 2rem; border-radius: 16px;">
        <h1 style="color: #2d5a27; font-size: 2.5rem; margin-bottom: 1rem;">${event.title}</h1>
        <h2 style="color: #d4af37; font-size: 1.5rem; margin-bottom: 2rem;">${event.date}</h2>
        <p style="font-size: 1.2rem; margin-bottom: 1rem;"><strong>Konuşmacı:</strong> ${event.speaker}</p>
        <p style="font-size: 1.2rem; margin-bottom: 2rem;"><strong>Yer:</strong> ${event.location}</p>
        <p style="font-size: 1.1rem; color: #666; font-style: italic;">${event.description}</p>
        <div style="margin-top: 3rem; font-size: 0.9rem; color: #999;">Medreseler.com İlim Takvimi</div>
      </div>
    `
    document.body.appendChild(tempDiv)
    PrintService.printElement('temp-event-print', `Afiş_${event.title}`)
    document.body.removeChild(tempDiv)
  }

  template() {
    const { techEvents, surahs, selectedSurahId, startAyah, endAyah, selectedSurah } = camiiStore

    return (
      <div class="container" style="padding: 4rem 0 10rem;">
        <hgroup style="text-align: center; margin-bottom: 4rem;">
          <h1 class="hero-title" style="font-size: 4rem;">Camii & Otomasyon</h1>
          <p class="hero-subtitle">İbadet ve teknolojinin bütünleştiği servisler.</p>
        </hgroup>

        {/* Teknoloji Etkinlikleri */}
        <section style="margin-bottom: 6rem;">
          <h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: var(--primary); border-bottom: 2px solid rgba(45, 90, 39, 0.1); padding-bottom: 1rem;">Teknoloji Etkinlikleri</h2>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
            {techEvents.map(event => (
              <div key={event.id} class="glass-card" style="display: flex; flex-direction: column;">
                <img src={event.image} alt={event.title} style="width: 100%; height: 200px; object-fit: cover; border-radius: 24px 24px 0 0;" />
                <div style="padding: 2rem; flex: 1; display: flex; flex-direction: column;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span class="badge secondary">{event.date}</span>
                  </div>
                  <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">{event.title}</h3>
                  <p style="color: var(--text-muted); margin-bottom: 1.5rem; flex: 1;">{event.description}</p>

                  <div style="display: flex; gap: 1rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1.5rem;">
                    <button class="outline" style="flex: 1; border-radius: 12px; font-weight: 600;" click={() => PrintService.downloadAsFile(event.title + '\n' + event.description, `Afis_${event.id}`)}>İndir (TXT)</button>
                    <button class="primary" style="flex: 1; border-radius: 12px; font-weight: 600; border: none;" click={() => this.handlePrintEvent(event)}>Yazdır (Afiş)</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Meal Yazdırma Aracı */}
        <section>
          <div class="glass-card" style="padding: 3rem; background: linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.7));">
            <h2 style="font-size: 2.5rem; margin-top: 0; margin-bottom: 1rem; color: var(--primary);">Meal Yazdırma Aracı</h2>
            <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.1rem;">Cami cemaati için günlük okunacak sure ve ayetleri belirleyip anında çıktı alın.</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: end; background: rgba(0,0,0,0.02); padding: 2rem; border-radius: 16px; margin-bottom: 2rem;">
              <div>
                <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">Sure Seçimi</label>
                <select
                  class="search-input-custom"
                  style="width: 100%; padding: 1rem 1.5rem !important; border-radius: 12px !important; font-size: 1.1rem !important;"
                  change={(e: any) => camiiStore.setSurah(Number(e.target.value))}
                >
                  {surahs.map(surah => (
                    <option key={surah.id} value={surah.id} selected={surah.id === selectedSurahId}>
                      {surah.id}. {surah.name} ({surah.ayahs} Ayet)
                    </option>
                  ))}
                </select>
              </div>

              <div style="display: flex; gap: 1rem;">
                <div style="flex: 1;">
                  <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">Başlangıç Ayeti</label>
                  <input
                    type="number"
                    class="search-input-custom"
                    style="width: 100%; padding: 1rem !important; border-radius: 12px !important;"
                    min="1"
                    max={selectedSurah?.ayahs}
                    value={startAyah}
                    input={(e: any) => camiiStore.setAyahRange(Number(e.target.value), endAyah)}
                  />
                </div>
                <div style="flex: 1;">
                  <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">Bitiş Ayeti</label>
                  <input
                    type="number"
                    class="search-input-custom"
                    style="width: 100%; padding: 1rem !important; border-radius: 12px !important;"
                    min={startAyah}
                    max={selectedSurah?.ayahs}
                    value={endAyah}
                    input={(e: any) => camiiStore.setAyahRange(startAyah, Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 1rem;">
              <button class="outline" style="border-radius: 12px; font-weight: 700; padding: 1rem 2rem;" click={() => this.handleDownloadMeal()}>PDF Olarak İndir</button>
              <button class="primary" style="border-radius: 12px; font-weight: 700; padding: 1rem 3rem; border: none; font-size: 1.1rem;" click={() => this.handlePrintMeal()}>Yazdır</button>
            </div>
          </div>

          {/* Gizli Yazdırma Alanı */}
          <div id="meal-print-area" style="display: none;">
            <div style="text-align: center; margin-bottom: 2rem;">
              <h1 style="font-size: 2.5rem; color: #2d5a27;">GÜNLÜK MEAL OKUMASI</h1>
              <h2 style="font-size: 1.5rem; color: #555;">{selectedSurah?.name} Suresi, {startAyah}-{endAyah}. Ayetler</h2>
            </div>

            <div style="font-size: 1.2rem; line-height: 2; text-align: justify; padding: 2rem; border: 1px solid #ccc; border-radius: 16px;">
              <p><em>Rahmân ve Rahîm olan Allah'ın adıyla...</em></p>
              <br/>
              <p><strong>[Ayet ${startAyah}]:</strong> (Meal metni buraya API'den gelecektir...)</p>
              <p>...</p>
              <p><strong>[Ayet ${endAyah}]:</strong> (Meal metni buraya API'den gelecektir...)</p>
            </div>

            <div style="margin-top: 3rem; text-align: center; font-size: 0.9rem; color: #999; border-top: 1px solid #eee; padding-top: 1rem;">
              Medreseler.com - Cami Otomasyon Servisi
            </div>
          </div>
        </section>
      </div>
    )
  }
}
