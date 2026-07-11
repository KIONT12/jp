"use client";

import Image from "next/image";
import { CSSProperties, FormEvent, ReactNode, useEffect, useState } from "react";
import { useIsMobile, usePrefersReducedMotion } from "./hooks/use-mobile";

const LOGO = "/images/logos/jpsa-logo.png";
const LOGO_FULL = LOGO;
const FOUNDER_PHOTO = "/images/team/j-parker.jpg";
const WAYNE_PHOTO = "/images/team/wayne-wooten-headshot.jpg";
const VISION_LEGACY_PDF = "/documents/jenaya-parker-vision-and-legacy-2026.pdf";

const AGENCY_CONTACT = {
  instagram: "https://www.instagram.com/jparkersports23",
  instagramHandle: "@jparkersports23",
  instagramDm: "https://ig.me/m/jparkersports23",
  phone: "+18723696241",
  phoneDisplay: "(872) 369-6241",
  cashAppUrl: "https://cash.app/$87jparker",
  cashAppHandle: "$87jparker",
};

type Tab = "home" | "about" | "players" | "merch" | "contact";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "HOME", icon: "fa-house" },
  { id: "about", label: "ABOUT", icon: "fa-user-tie" },
  { id: "players", label: "ROSTER", icon: "fa-users" },
  { id: "merch", label: "APPAREL", icon: "fa-shirt" },
  { id: "contact", label: "CONTACT", icon: "fa-envelope" },
];

const TICKER = [
  "FIBA LICENSED AGENT",
  "WNBA CERTIFIED",
  "SUMMER LEAGUE '26",
  "AFRICA · EUROPE · USA",
  "JUST POSITIVE™",
  "AFRO-AM HOOPS GLOBAL",
];

const STATS = [
  { num: "WNBA", label: "Certified" },
  { num: "FIBA", label: "Licensed Agent" },
  { num: "GLOBAL", label: "Scouting Network" },
  { num: "3+", label: "Continents Active" },
];

const SERVICES = [
  { icon: "fa-file-contract", title: "Contracts", line: "WNBA & international negotiations" },
  { icon: "fa-handshake", title: "NIL & Brand", line: "Endorsements, media training & personal branding" },
  { icon: "fa-globe", title: "Global Placement", line: "Overseas careers & international pathways" },
  { icon: "fa-chart-line", title: "Career Planning", line: "Financial literacy & life after hoops" },
];

const JPSA_TAGLINE = "Empowering the Game. Elevating the Player.";

const JPSA_BIO = [
  "J. Parker Sports Agency Management (JPSA) represents and develops elite women's basketball athletes across the WNBA and international markets. Founded on integrity, innovation, and athlete empowerment — management that goes far beyond the court.",
  "Contract negotiations, NIL & brand development, international placement, media training, personal branding, financial literacy, and post-career planning. Every athlete gets strategic guidance, personal attention, and a game plan built for their path.",
  "Led by a team that knows the game and the business, JPSA builds strong partnerships, advocates for clients, and creates long-term opportunities on and off the court.",
];

const JPSA_FOCUS = [
  "WNBA Representation",
  "International Markets",
  "NIL & Endorsements",
  "Media Training",
  "Post-Career Planning",
  "Performance Insights",
];

const FOUNDER_TAGS = [
  "Overseas Coach",
  "Summer League Exec",
  "Club Owner — Portugal & Africa",
  "FIBA Agent",
  "WNBA Certified",
  "Just Positive™ Founder",
];

const FOUNDER_BIO = [
  ...JPSA_BIO,
  "Whether securing endorsement deals, preparing for a professional career overseas, or navigating the next level — JPSA is the trusted ally that champions your journey.",
];

const CERTIFICATIONS = [
  {
    icon: "fa-certificate",
    title: "WNBA Certified",
    line: "Licensed representation for WNBA athletes",
  },
  {
    icon: "fa-globe",
    title: "FIBA Licensed Agent",
    line: "International player representation & placement",
  },
  {
    icon: "fa-plane",
    title: "Overseas Coach",
    line: "College-level coaching on international circuits",
  },
  {
    icon: "fa-briefcase",
    title: "Summer League Executive",
    line: "WNBA/NBA Summer League on-site leadership",
  },
];

const VENTURES_ROADMAP = [
  { tag: "01", title: "Summer League Pipeline", line: "Scouting & coaching on-site in Las Vegas." },
  { tag: "02", title: "Africa & Portugal Clubs", line: "Owning and operating women's hoops overseas." },
  { tag: "03", title: "J. Parker Sports Holding", line: "Long-term stability for athlete careers." },
];

const AFFILIATIONS = [
  {
    icon: "fa-earth-africa",
    title: "Afro-Am Hoops Global",
    line: "afroamhoopsglobal.us",
    href: "https://afroamhoopsglobal.us/",
  },
  {
    icon: "fa-basketball",
    title: "Afro Basketball Association",
    line: "Cross-continental talent infrastructure",
  },
];

const WAYNE_BIO = [
  "Wayne Wooten is a business partner and Director of Player Personnel at J. Parker Sports Agency. He brings decades of experience in scouting, coaching, and league administration, identifying elite talent and bridging the gap between international prospects and professional opportunities.",
  "He evaluates players across NCAA, FIBA, and professional levels while implementing regional protocols to find standouts ready for premier competition.",
  "As Director of Player Personnel, his scouting expertise shapes talent identification and acquisition, keeping the JPSA scouting operation at a high standard.",
];

const WAYNE_FOCUS = [
  "Director of Player Personnel",
  "Global Talent ID",
  "NCAA · FIBA · Pro",
];

const VISION_GOALS_2026 = {
  org: "Afro Basketball Association",
  title: "Vision & Goals 2026",
  season: "The Season of Expectation",
  date: "Jan. 1, 2027",
  theme: "Standing on Business. Walking by Faith.",
  sections: [
    {
      title: "Spiritual Life",
      items: [
        "Keep God first in all things — God over everything.",
        "Continue deepening my relationship with Christ daily through prayer, fasting, and service.",
        "Live as a reflection of grace, walking in divine purpose and obedience.",
      ],
    },
    {
      title: "Family & Love",
      items: [
        "Prepare my heart and home for marriage to my God-ordained husband — January 1, 2027.",
        "Build a loving, faithful partnership centered on faith, loyalty, support, and mutual growth.",
        "Create a strong, spiritual foundation for our future family.",
      ],
    },
    {
      title: "Career & Calling",
      items: [
        "Serve as a college-level overseas coach and sports agent by Summer 2026 (WNBA/NBA Summer League, Las Vegas).",
        "Established J. Parker Sports Agency Management, focusing on training elite athletes and global representation.",
        "Expand my J. Parker Sports Apparel brand, merging style, empowerment, and athletic excellence.",
        "Recruit, mentor, and represent top WNBA prospects and international athletes.",
        "Continue building credibility and global impact through coaching, branding, and leadership.",
      ],
    },
    {
      title: "Business & Ownership",
      items: [
        "Launch and operate my own international women's basketball team based in Africa and Portugal.",
        "Secure investments, sponsorships, and athlete development programs under J. Parker Sports Holding.",
        "Achieve financial independence through diverse revenue streams — sports management, apparel, real estate, and brand partnerships.",
      ],
    },
    {
      title: "Residence & Lifestyle",
      items: [
        "Live in a beautiful condo or home in Barcelona, Spain, marking a new chapter of international living.",
        "Experience peace, abundance, and fulfillment in every area of life.",
        "Travel with my husband to destinations such as Australia, Italy, and Venice, exploring God's creations together.",
      ],
    },
    {
      title: "Financial Goals",
      items: [
        "Become completely debt-free by 2026.",
        "Maintain a credit score of 800.",
        "Build long-term financial freedom through investments, stocks, bonds, and global real-estate holdings.",
      ],
    },
    {
      title: "Personal Growth",
      items: [
        "Stay physically strong and mentally balanced — fitness is my outlet.",
        "Protect my peace by keeping a positive, entrepreneurial circle.",
        "Remove distractions and negative influences — no drama, no regression, no toxic attachments.",
        "Heal fully from the past (2024–2025) and embrace transformation — rebuild, restore, and reset.",
        "Walk confidently into my divine destiny — 2026 will be my year of manifestation.",
      ],
    },
  ],
  coreValues: [
    "God first — always.",
    "Faith, family, and purpose.",
    "Giving back to my community.",
    "Integrity and professionalism in every action.",
    "Financial freedom and generational wealth.",
    "Authentic love — no settling, no compromise.",
    "Excellence in business and coaching.",
    "Positive mindset and energy only.",
    "Continuous growth — spiritually, mentally, and physically.",
    "Living boldly, joyfully, and purposefully under God's divine plan.",
  ],
  affirmation:
    "I am walking into my destiny — healed, whole, and expectant. 2026 is my divine season. I am debt-free, purpose-driven, and covered by God's favor. My future is bright, my brand is global, and my love is eternal.",
};

