import { Component } from '@geajs/core'

export default function EventCard({ event }: { event: any }) {
  // Format date simply
  const dateObj = new Date(event.date)
  const day = dateObj.getDate()
  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
  const month = monthNames[dateObj.getMonth()]

  return (
    <article class="glass-card" style="display: flex; flex-direction: column; overflow: hidden; border-radius: 24px;">
      <div style="position: relative;">
        <img
          src={event.image}
          alt={event.title}
          style="width: 100%; height: 200px; object-fit: cover;"
        />
        <div style="position: absolute; top: 1rem; right: 1rem;">
          <span class={`badge ${event.category === 'İslami İlimler' ? 'primary' : 'secondary'}`}>
            {event.category}
          </span>
        </div>
      </div>

      <div style="padding: 2rem; display: flex; flex-direction: column; flex: 1;">
        <div style="display: flex; gap: 1.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1.5rem;">
          <div style="text-align: center; color: var(--primary);">
            <div style="font-size: 2.5rem; font-weight: 900; line-height: 1;">{day}</div>
            <div style="font-weight: 700; text-transform: uppercase; font-size: 0.9rem;">{month}</div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: center; gap: 0.25rem;">
            <div style="font-weight: 600; color: var(--text-main);">🕒 {event.time}</div>
            <div style="font-weight: 600; color: var(--text-muted); font-size: 0.9rem;">📍 {event.location}</div>
          </div>
        </div>

        <h3 style="font-size: 1.5rem; color: #1a202c; margin-bottom: 0.5rem; line-height: 1.3;">
          {event.title}
        </h3>

        <p style="color: var(--text-muted); margin-bottom: 1.5rem; flex: 1; font-weight: 500;">
          🎤 {event.speaker}
        </p>

        <button class="primary outline" style="width: 100%; border-radius: 12px; font-weight: 700;">
          Kayıt Ol
        </button>
      </div>
    </article>
  )
}
