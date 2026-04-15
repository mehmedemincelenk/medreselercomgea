import { Component } from '@geajs/core'

export default function MedreseCard({ medrese }) {
  return (
    <article class="glass-card medrese-card-animation">
      <div style="position: relative; overflow: hidden; border-radius: 24px 24px 0 0;">
        <img 
          src={medrese.image} 
          alt={medrese.name} 
          style="width: 100%; height: 260px; object-fit: cover; transition: transform 0.5s ease;"
        />
        <div style="position: absolute; top: 1.5rem; left: 1.5rem;">
          <span class="badge primary">{medrese.city}</span>
        </div>
      </div>
      
      <div style="padding: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
          <small style="color: var(--primary); font-weight: 800; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;">
            {medrese.type}
          </small>
        </div>
        
        <h3 style="font-size: 1.75rem; color: #1a202c; margin-bottom: 1rem; line-height: 1.2;">
          {medrese.name}
        </h3>
        
        <p style="color: var(--text-muted); line-height: 1.7; font-size: 1.05rem; margin-bottom: 2rem;">
          {medrese.description}
        </p>
        
        <div style="display: flex; gap: 1rem; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05);">
          <button class="primary" style="flex: 2; border-radius: 16px; font-weight: 700; border: none;" click={() => alert(medrese.name + ' detayları...')}>
            İncele
          </button>
          <button class="secondary outline" style="flex: 1; border-radius: 16px; font-weight: 700;" click={() => alert('Bağış sayfasına yönlendiriliyorsunuz...')}>
            Bağış
          </button>
        </div>
      </div>
    </article>
  )
}
