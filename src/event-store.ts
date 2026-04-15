import { Store } from '@geajs/core'

class EventStore extends Store {
  events = [
    {
      id: 1,
      title: 'Tefsir Usulü Semineri',
      category: 'İslami İlimler',
      date: '2026-05-15',
      time: '14:00',
      speaker: 'Prof. Dr. İsmail Hakkı',
      location: 'Fatih Külliyesi',
      image: 'https://images.unsplash.com/photo-1604134967494-8a9ed3eaa728?auto=format&fit=crop&w=400&h=300'
    },
    {
      id: 2,
      title: 'İslam ve Yapay Zeka',
      category: 'Maddi İlimler',
      date: '2026-05-18',
      time: '10:00',
      speaker: 'Doç. Dr. Ahmet Yılmaz',
      location: 'Süleymaniye Külliyesi',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&h=300'
    },
    {
      id: 3,
      title: 'Fıkıh Okumaları: Büyüklere Yönelik',
      category: 'İslami İlimler',
      date: '2026-05-20',
      time: '18:30',
      speaker: 'Müftü Mehmet Emin',
      location: 'Online (Zoom)',
      image: 'https://images.unsplash.com/photo-1596401057633-5cc40d824906?auto=format&fit=crop&w=400&h=300'
    },
    {
      id: 4,
      title: 'Gençler İçin Robotik Kodlama',
      category: 'Maddi İlimler',
      date: '2026-05-22',
      time: '13:00',
      speaker: 'Mühendis Ali Vefa',
      location: 'İsmailağa Atölyesi',
      image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=400&h=300'
    },
    {
      id: 5,
      title: 'Hadis Tarihi ve Metodolojisi',
      category: 'İslami İlimler',
      date: '2026-05-25',
      time: '15:00',
      speaker: 'Dr. Zeynep Alkan',
      location: 'Muradiye Medresesi',
      image: 'https://images.unsplash.com/photo-1590075865003-e48293528f8a?auto=format&fit=crop&w=400&h=300'
    },
    {
      id: 6,
      title: 'Müslüman Girişimciler Zirvesi',
      category: 'Maddi İlimler',
      date: '2026-05-30',
      time: '09:00',
      speaker: 'Çeşitli Konuşmacılar',
      location: 'Haliç Kongre Merkezi',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=400&h=300'
    }
  ]

  selectedCategory = 'Tümü'

  get filteredEvents() {
    let result = this.events

    if (this.selectedCategory !== 'Tümü') {
      result = result.filter(e => e.category === this.selectedCategory)
    }

    // Sort by date ascending
    result = [...result].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return result
  }

  setCategory(category: string) {
    this.selectedCategory = category
  }
}

export default new EventStore()
