import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAVY = "#0F2233";
const GOLD = "#D4B06A";
const GOLD_DARK = "#C9A35B";
const PARCHMENT = "#F5EFE0";
const CARD_BG = "#F7F3EC";
const OFF_WHITE = "#F2F2F0";

const TRANSLATE_BAR_H = 36;
const NAV_H = 64;
const TOTAL_OFFSET = TRANSLATE_BAR_H + NAV_H;

// ── Data ────────────────────────────────────────────────────────────────────

const teachings = [
  {
    title: "Real Presence",
    body: "Jesus is truly present — Body, Blood, Soul, and Divinity — in the Eucharist under the appearances of bread and wine. This is not symbolic but a real and substantial presence.",
  },
  {
    title: "Transubstantiation",
    body: "At the consecration, the entire substance of bread and wine is changed into the Body and Blood of Christ while only the external appearances (accidents) of bread and wine remain.",
  },
  {
    title: "The Eucharist as Sacrifice",
    body: "The Mass is not a mere memorial but the re-presentation of Christ's one eternal sacrifice on Calvary. The same Victim and the same Priest — Christ himself — offers through the ministry of priests.",
  },
  {
    title: "Holy Communion",
    body: "Receiving the Eucharist unites the faithful intimately with Christ and with one another as the Body of Christ. It forgives venial sins and strengthens the soul against future sin.",
  },
  {
    title: "Eucharistic Adoration",
    body: "The faithful adore Christ truly present in the consecrated host, fostering deepened prayer and intimacy with God. Adoration outside Mass extends our worship and thanksgiving.",
  },
  {
    title: "Instituted at the Last Supper",
    body: 'Christ instituted the Eucharist at the Last Supper on Holy Thursday, commanding the Apostles: "Do this in memory of me." The priesthood and the Eucharist were born together.',
  },
  {
    title: "Source and Summit",
    body: 'The Eucharist is "the source and summit of the Christian life" (Second Vatican Council, Lumen Gentium §11). All sacramental life flows from and toward the Eucharist.',
  },
  {
    title: "Spiritual Nourishment",
    body: 'Just as bread nourishes the body, the Eucharist nourishes the soul for eternal life. Jesus declared: "Unless you eat the flesh of the Son of Man… you have no life in you" (John 6:53).',
  },
];

