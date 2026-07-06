"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useState } from "react";
import { useIsMobile, usePrefersReducedMotion } from "./hooks/use-mobile";

const LOGO_SQUARE = "/images/logos/jpsa-logo-square.jpg";
const LOGO_FULL = "/images/logos/jpsa-logo-square.jpg";
const FOUNDER_PHOTO = "/images/team/j-parker.jpg";
const WAYNE_PHOTO = "/images/team/wayne-wooten-headshot.jpg";
const VISION_LEGACY_PDF = "/documents/jenaya-parker-vision-and-legacy-2026.pdf";

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
  "Wayne Wooten brings decades of experience in scouting, coaching, and league administration to J. Parker Sports Agency. He identifies elite talent and bridges the gap between international prospects and professional opportunities.",
  "He evaluates players across NCAA, FIBA, and professional levels while implementing regional protocols to find standouts ready for premier competition.",
  "His scouting expertise shapes talent identification and acquisition, keeping the JPSA scouting operation at a high standard.",
];

const WAYNE_FOCUS = [
  "Global Talent ID",
  "NCAA · FIBA · Pro",
  "JPSA Scouting",
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
  nonNegotiables: [
    "A God-fearing man.",
    "Faithful and loyal partner.",
    "Supportive of my dreams and purpose.",
    "Protector and provider — emotionally and spiritually.",
    "Secure in himself and our love — a man who knows I am his queen.",
    "A man of direction who knows where he is going, and his destination.",
    "A man that is clear and honest.",
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

const ROSTER = [
  {
    num: "07",
    name: "Jamani Pierce",
    position: "Combo Guard",
    detail: "Three-Level Scorer",
    image: "/images/players/jamani-pierce.png",
    signed: true,
  },
  {
    num: "03",
    name: "Sydney Bolden",
    position: "Guard",
    detail: "IU Indianapolis · Jaguars",
    image: "/images/players/iupui-jaguars-03.png",
    signed: true,
    nameOnImage: true,
  },
  {
    num: "55",
    name: "El Hadji Malick Ndiaye",
    position: "Forward",
    detail: "Taipei · #55",
    image: "/images/players/el-hadji-malick-ndiaye.png",
    signed: true,
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
  },
  {
    num: "03",
    name: "John Murray",
    position: "Guard",
    detail: "Alwahda · #3",
    image: "/images/players/john-murray.png",
    signed: true,
  },
];

const MERCH = [
  {
    name: "Gold Label Set",
    detail: "Sweatshirt · Joggers · Cap",
    price: "$120",
    image: "/images/merch/tracksuit-set.jpg",
  },
  {
    name: "Premium Collection",
    detail: "Hoodie · Tee · Sneakers",
    price: "$95",
    image: "/images/merch/premium-collection.jpg",
  },
  {
    name: "Gold Joggers",
    detail: "Heavyweight · JP Monogram",
    price: "$65",
    image: "/images/merch/jogger-sweatpants.jpg",
  },
];

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

function RosterPlayerRow({
  player,
  index,
}: {
  player: (typeof ROSTER)[number];
  index: number;
}) {
  const nameParts = splitPlayerName(player.name);

  return (
    <article
      className={`roster-alt__row ${index % 2 === 1 ? "roster-alt__row--flip" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="roster-alt__media">
        {player.image ? (
          <>
            <Image
              src={player.image}
              alt={player.name}
              width={900}
              height={1100}
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              quality={80}
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
      </div>

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
        <h3 className="font-display font-bold text-3xl sm:text-4xl uppercase text-white leading-tight">
          {player.name}
        </h3>
        {"detail" in player && player.detail && (
          <p className="text-sm text-zinc-400 uppercase tracking-wider">
            {player.detail}
          </p>
        )}
        <div className="roster-alt__num mt-2">#{player.num}</div>
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

      <div className="vision-reader__panel vision-reader__panel--love">
        <h4 className="vision-reader__panel-title">My Non-Negotiables in Love</h4>
        <ul className="vision-reader__tags">
          {VISION_GOALS_2026.nonNegotiables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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
          className="gold-bar inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display font-bold text-xs uppercase tracking-widest text-ink hover:brightness-110 transition"
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
              ? "bg-gold-hot text-ink"
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

const GLOBE_LOGO_FACES = [0, 180] as const;

function HeroLogo() {
  return <BasketballGlobe />;
}

function BasketballGlobe() {
  return (
    <div className="bball-scene" role="img" aria-label="J. Parker Sports Agency logo on a spinning basketball globe">
      <div className="bball-scene__shadow" />
      <div className="bball-scene__orbit">
        <div className="bball-scene__ring" />
        <div className="bball-scene__ring bball-scene__ring--2" />
        <div className="bball-globe">
          <div className="bball-globe__body" />
          <div className="bball-globe__seams">
            <div className="bball-seam bball-seam--1" />
            <div className="bball-seam bball-seam--2" />
            <div className="bball-seam bball-seam--3" />
            <div className="bball-seam bball-seam--4" />
          </div>
          <div className="bball-globe__logos">
            {GLOBE_LOGO_FACES.map((deg, i) => (
              <div key={deg} className={`bball-logo-face bball-logo-face--${deg}`}>
                <Image
                  src={LOGO_FULL}
                  alt={i === 0 ? "J. Parker Sports Agency" : ""}
                  width={118}
                  height={118}
                  className="w-[88%] h-[88%] object-contain"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const liteMode = isMobile || reducedMotion;
  const animateText = !liteMode;

  function switchTab(tab: Tab, scrollToId?: string) {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (scrollToId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(scrollToId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <>
      <LiveBackground lite={liteMode} />

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0c1220]/90 backdrop-blur-md">
        <div className="site-shell">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              onClick={() => switchTab("home")}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className={liteMode ? "" : "logo-float"}>
                <Image
                  src={LOGO_SQUARE}
                  alt="JPSA"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain bg-[#f5f0e8] p-0.5 shrink-0 rounded-lg group-hover:ring-2 ring-gold-hot/50 transition-all"
                  priority
                />
              </div>
              <span className="font-display font-bold text-sm sm:text-lg tracking-wider text-white hidden sm:block group-hover:text-gold-hot transition-colors">
                J. Parker Sports Agency
              </span>
            </button>

            <div className="hidden md:flex pill-nav">
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
              className="md:hidden text-zinc-300 p-3 min-h-11 min-w-11 flex items-center justify-center"
              aria-label="Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-3 page-enter">
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
          <div className="bg-gold-hot text-ink overflow-hidden py-1.5">
            <div className="ticker-track flex whitespace-nowrap w-max">
              {[...TICKER, ...TICKER].map((item, i) => (
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
        <div className="page-enter">
          {/* ① AGENT PARKER — main attraction */}
          <SectionBlock
            id="founder"
            number="01"
            label="Our Founder"
            title="Agent Parker"
            className="agency-section--lead"
            prepend={
              <div className="leadership-globe hero-spotlight py-4 sm:py-8 mb-2 sm:mb-4">
                <HeroLogo />
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
                <p className="font-display text-gold-hot text-sm sm:text-base tracking-[0.1em] uppercase mb-4">
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
                  className="gold-bar px-6 sm:px-8 py-3.5 min-h-12 font-display font-bold text-sm uppercase tracking-widest text-ink hover:brightness-110 transition w-full sm:w-auto"
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
                    className="gold-bar px-8 py-3.5 font-display font-bold text-sm uppercase tracking-widest text-ink hover:brightness-110 transition"
                  >
                    Contact JPSA
                  </button>
                  <button
                    type="button"
                    onClick={() => switchTab("about")}
                    className="outline-btn px-8 py-3.5 font-display font-bold text-sm uppercase tracking-widest text-white"
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
        <section className="page-enter">
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
                badge="Scouting"
                role="JPSA Leadership"
                name="Wayne Wooten"
                org="J. Parker Sports Agency"
                image={WAYNE_PHOTO}
                imageAlt="Wayne Wooten, J. Parker Sports Agency"
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
                <h3 className="font-display font-bold text-lg uppercase text-white mb-5">
                  Wayne Wooten
                </h3>
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
        <section className="page-enter">
          <SectionBlock id="roster-full" number="03" label="JPSA Represented" title="The Roster" className="agency-section--lead">
            <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-2xl">
              Elite talent signed and managed under J. Parker Sports Agency —
              from college floors to international courts.
            </p>
            <div className="flex gap-4 mt-6 mb-8">
              <div className="cream-panel px-5 py-3 text-center">
                <div className="font-display font-bold text-2xl text-ink">{ROSTER.length}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Signed</div>
              </div>
            </div>
            <div className="roster-alt">
              {ROSTER.map((player, i) => (
                <RosterPlayerRow key={player.name} player={player} index={i} />
              ))}
            </div>
          </SectionBlock>

          <div className="border-t border-white/10 bg-surface-dark/50 py-6 overflow-hidden">
            <div className="ticker-track flex whitespace-nowrap w-max">
              {[...ROSTER, ...ROSTER].map((p, i) => (
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
        <section className="page-enter">
          <SectionBlock id="apparel" number="06" label="Just Positive™" title="Apparel" className="agency-section--lead">
            <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-2xl">
              Streetwear and athleisure from J. Parker. Black & gold. Built for the court and the city.
            </p>
            <div className="merch-featured mt-8 sm:mt-10">
              {MERCH.map((item, i) => (
                <div
                  key={item.name}
                  className={`merch-tile group ${i === 0 ? "merch-featured__hero" : ""}`}
                >
                  <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[520px]" : "aspect-[4/5]"}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={1024}
                      height={1024}
                      sizes={i === 0 ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 768px) 100vw, 25vw"}
                      loading="lazy"
                      quality={80}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute top-4 left-4 font-display font-bold text-xs bg-black/70 text-gold-hot px-3 py-1 uppercase tracking-wider rounded-full">
                      0{i + 1}
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-display font-bold uppercase text-white text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">{item.detail}</p>
                    </div>
                    <span className="font-display font-bold text-gold-hot text-lg shrink-0">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionBlock>
        </section>
      )}
      {activeTab === "contact" && (
        <section className="page-enter">
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
                    Apparel Orders
                  </div>
                </div>
                <a
                  href="https://www.instagram.com/jparkersports23?igsh=NDE5eHU0YzMxMmt2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold-hot text-sm font-display uppercase tracking-wider hover:underline"
                >
                  <i className="fa-brands fa-instagram" />
                  @jparkersports23
                </a>
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
                          required
                          className="input-glow w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-hot transition"
                        />
                      </div>
                      <div>
                        <label className="block font-display text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          className="input-glow w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-hot transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-display text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
                        Topic
                      </label>
                      <select className="input-glow w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-gold-hot transition">
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
                        rows={4}
                        required
                        placeholder="What's on your mind?"
                        className="input-glow w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-gold-hot transition resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full gold-bar py-3.5 font-display font-bold text-sm uppercase tracking-[0.15em] text-ink hover:brightness-110 transition"
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
                    <p className="text-sm text-zinc-500 mt-2">We&apos;ll be in touch.</p>
                  </div>
                )}
              </div>
            </div>
          </SectionBlock>
        </section>
      )}
      <nav
        className="mobile-dock md:hidden"
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

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0c1220]/90 backdrop-blur-sm py-8 mt-16 mb-4 md:mb-0">
        <div className="site-shell flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={LOGO_SQUARE}
              alt="JPSA"
              width={36}
              height={36}
              className="h-9 w-9 object-contain bg-[#f5f0e8] p-0.5 shrink-0"
            />
            <span className="font-display text-xs tracking-[0.15em] uppercase text-zinc-500">
              © 2026 J. Parker Sports Agency
            </span>
          </div>
          <a
            href="https://www.instagram.com/jparkersports23?igsh=NDE5eHU0YzMxMmt2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-gold-hot hover:scale-110 transition-all text-lg"
          >
            <i className="fa-brands fa-instagram" />
          </a>
        </div>
      </footer>
    </>
  );
}
