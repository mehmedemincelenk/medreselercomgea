import { Store } from '@geajs/core'

class MedreseStore extends Store {
  list = [
    { 
      id: 1, 
      name: 'Süleymaniye Medresesi', 
      city: 'İstanbul', 
      type: 'İslami İlimler', 
      description: 'Mimar Sinan\'ın muazzam eseri, ilmin kalbi. Tarih ve maneviyatın buluştuğu nokta.',
      image: 'https://images.unsplash.com/photo-1590075865003-e48293528f8a?auto=format&fit=crop&w=800&h=500',
      students: 450,
      founded: '1557',
      gender: 'Erkek',
      facilities: ['Kütüphane', 'Aşevi', 'Yurt'],
      likes: 1200
    },
    { 
      id: 2, 
      name: 'Aziz Mahmud Hüdayi Vakfı', 
      city: 'İstanbul',
      type: 'Eğitim ve Kültür', 
      description: 'Gönüllere hitap eden kadim bir gelenek. Modern eğitim metotlarıyla birleşen irfan.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&h=500',
      students: 1200,
      founded: '1985',
      gender: 'Erkek',
      facilities: ['Spor Salonu', 'Kütüphane', 'Yemekhane'],
      likes: 950
    },
    { 
      id: 3, 
      name: 'İsmailağa Külliyesi', 
      city: 'İstanbul',
      type: 'Hafızlık ve Fıkıh', 
      description: 'İslami ilimlerde derinleşmek isteyenler için köklü bir ilim merkezi.',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&h=500',
      students: 850,
      founded: '1954',
      gender: 'Erkek',
      facilities: ['Kütüphane', 'Aşevi'],
      likes: 800
    },
    { 
      id: 4, 
      name: 'Hacı Bayram Veli Medresesi', 
      city: 'Ankara', 
      type: 'İslami İlimler', 
      description: 'Ankara\'nın manevi mimarı Hacı Bayram Veli\'nin izinde, geleneksel ilim tahsili.',
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&h=500',
      students: 300,
      founded: '1427',
      gender: 'Erkek',
      facilities: ['Kütüphane'],
      likes: 600
    },
    { 
      id: 5, 
      name: 'Gök Medrese', 
      city: 'Sivas', 
      type: 'İslami İlimler', 
      description: 'Selçuklu mimarisinin en zarif örneklerinden. Mavi çinileriyle ilmin ışığını yansıtan kadim bir merkez.',
      image: 'https://images.unsplash.com/photo-1523302235025-1cc2885f8da3?auto=format&fit=crop&w=800&h=500',
      students: 250,
      founded: '1271',
      gender: 'Erkek',
      facilities: ['Kütüphane', 'Müze'],
      likes: 550
    },
    { 
      id: 6, 
      name: 'Karataş Eğitim Merkezi', 
      city: 'Konya', 
      type: 'Hafızlık', 
      description: 'Mevlana diyarında Kur\'an-ı Kerim sedalarının yankılandığı, modern imkanlarla donatılmış hafızlık okulu.',
      image: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=800&h=500',
      students: 600,
      founded: '2005',
      gender: 'Hanım',
      facilities: ['Havuz', 'Spor Salonu', 'Kütüphane'],
      likes: 1100
    },
    { 
      id: 7, 
      name: 'Muradiye Külliyesi', 
      city: 'Bursa', 
      type: 'Eğitim ve Kültür', 
      description: 'Osmanlı\'nın ilk payitahtında, asırlık çınarların gölgesinde tarih ve kültürün iç içe geçtiği ilim yuvası.',
      image: 'https://images.unsplash.com/photo-1548712348-288ff73cfbc4?auto=format&fit=crop&w=800&h=500',
      students: 400,
      founded: '1426',
      gender: 'Erkek',
      facilities: ['Kütüphane', 'Aşevi'],
      likes: 700
    },
    { 
      id: 8, 
      name: 'Ulu Cami Eğitim Vakfı', 
      city: 'Diyarbakır', 
      type: 'Fıkıh ve Hadis', 
      description: 'Anadolu\'nun en eski camilerinden birinin gölgesinde, Mezopotamya\'nın bereketli topraklarında kadim eğitim.',
      image: 'https://images.unsplash.com/photo-1596401057633-5cc40d824906?auto=format&fit=crop&w=800&h=500',
      students: 350,
      founded: '1992',
      gender: 'Erkek',
      facilities: ['Kütüphane'],
      likes: 450
    },
    { 
      id: 9, 
      name: 'Şehzadebaşı Medresesi', 
      city: 'İstanbul', 
      type: 'İslami İlimler', 
      description: 'Mimar Sinan\'ın çıraklık eserim dediği külliyede, İstanbul\'un kalbinde klasik usulde ilim tahsili.',
      image: 'https://images.unsplash.com/photo-1512632571866-72bb3bc59a71?auto=format&fit=crop&w=800&h=500',
      students: 500,
      founded: '1548',
      gender: 'Hanım',
      facilities: ['Kütüphane', 'Yurt'],
      likes: 850
    }
  ]
  