const miracles = [
  {
    id: 1,
    title: "Miracle of Lanciano",
    location: "Lanciano, Italy",
    year: "750 AD",
    description:
      "A Basilian monk doubted the Real Presence. During Mass, the bread and wine visibly transformed into Flesh and Blood. Scientific analysis in 1970 confirmed human cardiac tissue with AB blood type — identical to the Shroud of Turin.",
  },
  {
    id: 2,
    title: "Miracle of Bolsena",
    location: "Bolsena, Italy",
    year: "1263 AD",
    description:
      "A German priest doubting transubstantiation saw blood seeping from the host onto the corporal during Mass. This miracle inspired Pope Urban IV to establish the Feast of Corpus Christi.",
  },
  {
    id: 3,
    title: "Incorrupt Hosts of Siena",
    location: "Siena, Italy",
    year: "1730 AD",
    description:
      "Hosts stolen from the Church of St. Francis were recovered and have remained perfectly preserved for nearly 300 years, defying all natural laws of decomposition, still valid for distribution.",
  },
  {
    id: 4,
    title: "Miracle of Santarém",
    location: "Santarém, Portugal",
    year: "13th century",
    description:
      "A woman obtained a host to use for sorcery. As she carried it wrapped in cloth, it began to bleed. She kept it in wax at home; when rediscovered, it continued to bleed. It is venerated to this day.",
  },
  {
    id: 5,
    title: "Miracle of Legnica",
    location: "Legnica, Poland",
    year: "2013 AD",
    description:
      "A host that fell to the floor was placed in water. It developed a red stain; Polish and Vatican analysis showed human myocardial tissue consistent with a person in agony — confirmed by the Polish Episcopal Conference.",
  },
  {
    id: 6,
    title: "Miracle of Sokółka",
    location: "Sokółka, Poland",
    year: "2008 AD",
    description:
      "A dropped host placed in water developed heart muscle tissue. Independent pathologists confirmed human cardiac muscle fibers, identical in structure to findings in Lanciano — a remarkable scientific parallel across 1,200 years.",
  },
  {
    id: 7,
    title: "Miracle of Buenos Aires",
    location: "Buenos Aires, Argentina",
    year: "1996 AD",
    description:
      "A discarded host began transforming over several days. DNA testing showed AB blood type matching Lanciano, and pathologists confirmed living human myocardium consistent with a suffering heart — occurred under the archdiocese of Cardinal Bergoglio (later Pope Francis).",
  },
  {
    id: 8,
    title: "Miracle of Tixtla",
    location: "Tixtla, Mexico",
    year: "2006 AD",
    description:
      "During a retreat, a host began emanating a reddish substance from the inside. Analysis confirmed human blood (AB type), hemoglobin, and heart muscle tissue. Approved by the Diocese of Chilpancingo-Chilapa.",
  },
  {
    id: 9,
    title: "Miracle of Chirattakonam",
    location: "Chirattakonam, Kerala, India",
    year: "2001 AD",
    description:
      "During Mass at St. Mary's Church, Chirattakonam, a consecrated host displayed the image of Jesus Christ bleeding and crowned with thorns. Witnessed by the priest and many faithful. Recognised as a Eucharistic wonder in India and widely documented.",
  },
  {
    id: 10,
    title: "Miracle of Betania",
    location: "Betania, Venezuela",
    year: "1991 AD",
    description:
      "The host appeared to multiply and turned to visible flesh in the hands of the priest during Mass. Bishop Pío Bello Ricardo formally approved this miracle after thorough investigation.",
  },
  {
    id: 11,
    title: "Miracle of Amsterdam",
    location: "Amsterdam, Netherlands",
    year: "1345 AD",
    description:
      'A dying man vomited a host after receiving last rites; it was cast into fire but was found intact and unburned the next morning. The "Miracle of Amsterdam" made the city a major pilgrimage destination for centuries.',
  },
  {
    id: 12,
    title: "Miracle of Stich",
    location: "Stich, Germany",
    year: "1970 AD",
    description:
      "A host stored in the tabernacle began showing signs of flesh development. The priest reported tissue growth over several weeks. The occurrence was examined and documented by ecclesiastical authorities.",
  },
  {
    id: 13,
    title: "Miracle of Avignon",
    location: "Avignon, France",
    year: "1433 AD",
    description:
      "During a great flood of the Rhône River, the ciborium containing consecrated hosts floated on the floodwaters without sinking and was recovered fully intact — witnessed by townspeople and clergy alike.",
  },
  {
    id: 14,
    title: "Miracle of the Mule",
    location: "Rimini, Italy",
    year: "1227 AD",
    description:
      "St. Anthony of Padua challenged a heretic: a mule starved for three days ignored hay but knelt in reverence before the Eucharist. The heretic and many bystanders converted to the faith that day.",
  },
  {
    id: 15,
    title: "Miracle of Turin",
    location: "Turin, Italy",
    year: "1453 AD",
    description:
      "A cart transporting a stolen tabernacle broke down. The ciborium flew into the air and came to rest suspended in a brilliant beam of light before Archbishop Ludovico di Romagnano and a multitude of witnesses.",
  },
  {
    id: 16,
    title: "Miracle of Faverney",
    location: "Faverney, France",
    year: "1608 AD",
    description:
      "Two hosts on a monstrance remained suspended in mid-air for 33 hours after a fire completely destroyed the altar beneath them. Thousands of witnesses saw the floating monstrance before it gently descended.",
  },
  {
    id: 17,
    title: "Miracle of Ettiswil",
    location: "Ettiswil, Switzerland",
    year: "1447 AD",
    description:
      "A host stolen and buried in a field was discovered by a luminous pillar of light visible from the entire village. When recovered, it was perfectly intact and radiant — the site became a pilgrimage shrine.",
  },
  {
    id: 18,
    title: "Miracle of Morrovalle",
    location: "Morrovalle, Italy",
    year: "1560 AD",
    description:
      "A host that fell into a muddy field was retrieved shining, perfectly clean, and fragrant — with no trace of soil or moisture — witnessed by the priest and parishioners present at the scene.",
  },
  {
    id: 19,
    title: "Miracle of Ptuj",
    location: "Ptuj, Slovenia",
    year: "1348 AD",
    description:
      "During the Black Death, a consecrated host in a sealed vessel was found perfectly incorrupt and radiating light. It offered extraordinary consolation to the dying faithful throughout the plague.",
  },
  {
    id: 20,
    title: "Miracle of Cava de' Tirreni",
    location: "Cava de' Tirreni, Italy",
    year: "1656 AD",
    description:
      "Hosts in the monastery chapel survived a devastating plague completely untouched. Witnesses reported a sweet, inexplicable fragrance throughout the church during the entire outbreak — bringing comfort and faith.",
  },
];

