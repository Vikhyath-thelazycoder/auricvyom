// AURICVISTA Stays Marketplace Database (Expanded Complete Edition)

export const STAYS = [
  {
    id: "stay-tamara-coorg",
    name: "The Tamara Coorg — Luxury Rainforest Resort",
    destinationId: "coorg",
    destinationName: "Coorg (Kodagu), Karnataka",
    category: "Luxury Rainforest Villa",
    propertyType: "Luxury", // Hotel, Resort, Homestay, Villa, Hostel, Luxury, Budget, Unique
    pricePerNight: 24500,
    priceDisplay: "₹24,500 / night",
    taxesAndFees: 4410, // 18% GST
    rating: 4.96,
    reviewsCount: 420,
    cleanlinessRating: 4.98,
    locationRating: 4.99,
    serviceRating: 4.97,
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Breakfast Included", "Infinity Swimming Pool", "Free High-Speed Wi-Fi", 
      "Air Conditioning", "Valet Parking", "Forest Spa", "Fine Dining Restaurant", "Bar / Lounge"
    ],
    description: "Suspended on stilts over 180 acres of organic coffee and cardamom plantations, offering private valley decks, bespoke bean-to-cup trails, and elevated dining under the rainforest canopy.",
    roomTypes: [
      {
        id: "room-tamara-luxury-villa",
        name: "Luxury Rainforest Cottage with Valley Deck",
        price: 24500,
        bedType: "1 King Bed",
        maxGuests: 2,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        features: ["Private Forest Balcony", "Bathtub with Valley View", "Espresso Machine", "Complimentary High Tea"]
      },
      {
        id: "room-tamara-pool-villa",
        name: "Eden Lotus Pool Villa with Private Plunge Pool",
        price: 38000,
        bedType: "1 King Bed + Daybed",
        maxGuests: 3,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        features: ["Heated Private Plunge Pool", "Outdoor Sun Deck", "Personal Butler Service", "Inclusive Spa Voucher"]
      }
    ],
    houseRules: [
      "Check-in from 2:00 PM | Check-out until 11:00 AM",
      "Government-issued photo ID required at check-in",
      "Adults & families with kids over 12 only (due to terrain elevation)",
      "Strict no-smoking policy inside forest cottages"
    ],
    cancellationPolicy: "Free cancellation up to 72 hours before check-in. Within 72 hours, 1 night charge applies."
  },
  {
    id: "stay-evolve-back-kabini",
    name: "Evolve Back, Kuruba Safari Lodge, Kabini",
    destinationId: "kabini",
    destinationName: "Kabini, Nagarhole, Karnataka",
    category: "Heritage Safari Lodge",
    propertyType: "Resort",
    pricePerNight: 32000,
    priceDisplay: "₹32,000 / night",
    taxesAndFees: 5760,
    rating: 4.98,
    reviewsCount: 380,
    cleanlinessRating: 4.99,
    locationRating: 5.00,
    serviceRating: 4.98,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Breakfast Included", "Infinity Swimming Pool", "Free High-Speed Wi-Fi",
      "Air Conditioning", "Valet Parking", "Forest Spa", "Fine Dining Restaurant", "Pet Friendly"
    ],
    description: "Inspired by the local Kuruba tribal villages, featuring traditional thatch architecture, private open-air Jacuzzis, and direct Kabini river frontage for sunset coracle cruises.",
    roomTypes: [
      {
        id: "room-evolve-jacuzzi-hut",
        name: "Safari Hut with Private Open-Air Jacuzzi",
        price: 32000,
        bedType: "1 Four-Poster King Bed",
        maxGuests: 2,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        features: ["Courtyard Jacuzzi", "Tribal Handcrafted Decor", "Kabini River Views", "All Meals Included"]
      },
      {
        id: "room-evolve-pool-hut",
        name: "Pool Reserve Hut with Private Infinity Pool",
        price: 48000,
        bedType: "1 King Bed + Twin Beds",
        maxGuests: 4,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        features: ["Private Temperature Controlled Pool", "Expansive Living Room", "Wildlife Naturalist On-Call"]
      }
    ],
    houseRules: [
      "Check-in: 1:00 PM | Check-out: 11:00 AM",
      "Jungle zone quiet hours after 9:30 PM",
      "Safaris must be booked prior to arrival"
    ],
    cancellationPolicy: "Free cancellation up to 7 days before arrival."
  },
  {
    id: "stay-evolve-back-hampi",
    name: "Evolve Back, Kamalapura Palace, Hampi",
    destinationId: "hampi",
    destinationName: "Hampi & Vijayanagara, Karnataka",
    category: "Palace Sanctuary",
    propertyType: "Unique",
    pricePerNight: 28500,
    priceDisplay: "₹28,500 / night",
    taxesAndFees: 5130,
    rating: 4.97,
    reviewsCount: 290,
    cleanlinessRating: 4.97,
    locationRating: 4.96,
    serviceRating: 4.98,
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Breakfast Included", "Infinity Swimming Pool", "Free High-Speed Wi-Fi",
      "Air Conditioning", "Valet Parking", "Forest Spa", "Fine Dining Restaurant"
    ],
    description: "A monumental 14th-century Vijayanagara fortress palace with stone aqueducts, royal arches, private plunge pools, and bespoke historian-led private monument expeditions.",
    roomTypes: [
      {
        id: "room-hampi-nivasa",
        name: "Nivasa Palace Suite with Private Jacuzzi",
        price: 28500,
        bedType: "1 Grand Royal King Bed",
        maxGuests: 2,
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
        features: ["Stone Arched Balcony", "Private Jacuzzi", "Royal Vijayanagara Bath Amenities"]
      }
    ],
    houseRules: ["Check-in: 2:00 PM | Check-out: 11:00 AM"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in."
  },
  {
    id: "stay-kahani-gokarna",
    name: "Kahani Paradise — Clifftop Ocean Villa Estate",
    destinationId: "gokarna",
    destinationName: "Gokarna & Paradise Beach, Karnataka",
    category: "Private Luxury Villa",
    propertyType: "Villas",
    pricePerNight: 36000,
    priceDisplay: "₹36,000 / night",
    taxesAndFees: 6480,
    rating: 4.99,
    reviewsCount: 160,
    cleanlinessRating: 5.00,
    locationRating: 5.00,
    serviceRating: 4.98,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Breakfast Included", "Infinity Swimming Pool", "Free High-Speed Wi-Fi",
      "Air Conditioning", "Valet Parking", "Pet Friendly", "Private Chef"
    ],
    description: "Perched high on a secluded clifftop overlooking Paradise Beach and the Arabian Sea, set across 20 acres of tropical gardens with a cliff-edge infinity pool.",
    roomTypes: [
      {
        id: "room-kahani-suite",
        name: "Oceanfront Master Suite with Panoramic Terrace",
        price: 36000,
        bedType: "1 Teak Wood King Bed",
        maxGuests: 2,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        features: ["180-Degree Arabian Sea View", "Private Clifftop Daybed", "Dedicated Private Chef Service"]
      }
    ],
    houseRules: ["Check-in: 3:00 PM | Check-out: 12:00 PM"],
    cancellationPolicy: "Free cancellation up to 14 days before arrival."
  },
  {
    id: "stay-chikmagalur-serai",
    name: "The Serai Chikmagalur — Coffee Plantation Villa Resort",
    destinationId: "chikmagalur",
    destinationName: "Chikmagalur Coffee Highlands, Karnataka",
    category: "Plantation Pool Villa",
    propertyType: "Homestays",
    pricePerNight: 19500,
    priceDisplay: "₹19,500 / night",
    taxesAndFees: 3510,
    rating: 4.93,
    reviewsCount: 340,
    cleanlinessRating: 4.95,
    locationRating: 4.96,
    serviceRating: 4.94,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Breakfast Included", "Infinity Swimming Pool", "Free High-Speed Wi-Fi",
      "Air Conditioning", "Valet Parking", "Forest Spa", "Fine Dining Restaurant"
    ],
    description: "Nestled in emerald coffee hills where the air is scented with blooming arabica blossom. Features private gazebos, swimming pools, and signature coffee bean spa therapies.",
    roomTypes: [
      {
        id: "room-serai-pool-villa",
        name: "Estate Villa with Private Courtyard Pool",
        price: 19500,
        bedType: "1 King Bed",
        maxGuests: 2,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        features: ["Private Garden Pool", "Open-to-Sky Rain Shower", "Fresh Single-Origin Coffee Brewer"]
      }
    ],
    houseRules: ["Check-in: 2:00 PM | Check-out: 11:00 AM"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in."
  },
  {
    id: "stay-dandeli-bison-river",
    name: "Bison River Resort & Jungle Cabins",
    destinationId: "dandeli",
    destinationName: "Dandeli Kali River Rapids, Karnataka",
    category: "Riverside Adventure Lodge",
    propertyType: "Resort",
    pricePerNight: 6500,
    priceDisplay: "₹6,500 / night",
    taxesAndFees: 1170,
    rating: 4.86,
    reviewsCount: 220,
    cleanlinessRating: 4.88,
    locationRating: 4.92,
    serviceRating: 4.85,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Breakfast Included", "Free High-Speed Wi-Fi", "Valet Parking", "Restaurant", "Pet Friendly"
    ],
    description: "Located right on the banks of the mighty Kali River, offering rustic wooden cottages, nighttime campfires, and direct access to whitewater rafting put-in points.",
    roomTypes: [
      {
        id: "room-bison-cottage",
        name: "Kali Riverfront Wooden Cottage",
        price: 6500,
        bedType: "1 Queen Bed + 1 Single Bed",
        maxGuests: 3,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
        features: ["River View Porch", "Campfire Access", "Includes Rafting Transfer"]
      }
    ],
    houseRules: ["Check-in: 12:00 PM | Check-out: 10:00 AM"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in."
  },
  {
    id: "stay-zostel-gokarna",
    name: "Zostel Gokarna (Clifftop Sea View Hostel & Private Pods)",
    destinationId: "gokarna",
    destinationName: "Gokarna & Main Beach, Karnataka",
    category: "Boutique Hostel & Pods",
    propertyType: "Hostels",
    pricePerNight: 1200,
    priceDisplay: "₹1,200 / night",
    taxesAndFees: 144, // 12%
    rating: 4.89,
    reviewsCount: 650,
    cleanlinessRating: 4.90,
    locationRating: 4.98,
    serviceRating: 4.88,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Free High-Speed Wi-Fi", "Air Conditioning", "Sea View Cafe", "Co-working Space", "Game Room"
    ],
    description: "A cliffside haven overlooking the pristine Arabian Sea, featuring air-conditioned dorms, private sea-facing cottages, and community sunsets.",
    roomTypes: [
      {
        id: "room-zostel-dorm",
        name: "6-Bed Mixed AC Dorm Bed",
        price: 1200,
        bedType: "1 Bunk Bed",
        maxGuests: 1,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
        features: ["Personal Reading Lamp", "Universal Charging Point", "Locker Storage"]
      },
      {
        id: "room-zostel-private",
        name: "Private Clifftop Sea-View Cottage",
        price: 3800,
        bedType: "1 Queen Bed",
        maxGuests: 2,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
        features: ["En-Suite Bathroom", "Private Sunset Balcony", "Air Conditioning"]
      }
    ],
    houseRules: ["Check-in: 12:00 PM | Check-out: 10:00 AM", "Age 18+ only"],
    cancellationPolicy: "Free cancellation up to 24 hours before check-in."
  },
  {
    id: "stay-leela-palace-bengaluru",
    name: "The Leela Palace Bengaluru",
    destinationId: "bengaluru",
    destinationName: "Bengaluru, Karnataka",
    category: "Grand Heritage Palace Hotel",
    propertyType: "Hotels",
    pricePerNight: 21000,
    priceDisplay: "₹21,000 / night",
    taxesAndFees: 3780,
    rating: 4.97,
    reviewsCount: 890,
    cleanlinessRating: 4.99,
    locationRating: 4.95,
    serviceRating: 4.98,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: [
      "Breakfast Included", "Infinity Swimming Pool", "Free High-Speed Wi-Fi",
      "Air Conditioning", "Valet Parking", "Forest Spa", "Fine Dining Restaurant", "Bar / Lounge"
    ],
    description: "Majestic palace inspired by the architectural grandeur of the Royal House of Mysuru, set within 7 acres of lush gardens in Bengaluru.",
    roomTypes: [
      {
        id: "room-leela-deluxe",
        name: "Royal Premiere Palace Room",
        price: 21000,
        bedType: "1 Grand King Bed",
        maxGuests: 2,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        features: ["Marble Bathroom with Bathtub", "Garden Balcony", "Palace Butler Service"]
      }
    ],
    houseRules: ["Check-in: 2:00 PM | Check-out: 12:00 PM"],
    cancellationPolicy: "Free cancellation up to 24 hours before check-in."
  }
];