  query = ''
  selectedCategory = 'Tümü'

  // Advanced filters
  selectedCities = []
  selectedGenders = []
  selectedFacilities = []

  // Detail Modal
  selectedMedreseId = null

  get filteredList() {
    let result = this.list
    
    // Category filter
    if (this.selectedCategory !== 'Tümü') {
      result = result.filter(m => m.type.includes(this.selectedCategory) || this.selectedCategory.includes(m.type))
    }

    // Search query
    if (this.query) {
      const q = this.query.toLowerCase()
      result = result.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.city.toLowerCase().includes(q) ||
        m.type.toLowerCase().includes(q)
      )
    }
    
    // Advanced filters
    if (this.selectedCities.length > 0) {
      result = result.filter(m => this.selectedCities.includes(m.city))
    }

    if (this.selectedGenders.length > 0) {
      result = result.filter(m => this.selectedGenders.includes(m.gender))
    }

    if (this.selectedFacilities.length > 0) {
      result = result.filter(m =>
        this.selectedFacilities.every(facility => m.facilities.includes(facility))
      )
    }

    // Sort by likes (En Sevilenler)
    result = [...result].sort((a, b) => b.likes - a.likes)

    return result
  }

  get allCities() {
    return [...new Set(this.list.map(m => m.city))].sort()
  }

  get allFacilities() {
    const facilitiesSet = new Set()
    this.list.forEach(m => m.facilities.forEach(f => facilitiesSet.add(f)))
    return [...facilitiesSet].sort()
  }

  get stats() {
    return {
      total: this.list.length,
      cities: new Set(this.list.map(m => m.city)).size,
      students: this.list.reduce((acc, m) => acc + m.students, 0)
    }
  }

  setQuery(val) {
    this.query = val
  }

  setCategory(cat) {
    this.selectedCategory = cat
  }

  toggleCity(city) {
    if (this.selectedCities.includes(city)) {
      this.selectedCities = this.selectedCities.filter(c => c !== city)
    } else {
      this.selectedCities = [...this.selectedCities, city]
    }
  }

  toggleGender(gender) {
    if (this.selectedGenders.includes(gender)) {
      this.selectedGenders = this.selectedGenders.filter(g => g !== gender)
    } else {
      this.selectedGenders = [...this.selectedGenders, gender]
    }
  }

  toggleFacility(facility) {
    if (this.selectedFacilities.includes(facility)) {
      this.selectedFacilities = this.selectedFacilities.filter(f => f !== facility)
    } else {
      this.selectedFacilities = [...this.selectedFacilities, facility]
    }
  }

  clearFilters() {
    this.selectedCities = []
    this.selectedGenders = []
    this.selectedFacilities = []
    this.query = ''
    this.selectedCategory = 'Tümü'
  }

  openModal(id) {
    this.selectedMedreseId = id
  }

  closeModal() {
    this.selectedMedreseId = null
  }

  get selectedMedrese() {
    return this.list.find(m => m.id === this.selectedMedreseId)
  }
}

export default new MedreseStore()