const LEGACY_VISION_2026 = {
  title: "Becoming the Legacy: Vision 2026",
  byline: "By Jenaya Parker",
  org: "J. Parker Sports Agency Management | Parker Legacy",
  sections: [
    {
      num: "01",
      title: "The Meaning of Legacy",
      items: [
        "Legacy is more than success — it's about significance and service.",
        "Leaving footprints of purpose on every life I touch.",
        "Building a lasting impact through my leadership, brand, and faith.",
      ],
    },
    {
      num: "02",
      title: "Divine Assignment",
      items: [
        "2026 marks the year of walking fully in my divine purpose.",
        "It's not about chasing success — it's about fulfilling my calling.",
        "Empowering women, mentoring athletes, and inspiring global transformation.",
      ],
    },
    {
      num: "03",
      title: "Leadership & Impact",
      items: [
        "Lead by example through my agency, apparel line, and athlete programs.",
        "Mentor women to rise as confident leaders and creators in sports.",
        "Establish Parker AI and Parker Legacy as platforms of empowerment and excellence.",
      ],
    },
    {
      num: "04",
      title: "Expansion & Ownership",
      items: [
        "Launch J. Parker Sports international operations in Africa and Portugal.",
        "Develop Parker Legacy Team across Africa and Portugal.",
        "Unveil J. Parker Sports Apparel International Line (Fall 2026).",
        "Integrate Parker AI Athlete Analytics Dashboard for scouting and data performance.",
      ],
    },
    {
      num: "05",
      title: "Financial & Business Legacy",
      items: [
        "Achieve financial freedom through diverse investments and assets.",
        "Own international real estate and expand the Parker portfolio.",
        "Establish generational wealth that sustains family and community impact.",
      ],
    },
    {
      num: "06",
      title: "Faith, Family, and Foundation",
      items: [
        "Keep God at the center of every plan and accomplishment.",
        "Build a God-centered marriage and home filled with peace, love, and growth.",
        "Lead with integrity, humility, and purpose — always grounded in faith.",
      ],
    },
    {
      num: "07",
      title: "Personal Affirmation",
      items: [
        "I am the legacy I prayed for.",
        "I am walking in divine alignment.",
        "I am living proof that obedience births overflow.",
        "My vision is eternal — my impact global — my faith unshakable.",
      ],
    },
  ],
};

type PlayerResumeLink = {
  label: string;
  href: string;
};

type PlayerResumeExperience = {
  role: string;
  team: string;
  period?: string;
  detail?: string;
  stats?: string;
  awards?: string[];
  links?: PlayerResumeLink[];
};

type PlayerResume = {
  summary: string;
  metrics?: { label: string; value: string }[];
  experience: PlayerResumeExperience[];
  skills: string[];
  highlights?: string[];
  profileLinks?: PlayerResumeLink[];
  filmLinks?: PlayerResumeLink[];
};

type RosterPlayer = {
  num: string;
  name: string;
  position: string;
  detail: string;
  image: string;
  signed: boolean;
  nameOnImage?: boolean;
  resume?: PlayerResume;
};

