import { 
  Briefcase, 
  Store, 
  Hammer, 
  ShoppingBag, 
  TrendingUp, 
  Map, 
  Truck, 
  Rocket, 
  Video, 
  Printer, 
  Layout, 
  Users, 
  Sparkles,
  Home
} from "lucide-react";

export const services = [
  {
    slug: "corporate-dealer-meets",
    title: "Corporate Dealer Meets & Seminars",
    tagline: "Premium business gatherings, engineered from stage to guest flow.",
    description: "End-to-end management of dealer meets, conferences, seminars, and leadership gatherings with stage, branding, AV, hospitality, and on-ground coordination handled as one seamless experience.",
    deliverables: ["Venue planning", "Stage & backdrop", "Guest flow", "AV coordination"],
    icon: Users,
    category: "Events"
  },
  {
    slug: "retail-branding",
    title: "Retail Branding",
    tagline: "Turning shelves, stores, and counters into brand memory.",
    description: "Retail visibility systems for outlets and stores, including signage, POSM, shelf branding, display zones, and in-shop communication designed to pull attention where purchase decisions happen.",
    deliverables: ["In-store branding", "POS displays", "Signage systems", "Shelf visibility"],
    icon: Store,
    category: "Branding"
  },
  {
    slug: "exhibition-stall-fabrication",
    title: "Exhibition Stall Fabrication",
    tagline: "Custom expo environments that make brands impossible to walk past.",
    description: "Concept, fabrication, branding, lighting, counters, panels, and installation for customized exhibition stalls built for high-impact brand presence.",
    deliverables: ["Booth design", "Fabrication", "Installation", "Lighting & panels"],
    icon: Hammer,
    category: "Fabrication"
  },
  {
    slug: "mall-setup-activation",
    title: "Mall Setup & Activation",
    tagline: "Footfall-focused setups that turn public space into participation.",
    description: "Mall kiosks, demo counters, activation zones, production setups, and campaign staffing designed to attract, engage, and convert shoppers.",
    deliverables: ["Mall kiosks", "Demo counters", "Activation zones", "Production setup"],
    icon: ShoppingBag,
    category: "Promotions"
  },
  {
    slug: "modern-trade-promotions",
    title: "Modern Trade Promotions",
    tagline: "High-visibility retail execution for modern trade environments.",
    description: "Promotional visibility, display branding, sampling, store-level campaign execution, and customer engagement programs for supermarkets and modern retail chains.",
    deliverables: ["Sampling plans", "Display branding", "Promoter support", "Retail reporting"],
    icon: TrendingUp,
    category: "Promotions"
  },
  {
    slug: "promotions-activities",
    title: "Promotions Activities",
    tagline: "Campaign energy brought directly to the audience.",
    description: "BTL promotional activities, field campaigns, brand engagement drives, sampling programs, and ground-level awareness initiatives managed with creative and operational discipline.",
    deliverables: ["BTL campaigns", "Sampling", "Promoter kits", "Field execution"],
    icon: Sparkles,
    category: "Promotions"
  },
  {
    slug: "road-shows",
    title: "Road Shows",
    tagline: "Taking the brand story city-to-city, stop-by-stop.",
    description: "Mobile roadshow planning and execution with routes, permissions, branded setups, promoters, logistics, and live campaign coordination.",
    deliverables: ["Route planning", "Branded setup", "Permissions", "On-ground crew"],
    icon: Map,
    category: "Promotions"
  },
  {
    slug: "mobile-led-van-advertising",
    title: "Mobile & LED Van Advertising",
    tagline: "Moving media that carries the campaign into the street.",
    description: "Customized mobile van and LED van campaigns with branding, screen content, route coverage, amplification, and audience engagement support.",
    deliverables: ["LED van setup", "Vehicle branding", "Route coverage", "Campaign support"],
    icon: Truck,
    category: "Outdoor"
  },
  {
    slug: "payroll-manpower",
    title: "Payroll Manpower Supply & Management",
    tagline: "Reliable campaign manpower, organized and accountable.",
    description: "Managed manpower support for promotions, activations, retail campaigns, events, and field operations with payroll, deployment, supervision, and reporting.",
    deliverables: ["Manpower supply", "Payroll handling", "Supervision", "Deployment reports"],
    icon: Briefcase,
    category: "Management"
  },
  {
    slug: "product-launching",
    title: "Product Launching",
    tagline: "Launch moments designed to feel memorable, sharp, and alive.",
    description: "Product reveal experiences with stagecraft, lighting, AV, branding, audience flow, and launch storytelling built to create attention and recall.",
    deliverables: ["Reveal setup", "Launch stage", "AV moments", "Guest experience"],
    icon: Rocket,
    category: "Events"
  },
  {
    slug: "audio-visual-setup",
    title: "Audio Visual Setup",
    tagline: "Sound, screens, lights, and cues that make events feel precise.",
    description: "Professional AV setup for events and activations, including LED screens, speakers, microphones, control systems, lighting, and show-flow technical support.",
    deliverables: ["LED screens", "Sound systems", "Lighting", "Technical control"],
    icon: Video,
    category: "Production"
  },
  {
    slug: "printing-flex-branding",
    title: "Printing & Flex Branding",
    tagline: "Large-format production for campaigns that need to be seen.",
    description: "Print production across flex, solvent, eco-vinyl, banners, backdrops, retail graphics, outdoor branding, and campaign-ready materials.",
    deliverables: ["Flex printing", "Vinyl graphics", "Banners", "Campaign materials"],
    icon: Printer,
    category: "Fabrication"
  },
  {
    slug: "retail-activations",
    title: "Retail Activations",
    tagline: "In-store moments that turn shoppers into participants.",
    description: "Retail activation programs with product demos, sampling, promoter engagement, counters, customer interaction, and campaign reporting.",
    deliverables: ["Product demos", "Sampling counters", "Promoter teams", "Engagement reports"],
    icon: Sparkles,
    category: "Promotions"
  },
  {
    slug: "store-decoration-interiors",
    title: "Store Decoration & Interiors",
    tagline: "Interior environments shaped around brand presence.",
    description: "Store decoration, interior branding, display lighting, wall treatments, fixtures, and branded spatial elements for retail and business environments.",
    deliverables: ["Interior branding", "Display lighting", "Wall graphics", "Store styling"],
    icon: Home,
    category: "Branding"
  },
  {
    slug: "creative-designing",
    title: "Creative Designing",
    tagline: "Campaign ideas translated into visuals that travel everywhere.",
    description: "Creative concepts, campaign layouts, event graphics, print designs, retail creatives, and visual systems for promotions, activations, and branded environments.",
    deliverables: ["Campaign concepts", "Event graphics", "Print creatives", "Retail layouts"],
    icon: Layout,
    category: "Branding"
  }
];
