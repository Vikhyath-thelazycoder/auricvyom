export const TRANSPORT_SERVICES = [
  {
    id: "tr-innova-crysta",
    name: "Toyota Innova Crysta (Luxury Chauffeur)",
    category: "Chauffeured Luxury SUV",
    capacity: "6 Passengers + 4 Luggage",
    ratePerKm: "₹18/km",
    baseDailyRate: 3800,
    currency: "INR",
    priceDisplay: "₹3,800 / day",
    features: ["Uniformed English/Kannada Chauffeur", "Reclining Captain Seats", "Dual AC", "Complementary Bottled Mineral Water & Wi-Fi", "All Tolls & Permits Assistance"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    popularRoutes: [
      { from: "Bengaluru", to: "Coorg (260 km)", estTime: "5.5h", estFare: "₹5,400" },
      { from: "Bengaluru", to: "Chikmagalur (240 km)", estTime: "4.5h", estFare: "₹5,100" },
      { from: "Bengaluru", to: "Mysuru (145 km)", estTime: "2.5h", estFare: "₹3,200" },
      { from: "Mangalore", to: "Udupi & Gokarna (230 km)", estTime: "4.5h", estFare: "₹4,800" }
    ]
  },
  {
    id: "tr-fortuner-4x4",
    name: "Toyota Fortuner 4x4 Off-Road Expedition",
    category: "Mountain 4x4 Expedition SUV",
    capacity: "6 Passengers + 3 Luggage",
    ratePerKm: "₹24/km",
    baseDailyRate: 5500,
    currency: "INR",
    priceDisplay: "₹5,500 / day",
    features: ["High-Ground Clearance 4x4", "Ghats Mountain Specialist Driver", "Snorkel & Offroad Tires", "Roof Luggage Carrier", "Emergency Satellite Beacon"],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    popularRoutes: [
      { from: "Chikmagalur", to: "Mullayanagiri & Kemmanagundi", estTime: "3h", estFare: "₹3,500" },
      { from: "Sakleshpur", to: "Bisle Ghat & Pushpagiri", estTime: "4h", estFare: "₹4,200" },
      { from: "Coorg", to: "Brahmagiri & Mandalpatti Ridge", estTime: "3.5h", estFare: "₹3,800" }
    ]
  },
  {
    id: "tr-luxury-tempo",
    name: "Mercedes / Force Urbania Luxury Van",
    category: "Small Group & Family Luxury Van",
    capacity: "12-16 Luxury Reclining Seats",
    ratePerKm: "₹32/km",
    baseDailyRate: 7500,
    currency: "INR",
    priceDisplay: "₹7,500 / day",
    features: ["Individual AC Vents & USB Ports", "Entertainment LED Screen & Audio", "Air Suspension Comfort Ride", "Spacious Rear Luggage Bay"],
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    popularRoutes: [
      { from: "Bengaluru", to: "Hampi Circuit (350 km)", estTime: "6.5h", estFare: "₹12,000" },
      { from: "Bengaluru", to: "Mysore & Coorg (300 km)", estTime: "6h", estFare: "₹10,500" }
    ]
  },
  {
    id: "tr-thar-selfdrive",
    name: "Mahindra Thar 4x4 (Self-Drive)",
    category: "Self-Drive Convertible / Hardtop",
    capacity: "4 Passengers",
    ratePerKm: "Unlimited km / Day",
    baseDailyRate: 4200,
    currency: "INR",
    priceDisplay: "₹4,200 / day",
    features: ["Automatic 4x4 Transmission", "Apple CarPlay & Android Auto", "Comprehensive Zero-Dep Insurance", "24/7 Roadside Assistance"],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    popularRoutes: [
      { from: "Goa / Gokarna", to: "Dandeli Rainforest", estTime: "3h", estFare: "Self-Drive" },
      { from: "Mangalore", to: "Agumbe & Western Ghats", estTime: "3h", estFare: "Self-Drive" }
    ]
  }
];