const maryEucharistPoints = [
  {
    heading: "Mary: The First Tabernacle",
    text: "Mary carried Christ — Body, Blood, Soul, and Divinity — in her womb for nine months. She was the first living tabernacle, prefiguring the Eucharistic presence of Christ in the Church. As the ark bore the manna in the desert, Mary bore the living Bread come down from heaven.",
  },
  {
    heading: "The Fiat that Made the Eucharist Possible",
    text: 'At the Incarnation, God became flesh through Mary\'s "fiat" — "Let it be done to me according to your word" (Luke 1:38). In the Eucharist, bread and wine become the Body and Blood of that same flesh she bore. Her "yes" is the indispensable human link in the chain of salvation.',
  },
  {
    heading: "Present at the Sacrifice of the Mass",
    text: "Mary stood at the foot of the Cross (John 19:25) where Christ's sacrifice was completed — the very same sacrifice re-presented in every Holy Mass. Her maternal presence at Calvary unites her uniquely and eternally with the Eucharistic sacrifice.",
  },
  {
    heading: "Model of Eucharistic Devotion",
    text: 'After Pentecost, Mary and the early Church gathered for the "breaking of the bread" (Acts 2:42). She received Holy Communion from the Apostles with perfect faith and love, becoming the supreme model of how the faithful are to receive the Eucharist.',
  },
  {
    heading: "Pope St. John Paul II's Teaching",
    text: 'In Ecclesia de Eucharistia (2003) Pope St. John Paul II wrote: "If we wish to rediscover in all its richness the profound relationship between the Church and the Eucharist, we cannot neglect Mary, Mother and model of the Church. Mary can guide us towards this most holy Sacrament, because she herself has a profound relationship with it."',
  },
];

const maryTeachings = [
  {
    title: "Mother of God (Theotokos)",
    body: "Defined at the Council of Ephesus (431 AD): Mary is truly the Mother of God because Jesus, whom she bore, is the second Person of the Trinity made flesh. To deny this title is to separate Christ's human and divine natures.",
  },
  {
    title: "Perpetual Virginity",
    body: "Mary remained a virgin before, during, and after the birth of Christ. This teaching, upheld by the Church Fathers and defined Catholic doctrine, underscores the unique and exclusive relationship between Mary and God.",
  },
  {
    title: "Immaculate Conception",
    body: "Defined by Pope Pius IX in 1854: Mary was conceived without original sin, preserved by the anticipated merits of her Son's redemption. This singular privilege prepared her to be the worthy Mother of God.",
  },
  {
    title: "Assumption into Heaven",
    body: "Defined by Pope Pius XII in 1950: At the end of her earthly life, Mary was taken body and soul into heavenly glory. This privilege flows from her divine motherhood and her preservation from all sin.",
  },
  {
    title: "Mediatrix of Grace",
    body: "Mary intercedes for all graces given to the Church, not as co-equal with Christ but as a spiritual mother mediating her Son's graces to her children. All graces flow through her maternal intercession.",
  },
  {
    title: "Queen of Heaven and Earth",
    body: "Mary was crowned Queen of Heaven by virtue of her divine motherhood and union with the redemptive work of Christ the King. Her queenship is one of maternal service, intercession, and compassion.",
  },
  {
    title: "Model of Faith",
    body: 'Mary\'s "fiat" at the Annunciation is the perfect model of faith: total trust, surrender, and cooperation with God\'s plan. Pope Benedict XVI called her "the woman of faith, who with faith illuminates our way."',
  },
  {
    title: "Our Lady of Sorrows",
    body: "Mary shared in Christ's passion spiritually, fulfilling Simeon's prophecy: \"A sword will pierce your own soul\" (Luke 2:35). Her seven sorrows culminated at the foot of the Cross, uniting her suffering with that of her Son.",
  },
];

