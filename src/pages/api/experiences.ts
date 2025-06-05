
// Mock API endpoint for experiences data
export const fetchExperiences = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const data = {
    "internalExperiences": [
      {
        "id": 1,
        "title": "Spa & Wellness",
        "description": "Relax at our world-class spa with a variety of treatments including massages, facials, and wellness therapies.",
        "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=200&fit=crop",
        "position": { "x": -2, "y": 0, "z": 2 },
        "color": "#E6F3FF"
      },
      {
        "id": 2,
        "title": "Fitness Center",
        "description": "State-of-the-art fitness center open 24/7 with modern equipment and personal training services.",
        "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
        "position": { "x": 2, "y": 0, "z": 2 },
        "color": "#FFE6E6"
      },
      {
        "id": 3,
        "title": "Rooftop Pool",
        "description": "Stunning rooftop infinity pool with panoramic city views and poolside service.",
        "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
        "position": { "x": 0, "y": 1, "z": -2 },
        "color": "#E6FFE6"
      },
      {
        "id": 4,
        "title": "Lobby & Concierge",
        "description": "Elegant lobby with 24/7 concierge services to assist with all your needs.",
        "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop",
        "position": { "x": 0, "y": 0, "z": 0 },
        "color": "#FFF0E6"
      }
    ],
    "externalExperiences": [
      {
        "id": 1,
        "name": "Café Delight",
        "distance": "0.5 km",
        "rating": 4.5,
        "cuisine": "French Bistro",
        "coordinates": { "lat": 40.7589, "lng": -73.9851 },
        "priceRange": "$$"
      },
      {
        "id": 2,
        "name": "Ocean Bistro",
        "distance": "1.2 km",
        "rating": 4.0,
        "cuisine": "Seafood",
        "coordinates": { "lat": 40.7614, "lng": -73.9776 },
        "priceRange": "$$$"
      },
      {
        "id": 3,
        "name": "Sakura Sushi",
        "distance": "0.8 km",
        "rating": 4.7,
        "cuisine": "Japanese",
        "coordinates": { "lat": 40.7505, "lng": -73.9934 },
        "priceRange": "$$$$"
      },
      {
        "id": 4,
        "name": "Bella Italia",
        "distance": "0.3 km",
        "rating": 4.2,
        "cuisine": "Italian",
        "coordinates": { "lat": 40.7580, "lng": -73.9855 },
        "priceRange": "$$"
      }
    ]
  };
  
  return data;
};
