// AURICVISTA Buses Database (KSRTC Airavat & Premium Luxury Coach Services)
// Internal note: Mock data structured for future RedBus / AbhiBus / KSRTC API integration

export const BUS_ROUTES = [
  {
    id: "bus-ksrtc-coorg",
    operator: "KSRTC Airavat Club Class (Multi-Axle Volvo)",
    fromCity: "Bengaluru (Kempegowda Majestic)",
    toCity: "Madikeri (Coorg)",
    departureTime: "06:30 AM",
    arrivalTime: "12:15 PM",
    duration: "5h 45m",
    busType: "Volvo Multi-Axle AC Semi-Sleeper (2+2)",
    price: 685,
    rating: 4.88,
    seatsAvailable: 22,
    amenities: ["Wi-Fi", "Water Bottle", "Blanket", "Charging Points", "Live GPS Tracking"]
  },
  {
    id: "bus-ksrtc-coorg-night",
    operator: "KSRTC Flybus Direct (Bengaluru Airport ➔ Coorg)",
    fromCity: "BLR Kempegowda Int'l Airport",
    toCity: "Madikeri (Coorg)",
    departureTime: "11:00 PM",
    arrivalTime: "05:30 AM",
    duration: "6h 30m",
    busType: "Multi-Axle Luxury AC Coach (2+2)",
    price: 990,
    rating: 4.92,
    seatsAvailable: 16,
    amenities: ["Airport Direct", "Wi-Fi", "Entertainment Screen", "Recliner Seats"]
  },
  {
    id: "bus-ksrtc-gokarna",
    operator: "KSRTC Airavat Diamond Class (Scania AC)",
    fromCity: "Bengaluru (Shantinagar)",
    toCity: "Gokarna Bus Stand",
    departureTime: "09:00 PM",
    arrivalTime: "07:30 AM",
    duration: "10h 30m",
    busType: "Scania Multi-Axle AC Sleeper (2+1)",
    price: 1350,
    rating: 4.86,
    seatsAvailable: 14,
    amenities: ["AC Sleeper Berth", "Reading Light", "Clean Linen", "Emergency Button"]
  },
  {
    id: "bus-ksrtc-hampi",
    operator: "KSRTC Corona AC Sleeper",
    fromCity: "Bengaluru (Majestic)",
    toCity: "Hampi / Hosapete",
    departureTime: "10:30 PM",
    arrivalTime: "06:15 AM",
    duration: "7h 45m",
    busType: "Luxury AC Sleeper (2+1)",
    price: 1100,
    rating: 4.84,
    seatsAvailable: 18,
    amenities: ["Individual USB Ports", "Mineral Water", "Comfortable Mattress"]
  },
  {
    id: "bus-ksrtc-chikmagalur",
    operator: "KSRTC Airavat Volvo Express",
    fromCity: "Bengaluru (Majestic)",
    toCity: "Chikmagalur",
    departureTime: "07:00 AM",
    arrivalTime: "11:45 AM",
    duration: "4h 45m",
    busType: "Volvo B11R Multi-Axle AC",
    price: 610,
    rating: 4.90,
    seatsAvailable: 28,
    amenities: ["Wi-Fi", "Charging Port", "Spacious Legroom", "Scenic Ghat Route"]
  }
];
