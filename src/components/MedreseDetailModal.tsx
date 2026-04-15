import { Component } from '@geajs/core'
import medreseStore from '../medrese-store'

export default class MedreseDetailModal extends Component {
  template() {
    const medrese = medreseStore.selectedMedrese

    if (!medrese) return null

    return (
      <div class="modal-overlay" click={(e: any) => { if (e.target.classList.contains('modal-overlay')) medreseStore.closeModal() }}>
        <div class="modal-content">
          <button class="modal-close" click={() => medreseStore.closeModal()}>×</button>

          <div style="height: 400px; width: 100%; position: relative;">
            <img src={medrese.image} alt={medrese.name} style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 3rem 2rem 2rem;">
              <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <span class="badge primary">{medrese.city}</span>
                <span class="badge secondary">{medrese.type}</span>
              </div>
              <h2 style="color: white; font-size: 2.5rem; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">{medrese.name}</h2>
            </div>
          </div>

          <div style="padding: 3rem 2rem;">
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
              <div>
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--primary);">Hakkında</h3>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-main); margin-bottom: 2rem;">{medrese.description}</p>

                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--primary);">Sosyal İmkanlar</h3>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                  {medrese.facilities.map((fac: string) => (
                    <span key={fac} style="background: rgba(45, 90, 39, 0.1); color: var(--primary); padding: 0.5rem 1rem; border-radius: 12px; font-weight: 700;">✓ {fac}</span>
                  ))}
                </div>
              </div>

              <div>
                <div class="glass-card" style="padding: 2rem; background: var(--background);">
                  <h4 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--primary); border-bottom: 2px solid rgba(0,0,0,0.05); padding-bottom: 0.5rem;">Kurum Bilgileri</h4>

                  <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted); font-weight: 600;">Kuruluş</span>
                    <span style="font-weight: 800;">{medrese.founded}</span>
                  </div>

                  <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted); font-weight: 600;">Kapasite</span>
                    <span style="font-weight: 800;">{medrese.students} Talebe</span>
                  </div>

                  <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted); font-weight: 600;">Cinsiyet</span>
                    <span style="font-weight: 800;">{medrese.gender}</span>
                  </div>

                  <div style="display: flex; justify-content: space-between; margin-bottom: 2rem; padding-bottom: 0.5rem;">
                    <span style="color: var(--text-muted); font-weight: 600;">Beğeni</span>
                    <span style="font-weight: 800; color: #e11d48;">❤️ {medrese.likes}</span>
                  </div>

                  <button class="primary" style="width: 100%; border-radius: 16px; padding: 1rem; font-size: 1.1rem; font-weight: 700; border: none;">Kayıt Ol / İletişim</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
