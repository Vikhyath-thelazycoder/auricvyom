// AURICVISTA API-Ready Service Architecture & Connectors
// NOTE: Currently running in Client Simulation / Demo Mode.
// Structured to easily connect live backend REST/GraphQL APIs for:
// - Payment Gateways (Razorpay / Stripe / Apple Pay)
// - Hotel APIs (HotelBeds / Amadeus Hospitality)
// - Flight APIs (Amadeus / Sabre / Kiwi)
// - Rail APIs (IRCTC Partner API)
// - Bus APIs (RedBus / AbhiBus / KSRTC GDS)

import { STAYS } from "../data/stays.js";
import { EXPERIENCES } from "../data/experiences.js";
import { FLIGHT_ROUTES } from "../data/flights.js";
import { TRAIN_ROUTES } from "../data/trains.js";
import { BUS_ROUTES } from "../data/buses.js";
import { TRANSPORT_SERVICES } from "../data/transport.js";
import { PACKAGES } from "../data/packages.js";

class StaysService {
  async searchStays({ destination, checkIn, checkOut, guests, propertyType, maxPrice, amenities = [] }) {
    // Simulated network delay
    await new Promise(r => setTimeout(r, 120));

    return STAYS.filter(stay => {
      if (destination && !stay.destinationName.toLowerCase().includes(destination.toLowerCase()) && !stay.name.toLowerCase().includes(destination.toLowerCase())) {
        return false;
      }
      if (propertyType && propertyType !== "all" && stay.propertyType !== propertyType) {
        return false;
      }
      if (maxPrice && stay.pricePerNight > maxPrice) {
        return false;
      }
      if (amenities.length > 0) {
        const hasAll = amenities.every(req => stay.amenities.some(a => a.toLowerCase().includes(req.toLowerCase())));
        if (!hasAll) return false;
      }
      return true;
    });
  }

  async getStayById(id) {
    return STAYS.find(s => s.id === id) || null;
  }
}

class ExperiencesService {
  async searchExperiences({ category, difficulty, query }) {
    await new Promise(r => setTimeout(r, 100));

    return EXPERIENCES.filter(exp => {
      if (category && category !== "all" && exp.category !== category) return false;
      if (difficulty && difficulty !== "all" && exp.difficulty !== difficulty) return false;
      if (query && !exp.title.toLowerCase().includes(query.toLowerCase()) && !exp.destinationName.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }

  async getExperienceById(id) {
    return EXPERIENCES.find(e => e.id === id) || null;
  }
}

class TransportService {
  async searchFlights({ from, to, date }) {
    await new Promise(r => setTimeout(r, 150));
    return FLIGHT_ROUTES.filter(f => {
      if (from && f.from.toLowerCase() !== from.toLowerCase() && !f.fromCity.toLowerCase().includes(from.toLowerCase())) return false;
      if (to && f.to.toLowerCase() !== to.toLowerCase() && !f.toCity.toLowerCase().includes(to.toLowerCase())) return false;
      return true;
    });
  }

  async searchTrains({ from, to, date }) {
    await new Promise(r => setTimeout(r, 150));
    return TRAIN_ROUTES.filter(t => {
      if (from && !t.from.toLowerCase().includes(from.toLowerCase())) return false;
      if (to && !t.to.toLowerCase().includes(to.toLowerCase())) return false;
      return true;
    });
  }

  async searchBuses({ from, to, date }) {
    await new Promise(r => setTimeout(r, 150));
    return BUS_ROUTES.filter(b => {
      if (from && !b.fromCity.toLowerCase().includes(from.toLowerCase())) return false;
      if (to && !b.toCity.toLowerCase().includes(to.toLowerCase())) return false;
      return true;
    });
  }

  async getCabsAndCarRentals() {
    return TRANSPORT_SERVICES;
  }
}

class BookingService {
  async createReservation(bookingPayload) {
    await new Promise(r => setTimeout(r, 300));
    const bookingId = "AV-" + (bookingPayload.type || "RES").toUpperCase() + "-" + Math.floor(100000 + Math.random() * 900000);
    const voucherCode = "VOUCH-" + Math.floor(1000 + Math.random() * 9000);

    return {
      success: true,
      bookingId,
      voucherCode,
      createdAt: new Date().toISOString(),
      status: "CONFIRMED",
      paymentStatus: "PAID",
      ...bookingPayload
    };
  }
}

export const staysApi = new StaysService();
export const experiencesApi = new ExperiencesService();
export const transportApi = new TransportService();
export const bookingApi = new BookingService();
