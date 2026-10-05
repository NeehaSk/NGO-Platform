// Fallback mock data when database server is not yet connected locally
export const FALLBACK_PROGRAMS = [
  {
    id: "prog_1",
    slug: "vidya-jyothi-scholarships",
    title: "Vidya Jyothi: Rural Education Support",
    shortDescription:
      "Providing textbooks, uniform kits, digital labs, and merit scholarships for underprivileged children across Vijayawada and Krishna district.",
    description: `### Overview\nEducation is the single most potent equalizer. In rural pockets along the Krishna river basin and marginalized colonies of Vijayawada, hundreds of bright children drop out due to lack of school essentials and examination fees.\n\n### Our Intervention\n1. School Supply Distribution: Complete sets of bilingual textbooks, notebooks, school bags, and uniforms.\n2. Community Study Centers: Evening supplementary classes run by local youth mentors.\n3. Girls' Secondary Education Scholarships: Financial grants covering board exam fees and transport cycles.\n\n### Measurable Goals\n* Support 500+ primary school students annually.\n* Setup 5 digital learning corners in government schools.\n* Zero dropout rate among enrolled scholarship recipients.`,
    coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    targetAmount: 500000,
    raisedAmount: 325000,
    beneficiaries: 520,
    status: "ACTIVE",
    featured: true,
  },
  {
    id: "prog_2",
    slug: "arogya-raksha-mobile-clinics",
    title: "Arogya Raksha: Preventive Health Camps",
    shortDescription:
      "Fortnightly free medical diagnostics, geriatric health checkups, vision screenings, and vital medicines for vulnerable families.",
    description: `### Overview\nAccess to early preventive diagnostics remains limited for daily-wage laborers, sanitation workers, and elderly citizens in suburban Vijayawada and flood-prone riverbank settlements.\n\n### Our Intervention\n1. Mobile Diagnostic Vans: Routine blood glucose, blood pressure, hemoglobin, and vision testing.\n2. Specialist Consultations: Volunteer doctors specializing in general medicine, pediatrics, and ophthalmology.\n3. Free Prescription Support: Dispensing 30-day generic medications for chronic ailments.\n\n### Measurable Goals\n* Conduct 24 medical camps across 12 wards each year.\n* Free cataract screening & corrective surgeries for 150 elderly citizens.`,
    coverImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
    targetAmount: 750000,
    raisedAmount: 480000,
    beneficiaries: 1840,
    status: "ACTIVE",
    featured: true,
  },
  {
    id: "prog_3",
    slug: "mahila-shakti-vocational-skills",
    title: "Mahila Shakti: Women Livelihoods",
    shortDescription:
      "Vocational training in tailoring, organic food processing, handcrafts, and micro-entrepreneurship for single mothers and rural women.",
    description: `### Overview\nFinancial independence transforms families and uplifts entire neighborhoods. Our skill development program equips women with market-linked vocational capabilities.\n\n### Our Intervention\n1. Certified Tailoring & Embroidery: 3-month rigorous training with modern sewing machines.\n2. Traditional Foods & Millet Snacks: Safe food handling, packaging, and local bazaar tie-ups.\n3. Financial Literacy & Self-Help Groups: Bank linkages and micro-grant mentorship.\n\n### Measurable Goals\n* Train 200 women per year with certified vocational skills.\n* Provide 50 toolkits/sewing machines to top graduating trainees.`,
    coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
    targetAmount: 400000,
    raisedAmount: 260000,
    beneficiaries: 240,
    status: "ACTIVE",
    featured: true,
  },
];

export const FALLBACK_STORIES = [
  {
    id: "story_1",
    slug: "laxmis-journey-to-intermediate-college",
    title: "How Higher Education Opened Doors for Laxmi",
    excerpt:
      "With our scholarship and mentorship support, Laxmi from Ibrahimpatnam became the first girl in her family to enter college.",
    content: `Laxmi's father is a construction worker and her mother works as a domestic helper in Vijayawada. When she completed 10th grade with a 9.2 GPA, financial hardships almost forced her into early marriage.\n\nThrough the Vidya Jyothi scholarship scheme, the Trust covered her intermediate college admissions, books, and public transport bus pass. Today, Laxmi is pursuing MPC (Mathematics, Physics, Chemistry) and dreams of studying computer science.\n\n"When people invest in a girl's learning, they elevate the dignity of an entire household," shares her proud mother.`,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop",
    author: "Field Coordination Cell",
    published: true,
    publishedAt: new Date(),
  },
  {
    id: "story_2",
    slug: "vision-restored-for-grandparent-appana",
    title: "Restoring Vision and Independence for Appana Garu",
    excerpt:
      "A routine screening at our Arogya Raksha camp helped identify severe cataracts and restored clear eyesight for a 68-year-old grandfather.",
    content: `At 68, Appana Garu had been unable to read Telugu daily newspapers or walk safely down his street due to dense bilateral cataracts. Lacking insurance and funds, he had resigned himself to living in shadows.\n\nDuring the free health camp held in Krishna Lanka, Vijayawada, volunteer ophthalmologists diagnosed his condition. The trust facilitated his surgery at no cost through partner eye care facilities.\n\nThree weeks post-surgery, Appana Garu was smiling again, reading spiritual books and taking his grandchildren to the park.`,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    author: "Health Outreach Cell",
    published: true,
    publishedAt: new Date(),
  },
];

export const FALLBACK_EVENTS = [
  {
    id: "event_1",
    slug: "annual-free-eye-and-health-camp-2026",
    title: "Annual Mega Health & Vision Screening Camp",
    description:
      "Comprehensive health checkups, dental check, diabetic screening, and free distribution of prescribed eye glasses in partnership with local medical volunteers.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    location: "Community Hall, Krishna Lanka, Vijayawada, AP",
    eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    status: "UPCOMING" as const,
  },
  {
    id: "event_2",
    slug: "krishna-riverbank-environment-cleanliness-drive",
    title: "Krishna Riverbank Eco Cleanliness & Tree Planting",
    description:
      "Youth volunteer drive to clean up plastic waste along river ghats and plant 200 indigenous shade trees to prevent soil erosion.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
    location: "Bhavani Ghat, Vijayawada, Andhra Pradesh",
    eventDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    status: "UPCOMING" as const,
  },
];

export const FALLBACK_GALLERY = [
  {
    id: "gal_1",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    title: "Digital Lab Inauguration",
    caption: "Children experiencing educational software for the first time in Vijayawada rural school.",
    category: "Education",
  },
  {
    id: "gal_2",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop",
    title: "Free Geriatric Health Checkup",
    caption: "Senior citizens undergoing preventive diabetes check and blood pressure measurement.",
    category: "Healthcare",
  },
  {
    id: "gal_3",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    title: "Tailoring Certification Graduation",
    caption: "Batch 4 trainees receiving graduation certificates and sewing starter kits.",
    category: "Community",
  },
  {
    id: "gal_4",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
    title: "Relief Kit Distribution",
    caption: "Food and ration kits supplied to marginalized daily-wage families during seasonal floods.",
    category: "Relief",
  },
];
