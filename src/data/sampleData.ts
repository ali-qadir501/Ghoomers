import { type Guide as BaseGuide } from '../lib/utils';

export type Guide = BaseGuide;

export interface Adventure {
  id: string;
  title: string;
  location: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  price: number;
  image: string;
  guides: string[];
  popularity: number;
  coordinates?: { lat: number; lng: number };
  packages?: {
    standard: { price: number; inclusions: string[] };
    deluxe: { price: number; inclusions: string[] };
    executive: { price: number; inclusions: string[] };
  };
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
  adventure: string;
}

export const GUIDES: Guide[] = [
  {
    id: '1',
    name: 'Ali Khan',
    location: 'Hunza Valley',
    rating: 4.9,
    reviews: 124,
    pricePerDay: 45,
    specialties: ['Trekking', 'Photography', 'Cultural Tours'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    badge: 'Elite Guide',
    bio: 'Born and raised in Hunza, I have been guiding travelers for over 10 years. I specialize in high-altitude treks and local cultural immersion.',
    email: 'ali.khan@GHOOMERS',
    phone: '+92 300 1234567',
    experienceYears: 12,
    languages: ['English', 'Urdu', 'Burushaski'],
    certifications: ['IFMGA Certified', 'First Aid Responder'],
    popularity: 150,
    videoIntro: 'https://www.w3schools.com/html/mov_bbb.mp4',
    stats: {
      completedTours: 142,
      successRate: 98,
      responseTime: '2 minutes',
      responseTimeBadge: true
    },
    commissionRate: 0.15,
    isFeatured: true,
    isCNICVerified: true,
    coordinates: { lat: 36.3167, lng: 74.6500 },
    isVerified: true,
    availability: ["Monday", "Wednesday", "Friday", "Saturday"],
    gallery: [
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
    ],
    reviewsList: [
      { 
        id: 'r1', 
        userName: 'James Wilson', 
        rating: 5, 
        comment: 'Ali was an incredible guide. His knowledge of the Hunza valley is unmatched.', 
        date: '2024-02-15',
        images: [
          'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80'
        ]
      },
      { id: 'r2', userName: 'Sarah Chen', rating: 4, comment: 'Very professional and friendly. Highly recommend for photography tours.', date: '2024-01-20' }
    ],
    upcomingTours: [
      {
        id: 't1',
        title: 'Hunza Valley Cultural Escape',
        date: '2024-05-15',
        duration: '5 Days',
        price: 350,
        image: 'https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80',
        description: 'Explore the ancient forts and local traditions of Hunza.',
        availableSlots: 4,
        difficulty: 'Easy',
        packages: {
          standard: { price: 350, inclusions: ['Shared Jeep', 'Budget Hotels', '2 Meals'] },
          deluxe: { price: 550, inclusions: ['Private Corolla', '3-Star Hotels', 'Full Board', 'Guide Fee'] },
          executive: { price: 850, inclusions: ['Private Prado', 'Luxury Resorts', 'VIP Access', 'Traditional Dinner'] }
        }
      }
    ]
  },
  {
    id: 'l1',
    name: 'Waseem "Old City" Khan',
    location: 'Lahore',
    rating: 4.9,
    reviews: 342,
    pricePerDay: 25,
    specialties: ['Heritage Walks', 'Street Food', 'Mughal History'],
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    badge: 'STREET FOOD KING',
    bio: 'I lead the most authentic food and heritage walks in the Walled City. From the spicy flavors of Phajja Siri Paye to the hidden history of Delhi Gate.',
    experienceYears: 15,
    languages: ['English', 'Urdu', 'Punjabi'],
    certifications: ['Certified Food Historian', 'UNESCO Heritage Guide'],
    popularity: 190,
    stats: {
      completedTours: 850,
      successRate: 100,
      responseTime: '5 minutes',
      responseTimeBadge: true
    },
    commissionRate: 0.18,
    isVerified: true,
    isCNICVerified: true,
    isFeatured: true,
    availability: ['Friday', 'Saturday', 'Sunday'],
    gallery: [
      'https://images.unsplash.com/photo-1545063914-a1a6ec821acc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588663808451-b8f4955b2591?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'm1',
    name: 'Ustad Fazal Din',
    location: 'Multan',
    rating: 5.0,
    reviews: 42,
    pricePerDay: 30,
    specialties: ['Blue Pottery', 'Artisan Workshop', 'Sufi Trails'],
    image: 'https://images.unsplash.com/photo-1441786426383-bb315fc402b7?auto=format&fit=crop&w=400&q=80',
    badge: 'MASTER ARTISAN',
    bio: 'I am a 4th generation Blue Pottery artisan. I offer hands-on workshops where you can learn the ancient art of Multani pottery in my family hujra.',
    experienceYears: 35,
    languages: ['Urdu', 'Saraiki'],
    certifications: ['Presidential Pride of Performance'],
    popularity: 80,
    stats: {
      completedTours: 400,
      successRate: 100,
      responseTime: '1 hour',
      responseTimeBadge: false
    },
    commissionRate: 0.10,
    isVerified: true,
    isCNICVerified: true,
    isFeatured: false,
    availability: ['Monday', 'Tuesday', 'Wednesday'],
    gallery: [
      'https://images.unsplash.com/photo-1520404427204-adc0f773b30d?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'i1',
    name: 'Ayesha "Chef" Siddique',
    location: 'Islamabad',
    rating: 4.8,
    reviews: 67,
    pricePerDay: 40,
    specialties: ['Home Dining', 'Cooking Class', 'Organic Sourcing'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    badge: 'HOME CHEF',
    bio: 'Experience a traditional Pakistani dinner in an Islamabad home. I teach you how to source organic ingredients and cook family recipes passed down for generations.',
    experienceYears: 6,
    languages: ['English', 'Urdu'],
    certifications: ['Certified Culinary Instructor'],
    popularity: 95,
    stats: {
      completedTours: 95,
      successRate: 100,
      responseTime: '15 minutes',
      responseTimeBadge: true
    },
    commissionRate: 0.20,
    isVerified: true,
    isCNICVerified: true,
    isFeatured: true,
    availability: ['Saturday', 'Sunday'],
    gallery: [
      'https://images.unsplash.com/photo-1547928500-1c390637c35a?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '2',
    name: 'Zahra Ahmed',
    location: 'Skardu',
    rating: 4.8,
    reviews: 89,
    pricePerDay: 55,
    specialties: ['Mountaineering', 'Camping', 'History'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    badge: 'Expert Climber',
    bio: 'Passionate mountaineer with multiple K2 Base Camp summits. I love sharing the history of the Balti people with my guests.',
    email: 'zahra.ahmed@GHOOMERS',
    phone: '+92 312 9876543',
    experienceYears: 8,
    languages: ['English', 'Urdu', 'Balti'],
    certifications: ['National Guide License', 'Wilderness First Aid'],
    popularity: 95,
    coordinates: { lat: 35.2975, lng: 75.6333 },
    isVerified: true,
    availability: ["Tuesday", "Thursday", "Saturday", "Sunday"],
    gallery: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b'
    ],
    reviewsList: [
      { id: 'r3', userName: 'David Wilson', rating: 5, comment: 'Zahra is a true expert. The K2 Base Camp trek was a life-changing experience.', date: '2024-03-01' }
    ],
    upcomingTours: [
      {
        id: 't3',
        title: 'K2 Base Camp Expedition',
        date: '2024-07-01',
        duration: '21 Days',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
        description: 'The ultimate challenge for any trekker. Walk among the giants.',
        availableSlots: 2,
        difficulty: 'Extreme'
      }
    ]
  }
];

export const ADVENTURES: Adventure[] = [
  {
    id: '1',
    title: 'K2 Base Camp Trek',
    location: 'Concordia, Baltistan',
    description: 'The ultimate challenge for any trekker. Walk among the giants of the Karakoram.',
    duration: '21 Days',
    difficulty: 'Extreme',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    guides: ['2'],
    popularity: 45,
    coordinates: { lat: 35.8811, lng: 76.5133 }
  },
  {
    id: '2',
    title: 'Hunza Cultural Escape',
    location: 'Karimabad, Hunza',
    description: 'Explore ancient forts, local markets, and the legendary hospitality of the Hunza people.',
    duration: '5 Days',
    difficulty: 'Easy',
    price: 350,
    image: 'https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80',
    guides: ['1'],
    popularity: 120,
    coordinates: { lat: 36.3216, lng: 74.6654 }
  },
  {
    id: '3',
    title: 'Nanga Parbat Base Camp',
    location: 'Fairy Meadows',
    description: 'Camp in the lush green meadows with the "Killer Mountain" looming over you.',
    duration: '7 Days',
    difficulty: 'Moderate',
    price: 450,
    image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=800&q=80',
    guides: ['3'],
    popularity: 85,
    coordinates: { lat: 35.3833, lng: 74.5833 }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'James Wilson',
    location: 'London, UK',
    text: 'Ali was an incredible guide. His knowledge of the Hunza valley is unmatched. The trip was perfectly organized.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    adventure: 'Hunza Cultural Escape'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    location: 'Singapore',
    text: 'K2 Base Camp was the hardest thing I\'ve ever done, but Zahra made it feel safe and achievable. Life-changing experience!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    adventure: 'K2 Base Camp Trek'
  }
];
