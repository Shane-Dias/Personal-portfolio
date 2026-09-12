// EDIT ME: Update links and any fields marked PLACEHOLDER before publishing.
export const profile = {
  name: "Shane Dias",
  role: "Software Engineer",
  location: "Mumbai, India",
  phone: "+91-7900042753",
  email: "shanedias0111@gmail.com",
  github: "https://github.com/Shane-Dias",
  linkedin: "https://www.linkedin.com/in/shane-dias-28a112291",
  resumeUrl: "/Shane_Dias_Resume.pdf",
  tagline:
    "I design and ship dependable web products, from the interface people use to the services and data that keep them moving.",
  summary:
    "Computer Engineering student (Sem VII, CGPA 8.94/10) with hands-on experience building full-stack applications, event-driven AWS pipelines, and Spring Boot services. I enjoy turning product ideas into reliable systems, from thoughtful interfaces and API contracts to cloud infrastructure and data-informed decisions.",
};

export const education = {
  degree: "B.E. in Computer Engineering",
  school: "Fr. Conceicao Rodrigues College of Engineering, Mumbai",
  detail: "Semester VII · CGPA 8.94 / 10",
  expected: "Expected 2027",
  prior: [
    { label: "HSC — St. Andrew's College", value: "86.67% · 2023" },
    { label: "SSC — St. Anne's High School", value: "86.40% · 2021" },
  ],
};

export const stack = [
  { group: "Languages", items: ["JavaScript", "Java", "Python", "SQL"] },
  { group: "Frontend", items: ["React.js", "HTML5", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express.js", "Spring Boot"] },
  { group: "Data & Databases", items: ["MongoDB", "MySQL", "Pandas", "NumPy"] },
  {
    group: "Cloud (AWS)",
    items: ["EC2", "S3", "Lambda", "DynamoDB", "IAM", "SNS"],
  },
  { group: "Tooling", items: ["Git / GitHub", "Postman", "Power BI"] },
];

export const projects = [
  {
    code: "BHS-01",
    kind: "Safety platform",
    name: "BharatSecure",
    stack:
      "React.js · Vite · Django REST Framework · SQLite · Leaflet · OpenStreetMap",
    description:
      "A web-based incident reporting and response platform focused on improving safety through accessible reporting, real-time alerts, and location-based analytics.",
    points: [
      "Text and voice-based incident reporting with anonymous reporting capabilities",
      "Real-time alert and incident tracking workflows for reported cases",
      "Interactive heatmap analytics to visualize incident patterns geographically",
      "SOS workflow with location tracking for emergency situations",
    ],
    repo: "https://github.com/Shane-Dias",
    demo: "",
  },
  {
    code: "TS-01",
    kind: "Travel safety platform",
    name: "TravelSafe AI",
    stack:
      "MERN · Google Generative AI · Mapbox / Leaflet · Clerk · Cloudinary",
    description:
      "An AI-powered travel safety platform providing real-time travel insights, safety analysis, and emergency support.",
    points: [
      "Safety analysis, route planning, incident reporting, weather alerts, trip management, and SOS features",
      "Google Generative AI, mapping, weather, and location APIs for AI-powered recommendations",
      "REST APIs, interactive maps, dashboards, responsive interfaces, authentication, and protected workflows",
    ],
    repo: "https://github.com/Shane-Dias",
    demo: "",
  },
  {
    code: "BLD-01",
    kind: "Web platform",
    name: "BrightBuilds",
    stack: "MERN Stack · Render · Vercel · Cloudinary",
    description:
      "A centralized project showcase platform connecting students, faculty, and administrators through submission and review workflows.",
    points: [
      "Secure JWT-based authentication with role-based authorization across student, faculty and admin roles",
      "REST APIs for project management, approvals, comments, ratings, likes and notifications",
      "MongoDB-backed persistence for the full review pipeline",
    ],
    repo: "https://github.com/PLACEHOLDER/brightbuilds",
    demo: "",
  },
  {
    code: "BLD-02",
    kind: "Cloud system",
    name: "Cloud-Sentry",
    stack: "AWS Lambda · S3 · DynamoDB · SNS · VirusTotal API",
    description:
      "An event-driven, serverless malware-detection pipeline triggered on file upload.",
    points: [
      "S3 upload triggers compute SHA-256 hashes and log threats to DynamoDB automatically",
      "Real-time alerts broadcast via SNS on suspicious uploads",
      "Zero-Trust architecture with least-privilege IAM and resource-based bucket policies",
    ],
    repo: "https://github.com/PLACEHOLDER/cloud-sentry",
    demo: "",
  },
  {
    code: "BLD-03",
    kind: "Backend service",
    name: "RecipeManager",
    stack:
      "Spring Boot · MySQL · Spring Data JPA · Spring AOP · Spoonacular API",
    description:
      "A backend service integrating an external recipe API to manage dynamic data and user preferences.",
    points: [
      "Spring AOP logging aspect tracks controller execution time and performance metrics",
      "Spring Data JPA persistence layer for relational schemas",
      "Clean integration layer around the Spoonacular external API",
    ],
    repo: "https://github.com/PLACEHOLDER/recipe-manager",
    demo: "",
  },
  {
    code: "DAT-01",
    kind: "Data study",
    name: "RetailPulse",
    stack: "Python · Pandas · NumPy · SQL · Matplotlib / Seaborn",
    description:
      "An end-to-end analytics pipeline evaluating revenue streams, regional demand variance, and product-line profitability across 5,000+ orders.",
    points: [
      "Identified a -126% profit margin on discounts above 40%",
      "Used RFM analysis to identify Champions: 14.4% of accounts driving 25.2% of total revenue",
      "Translated exploratory analysis into regional and product-line recommendations",
    ],
    metrics: [
      { value: "-126%", label: "margin above 40% discount" },
      { value: "14.4%", label: "Champion accounts" },
      { value: "25.2%", label: "revenue from Champions" },
    ],
    repo: "https://github.com/PLACEHOLDER/retail-pulse",
    demo: "",
  },
];

export const achievements = [
  { title: "1st Place", event: "Tech-Mania 2K25 Hackathon" },
  { title: "1st Runner-Up", event: "Oscillation 2K25 Hackathon" },
  { title: "1st Place", event: "FullStack.AI Hackathon" },
];
