import { Component } from '@geajs/core'
import eventStore from '../event-store'
import EventCard from '../components/EventCard'

export default class EtkinliklerView extends Component {
  template() {
    const categories = ['Tümü', 'İslami İlimler', 'Maddi İlimler']
    const evts = eventStore.filteredEvents
    const selectedCategory = eventStore.selectedCategory

    return (
      <div class="container" style="padding: 4rem 0 10rem;">
        <hgroup style="text-align: center; margin-bottom: 4rem;">
          <h1 class="hero-title" style="font-size: 4rem;">İlim Takvimi</h1>
          <p class="hero-subtitle">Yaklaşan seminer, konferans ve atölyeleri keşfedin.</p>
        </hgroup>

        <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 4rem;">
          {categories.map(cat => (
            <button
              key={cat}
              class={`tab-button ${selectedCategory === cat ? 'active' : ''}`}
              click={() => eventStore.setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {evts.length === 0 ? (
          <div class="empty-state">
            <div style="font-size: 5rem; margin-bottom: 2rem;">🗓️</div>
            <h2 style="color: var(--text-muted);">Bu kategoride henüz bir etkinlik bulunmuyor.</h2>
          </div>
        ) : (
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2.5rem;">
            {evts.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    )
  }
}
