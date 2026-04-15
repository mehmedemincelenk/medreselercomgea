import { Store } from '@geajs/core'

class CamiiStore extends Store {
  // Teknoloji Etkinlikleri
  techEvents = [
    {
      id: 1,
      title: 'İslam ve Yapay Zeka',
      date: '25 Ramazan 1445',
      speaker: 'Doç. Dr. Ahmet Yılmaz',
      location: 'Süleymaniye Külliyesi',
      description: 'Yapay zeka teknolojilerinin fıkhi boyutu ve İslami bir perspektifle değerlendirilmesi.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&h=300'
    },
    {
      id: 2,
      title: 'Gençler İçin Robotik Kodlama',
      date: 'Her Cumartesi',
      speaker: 'Mühendis Ali Vefa',
      location: 'İsmailağa Külliyesi Atölyesi',
      description: 'Temel robotik prensipleri ve maker kültürü ile tanışma atölyesi.',
      image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=400&h=300'
    }
  ]

  // Meal Yazdırma Aracı
  surahs = [
    { id: 1, name: 'Fatiha', ayahs: 7 },
    { id: 2, name: 'Bakara', ayahs: 286 },
    { id: 3, name: 'Âl-i İmrân', ayahs: 200 },
    { id: 36, name: 'Yâsîn', ayahs: 83 },
    { id: 67, name: 'Mülk', ayahs: 30 }
  ]

  selectedSurahId = 2
  startAyah = 1
  endAyah = 20

  get selectedSurah() {
    return this.surahs.find(s => s.id === this.selectedSurahId)
  }

  setSurah(id: number) {
    this.selectedSurahId = id
    this.startAyah = 1
    const surah = this.surahs.find(s => s.id === id)
    this.endAyah = surah ? Math.min(20, surah.ayahs) : 1
  }

  setAyahRange(start: number, end: number) {
    this.startAyah = start
    this.endAyah = end
  }
}

export default new CamiiStore()