const ROSTER: RosterPlayer[] = [
  {
    num: "07",
    name: "Jamani Pierce",
    position: "Combo Guard",
    detail: "Three-Level Scorer",
    image: "/images/players/jamani-pierce.png",
    signed: true,
    resume: {
      summary:
        "Dynamic combo guard and three-level scorer represented by J. Parker Sports Agency Management. Versatile scoring threat with the ability to create off the dribble, finish at the rim, and knock down outside shots.",
      metrics: [
        { label: "Position", value: "Combo Guard" },
        { label: "Role", value: "Three-Level Scorer" },
        { label: "Jersey", value: "#07" },
      ],
      experience: [
        {
          role: "Combo Guard",
          team: "Professional Circuit",
          detail:
            "Primary scoring option with on-ball creation, spacing value, and competitive two-way intensity.",
        },
      ],
      skills: [
        "Three-Level Scoring",
        "Ball Handling",
        "Court Vision",
        "On-Ball Defense",
        "Clutch Shooting",
      ],
      highlights: ["Discipline. Dedication. Destiny.", "JPSA signed athlete"],
    },
  },
  {
    num: "03",
    name: "Sydney Bolden",
    position: "Guard",
    detail: "IU Indianapolis · Jaguars",
    image: "/images/players/iupui-jaguars-03.png",
    signed: true,
    nameOnImage: true,
    resume: {
      summary:
        "Senior guard at IU Indianapolis with four years of Division I experience at Ball State and IU Indy. Reliable perimeter defender and team leader named to the CSC Academic All-District Team and the IU Indy Academic Advisor's List.",
      metrics: [
        { label: "Height", value: "5'8\"" },
        { label: "Position", value: "Guard" },
        { label: "Jersey", value: "#3" },
        { label: "School", value: "IU Indianapolis Jaguars" },
        { label: "2025–26 PPG", value: "6.0" },
        { label: "2025–26 RPG", value: "2.0" },
        { label: "2025–26 APG", value: "0.9" },
        { label: "2025–26 SPG", value: "1.6" },
      ],
      experience: [
        {
          role: "Guard",
          team: "IU Indianapolis · NCAA Division I",
          period: "2025–26 (Senior)",
          stats: "6.0 PPG · 2.0 RPG · 0.9 APG · 1.6 SPG · 21.5 MPG",
          detail:
            "Played in all 31 games with 20 starts. Recorded double-digit scoring in eight games. Posted 15 points, 3 rebounds, 2 assists, and 1 block vs. Detroit Mercy; 12 points, 4 assists, 3 rebounds, 1 block, and 2 steals vs. Ball State.",
          awards: [
            "CSC Academic All-District Team",
            "IU Indy Academic Advisor's List",
          ],
        },
        {
          role: "Guard",
          team: "Ball State · NCAA Division I",
          period: "2023–24 (Sophomore)",
          stats: "16 GP · 7 RPG season total",
          detail:
            "Season high four points vs. Tennessee Tech. Helped Ball State to 28 wins and 16 league victories — both program records — and an NCAA WBIT postseason berth.",
        },
        {
          role: "Guard",
          team: "Ball State · NCAA Division I",
          period: "2022–23 (Freshman)",
          stats: "30 GP · 94 PTS (led all freshmen)",
          detail:
            "Scored seven points in college debut vs. Tennessee Tech. Season highs of 13 points and 5 rebounds vs. Western Michigan. Went 6-for-6 from the free-throw line vs. WMU. Helped Cardinals tie program record with 26 wins and a WNIT postseason trip.",
          awards: ["Led all freshmen in scoring"],
        },
      ],
      skills: [
        "Perimeter Defense",
        "Steals",
        "Scoring",
        "Playmaking",
        "Academic Excellence",
        "Team Leadership",
      ],
      highlights: [
        "Career high 13 points and 5 rebounds vs. Western Michigan (1/7/23)",
        "Double-digit scoring in eight games during 2025–26 senior season",
        "Ball State program-record 28-win season and WBIT tournament berth",
        "CSC Academic All-District honoree",
      ],
      profileLinks: [
        {
          label: "IU Indy Player Bio",
          href: "https://iuindyjags.com/sports/womens-basketball/roster/sydney-bolden/8492",
        },
        {
          label: "ESPN Career Stats",
          href: "https://www.espn.com/womens-college-basketball/player/_/id/5110091/sydney-bolden",
        },
      ],
    },
  },
  {
    num: "55",
    name: "El Hadji Malick Ndiaye",
    position: "Forward",
    detail: "Taipei · #55",
    image: "/images/players/el-hadji-malick-ndiaye.png",
    signed: true,
    resume: {
      summary:
        "International forward representing Taipei with size, versatility, and professional experience. Effective on both ends with rebounding presence and scoring versatility in the frontcourt.",
      metrics: [
        { label: "Position", value: "Forward" },
        { label: "Team", value: "Taipei" },
        { label: "Jersey", value: "#55" },
      ],
      experience: [
        {
          role: "Forward",
          team: "Taipei",
          detail:
            "Frontcourt contributor with international experience, interior scoring, and defensive versatility.",
        },
      ],
      skills: [
        "Rebounding",
        "Interior Scoring",
        "Defensive Versatility",
        "Transition Play",
        "International Experience",
      ],
      highlights: ["JPSA signed athlete", "Global professional experience"],
    },
  },
  {
    num: "03",
    name: "Kiont Jones",
    position: "Combo Guard",
    detail: "International Pro · ThaiGBL",
    image: "/images/players/kiont-jones.png",
    signed: true,
    nameOnImage: true,
    resume: {
      summary:
        "Experienced professional guard with international experience in Thailand and Mexico. Versatile two-way player who can score, create for teammates, and defend multiple positions (1–4). Strong slasher with playmaking ability, perimeter shooting, and high basketball IQ.",
      metrics: [
        { label: "Height", value: "6'4\"" },
        { label: "Weight", value: "215 lbs" },
        { label: "Position", value: "Combo Guard (1–4)" },
      ],
      experience: [
        {
          role: "Combo Guard",
          team: "ThaiGBL · Thailand",
          period: "2025",
          stats: "14.5 PPG · 7 RPG · 5 APG",
        },
        {
          role: "Combo Guard",
          team: "Warrior League · Thailand",
          period: "2024",
          stats: "13 PPG · 5 APG · 4 RPG",
        },
        {
          role: "Combo Guard",
          team: "Mexico Professional League",
          period: "2022",
        },
        {
          role: "College Guard",
          team: "Piedmont International University",
          period: "2018–19",
          stats: "14.5 PPG · 4.1 RPG · 3.3 APG · 1.4 SPG",
        },
        {
          role: "College Guard",
          team: "Piedmont International University",
          period: "2017–18",
          stats: "8.2 PPG · 2.3 RPG · 2.0 APG · 1.4 SPG",
        },
      ],
      skills: [
        "Two-Way Guard",
        "Scoring",
        "Playmaking",
        "Perimeter Shooting",
        "Multi-Position Defense",
        "International Experience",
        "Leadership",
        "High Basketball IQ",
      ],
      highlights: [
        "Versatile combo guard with professional experience in Thailand and Mexico.",
        "Strong slasher with the ability to attack the basket, create offense, and guard multiple positions.",
      ],
      filmLinks: [
        {
          label: "Game Film",
          href: "https://youtu.be/AcTq0jLhEAI",
        },
      ],
    },
  },
  {
    num: "29",
    name: "Bryan Hudson",
    position: "Guard",
    detail: "Belmopan Trojans",
    image: "/images/players/bryan-hudson.png",
    signed: true,
  },
  {
    num: "01",
    name: "KirVaris",
    position: "Guard",
    detail: "Power · #1",
    image: "/images/players/kirvaris.png",
    signed: true,
  },
  {
    num: "55",
    name: "Leonardo Wilson",
    position: "Guard",
    detail: "Konjic · Playmaker",
    image: "/images/players/leonardo-wilson.png",
    signed: true,
    resume: {
      summary:
        "Elite playmaking guard for Konjic with proven leadership, court vision, and clutch performance on the international stage. Built on discipline and driven by purpose.",
      metrics: [
        { label: "Position", value: "Guard" },
        { label: "Team", value: "Konjic" },
        { label: "Jersey", value: "#55" },
      ],
      experience: [
        {
          role: "Starting Guard",
          team: "Konjic",
          detail:
            "Floor general responsible for pace, distribution, and late-game execution in professional competition.",
        },
      ],
      skills: [
        "Elite Playmaking",
        "Court Vision",
        "Clutch Performance",
        "Winning Mentality",
        "Leadership",
      ],
      highlights: ["Guard · Playmaker · Leader", "Every possession has purpose"],
    },
  },
  {
    num: "03",
    name: "John Murry II",
    position: "PG / SG",
    detail: "Alwahda · Global Pro",
    image: "/images/players/john-murray.png",
    signed: true,
    resume: {
      summary:
        "USA-born combo guard with a decade of professional experience across Europe, Africa, Asia, and the Middle East. OVC champion at Austin Peay, multiple Player of the Year honors, and proven scoring production at every stop on the global circuit.",
      metrics: [
        { label: "Nationality", value: "USA" },
        { label: "DOB", value: "03/08/1995" },
        { label: "Height", value: "6'4\" (1.94 m)" },
        { label: "Weight", value: "89 kg" },
        { label: "Position", value: "PG / SG (1/2)" },
      ],
      experience: [
        {
          role: "College Guard",
          team: "Austin Peay University · NCAA Division I",
          period: "2015–2017",
          awards: ["2016 OVC Champion"],
        },
        {
          role: "Guard",
          team: "Grevenbroich Elephants · Germany",
          period: "2021–2022",
          stats: "28.3 PPG · 5.3 RPG · 5.0 APG · 60% FG · 38% 3PT · 82% FT",
          awards: ["2022 Player of the Year", "1st Team All-League"],
          links: [
            {
              label: "2021–2022 Season Highlights",
              href: "https://youtu.be/0xhy6jwKJHk?si=zbWDrVy_8EPH1JV0",
            },
          ],
        },
        {
          role: "Guard",
          team: "Düsseldorf Giants · Germany Pro A",
          period: "2022",
          links: [
            {
              label: "Pro A Highlights",
              href: "https://youtu.be/EAWOALlfAfA?si=meO2KWNvhC2T9RYF",
            },
          ],
        },
        {
          role: "Guard",
          team: "Maja Tanger Basketball · Morocco (DEX-H)",
          period: "2022–23",
          awards: [
            "Foreigner of the Year",
            "Throne Cup Champion",
            "Throne Cup Finals MVP",
            "Moroccan League Finalist",
          ],
          links: [
            {
              label: "MVP Cup Championship Highlights",
              href: "https://youtu.be/BUdHHVWkAwY?si=4XgAGvL3ION5fQ7h",
            },
          ],
        },
        {
          role: "Guard",
          team: "Maja Tanger Basketball · Arab Club Championship",
          period: "2023–24",
          links: [
            {
              label: "Arab Championship Highlights",
              href: "https://youtu.be/mIXshMHxQUY?si=uZFqYRRqVuOap7SJ",
            },
          ],
        },
        {
          role: "Guard",
          team: "Al Wakrah · Qatar Top League",
          period: "2024",
          stats: "21.6 PPG · 7.5 RPG · 4.8 APG · 1.5 SPG · 50% 2PT · 38% 3PT · +19 Efficiency",
          awards: [
            "First Team All Qatar Cup",
            "Player of the Week",
            "4× Game MVP",
            "Qatar Cup Semi-Finalist",
          ],
          links: [
            {
              label: "2024 Full Season Highlights",
              href: "https://youtu.be/J6eEPVTHs_Y?si=Gu8tuvphOrCyGQwN",
            },
          ],
        },
        {
          role: "Guard",
          team: "NS Matrix Deers · BCL Asia (Champions League)",
          period: "2024",
          stats: "25.3 PPG · 7.3 RPG · 4.3 APG · 26 Efficiency · 52% 3PT · 92% FT",
          awards: ["Top 2 in Scoring", "4th in Efficiency Rating"],
          links: [
            {
              label: "BCL Asia Championship Highlights",
              href: "https://youtu.be/ifazGU4EYK8?si=ZZWJ0U8Ec7deMf4j",
            },
          ],
        },
        {
          role: "Guard",
          team: "Malaysian National Team · William Jones Cup · Taiwan",
          period: "2024",
          stats: "21.0 PPG · 6.1 RPG · 5.0 APG · 2.0 SPG",
          awards: [
            "Asia-Basket.com All-William Jones Cup Best Guard (2024)",
            "Asia-Basket.com All-William Jones Cup First Team (2024)",
          ],
          links: [
            {
              label: "William Jones Cup Highlights",
              href: "https://youtu.be/5OGZJURLBek?si=wU5zNVdcID4PZJ5Y",
            },
          ],
        },
        {
          role: "Guard",
          team: "KSA · NBA Road2BAL · Cameroon",
          period: "2024",
          links: [
            {
              label: "Road2BAL 2025 Highlights",
              href: "https://youtu.be/iA-gh13AJMM?si=8UTmga-59XBqkRGC",
            },
          ],
        },
        {
          role: "Guard",
          team: "Prawira Bandung · Indonesia IBL",
          period: "2025",
          links: [
            {
              label: "2025 Mid-Season IBL Highlights",
              href: "https://youtu.be/oOmcCW_DgmE?si=hyFX7HdcP2oPU2ud",
            },
            {
              label: "Full Game vs. Bali United",
              href: "https://youtu.be/e6xnBkK5lX0?si=OhjoRViyJiwinDiH",
            },
          ],
        },
        {
          role: "Guard",
          team: "NS Matrix Deers · Malaysia BCL Champions League",
          period: "2025",
          stats: "20.8 PPG · 5.0 RPG · 3.2 APG · 50% FG · 41.5% 3PT",
          awards: ["Player of the Week · Round 7"],
          links: [
            {
              label: "BCL Asia 2025 Highlights",
              href: "https://youtu.be/8ag7vynEfB0?si=IKhgnYB4B6xezsS8",
            },
          ],
        },
        {
          role: "Guard",
          team: "Alwahda",
          period: "Present",
          detail: "Current professional assignment represented by JPSA.",
        },
      ],
      skills: [
        "Scoring",
        "Playmaking",
        "International Experience",
        "Clutch Performance",
        "Leadership",
        "Professional · Dedicated · Global",
      ],
      highlights: [
        "Experience. Leadership. Impact.",
        "Professional career across Germany, Morocco, Qatar, Malaysia, Taiwan, Indonesia, and more.",
      ],
      profileLinks: [
        {
          label: "Asia-Basket Player Profile",
          href: "https://basketball.asia-basket.com/player/John-Murry/330800",
        },
      ],
      filmLinks: [
        {
          label: "Majd Tangier · Throne Cup Championship (#8)",
          href: "https://www.youtube.com/live/P9E2oALobc8?si=-a-7kLt3qCbIVVni",
        },
        {
          label: "NS Matrix Deers vs. Liaoning Leopards · BCL Asia 2024 (#8)",
          href: "https://www.youtube.com/live/xjLom92XM58?si=gBROSy9hYKj-4LJd",
        },
        {
          label: "Prawira Bandung · IBL 2025 Full Game (#6)",
          href: "https://youtu.be/e6xnBkK5lX0?si=7Ms3RTMii0Ch0EzB",
        },
        {
          label: "NS Matrix Deers · BCL Asia 2025 Full Game (#3)",
          href: "https://www.youtube.com/live/Jndm2dtkRH4?si=8dlz--187y2Kp28A",
        },
      ],
    },
  },
  {
    num: "21",
    name: "Ericka Pratt",
    position: "Guard/Forward (2/3/4)",
    detail: "Ahuachapan BC · El Salvador",
    image: "/images/players/ericka-pratt.jpg",
    signed: true,
    nameOnImage: true,
    resume: {
      summary:
        "5'10\" guard/forward with professional overseas experience, high motor, and efficient interior scoring. Physical forward and strong rebounder with U.S. passport eligibility.",
      metrics: [
        { label: "Height", value: "5'10\"" },
        { label: "Position", value: "Guard/Forward (2/3/4)" },
        { label: "Nationality", value: "USA 🇺🇸" },
        { label: "Last Club", value: "Ahuachapan BC (El Salvador)" },
        { label: "2026 PPG", value: "16.7" },
        { label: "2026 RPG", value: "9.2" },
        { label: "2026 APG", value: "1.2" },
        { label: "2026 SPG", value: "1.7" },
        { label: "2026 FG%", value: "54.1%" },
      ],
      experience: [
        {
          role: "Guard/Forward",
          team: "Ahuachapan BC · El Salvador",
          period: "2026 Season",
          stats: "16.7 PPG · 9.2 RPG · 1.2 APG · 1.7 SPG · 54.1% FG",
        },
      ],
      skills: [
        "Physical Forward",
        "Strong Rebounder",
        "High Motor",
        "Efficient Interior Scorer",
        "Professional Overseas Experience",
        "U.S. Passport",
      ],
      highlights: [
        "NEWBA All-Star Senior Game (2023)",
        "NECC All-Conference Team (2023)",
        "Spartan Classic All-Tournament Team (2023)",
      ],
      profileLinks: [
        {
          label: "LatinBasket Player Profile",
          href: "https://basketball.latinbasket.com/player/Ericka-Pratt/736919?Women=1",
        },
      ],
      filmLinks: [
        {
          label: "Highlights",
          href: "https://youtu.be/sH7oSGQnllo?si=kuyPUR1id_JSlLPv",
        },
      ],
    },
  },
  {
    num: "34",
    name: "Taiyee Treasure",
    position: "Forward",
    detail: "Benedict · #34",
    image: "/images/players/taiyee-treasure.jpg",
    signed: true,
    nameOnImage: true,
  },
  {
    num: "23",
    name: "Solomon Clay",
    position: "Forward (3–4)",
    detail: "Georgia A-League · Tbilisi",
    image: "/images/players/solomon-clay.jpg",
    signed: true,
    nameOnImage: true,
    resume: {
      summary:
        "6'6\" forward with great basketball IQ, athletic ability, and two-way versatility. Elite defender and scorer with rebounding production at the NAIA, junior college, and international levels.",
      metrics: [
        { label: "Height", value: "6'6\"" },
        { label: "Weight", value: "200 lbs" },
        { label: "Position", value: "Forward (3–4)" },
        { label: "DOB", value: "12/17/1998" },
        { label: "Nationality", value: "USA" },
        { label: "Passport", value: "USA" },
        { label: "Home Airport", value: "Dallas Love Field (DAL)" },
      ],
      experience: [
        {
          role: "Forward",
          team: "Tbilisi · Georgia A-League",
          period: "2024",
          stats: "12.5 PPG · 8.1 RPG · 2.9 APG · 1.0 BPG · 58.1% FG",
          awards: ["League leader in blocks"],
          links: [
            {
              label: "2024 Highlights",
              href: "https://youtu.be/70U62c1CndM?si=cBS1QBTXL_rCcoeD",
            },
          ],
        },
        {
          role: "Forward",
          team: "Las Vegas · TBL",
          period: "2023",
          awards: ["TBL Summer League Champions"],
        },
        {
          role: "Forward",
          team: "Bethany College · NAIA / KCAC",
          period: "2022–23",
          stats: "16.3 PPG · 7.6 RPG · 1.0 APG · 1.5 SPG · 1.8 BPG · 59.2% FG",
          awards: ["All-Time Bethany College block leader"],
          links: [
            {
              label: "2021–22 Highlights",
              href: "https://youtu.be/aTlUlT4iOr8",
            },
          ],
        },
        {
          role: "Forward",
          team: "Bethany College · NAIA / KCAC",
          period: "2021–22",
          stats: "18 PPG · 7.6 RPG · 1.3 APG · 1.4 SPG · 1.7 BPG · 58.9% FG",
        },
        {
          role: "Forward",
          team: "Iowa Lakes CC · NJCAA Region 11",
          period: "2018–19",
          stats: "14.2 PPG · 8.5 RPG · 1.6 APG · 1.3 SPG · 1.0 BPG · 66.2% FG",
          links: [
            {
              label: "Iowa Lakes Roster",
              href: "https://www.iowalakesathletics.com/sports/mbkb/2018-19/roster",
            },
            {
              label: "2018–19 Highlights",
              href: "https://youtu.be/X42wwvIwLfU",
            },
          ],
        },
        {
          role: "Forward",
          team: "Iowa Lakes CC · NJCAA Region 11",
          period: "2017–18",
          stats: "10.8 PPG · 7.2 RPG · 1.2 APG · 0.8 SPG · 1.1 BPG · 57.1% FG",
          links: [
            {
              label: "Iowa Lakes Roster",
              href: "https://www.iowalakesathletics.com/sports/mbkb/2017-18/roster",
            },
          ],
        },
      ],
      skills: [
        "Great Basketball IQ",
        "Athletic Ability",
        "Elite Defender",
        "Scoring Ability",
        "Great Rebounder",
        "Shot Blocking",
      ],
      highlights: [
        "2× NAIA All-American",
        "2× KCAC 1st Team All-Conference",
        "2× KCAC 1st Team All-Defense",
        "TBL Summer League Champion (2023)",
        "Georgia A-League blocks leader (2024)",
      ],
      filmLinks: [
        {
          label: "2024 Highlights",
          href: "https://youtu.be/70U62c1CndM?si=cBS1QBTXL_rCcoeD",
        },
        {
          label: "2021–22 Highlights",
          href: "https://youtu.be/aTlUlT4iOr8",
        },
        {
          label: "2018–19 Highlights",
          href: "https://youtu.be/X42wwvIwLfU",
        },
      ],
    },
  },
];

