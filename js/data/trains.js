// AURICVISTA Trains Database (Karnataka & Pan-India Rail Circuits)
// Internal note: Mock data structured for future IRCTC / Rail API integration

export const TRAIN_ROUTES = [
  {
    id: "train-20607",
    trainNumber: "20607 / 20608",
    name: "Vande Bharat Express (Mysuru ➔ Bengaluru ➔ Chennai)",
    from: "Bengaluru (SBC / KSR)",
    to: "Mysuru Junction (MYS)",
    departureTime: "05:45 AM",
    arrivalTime: "07:20 AM",
    duration: "1h 35m",
    operatesOn: ["Mon", "Tue", "Wed", "Fri", "Sat", "Sun"],
    classes: [
      { code: "CC", name: "AC Chair Car", price: 595, seatsAvailable: 42 },
      { code: "EC", name: "Executive Chair Car", price: 1120, seatsAvailable: 18 }
    ],
    rating: 4.94,
    foodIncluded: true,
    speed: "Semi-High Speed (130 km/h)"
  },
  {
    id: "train-12007",
    trainNumber: "12007 / 12008",
    name: "Shatabdi Express (Bengaluru ➔ Mysuru)",
    from: "Bengaluru (SBC)",
    to: "Mysuru Junction (MYS)",
    departureTime: "10:50 AM",
    arrivalTime: "12:55 PM",
    duration: "2h 05m",
    operatesOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sun"],
    classes: [
      { code: "CC", name: "AC Chair Car", price: 540, seatsAvailable: 68 },
      { code: "EC", name: "Executive AC", price: 1040, seatsAvailable: 24 }
    ],
    rating: 4.88,
    foodIncluded: true,
    speed: "Superfast Express"
  },
  {
    id: "train-16591",
    trainNumber: "16591 / 16592",
    name: "Hampi Express (Bengaluru ➔ Hosapete / Hampi)",
    from: "Bengaluru (SBC)",
    to: "Hosapete Junction (HPT - Hampi)",
    departureTime: "09:50 PM",
    arrivalTime: "07:10 AM",
    duration: "9h 20m",
    operatesOn: ["Daily"],
    classes: [
      { code: "1A", name: "AC 1st Class", price: 2150, seatsAvailable: 8 },
      { code: "2A", name: "AC 2-Tier", price: 1350, seatsAvailable: 28 },
      { code: "3A", name: "AC 3-Tier", price: 950, seatsAvailable: 74 }
    ],
    rating: 4.82,
    foodIncluded: false,
    speed: "Overnight Express"
  },
  {
    id: "train-16585",
    trainNumber: "16585 / 16586",
    name: "Karwar Express (Bengaluru ➔ Hassan ➔ Mangaluru ➔ Gokarna)",
    from: "Bengaluru (YPR)",
    to: "Gokarna Road (GOK)",
    departureTime: "08:15 PM",
    arrivalTime: "10:30 AM",
    duration: "14h 15m",
    operatesOn: ["Daily"],
    classes: [
      { code: "1A", name: "AC 1st Class", price: 2650, seatsAvailable: 6 },
      { code: "2A", name: "AC 2-Tier", price: 1650, seatsAvailable: 34 },
      { code: "3A", name: "AC 3-Tier", price: 1150, seatsAvailable: 82 }
    ],
    rating: 4.85,
    foodIncluded: false,
    speed: "Western Ghats Scenic Rail"
  },
  {
    id: "train-gold-chariot",
    trainNumber: "GC-001",
    name: "The Golden Chariot (Karnataka Royal Luxury Train)",
    from: "Bengaluru (YPR)",
    to: "Hampi • Badami • Goa • Mysore (Circuit)",
    departureTime: "08:00 PM (Weekly Departure)",
    arrivalTime: "08:00 AM (7th Day)",
    duration: "6 Nights / 7 Days",
    operatesOn: ["Every Sunday"],
    classes: [
      { code: "ROYAL", name: "Deluxe Royal Suite", price: 345000, seatsAvailable: 12 },
      { code: "PRESIDENT", name: "Presidential Suite", price: 580000, seatsAvailable: 4 }
    ],
    rating: 4.98,
    foodIncluded: true,
    speed: "Ultra-Luxury Palace on Wheels"
  }
];
