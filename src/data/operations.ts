export const operations = {
  offices: [
    {
      id: "bangalore",
      type: "Corporate Office",
      city: "Bangalore",
      address: ["The Estate, 8th Floor", "Dickenson Road, Bangalore 560042"],
      lat: 12.9716,
      lng: 77.5946,
    },
    {
      id: "kolkata",
      type: "Registered Office",
      city: "Kolkata",
      address: ["4, P. C. Mitra Lane", "Kolkata 700033"],
      lat: 22.5726,
      lng: 88.3639,
    },
    {
      id: "mumbai",
      type: "Branch Office",
      city: "Mumbai",
      address: ["New Link Road, Oshiwara", "Andheri West, Mumbai 400053"],
      lat: 19.076,
      lng: 72.8777,
    },
  ],
  india: [
    {
      region: "North",
      locations: ["Delhi", "UP"]
    },
    {
      region: "East",
      locations: ["West Bengal", "North East", "Bihar", "Jharkhand", "Odisha"]
    },
    {
      region: "West",
      locations: ["Mumbai"]
    },
    {
      region: "South",
      locations: ["Chennai", "Bangalore", "Hyderabad", "Kochi", "Coimbatore"]
    }
  ],
  international: [
    {
      country: "UAE",
      locations: ["Dubai"]
    },
    {
      country: "Thailand",
      locations: ["Bangkok"]
    },
    {
      country: "Malaysia",
      locations: ["Kuala Lumpur"]
    }
  ]
};