const APPAREL_LINE = {
  name: "JP Parker Sweatsuit & Hat",
  price: "Available Now",
  promoImage: "/images/merch/jp-parker-promo-hero.jpg",
  tagline: "Black & charcoal tracksuit sets with gold JP monogram branding.",
  description:
    "Hoodie, joggers, and snapback cap — built for the court and the city. Just Positive™ apparel from J. Parker Sports.",
  colors: [
    {
      id: "black",
      label: "Black",
      pieces: [
        { name: "Cap", detail: "Snapback · Gold JP logo", image: "/images/merch/jp-parker-cap-front-black.jpg", focus: "cap" as const },
        { name: "Hoodie", detail: "Jay Parker Sports · Gold chest logo", image: "/images/merch/jp-parker-hoodie-front-black.jpg", focus: "hoodie" as const },
        { name: "Joggers", detail: "Gold thigh logo · back pocket", image: "/images/merch/jp-parker-joggers-front-black.jpg", focus: "joggers" as const },
      ],
    },
    {
      id: "charcoal",
      label: "Charcoal Grey",
      pieces: [
        { name: "Cap", detail: "Snapback · Gold JP logo", image: "/images/merch/jp-parker-cap-front-charcoal.jpg", focus: "cap" as const },
        { name: "Hoodie", detail: "Jay Parker Sports · Gold chest logo", image: "/images/merch/jp-parker-hoodie-front-charcoal.jpg", focus: "hoodie" as const },
        { name: "Joggers", detail: "Gold thigh logo · back pocket", image: "/images/merch/jp-parker-joggers-front-charcoal.jpg", focus: "joggers" as const },
      ],
    },
  ],
};