const seasons = [
  {
    name: "ADVENT",
    icon: "🕯️",
    color: "#6B21A8",
    colorLabel: "Purple / Violet",
    dates: "4 Sundays before Christmas (late Nov – Dec 24)",
    description:
      "A season of hopeful waiting and preparation for the coming of Christ, both at Christmas and at the end of time. We light the Advent wreath candles week by week.",
    feasts: "Immaculate Conception (Dec 8), Our Lady of Guadalupe (Dec 12)",
  },
  {
    name: "CHRISTMAS",
    icon: "⭐",
    color: "#D4B06A",
    colorLabel: "White / Gold",
    dates: "Dec 25 – Baptism of the Lord (mid-January)",
    description:
      "We celebrate the Incarnation — God becoming man in Jesus Christ. The entire season radiates with the joy of the Word made flesh.",
    feasts:
      "Christmas (Dec 25), Holy Family Sunday, Mary Mother of God (Jan 1), Epiphany (Jan 6), Baptism of the Lord",
  },
  {
    name: "ORDINARY TIME (Part I)",
    icon: "🌿",
    color: "#166534",
    colorLabel: "Green",
    dates: "After Baptism of the Lord – Ash Wednesday",
    description:
      '"Ordinary" comes from "ordinal" (numbered weeks), not "common." This first stretch follows Christmas; we grow in discipleship and follow Christ\'s early public ministry.',
    feasts: "",
  },
  {
    name: "LENT",
    icon: "✝️",
    color: "#6B21A8",
    colorLabel: "Purple / Violet",
    dates: "Ash Wednesday – Holy Thursday (40 days)",
    description:
      "A season of penance, fasting, prayer, and almsgiving in preparation for Easter. We accompany Christ through his Passion toward the glory of the Resurrection.",
    feasts: "Ash Wednesday, Palm Sunday, Holy Week, Easter Triduum",
  },
  {
    name: "EASTER TRIDUUM",
    icon: "🕊️",
    color: "#D4B06A",
    colorLabel: "White / Gold",
    dates: "Holy Thursday Evening – Easter Sunday Night",
    description:
      "The most sacred three days of the liturgical year: the Mass of the Lord's Supper, Good Friday of the Lord's Passion, and the Easter Vigil — the summit of Christian faith.",
    feasts: "Holy Thursday, Good Friday, Holy Saturday Vigil, Easter Sunday",
  },
  {
    name: "EASTER SEASON",
    icon: "🌅",
    color: "#D4B06A",
    colorLabel: "White / Gold",
    dates: "Easter Sunday – Pentecost Sunday (50 days)",
    description:
      "The great 50-day feast celebrating Christ's Resurrection. We sing Alleluia! The Church rejoices in the gift of the Risen Lord and awaits the Holy Spirit.",
    feasts: "Divine Mercy Sunday, Ascension of the Lord, Pentecost Sunday",
  },
  {
    name: "ORDINARY TIME (Part II)",
    icon: "📖",
    color: "#166534",
    colorLabel: "Green",
    dates: "After Pentecost – Christ the King Sunday (approx. 34 weeks)",
    description:
      "The longest season of the liturgical year. We deepen our life of faith and grow as disciples, following Christ's teaching and miracles through the Gospels.",
    feasts:
      "Trinity Sunday, Corpus Christi, Sacred Heart, Assumption (Aug 15), All Saints (Nov 1), All Souls (Nov 2), Christ the King",
  },
];

