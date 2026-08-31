// AURICVISTA Intelligent Itinerary Generation Engine
import { DESTINATIONS } from "../data/destinations.js";
import { STAYS } from "../data/stays.js";
import { EXPERIENCES } from "../data/experiences.js";
import { RESTAURANTS } from "../data/restaurants.js";

export function generateIntelligentItinerary({
  from = "Bangalore",
  destinationId = "coorg",
  daysCount = 3,
  startDate = new Date().toISOString().split("T")[0],
  travellersCount = 2,
  budget = 15000,
  travelStyle = "Couple", // Solo, Couple, Family, Friends, Luxury, Budget, Adventure, Relaxed
  interests = ["Nature", "Food"],
  pace = "Balanced" // Relaxed, Balanced, Packed
}) {
  const dest = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
  const stays = STAYS.filter(s => s.destinationId === dest.id || s.destinationName.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0]));
  const experiences = EXPERIENCES.filter(e => e.destinationId === dest.id || e.destinationName.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0]));
  const restaurants = RESTAURANTS.filter(r => r.destinationId === dest.id || r.destinationName.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0]));

  // Selected base stay
  const chosenStay = stays[0] || {
    name: `${dest.name} Plantation Sanctuary`,
    pricePerNight: travelStyle === "Luxury" ? 22000 : travelStyle === "Budget" ? 2500 : 8500
  };

  const days = [];

  for (let i = 1; i <= daysCount; i++) {
    const isFirstDay = i === 1;
    const isLastDay = i === daysCount;

    let morningActivity, afternoonActivity, eveningActivity;

    if (isFirstDay) {
      morningActivity = {
        id: `act-d${i}-m`,
        timeSlot: "Morning",
        time: "07:30 AM",
        title: `Scenic Road Transit: ${from} ➔ ${dest.name}`,
        location: `Highway Passage (${dest.distanceFromBlr || 260} km)`,
        travelTime: "4h 30m drive",
        duration: "4.5 Hours",
        category: "Transport",
        cost: travelStyle === "Luxury" ? 5400 : 2800,
        budgetCategory: "Transport",
        openingInfo: "Available 24/7",
        recommendedTime: "Early Morning Departure",
        notes: "Picturesque Western Ghats highway drive with filter coffee pitstop.",
        icon: "🚗"
      };

      afternoonActivity = {
        id: `act-d${i}-a`,
        timeSlot: "Afternoon",
        time: "01:30 PM",
        title: `Check-in at ${chosenStay.name} & Authentic Lunch`,
        location: dest.name,
        travelTime: "15 min",
        duration: "2 Hours",
        category: "Stay & Dining",
        cost: travelStyle === "Luxury" ? 3200 : 1200,
        budgetCategory: "Food",
        openingInfo: "Check-in from 01:00 PM",
        recommendedTime: "Post-Arrival",
        notes: "Savor fresh regional delicacies and settle into your estate cottage.",
        icon: "🏨"
      };

      eveningActivity = {
        id: `act-d${i}-e`,
        timeSlot: "Evening",
        time: "05:00 PM",
        title: `Sunset Viewpoint & Plantation Walk`,
        location: `${dest.name} Highlands`,
        travelTime: "20 min",
        duration: "2 Hours",
        category: "Sightseeing",
        cost: 400,
        budgetCategory: "Activities",
        openingInfo: "Open 06:00 AM – 06:30 PM",
        recommendedTime: "Golden Hour (05:00 PM)",
        notes: "Catch panoramic valley sunset and gentle coffee blossom breeze.",
        icon: "🌄"
      };
    } else if (isLastDay) {
      morningActivity = {
        id: `act-d${i}-m`,
        timeSlot: "Morning",
        time: "08:30 AM",
        title: `Artisanal Coffee & Spice Souvenir Trail`,
        location: `${dest.name} Central Bazaar`,
        travelTime: "15 min",
        duration: "2.5 Hours",
        category: "Shopping",
        cost: 2500,
        budgetCategory: "Shopping",
        openingInfo: "Markets open 08:30 AM – 08:00 PM",
        recommendedTime: "Morning",
        notes: "Pick up freshly harvested Arabica beans, wild honey, and authentic spices.",
        icon: "☕"
      };

      afternoonActivity = {
        id: `act-d${i}-a`,
        timeSlot: "Afternoon",
        time: "12:00 PM",
        title: `Farewell Feast & Estate Check-out`,
        location: chosenStay.name,
        travelTime: "10 min",
        duration: "2 Hours",
        category: "Dining",
        cost: travelStyle === "Luxury" ? 2800 : 1100,
        budgetCategory: "Food",
        openingInfo: "Check-out until 12:00 PM",
        recommendedTime: "Noon",
        notes: "Grand regional thali banquet before departing.",
        icon: "🍴"
      };

      eveningActivity = {
        id: `act-d${i}-e`,
        timeSlot: "Evening",
        time: "03:00 PM",
        title: `Return Chauffeur Transit to ${from}`,
        location: `Return Highway to ${from}`,
        travelTime: "4h 30m drive",
        duration: "4.5 Hours",
        category: "Transport",
        cost: travelStyle === "Luxury" ? 5400 : 2800,
        budgetCategory: "Transport",
        openingInfo: "Highway Route",
        recommendedTime: "Afternoon",
        notes: "Smooth return journey home refreshed by nature.",
        icon: "🚗"
      };
    } else {
      // Middle Exploring Days
      const attraction = dest.topAttractions ? dest.topAttractions[(i - 2) % dest.topAttractions.length] : { name: "Historic Sanctuary & Falls", description: "Scenic viewpoints" };
      const exp = experiences[(i - 2) % experiences.length] || { title: "Guided Rainforest Nature Trail", price: 1800, duration: "3 Hours" };
      const rest = restaurants[(i - 2) % restaurants.length] || { name: "Heritage Dining Hall", specialties: ["Regional Curry", "Fresh Rotti"] };

      morningActivity = {
        id: `act-d${i}-m`,
        timeSlot: "Morning",
        time: "08:00 AM",
        title: `Expedition: ${attraction.name}`,
        location: `${dest.name} Valley`,
        travelTime: "30 min drive",
        duration: "3 Hours",
        category: "Sightseeing",
        cost: 800,
        budgetCategory: "Tickets",
        openingInfo: "Open 08:00 AM – 05:30 PM",
        recommendedTime: "Morning (cool mist)",
        notes: attraction.description || "Explore breathtaking landmarks and heritage stonework.",
        icon: "📍"
      };

      afternoonActivity = {
        id: `act-d${i}-a`,
        timeSlot: "Afternoon",
        time: "01:30 PM",
        title: `Bespoke Experience: ${exp.title}`,
        location: `${dest.name} Reserves`,
        travelTime: "20 min",
        duration: exp.duration || "2.5 Hours",
        category: "Experience",
        cost: exp.price || 2200,
        budgetCategory: "Activities",
        openingInfo: "Slots at 01:30 PM",
        recommendedTime: "Afternoon",
        notes: exp.description || "Immersive sensory workshop and guided exploration.",
        icon: "🎟️"
      };

      eveningActivity = {
        id: `act-d${i}-e`,
        timeSlot: "Evening",
        time: "07:30 PM",
        title: `Gastronomy Dinner at ${rest.name}`,
        location: dest.name,
        travelTime: "15 min",
        duration: "2 Hours",
        category: "Dining",
        cost: travelStyle === "Luxury" ? 3500 : 1500,
        budgetCategory: "Food",
        openingInfo: "Dinner service 07:00 PM – 10:30 PM",
        recommendedTime: "Night",
        notes: `Signature dishes: ${(rest.specialties || ['Regional specialties']).slice(0, 2).join(', ')}.`,
        icon: "🍴"
      };
    }

    days.push({
      day: i,
      title: isFirstDay ? `Day 1: Arrival & Valley Settling` : isLastDay ? `Day ${i}: Heritage Souvenirs & Return` : `Day ${i}: Deep Sanctuaries & Immersion`,
      activities: [morningActivity, afternoonActivity, eveningActivity]
    });
  }

  // 7-Category Budget Breakdown Calculation
  let accommodationTotal = chosenStay.pricePerNight * Math.max(1, daysCount - 1);
  let transportTotal = 0;
  let foodTotal = 0;
  let activitiesTotal = 0;
  let ticketsTotal = 0;
  let shoppingTotal = 0;
  let otherTotal = Math.round(budget * 0.05); // 5% contingency

  days.forEach(d => {
    d.activities.forEach(act => {
      if (act.budgetCategory === "Transport") transportTotal += act.cost;
      else if (act.budgetCategory === "Food") foodTotal += act.cost;
      else if (act.budgetCategory === "Activities") activitiesTotal += act.cost;
      else if (act.budgetCategory === "Tickets") ticketsTotal += act.cost;
      else if (act.budgetCategory === "Shopping") shoppingTotal += act.cost;
    });
  });

  const estimatedTotal = accommodationTotal + transportTotal + foodTotal + activitiesTotal + ticketsTotal + shoppingTotal + otherTotal;
  const remainingBudget = budget - estimatedTotal;

  return {
    id: "trip-" + Date.now(),
    title: `${from} ➔ ${dest.name} ${daysCount}-Day ${travelStyle} Escape`,
    from,
    destination: dest.name,
    destinationId: dest.id,
    daysCount,
    startDate,
    travellersCount,
    travelStyle,
    interests,
    pace,
    chosenStay,
    days,
    budgetSummary: {
      targetBudget: budget,
      estimatedTotal,
      remainingBudget,
      isUnderBudget: remainingBudget >= 0,
      breakdown: {
        accommodation: accommodationTotal,
        transport: transportTotal,
        food: foodTotal,
        activities: activitiesTotal,
        tickets: ticketsTotal,
        shopping: shoppingTotal,
        other: otherTotal
      }
    }
  };
}