function ApparelOrderActions({ layout = "promo" }: { layout?: "promo" | "panel" | "product" }) {
  const wrapClass =
    layout === "panel"
      ? "apparel-purchase-panel__actions"
      : layout === "product"
        ? "apparel-product__order"
        : "apparel-purchase-actions";

  return (
    <div className={wrapClass}>
      <a
        href={AGENCY_CONTACT.instagramDm}
        target="_blank"
        rel="noopener noreferrer"
        className="apparel-purchase-btn apparel-purchase-btn--instagram"
      >
        <i className="fa-brands fa-instagram" aria-hidden="true" />
        {layout === "product" ? "DM to Order" : "DM on Instagram"}
        {layout !== "product" && (
          <span className="apparel-purchase-btn__handle">{AGENCY_CONTACT.instagramHandle}</span>
        )}
      </a>
      {layout !== "product" && (
        <>
          <a
            href={AGENCY_CONTACT.cashAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="apparel-purchase-btn apparel-purchase-btn--cashapp"
          >
            <i className="fa-solid fa-dollar-sign" aria-hidden="true" />
            {layout === "panel" ? AGENCY_CONTACT.cashAppHandle : "Pay on Cash App"}
            {layout === "promo" && (
              <span className="apparel-purchase-btn__handle">{AGENCY_CONTACT.cashAppHandle}</span>
            )}
          </a>
          <a
            href={`tel:${AGENCY_CONTACT.phone}`}
            className="apparel-purchase-btn apparel-purchase-btn--phone"
          >
            <i className="fa-solid fa-phone" aria-hidden="true" />
            {layout === "panel" ? AGENCY_CONTACT.phoneDisplay : "Call / Text"}
            {layout === "promo" && (
              <span className="apparel-purchase-btn__handle">{AGENCY_CONTACT.phoneDisplay}</span>
            )}
          </a>
        </>
      )}
    </div>
  );
}

function LiveBackground({ lite }: { lite?: boolean }) {
  return (
    <div className={`live-bg ${lite ? "live-bg--lite" : ""}`} aria-hidden="true">
      <div className="live-bg__aurora" />
      {!lite && <div className="live-bg__grid" />}
      {!lite && (
        <>
          <div className="live-bg__orb live-bg__orb--1" />
          <div className="live-bg__orb live-bg__orb--2" />
        </>
      )}
    </div>
  );
}

function SplitText({
  text,
  className = "",
  delay = 0,
  animate = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  animate?: boolean;
}) {
  if (!animate) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="char-in"
          style={{ animationDelay: `${delay + i * 0.035}s` }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function AnimatedWords({
  words,
  className = "",
  animate = true,
}: {
  words: string[];
  className?: string;
  animate?: boolean;
}) {
  if (!animate) {
    return <span className={className}>{words.join(" ")}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="word-pop inline-block mr-[0.25em]"
          style={{ animationDelay: `${0.2 + i * 0.15}s` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

function splitPlayerName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

function PlayerPhotoLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div className="photo-lightbox" role="dialog" aria-label={`${alt} full photo`}>
      <button type="button" className="photo-lightbox__backdrop" onClick={onClose} aria-label="Close photo" />
      <div className="photo-lightbox__frame">
        <button type="button" className="photo-lightbox__close" onClick={onClose} aria-label="Close photo">
          <i className="fa-solid fa-xmark" />
        </button>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1500}
          className="photo-lightbox__img"
        />
      </div>
    </div>
  );
}

function PlayerResumeModal({
  player,
  onClose,
  lite = false,
}: {
  player: RosterPlayer;
  onClose: () => void;
  lite?: boolean;
}) {
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (photoOpen) setPhotoOpen(false);
      else onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, photoOpen]);

  const resume = player.resume;
  if (!resume) return null;

  return (
    <>
      <div className="resume-modal" role="dialog" aria-modal="true" aria-labelledby="resume-modal-title">
        <button type="button" className="resume-modal__backdrop" onClick={onClose} aria-label="Close resume" />
        <div className={`resume-modal__panel resume-modal__panel--v2${lite ? "" : " page-enter"}`}>
          <div className="resume-modal__toolbar">
            <span className="resume-modal__title">Player Resume</span>
            <button type="button" onClick={onClose} className="resume-modal__close" aria-label="Close resume">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          <div className="resume-layout">
            {player.image && (
              <div className="resume-layout__photo">
                <button
                  type="button"
                  className="resume-photo-btn"
                  onClick={() => setPhotoOpen(true)}
                  aria-label={`View full photo of ${player.name}`}
                >
                  <Image
                    src={player.image}
                    alt={player.name}
                    width={480}
                    height={600}
                    className="resume-photo-btn__img"
                  />
                  <span className="resume-photo-btn__hint">Tap to expand</span>
                </button>
              </div>
            )}

            <div className="resume-layout__content resume-v2">
              <header className="resume-v2__header">
                <p className="resume-v2__label">#{player.num}</p>
                <h2 id="resume-modal-title" className="resume-v2__name">{player.name}</h2>
                <p className="resume-v2__meta">{player.position} · {player.detail}</p>
              </header>

              <section className="resume-v2__section">
                <h3 className="resume-v2__section-title">Summary</h3>
                <p className="resume-v2__text">{resume.summary}</p>
              </section>

              {resume.metrics && resume.metrics.length > 0 && (
                <section className="resume-v2__section">
                  <h3 className="resume-v2__section-title">Info</h3>
                  <div className="resume-v2__metrics">
                    {resume.metrics.map((metric) => (
                      <div key={metric.label} className="resume-v2__metric">
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="resume-v2__section">
                <h3 className="resume-v2__section-title">Experience</h3>
                <div className="resume-v2__timeline">
                  {resume.experience.map((entry, index) => (
                    <article key={`${entry.team}-${entry.period ?? index}`} className="resume-v2__entry">
                      <div className="resume-v2__entry-top">
                        <h4>{entry.role}</h4>
                        {entry.period && <span>{entry.period}</span>}
                      </div>
                      <p className="resume-v2__entry-team">{entry.team}</p>
                      {entry.stats && <p className="resume-v2__entry-stats">{entry.stats}</p>}
                      {entry.detail && <p className="resume-v2__text">{entry.detail}</p>}
                      {entry.awards && entry.awards.length > 0 && (
                        <ul className="resume-v2__awards">
                          {entry.awards.map((award) => (
                            <li key={award}>{award}</li>
                          ))}
                        </ul>
                      )}
                      {entry.links && entry.links.length > 0 && (
                        <div className="resume-v2__links">
                          {entry.links.map((link) => (
                            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="resume-v2__link">
                              <i className="fa-brands fa-youtube" />
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              <section className="resume-v2__section">
                <h3 className="resume-v2__section-title">Skills</h3>
                <ul className="resume-v2__skills">
                  {resume.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </section>

              {resume.highlights && resume.highlights.length > 0 && (
                <section className="resume-v2__section">
                  <h3 className="resume-v2__section-title">Highlights</h3>
                  <ul className="resume-v2__highlights">
                    {resume.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {(resume.profileLinks?.length || resume.filmLinks?.length) ? (
                <section className="resume-v2__section">
                  <h3 className="resume-v2__section-title">Links</h3>
                  <div className="resume-v2__links">
                    {resume.profileLinks?.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="resume-v2__link">
                        <i className="fa-solid fa-arrow-up-right-from-square" />
                        {link.label}
                      </a>
                    ))}
                    {resume.filmLinks?.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="resume-v2__link">
                        <i className="fa-brands fa-youtube" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {photoOpen && player.image && (
        <PlayerPhotoLightbox src={player.image} alt={player.name} onClose={() => setPhotoOpen(false)} />
      )}
    </>
  );
}

function RosterPlayerRow({
  player,
  index,
  onViewResume,
  lite = false,
}: {
  player: RosterPlayer;
  index: number;
  onViewResume?: (player: RosterPlayer) => void;
  lite?: boolean;
}) {
  const nameParts = splitPlayerName(player.name);
  const hasResume = Boolean(player.resume && onViewResume);

  const openResume = () => onViewResume?.(player);

  return (
    <article
      className={`roster-alt__row ${index % 2 === 1 ? "roster-alt__row--flip" : ""}${lite ? " roster-alt__row--static" : ""}`}
      style={lite ? undefined : { animationDelay: `${index * 0.1}s` }}
    >
      {hasResume ? (
        <button
          type="button"
          className="roster-alt__media roster-alt__media--tappable"
          onClick={openResume}
          aria-label={`View ${player.name} bio`}
        >
          {player.image ? (
            <>
              <Image
                src={player.image}
                alt={player.name}
                width={900}
                height={1100}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                quality={75}
                className="roster-alt__img"
              />
              {"nameOnImage" in player && player.nameOnImage && (
                <div className="roster-alt__promo-name" aria-hidden>
                  <span className="roster-alt__promo-first">{nameParts.first}</span>
                  {nameParts.last && (
                    <span className="roster-alt__promo-last">{nameParts.last}</span>
                  )}
                </div>
              )}
            </>
          ) : (
            <ImagePlaceholder label="Athlete" />
          )}
        </button>
      ) : (
        <div className="roster-alt__media">
          {player.image ? (
            <Image
              src={player.image}
              alt={player.name}
              width={900}
              height={1100}
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              quality={75}
              className="roster-alt__img"
            />
          ) : (
            <ImagePlaceholder label="Athlete" />
          )}
        </div>
      )}

      <div className="roster-alt__body">
        {player.signed && (
          <span className="roster-alt__badge">
            <i className="fa-solid fa-pen-nib" />
            Signed
          </span>
        )}
        <p className="font-display text-gold-hot text-xs tracking-[0.2em] uppercase">
          {player.position}
        </p>
        <h3 className="font-display font-bold text-2xl sm:text-4xl uppercase text-white leading-tight">
          {player.name}
        </h3>
        {hasResume && (
          <button type="button" onClick={openResume} className="roster-bio-btn">
            <i className="fa-solid fa-file-lines" aria-hidden="true" />
            View Bio
          </button>
        )}
      </div>
    </article>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-zinc-600">
      <i className="fa-solid fa-user text-4xl mb-2 opacity-30" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-display">{label}</span>
    </div>
  );
}

function VisionLegacyDocument() {
  return (
    <article className="vision-reader">
      <header className="vision-reader__cover">
        <p className="vision-reader__eyebrow">Official Document · 2026</p>
        <h3 className="vision-reader__org">{VISION_GOALS_2026.org}</h3>
        <p className="vision-reader__doc-title">{VISION_GOALS_2026.title}</p>
        <p className="vision-reader__season">&ldquo;{VISION_GOALS_2026.season}&rdquo;</p>
        <div className="vision-reader__meta">
          <span>
            <i className="fa-regular fa-calendar" />
            {VISION_GOALS_2026.date}
          </span>
          <span>
            <i className="fa-solid fa-cross" />
            {VISION_GOALS_2026.theme}
          </span>
        </div>
      </header>

      <div className="vision-reader__sections">
        {VISION_GOALS_2026.sections.map((section) => (
          <section key={section.title} className="vision-reader__card">
            <h4 className="vision-reader__card-title">{section.title}</h4>
            <ul className="vision-reader__list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="vision-reader__panel vision-reader__panel--values">
        <h4 className="vision-reader__panel-title">Top 10 Core Values</h4>
        <ol className="vision-reader__values">
          {VISION_GOALS_2026.coreValues.map((value, i) => (
            <li key={value}>
              <span className="vision-reader__value-num">{String(i + 1).padStart(2, "0")}</span>
              <span>{value}</span>
            </li>
          ))}
        </ol>
      </div>

      <blockquote className="vision-reader__affirmation">
        <i className="fa-solid fa-quote-left vision-reader__affirmation-icon" aria-hidden />
        <p>{VISION_GOALS_2026.affirmation}</p>
      </blockquote>

      <div className="vision-reader__break">
        <span className="vision-reader__break-line" />
        <span className="vision-reader__break-label">Legacy Theme</span>
        <span className="vision-reader__break-line" />
      </div>

      <header className="vision-reader__legacy-head">
        <p className="vision-reader__eyebrow">{LEGACY_VISION_2026.org}</p>
        <h3 className="vision-reader__legacy-title">{LEGACY_VISION_2026.title}</h3>
        <p className="vision-reader__byline">{LEGACY_VISION_2026.byline}</p>
      </header>

      <div className="vision-reader__legacy-grid">
        {LEGACY_VISION_2026.sections.map((section) => (
          <section key={section.num} className="vision-reader__legacy-card">
            <span className="vision-reader__legacy-num">{section.num}</span>
            <div>
              <h4 className="vision-reader__legacy-card-title">{section.title}</h4>
              <ul className="vision-reader__list vision-reader__list--compact">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <div className="vision-reader__actions">
        <a
          href={VISION_LEGACY_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-bar inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display font-bold text-xs uppercase tracking-widest hover:brightness-110 transition"
        >
          <i className="fa-solid fa-file-pdf" />
          Open Full PDF
        </a>
        <a
          href={VISION_LEGACY_PDF}
          download
          className="outline-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display font-bold text-xs uppercase tracking-widest text-white"
        >
          <i className="fa-solid fa-download" />
          Download PDF
        </a>
      </div>
    </article>
  );
}

function LeaderProfileCard({
  badge,
  role,
  name,
  org,
  image,
  imageAlt,
  bio,
  tags,
  layout = "stacked",
}: {
  badge: string;
  role: string;
  name: string;
  org: string;
  image?: string;
  imageAlt?: string;
  bio: string[];
  tags: string[];
  layout?: "split" | "stacked";
}) {
  const isSplit = layout === "split";

  return (
    <div
      className={`player-card border border-white/10 bg-surface-dark overflow-hidden ${
        isSplit ? "leader-card--split" : ""
      }`}
    >
      <div
        className={`leader-card__photo ${
          isSplit ? "leader-card__photo--founder" : "min-h-[180px]"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? name}
            width={800}
            height={1000}
            sizes={isSplit ? "(max-width: 640px) 280px, 320px" : "100vw"}
            className={isSplit ? "founder-photo" : "leader-portrait"}
            priority={isSplit}
          />
        ) : (
          <ImagePlaceholder label="Photo" />
        )}
        <div
          className={`absolute top-4 left-4 font-display font-bold text-xs px-3 py-1 uppercase tracking-wider rounded-full ${
            isSplit
              ? "bg-gold-hot text-white"
              : "bg-surface-dark/90 border border-white/15 text-gold-hot"
          }`}
        >
          {badge}
        </div>
      </div>
      <div className="leader-card__body flex flex-col">
        <span className="font-display text-gold-hot text-xs tracking-[0.25em] uppercase mb-2 block">
          {role}
        </span>
        <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white mb-2">
          {name}
        </h3>
        <p className="text-gold-hot/90 text-[11px] sm:text-xs uppercase tracking-[0.15em] mb-4">
          {org}
        </p>
        <div className="leader-card__bio space-y-2.5 sm:space-y-3 mb-5">
          {bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-[11px] uppercase tracking-wider border border-white/15 text-zinc-400 px-2.5 sm:px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionBlock({
  id,
  number,
  label,
  title,
  children,
  className = "",
  prepend,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
  prepend?: ReactNode;
}) {
  return (
    <section id={id} className={`agency-section ${className}`}>
      <div className="site-shell">
        {prepend}
        <div className="agency-section__header">
          <span className="agency-section__num">{number}</span>
          <div>
            <span className="section-label mb-3 block">{label}</span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase text-white leading-tight">
              {title}
            </h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

const GLOBE_LOGO_FACES = [0, 90, 180, 270] as const;
const GLOBE_SATELLITES = ["WNBA", "FIBA", "GLOBAL"] as const;

function BasketballGlobe() {
  return (
    <div className="bball-scene" role="img" aria-label="J. Parker Sports Agency logo on a spinning basketball globe">
      <div className="bball-scene__aura" aria-hidden="true" />
      <div className="bball-scene__sparks" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="bball-spark" style={{ "--spark-i": i } as CSSProperties} />
        ))}
      </div>
      <div className="bball-scene__shadow" />
      <div className="bball-scene__orbit">
        <div className="bball-scene__ring bball-scene__ring--halo" />
        <div className="bball-scene__ring" />
        <div className="bball-scene__ring bball-scene__ring--2" />
        <div className="bball-scene__ring bball-scene__ring--3" />
        {GLOBE_SATELLITES.map((label, i) => (
          <div
            key={label}
            className="bball-satellite"
            style={{ "--sat-i": i } as CSSProperties}
          >
            <span>{label}</span>
          </div>
        ))}
        <div className="bball-globe">
          <div className="bball-globe__glow" aria-hidden="true" />
          <div className="bball-globe__body" />
          <div className="bball-globe__sheen" aria-hidden="true" />
          <div className="bball-globe__seams">
            <div className="bball-seam bball-seam--1" />
            <div className="bball-seam bball-seam--2" />
            <div className="bball-seam bball-seam--3" />
            <div className="bball-seam bball-seam--4" />
          </div>
          <div className="bball-globe__logos">
            {GLOBE_LOGO_FACES.map((deg, i) => (
              <div key={deg} className={`bball-logo-face bball-logo-face--${deg}`}>
                <div className="bball-logo-face__shine" aria-hidden="true" />
                <Image
                  src={LOGO_FULL}
                  alt={i === 0 ? "J. Parker Sports Agency" : ""}
                  width={600}
                  height={600}
                  className="bball-logo-face__img"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bball-scene__floor" aria-hidden="true" />
    </div>
  );
}

function HeroLogo({ reducedMotion }: { reducedMotion?: boolean }) {
  if (reducedMotion) {
    return (
      <div className="hero-logo-static">
        <Image
          src={LOGO}
          alt="J. Parker Sports Agency"
          width={600}
          height={600}
          className="hero-logo-static__img"
          priority
        />
      </div>
    );
  }
  return <BasketballGlobe />;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeResumePlayer, setActiveResumePlayer] = useState<RosterPlayer | null>(null);
  const isMobile = useIsMobile(1024);
  const reducedMotion = usePrefersReducedMotion();
  const liteMode = isMobile || reducedMotion;
  const animateText = !liteMode;

  function openPlayerResume(player: RosterPlayer) {
    setActiveResumePlayer(player);
    setMobileMenuOpen(false);
  }

  function switchTab(tab: Tab, scrollToId?: string) {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    const scrollBehavior = isMobile ? "auto" : "smooth";
    if (scrollToId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(scrollToId)?.scrollIntoView({ behavior: scrollBehavior, block: "start" });
        }, 50);
      });
    } else {
      window.scrollTo({ top: 0, behavior: scrollBehavior });
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const topic = String(data.get("topic") || "Inquiry");
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const summary = encodeURIComponent(
      `Hi JPSA — ${name}${email ? ` (${email})` : ""}\nTopic: ${topic}\n\n${message}`
    );

    if (topic === "Apparel Order") {
      window.open(AGENCY_CONTACT.instagramDm, "_blank", "noopener,noreferrer");
    } else if (isMobile) {
      window.location.href = `sms:${AGENCY_CONTACT.phone}?body=${summary}`;
    } else {
      window.open(AGENCY_CONTACT.instagramDm, "_blank", "noopener,noreferrer");
    }

    setFormSubmitted(true);
  }

  return (
    <>
      <LiveBackground lite={liteMode} />

      {/* NAV */}
      <nav className="sticky top-0 z-50 brand-nav backdrop-blur-md">
        <div className="site-shell">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              onClick={() => switchTab("home")}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className={liteMode ? "" : "logo-float"}>
        <Image
                  src={LOGO}
                  alt="J. Parker Sports Agency"
                  width={600}
                  height={600}
                  className="h-11 w-auto max-w-[3.25rem] object-contain shrink-0 rounded-md group-hover:ring-2 ring-[rgba(165,28,36,0.45)] transition-all"
          priority
        />
              </div>
              <span className="font-display font-bold text-sm sm:text-lg tracking-wider text-white hidden sm:block group-hover:text-gold-hot transition-colors">
                J. Parker Sports Agency
              </span>
            </button>

            <div className="hidden lg:flex pill-nav">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchTab(tab.id)}
                  className={`pill-nav__btn ${activeTab === tab.id ? "pill-nav__btn--active" : ""}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-zinc-300 p-3 min-h-11 min-w-11 flex items-center justify-center"
              aria-label="Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-white/10 py-3 page-enter">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchTab(tab.id)}
                  className={`block w-full text-left px-3 py-4 min-h-12 font-display text-sm tracking-widest uppercase rounded-lg ${
                    activeTab === tab.id ? "text-gold-hot bg-white/5" : "text-zinc-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* TICKER — home only */}
      {activeTab === "home" && (
        <>
          <div className="bg-gold-hot text-white overflow-hidden py-1.5">
            <div
              className={`ticker-track flex whitespace-nowrap w-max ${liteMode ? "ticker-track--lite" : ""}`}
            >
              {(liteMode ? TICKER : [...TICKER, ...TICKER]).map((item, i) => (
                <span key={i} className="font-display text-xs font-bold tracking-[0.15em] uppercase px-8">
                  {item}
                  <span className="mx-4 opacity-40">◆</span>
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* HOME */}
      {activeTab === "home" && (
        <div className={liteMode ? "" : "page-enter"}>
          {/* ① AGENT PARKER — main attraction */}
          <SectionBlock
            id="founder"
            number="01"
            label="Our Founder"
            title="Agent Parker"
            className="agency-section--lead"
            prepend={
              <div className="leadership-globe hero-spotlight py-4 sm:py-8 mb-2 sm:mb-4">
                <HeroLogo reducedMotion={reducedMotion} />
              </div>
            }
          >
            <div className="mt-6 sm:mt-8 max-w-5xl">
              <LeaderProfileCard
                badge="Founder"
                role="President & CEO"
                name="Agent Parker"
                org="J. Parker Sports Agency Management"
                image={FOUNDER_PHOTO}
                imageAlt="Agent Parker, Founder of J. Parker Sports Agency"
                bio={FOUNDER_BIO}
                tags={FOUNDER_TAGS}
                layout="split"
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => switchTab("about")}
                  className="outline-btn px-6 py-3 font-display font-bold text-xs uppercase tracking-widest text-white"
                >
                  Meet the Full Leadership Team
                </button>
              </div>
            </div>
          </SectionBlock>

          {/* ② THE AGENCY */}
          <SectionBlock id="agency" number="02" label="The Agency" title="J. Parker Sports Agency">
            <div className="mt-6 sm:mt-8 space-y-8 sm:space-y-10">
              <div>
                <p className="font-display brand-gradient-text text-sm sm:text-base tracking-[0.1em] uppercase mb-4">
                  {JPSA_TAGLINE}
                </p>
                <p className="leader-card__bio max-w-3xl">
                  {JPSA_BIO[0]}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {JPSA_FOCUS.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] uppercase tracking-wider border border-white/15 text-zinc-400 px-3 py-1.5 rounded-full font-display font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-white mb-6">
                  What We Offer
                </h3>
                <div className="bento-grid">
                  {SERVICES.map((s, i) => (
                    <div
                      key={s.title}
                      className={`bento-card service-card ${i === 0 ? "bento-card--featured" : ""}`}
                    >
                      <i className={`fa-solid ${s.icon} text-gold-hot text-2xl mb-4 block`} />
                      <h4 className="font-display font-bold text-xl uppercase text-white mb-2">
                        {s.title}
                      </h4>
                      <p className="text-sm text-zinc-400">{s.line}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => switchTab("contact")}
                  className="gold-bar px-6 sm:px-8 py-3.5 min-h-12 font-display font-bold text-sm uppercase tracking-widest hover:brightness-110 transition w-full sm:w-auto"
                >
                  Get Represented
                </button>
                <button
                  type="button"
                  onClick={() => switchTab("players")}
                  className="outline-btn px-6 sm:px-8 py-3.5 min-h-12 font-display font-bold text-sm uppercase tracking-widest text-white w-full sm:w-auto"
                >
                  View Roster
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="stat-pill">
                    <div className="font-display font-bold text-xl sm:text-2xl text-ink tracking-wide">
                      {s.num}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionBlock>

          {/* CTA */}
          <section className="agency-cta">
            <div className="site-shell">
              <div className="glass-panel p-8 sm:p-12 text-center">
                <p className="font-display text-gold-hot text-xs tracking-[0.25em] uppercase mb-4">
                  Standing on Business · Walking by Faith
                </p>
                <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase text-white mb-4">
                  Built For The Game
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
                  Ready to get represented, join the roster conversation, or explore apparel?
                  J. Parker Sports Agency is here.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => switchTab("contact")}
                    className="gold-bar px-8 py-3.5 min-h-12 font-display font-bold text-sm uppercase tracking-widest hover:brightness-110 transition w-full sm:w-auto"
                  >
                    Contact JPSA
                  </button>
                  <button
                    type="button"
                    onClick={() => switchTab("merch")}
                    className="gold-bar px-8 py-3.5 min-h-12 font-display font-bold text-sm uppercase tracking-widest hover:brightness-110 transition w-full sm:w-auto"
                  >
                    Shop Apparel
                  </button>
                  <button
                    type="button"
                    onClick={() => switchTab("about")}
                    className="outline-btn px-8 py-3.5 min-h-12 font-display font-bold text-sm uppercase tracking-widest text-white w-full sm:w-auto"
                  >
                    About the Leadership
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ABOUT — leadership, bios, certifications & accolades */}
      {activeTab === "about" && (
        <section className={liteMode ? "" : "page-enter"}>
          <SectionBlock
            id="leadership"
            number="01"
            label="Leadership"
            title="The Squad"
            className="agency-section--lead"
          >
            <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-2xl">
              The people behind J. Parker Sports Agency — experience, credentials,
              and a global network built for athlete success.
            </p>
            <div className="flex flex-col gap-6 mt-8 sm:mt-10 max-w-5xl">
              <LeaderProfileCard
                badge="Founder"
                role="President & CEO"
                name="Agent Parker"
                org="J. Parker Sports Agency Management"
                image={FOUNDER_PHOTO}
                imageAlt="Agent Parker, Founder of J. Parker Sports Agency"
                bio={FOUNDER_BIO}
                tags={FOUNDER_TAGS}
                layout="split"
              />
              <LeaderProfileCard
                badge="Business Partner"
                role="Director of Player Personnel"
                name="Wayne Wooten"
                org="J. Parker Sports Agency"
                image={WAYNE_PHOTO}
                imageAlt="Wayne Wooten, Director of Player Personnel, J. Parker Sports Agency"
                bio={WAYNE_BIO}
                tags={WAYNE_FOCUS}
                layout="split"
              />
            </div>
          </SectionBlock>

          <SectionBlock id="certifications" number="02" label="Credentials" title="Certifications">
            <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-2xl">
              Licensed, certified, and operating at the highest level of professional sports management.
            </p>
            <div className="bento-grid mt-8 sm:mt-10">
              {CERTIFICATIONS.map((cert, i) => (
                <div
                  key={cert.title}
                  className={`bento-card service-card ${i === 0 ? "bento-card--featured" : ""}`}
                >
                  <i className={`fa-solid ${cert.icon} text-gold-hot text-2xl mb-4 block`} />
                  <h4 className="font-display font-bold text-xl uppercase text-white mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-zinc-400">{cert.line}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
              {STATS.map((s) => (
                <div key={s.label} className="stat-pill">
                  <div className="font-display font-bold text-xl sm:text-2xl text-ink tracking-wide">
                    {s.num}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="accolades" number="03" label="Experience" title="Accolades & Expertise">
            <div className="mt-8 sm:mt-10 grid md:grid-cols-2 gap-6">
              <div className="glass-panel p-6 sm:p-8">
                <h3 className="font-display font-bold text-lg uppercase text-white mb-5">
                  Agent Parker
                </h3>
                <ul className="accolade-list">
                  {FOUNDER_TAGS.map((tag) => (
                    <li key={tag}>
                      <i className="fa-solid fa-star text-gold-hot text-xs" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-panel p-6 sm:p-8">
                <h3 className="font-display font-bold text-lg uppercase text-white mb-1">
                  Wayne Wooten
                </h3>
                <p className="text-xs uppercase tracking-[0.14em] text-gold-hot mb-5">
                  Business Partner · Director of Player Personnel
                </p>
                <ul className="accolade-list">
                  {WAYNE_FOCUS.map((tag) => (
                    <li key={tag}>
                      <i className="fa-solid fa-star text-gold-hot text-xs" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionBlock>

          <SectionBlock id="ventures" number="04" label="Global Reach" title="Ventures & Partners">
            <div className="mt-8 sm:mt-10 space-y-10">
              <div>
                <h3 className="font-display font-bold text-xl uppercase text-white mb-6">
                  Summer &apos;26 Roadmap
                </h3>
                <div className="timeline">
                  {VENTURES_ROADMAP.map((item) => (
                    <div key={item.tag} className="timeline-step">
                      <span className="timeline-step__dot" />
                      <span className="font-display text-xs text-gold-hot tracking-[0.2em] uppercase">
                        {item.tag}
                      </span>
                      <h4 className="font-display font-bold text-lg uppercase text-white mt-2 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-zinc-400">{item.line}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl uppercase text-white mb-6">
                  Affiliations
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {AFFILIATIONS.map((item) =>
                    "href" in item && item.href ? (
                      <a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-panel group flex items-center gap-5 p-6 hover:border-gold-hot/40 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-full bg-gold-hot/15 flex items-center justify-center shrink-0">
                          <i className={`fa-solid ${item.icon} text-xl text-gold-hot`} />
                        </div>
                        <div>
                          <h4 className="font-display font-bold uppercase text-white group-hover:text-gold-hot transition">
                            {item.title}
                          </h4>
                          <p className="text-xs text-zinc-500 mt-1">{item.line} →</p>
                        </div>
                      </a>
                    ) : (
                      <div key={item.title} className="glass-panel flex items-center gap-5 p-6">
                        <div className="w-12 h-12 rounded-full bg-gold-hot/15 flex items-center justify-center shrink-0">
                          <i className={`fa-solid ${item.icon} text-xl text-gold-hot`} />
                        </div>
                        <div>
                          <h4 className="font-display font-bold uppercase text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-zinc-500 mt-1">{item.line}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </SectionBlock>

          <SectionBlock id="vision-legacy" number="05" label="Vision & Legacy" title="Jenaya Parker — Vision and Legacy">
            <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-2xl">
              The official JPSA vision document — faith, purpose, and the legacy being built
              in women&apos;s basketball worldwide.
            </p>
            <div className="vision-doc mt-8 sm:mt-10 scroll-mt-24">
              <VisionLegacyDocument />
        </div>
          </SectionBlock>
        </section>
      )}

      {/* ROSTER */}
      {activeTab === "players" && (
        <section className={liteMode ? "" : "page-enter"}>
          <SectionBlock id="roster-full" number="03" label="JPSA Represented" title="The Roster" className="agency-section--lead">
            <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-2xl">
              Elite talent signed and managed under J. Parker Sports Agency —
              from college floors to international courts.
            </p>
            <p className="text-zinc-500 text-xs sm:text-sm mt-2">
              Tap a player photo or View Bio to open their resume.
            </p>
            <div className="flex gap-4 mt-6 mb-8">
              <div className="cream-panel px-5 py-3 text-center">
                <div className="font-display font-bold text-2xl text-ink">{ROSTER.length}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Signed</div>
              </div>
            </div>
            <div className="roster-alt">
              {ROSTER.map((player, i) => (
                <RosterPlayerRow
                  key={player.name}
                  player={player}
                  index={i}
                  onViewResume={openPlayerResume}
                  lite={liteMode}
                />
              ))}
            </div>
          </SectionBlock>

          <div className="border-t border-white/10 bg-surface-dark/50 py-6 overflow-hidden">
            <div className={`ticker-track flex whitespace-nowrap w-max ${liteMode ? "ticker-track--lite" : ""}`}>
              {(liteMode ? ROSTER : [...ROSTER, ...ROSTER]).map((p, i) => (
                <span
                  key={i}
                  className="font-display text-sm tracking-[0.15em] uppercase text-zinc-500 px-10"
                >
                  {p.name}
                  <span className="text-gold-hot mx-3">·</span>
                  #{p.num}
                  <span className="text-zinc-700 mx-6">|</span>
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* APPAREL */}
      {activeTab === "merch" && (
        <section className={liteMode ? "" : "page-enter"}>
          <SectionBlock id="apparel" number="06" label="Just Positive™" title="Apparel" className="agency-section--lead">
            <div className="apparel-promo mt-8 sm:mt-10">
              <div className="apparel-promo__copy">
                <p className="apparel-promo__eyebrow">J. Parker Sports · Just Positive™</p>
                <h3 className="apparel-promo__title">{APPAREL_LINE.name}</h3>
                <p className="apparel-promo__text">{APPAREL_LINE.description}</p>
                <p className="apparel-promo__tagline">{APPAREL_LINE.tagline}</p>
                <p className="apparel-promo__order-note">
                  Ready to buy? DM {AGENCY_CONTACT.instagramHandle} on Instagram. You can also pay
                  via Cash App or call/text Agent Parker.
                </p>
                <div className="apparel-promo__actions">
                  <span className="apparel-promo__price">{APPAREL_LINE.price}</span>
                  <ApparelOrderActions layout="promo" />
                </div>
              </div>
              <div className="apparel-promo__feature">
                <Image
                  src={APPAREL_LINE.promoImage}
                  alt={`${APPAREL_LINE.name} — black and charcoal hoodies`}
                  width={432}
                  height={190}
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                  className="apparel-promo__feature-img"
                />
              </div>
            </div>

            {APPAREL_LINE.colors.map((color) => (
              <div key={color.id} className="apparel-collection">
                <div className="apparel-collection__head">
                  <h4 className="apparel-collection__title">{color.label}</h4>
                  <span className="apparel-collection__price">{APPAREL_LINE.price}</span>
                </div>
                <div className="apparel-collection__grid">
                  {color.pieces.map((piece) => (
                    <article key={`${color.id}-${piece.name}`} className="apparel-product">
                      <div className={`apparel-product__media apparel-product__media--${piece.focus}`}>
                        <Image
                          src={piece.image}
                          alt={`${piece.name} — ${color.label}`}
                          width={400}
                          height={500}
                          sizes="(max-width: 640px) 50vw, 240px"
                          loading="lazy"
                          className="apparel-product__img"
                        />
                      </div>
                      <div className="apparel-product__copy">
                        <h5>{piece.name}</h5>
                        <p>{piece.detail}</p>
                        <ApparelOrderActions layout="product" />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}

            <div className="apparel-purchase-panel">
              <div className="apparel-purchase-panel__copy">
                <p className="apparel-purchase-panel__eyebrow">How to Order</p>
                <h4 className="apparel-purchase-panel__title">Buy Just Positive™ Apparel</h4>
                <p className="apparel-purchase-panel__text">
                  DM {AGENCY_CONTACT.instagramHandle} on Instagram to order your size and color.
                  Cash App and phone are also available for payment and questions.
                </p>
              </div>
              <ApparelOrderActions layout="panel" />
            </div>
          </SectionBlock>
        </section>
      )}
      {activeTab === "contact" && (
        <section className={liteMode ? "" : "page-enter"}>
          <SectionBlock id="contact" number="07" label="Reach Out" title="Contact" className="agency-section--lead">
            <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-2xl">
              Rep inquiries, scouting, NIL, or apparel — reach out to J. Parker Sports Agency.
            </p>
            <div className="contact-split mt-8 sm:mt-10 max-w-5xl">
              <div className="glass-panel p-6 sm:p-8 flex flex-col justify-center gap-6">
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-zinc-300">
                    <i className="fa-solid fa-basketball text-gold-hot" />
                    Player Representation
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <i className="fa-solid fa-globe text-gold-hot" />
                    Global Scouting
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <i className="fa-solid fa-shirt text-gold-hot" />
                    Apparel Orders — DM on Instagram
                  </div>
                </div>
                <div className="space-y-3">
                  <a
                    href={AGENCY_CONTACT.instagramDm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold-hot text-sm font-display uppercase tracking-wider hover:underline min-h-11"
                  >
                    <i className="fa-brands fa-instagram" />
                    DM {AGENCY_CONTACT.instagramHandle}
                  </a>
                  <a
                    href={AGENCY_CONTACT.cashAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold-hot text-sm font-display uppercase tracking-wider hover:underline min-h-11"
                  >
                    <i className="fa-solid fa-dollar-sign" />
                    Cash App · {AGENCY_CONTACT.cashAppHandle}
                  </a>
                  <a
                    href={`tel:${AGENCY_CONTACT.phone}`}
                    className="inline-flex items-center gap-2 text-gold-hot text-sm font-display uppercase tracking-wider hover:underline min-h-11"
                  >
                    <i className="fa-solid fa-phone" />
                    {AGENCY_CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="glass-panel p-6 sm:p-8">
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-display text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          autoComplete="name"
                          className="input-glow w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-hot transition"
                        />
                      </div>
                      <div>
                        <label className="block font-display text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          className="input-glow w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-hot transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-display text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
                        Topic
                      </label>
                      <select
                        name="topic"
                        className="input-glow w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-gold-hot transition"
                      >
                        <option>Player Representation</option>
                        <option>Scouting / Evaluation</option>
                        <option>NIL / Brand Deal</option>
                        <option>Apparel Order</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-display text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        placeholder="What's on your mind?"
                        className="input-glow w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-gold-hot transition resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full gold-bar py-3.5 min-h-12 font-display font-bold text-sm uppercase tracking-[0.15em] hover:brightness-110 transition"
                    >
                      Send It
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8 page-enter">
                    <i className="fa-solid fa-circle-check text-gold-hot text-2xl mb-3" />
                    <p className="font-display uppercase tracking-wider text-white">
                      Message received.
                    </p>
                    <p className="text-sm text-zinc-500 mt-2">
                      Your message was sent — we&apos;ll follow up soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </SectionBlock>
        </section>
      )}
      <nav
        className="mobile-dock lg:hidden"
        aria-label="Mobile navigation"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => switchTab(tab.id)}
            className={`mobile-dock__btn ${activeTab === tab.id ? "mobile-dock__btn--active" : ""}`}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            <i className={`fa-solid ${tab.icon} text-base`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {activeResumePlayer?.resume && (
        <PlayerResumeModal
          player={activeResumePlayer}
          onClose={() => setActiveResumePlayer(null)}
          lite={liteMode}
        />
      )}

      {/* FOOTER */}
      <footer className="border-t border-[rgba(165,28,36,0.2)] bg-background/95 backdrop-blur-sm py-8 mt-16 mb-4 lg:mb-0">
        <div className="site-shell flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={LOGO}
              alt="J. Parker Sports Agency"
              width={600}
              height={600}
              className="h-10 w-auto max-w-[2.75rem] object-contain shrink-0 rounded-md"
            />
            <span className="font-display text-xs tracking-[0.15em] uppercase text-zinc-500">
              © 2026 J. Parker Sports Agency
            </span>
          </div>
          <a
            href={AGENCY_CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-gold-hot hover:scale-110 transition-all text-lg min-h-11 min-w-11 flex items-center justify-center"
            aria-label={AGENCY_CONTACT.instagramHandle}
          >
            <i className="fa-brands fa-instagram" />
          </a>
        </div>
      </footer>
    </>
  );
}
