import { Store } from '@geajs/core'

class LibraryStore extends Store {
  categories = ['Tümü', 'Tefsir', 'Fıkıh', 'Hadis', 'Teknoloji', 'Girişimcilik']

  books = [
    {
      id: 1,
      title: 'Riyazü\'s Salihin (Seçmeler)',
      category: 'Hadis',
      author: 'İmam Nevevi',
      size: '2.4 MB',
      image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=300&h=400',
      description: 'Günlük hayatta Müslümanın rehberi olan temel hadis kitabı.'
    },
    {
      id: 2,
      title: 'İlmihal (Özet)',
      category: 'Fıkıh',
      author: 'Diyanet İşleri',
      size: '5.1 MB',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&h=400',
      description: 'Temel dini bilgiler, ibadet ve ahlak esasları.'
    },
    {
      id: 3,
      title: 'Yazılıma Giriş Notları',
      category: 'Teknoloji',
      author: 'Gea Akademi',
      size: '1.8 MB',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&h=400',
      description: 'Yeni başlayanlar için temel programlama kavramları.'
    },
    {
      id: 4,
      title: 'İslam Ekonomisi',
      category: 'Girişimcilik',
      author: 'Prof. Dr. Sabri Orman',
      size: '3.2 MB',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=300&h=400',
      description: 'Faizsiz finans, ticaret ahlakı ve İslami girişimcilik prensipleri.'
    },
    {
      id: 5,
      title: 'Kur\'an Mesajı',
      category: 'Tefsir',
      author: 'Muhammed Esed',
      size: '8.5 MB',
      image: 'https://images.unsplash.com/photo-1604134967494-8a9ed3eaa728?auto=format&fit=crop&w=300&h=400',
      description: 'Çağdaş bir Kur\'an tefsiri ve meali.'
    }
  ]

  selectedCategory = 'Tümü'
  searchQuery = ''

  get filteredBooks() {
    let result = this.books

    if (this.selectedCategory !== 'Tümü') {
      result = result.filter(b => b.category === this.selectedCategory)
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase()
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
      )
    }

    return result
  }

  setCategory(category: string) {
    this.selectedCategory = category
  }

  setSearchQuery(query: string) {
    this.searchQuery = query
  }
}

export default new LibraryStore()
