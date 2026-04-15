import { Component } from '@geajs/core'
import medreseStore from '../medrese-store'

export default class FilterBar extends Component {
  template() {
    const { allCities, allFacilities, selectedCities, selectedGenders, selectedFacilities } = medreseStore

    return (
      <div class="filter-bar glass-card" style="margin-top: 2rem; padding: 1.5rem; display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; align-items: flex-start; border-radius: 24px;">
        <div class="filter-group">
          <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; color: var(--primary);">Şehirler</label>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            {allCities.map(city => (
              <label key={city} class="filter-chip">
                <input
                  type="checkbox"
                  checked={selectedCities.includes(city)}
                  change={() => medreseStore.toggleCity(city)}
                  style="display: none;"
                />
                <span class={`chip-label ${selectedCities.includes(city) ? 'active' : ''}`}>{city}</span>
              </label>
            ))}
          </div>
        </div>

        <div class="filter-group" style="border-left: 1px solid rgba(0,0,0,0.1); padding-left: 2rem;">
          <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; color: var(--primary);">Cinsiyet</label>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            {['Erkek', 'Hanım'].map(gender => (
              <label key={gender} class="filter-chip">
                <input
                  type="checkbox"
                  checked={selectedGenders.includes(gender)}
                  change={() => medreseStore.toggleGender(gender)}
                  style="display: none;"
                />
                <span class={`chip-label ${selectedGenders.includes(gender) ? 'active' : ''}`}>{gender}</span>
              </label>
            ))}
          </div>
        </div>

        <div class="filter-group" style="border-left: 1px solid rgba(0,0,0,0.1); padding-left: 2rem;">
          <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; color: var(--primary);">İmkanlar</label>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            {allFacilities.map(facility => (
              <label key={facility} class="filter-chip">
                <input
                  type="checkbox"
                  checked={selectedFacilities.includes(facility as string)}
                  change={() => medreseStore.toggleFacility(facility)}
                  style="display: none;"
                />
                <span class={`chip-label ${selectedFacilities.includes(facility as string) ? 'active' : ''}`}>{facility}</span>
              </label>
            ))}
          </div>
        </div>

        <div style="display: flex; align-items: center; padding-left: 1rem;">
          <button class="outline" style="border-radius: 12px; font-size: 0.9rem;" click={() => medreseStore.clearFilters()}>Temizle</button>
        </div>
      </div>
    )
  }
}