const keyFeasts = [
  {
    name: "Solemnity of Mary, Mother of God",
    date: "January 1",
    color: "White",
  },
  { name: "Epiphany of the Lord", date: "January 6", color: "White" },
  {
    name: "Baptism of the Lord",
    date: "Sunday after Epiphany",
    color: "White",
  },
  { name: "Ash Wednesday", date: "46 days before Easter", color: "Violet" },
  {
    name: "Palm Sunday of the Lord's Passion",
    date: "Sunday before Easter",
    color: "Red",
  },
  {
    name: "Mass of the Lord's Supper (Holy Thursday)",
    date: "Thursday before Easter",
    color: "White",
  },
  {
    name: "Good Friday of the Lord's Passion",
    date: "Friday before Easter",
    color: "Red",
  },
  {
    name: "Easter Sunday — Resurrection of the Lord",
    date: "Varies (March–April)",
    color: "White",
  },
  {
    name: "Ascension of the Lord",
    date: "40 days after Easter",
    color: "White",
  },
  { name: "Pentecost Sunday", date: "50 days after Easter", color: "Red" },
  {
    name: "The Most Holy Trinity",
    date: "Sunday after Pentecost",
    color: "White",
  },
  {
    name: "The Most Holy Body and Blood of Christ (Corpus Christi)",
    date: "Thursday after Trinity Sunday",
    color: "White",
  },
  {
    name: "Assumption of the Blessed Virgin Mary",
    date: "August 15",
    color: "White",
  },
  { name: "All Saints' Day", date: "November 1", color: "White" },
  { name: "All Souls' Day", date: "November 2", color: "Violet / Black" },
  { name: "Immaculate Conception", date: "December 8", color: "White" },
  { name: "Our Lady of Guadalupe", date: "December 12", color: "White" },
  {
    name: "Christmas — Nativity of the Lord",
    date: "December 25",
    color: "White",
  },
];

// ── Translation Bar ───────────────────────────────────────────────────────────

function TranslationBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-3 px-4"
      style={{
        backgroundColor: "#0a1a28",
        height: `${TRANSLATE_BAR_H}px`,
        borderBottom: "1px solid rgba(212,176,106,0.25)",
      }}
      data-ocid="translation.panel"
    >
      <span
        className="flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-widest shrink-0"
        style={{ color: GOLD, opacity: 0.85 }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        Translate:
      </span>
      <div id="google_translate_element" />
    </div>
  );
}

// ── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const links = [
    { label: "HOME", href: "#home" },
    { label: "EUCHARIST", href: "#eucharist" },
    { label: "HOLY MARY", href: "#holy-mary" },
    { label: "LITURGICAL CALENDAR", href: "#liturgical-calendar" },
  ];
  return (
    <nav
      className="fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-4 shadow-lg"
      style={{ backgroundColor: NAVY, top: `${TRANSLATE_BAR_H}px` }}
    >
      <a
        href="#home"
        className="flex items-center gap-2 font-serif text-lg font-bold tracking-widest"
        style={{ color: GOLD }}
        data-ocid="nav.link"
      >
        <span className="text-2xl">✝</span>
        <span className="hidden sm:block">CATHOLIC FAITH GUIDE</span>
      </a>
      <div className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-xs font-sans font-medium tracking-widest uppercase transition-colors duration-200 hover:opacity-80"
            style={{ color: OFF_WHITE }}
            data-ocid="nav.link"
          >
            {l.label}
          </a>
        ))}
      </div>
      {/* Mobile menu hint */}
      <div className="md:hidden flex items-center gap-3">
        {links.slice(1).map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-[10px] font-sans tracking-widest uppercase"
            style={{ color: GOLD }}
            data-ocid="nav.link"
          >
            {l.label.split(" ")[0]}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{
        paddingTop: `${TOTAL_OFFSET}px`,
        background:
          "linear-gradient(135deg, #0F2233 0%, #1a1a4e 40%, #2d1b00 100%)",
      }}
    >
      {/* Decorative radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,176,106,0.12) 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-3xl"
      >
        <span className="text-6xl" style={{ color: GOLD }}>
          ✝
        </span>
        <h1
          className="font-serif font-bold uppercase tracking-widest leading-tight"
          style={{ color: GOLD, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Welcome to Catholic Faith Guide
        </h1>
        <p
          className="font-sans text-lg leading-relaxed max-w-xl"
          style={{ color: OFF_WHITE }}
        >
          Rooted in the fullness of Catholic Tradition. Explore the Eucharist,
          the Blessed Mother, and the rhythm of the Liturgical Year.
        </p>
        <a
          href="#eucharist"
          className="mt-4 px-8 py-3 font-sans font-semibold uppercase tracking-widest text-sm transition-all duration-200 hover:bg-opacity-90"
          style={{
            color: NAVY,
            backgroundColor: GOLD,
            border: `2px solid ${GOLD}`,
            borderRadius: "4px",
          }}
          data-ocid="hero.primary_button"
        >
          Explore the Faith
        </a>
      </motion.div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        style={{ color: GOLD, opacity: 0.6 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-label="Scroll down"
        >
          <title>Scroll down</title>
          <path d="M12 16l-6-6h12z" />
        </svg>
      </motion.div>
    </section>
  );
}

// ── Eucharist Section ─────────────────────────────────────────────────────────

function EucharistSection() {
  const [activeTab, setActiveTab] = useState<"teachings" | "miracles">(
    "teachings",
  );

  return (
    <section
      id="eucharist"
      className="py-20 px-4 sm:px-6"
      style={{ backgroundColor: PARCHMENT }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-3xl" style={{ color: GOLD }}>
            ✝
          </span>
          <h2
            className="font-serif font-bold uppercase tracking-widest mt-2"
            style={{ color: NAVY, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            The Eucharist
          </h2>
          <div
            className="mx-auto mt-4 w-24 h-0.5"
            style={{ backgroundColor: GOLD }}
          />
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10 gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("teachings")}
            className="px-8 py-2.5 font-sans font-semibold uppercase tracking-widest text-sm transition-all duration-200"
            style={{
              backgroundColor: activeTab === "teachings" ? NAVY : "transparent",
              color: activeTab === "teachings" ? GOLD : NAVY,
              border: `2px solid ${NAVY}`,
              borderRadius: "999px",
            }}
            data-ocid="eucharist.tab"
          >
            Teachings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("miracles")}
            className="px-8 py-2.5 font-sans font-semibold uppercase tracking-widest text-sm transition-all duration-200"
            style={{
              backgroundColor: activeTab === "miracles" ? NAVY : "transparent",
              color: activeTab === "miracles" ? GOLD : NAVY,
              border: `2px solid ${NAVY}`,
              borderRadius: "999px",
            }}
            data-ocid="eucharist.tab"
          >
            Miracles
          </button>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "teachings" && (
            <motion.div
              key="teachings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="eucharist.list"
            >
              {teachings.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="rounded-sm shadow-md p-6 flex flex-col gap-3"
                  style={{
                    backgroundColor: CARD_BG,
                    borderTop: `4px solid ${GOLD}`,
                  }}
                  data-ocid={`eucharist.item.${i + 1}`}
                >
                  <h3
                    className="font-serif font-bold text-lg"
                    style={{ color: NAVY }}
                  >
                    {t.title}
                  </h3>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "#2a2a2a" }}
                  >
                    {t.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "miracles" && (
            <motion.div
              key="miracles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="eucharist.list"
            >
              {miracles.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="rounded-sm shadow-md p-6 flex flex-col gap-3"
                  style={{
                    backgroundColor: CARD_BG,
                    borderTop: `4px solid ${GOLD}`,
                  }}
                  data-ocid={`eucharist.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0"
                      style={{ backgroundColor: GOLD, color: NAVY }}
                    >
                      {m.id}
                    </span>
                    <span
                      className="text-xs font-sans font-semibold px-2 py-1 rounded uppercase tracking-wide"
                      style={{
                        backgroundColor: m.location.includes("India")
                          ? "#166534"
                          : NAVY,
                        color: m.location.includes("India") ? "#fff" : GOLD,
                      }}
                    >
                      {m.location.includes("India") ? "🇮🇳 " : ""}
                      {m.location}
                    </span>
                  </div>
                  <h3
                    className="font-serif font-bold text-lg leading-snug"
                    style={{ color: NAVY }}
                  >
                    {m.title}
                  </h3>
                  <span
                    className="text-xs font-sans font-semibold uppercase tracking-wider"
                    style={{ color: GOLD_DARK }}
                  >
                    {m.year}
                  </span>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "#2a2a2a" }}
                  >
                    {m.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── Holy Mary Section ─────────────────────────────────────────────────────────

function HolyMarySection() {
  return (
    <section
      id="holy-mary"
      className="py-20 px-4 sm:px-6"
      style={{ backgroundColor: NAVY }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-3xl" style={{ color: GOLD }}>
            ✝
          </span>
          <h2
            className="font-serif font-bold uppercase tracking-widest mt-2"
            style={{ color: GOLD, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Holy Mary
          </h2>
          <div
            className="mx-auto mt-4 w-24 h-0.5"
            style={{ backgroundColor: GOLD }}
          />
        </motion.div>

        {/* Sub-section A: Mary and the Eucharist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h3
            className="font-serif font-bold text-center text-xl sm:text-2xl uppercase tracking-widest mb-8"
            style={{ color: GOLD }}
          >
            Mary's Relationship with the Eucharist
          </h3>
          <div
            className="rounded-sm p-8 sm:p-12 shadow-xl"
            style={{
              backgroundColor: PARCHMENT,
              borderLeft: `6px solid ${GOLD}`,
              borderRight: `6px solid ${GOLD}`,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {maryEucharistPoints.map((pt, i) => (
                <motion.div
                  key={pt.heading}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={i === 4 ? "md:col-span-2" : ""}
                >
                  <h4
                    className="font-serif font-bold text-base uppercase tracking-wide mb-2"
                    style={{ color: NAVY }}
                  >
                    {pt.heading}
                  </h4>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "#2a2a2a" }}
                  >
                    {pt.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sub-section B: Teachings about Holy Mary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3
            className="font-serif font-bold text-center text-xl sm:text-2xl uppercase tracking-widest mb-8"
            style={{ color: GOLD }}
          >
            Teachings about Holy Mary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {maryTeachings.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="p-6 rounded-sm shadow-lg flex flex-col gap-3"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: `1px solid ${GOLD}`,
                }}
                data-ocid={`holy-mary.item.${i + 1}`}
              >
                <h4
                  className="font-serif font-bold text-base"
                  style={{ color: GOLD }}
                >
                  {t.title}
                </h4>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: OFF_WHITE }}
                >
                  {t.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Liturgical Calendar Section ───────────────────────────────────────────────

const seasonColorMap: Record<string, string> = {
  "Purple / Violet": "#6B21A8",
  "White / Gold": "#D4B06A",
  Green: "#166534",
  Red: "#B91C1C",
  "Violet / Black": "#6B21A8",
  White: "#D4B06A",
  Violet: "#6B21A8",
};

function LiturgicalCalendarSection() {
  return (
    <section
      id="liturgical-calendar"
      className="py-20 px-4 sm:px-6"
      style={{ backgroundColor: PARCHMENT }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-3xl" style={{ color: GOLD }}>
            ✝
          </span>
          <h2
            className="font-serif font-bold uppercase tracking-widest mt-2"
            style={{ color: NAVY, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Liturgical Calendar
          </h2>
          <div
            className="mx-auto mt-4 w-24 h-0.5"
            style={{ backgroundColor: GOLD }}
          />
          <p
            className="font-sans text-sm mt-4 max-w-xl mx-auto"
            style={{ color: "#444" }}
          >
            The liturgical year is the Church's annual cycle of seasons and
            feasts through which we celebrate the entire mystery of Christ —
            from Advent to Christ the King.
          </p>
        </motion.div>

        {/* Season cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {seasons.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-sm shadow-md p-6 flex flex-col gap-3"
              style={{
                backgroundColor: CARD_BG,
                borderLeft: `6px solid ${s.color}`,
              }}
              data-ocid={`liturgical.item.${i + 1}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <h3
                    className="font-serif font-bold text-base uppercase tracking-wide leading-tight"
                    style={{ color: NAVY }}
                  >
                    {s.name}
                  </h3>
                  <span
                    className="inline-block text-xs font-sans font-semibold px-2 py-0.5 rounded uppercase tracking-wide mt-1"
                    style={{ backgroundColor: s.color, color: "#fff" }}
                  >
                    {s.colorLabel}
                  </span>
                </div>
              </div>
              <p
                className="text-xs font-sans font-semibold uppercase tracking-wide"
                style={{ color: GOLD_DARK }}
              >
                {s.dates}
              </p>
              <p
                className="font-sans text-sm leading-relaxed"
                style={{ color: "#2a2a2a" }}
              >
                {s.description}
              </p>
              {s.feasts && (
                <p
                  className="font-sans text-xs leading-relaxed italic"
                  style={{ color: "#555" }}
                >
                  <strong>Key Feasts:</strong> {s.feasts}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Key Feasts Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3
            className="font-serif font-bold text-center text-xl sm:text-2xl uppercase tracking-widest mb-6"
            style={{ color: NAVY }}
          >
            Key Feasts of the Liturgical Year
          </h3>
          <div
            className="rounded-sm shadow-md overflow-hidden"
            style={{ border: `2px solid ${GOLD}` }}
            data-ocid="liturgical.table"
          >
            <Table>
              <TableHeader>
                <TableRow style={{ backgroundColor: NAVY }}>
                  <TableHead
                    className="font-sans font-semibold uppercase tracking-wide text-xs"
                    style={{ color: GOLD }}
                  >
                    Feast Name
                  </TableHead>
                  <TableHead
                    className="font-sans font-semibold uppercase tracking-wide text-xs"
                    style={{ color: GOLD }}
                  >
                    Date
                  </TableHead>
                  <TableHead
                    className="font-sans font-semibold uppercase tracking-wide text-xs"
                    style={{ color: GOLD }}
                  >
                    Liturgical Color
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keyFeasts.map((f, i) => (
                  <TableRow
                    key={f.name}
                    style={{
                      backgroundColor: i % 2 === 0 ? CARD_BG : "#ede8dc",
                    }}
                    data-ocid={`liturgical.row.${i + 1}`}
                  >
                    <TableCell
                      className="font-sans text-sm"
                      style={{ color: NAVY }}
                    >
                      {f.name}
                    </TableCell>
                    <TableCell
                      className="font-sans text-sm"
                      style={{ color: "#333" }}
                    >
                      {f.date}
                    </TableCell>
                    <TableCell>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wide"
                        style={{
                          backgroundColor: seasonColorMap[f.color] || GOLD,
                          color: "#fff",
                        }}
                      >
                        {f.color}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="py-12 px-6 text-center"
      style={{ backgroundColor: NAVY }}
    >
      <div
        className="w-16 h-0.5 mx-auto mb-6"
        style={{ backgroundColor: GOLD }}
      />
      <div
        className="text-3xl font-serif font-bold tracking-widest mb-1"
        style={{ color: GOLD }}
      >
        ✝ CATHOLIC FAITH GUIDE
      </div>
      <p
        className="font-sans text-sm italic mb-6"
        style={{ color: OFF_WHITE, opacity: 0.8 }}
      >
        Rooted in Faith. Nourished by the Eucharist.
      </p>
      <div
        className="w-16 h-0.5 mx-auto mb-6"
        style={{ backgroundColor: GOLD, opacity: 0.4 }}
      />
      <p
        className="font-sans text-xs"
        style={{ color: OFF_WHITE, opacity: 0.5 }}
      >
        © {new Date().getFullYear()}. Built with ♥ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
          style={{ color: GOLD }}
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <TranslationBar />
      <Nav />
      <main>
        <Hero />
        <EucharistSection />
        <HolyMarySection />
        <LiturgicalCalendarSection />
      </main>
      <Footer />
    </div>
  );
}
