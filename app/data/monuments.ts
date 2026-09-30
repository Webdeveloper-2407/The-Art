import greatWall from "../components/images/great-wall.png";
import petra from "../components/images/petra.png";
import colosseum from "../components/images/colosseum.png";
import chichenItza from "../components/images/chichen-itza.png";
import machuPicchu from "../components/images/machu-picchu.png";
import tajMahal from "../components/images/taj-mahal.png";
import christTheRedeemer from "../components/images/christ-the-redeemer.png";
import noorMahal from "../components/images/noor-mahal.png";
import alhambra from "../components/images/alhambra.png";
import angkorWat from "../components/images/angkor-wat.png";
import hagiaSophia from "../components/images/hagia-sophia.png";
import type { Monument } from "../types/monument";

export const MONUMENTS_DATA: Monument[] = [
  {
    id: "great-wall-of-china",
    name: "Great Wall of China",
    slug: "great-wall-of-china",
    category: "Seven Wonders",
    type: "Fortress & Wall",
    location: "Northern China",
    country: "China",
    era: "Ancient Era",
    year: "7th century BCE – 1644 CE",
    architect: "Successive Chinese states and dynasties",
    materials: "Rammed earth, brick, stone, timber",
    heroImage: greatWall,
    description:
      "An ancient series of walls and fortifications built across the northern borders of historic Chinese states to protect against nomadic intrusions.",
    historicalBackground:
      "Different sections were built and rebuilt across many centuries, with the best-known surviving stretches associated with the Ming dynasty.",
    architecture:
      "Watchtowers, defensive walls, passes and mountain-top routes follow difficult terrain while maintaining a continuous defensive system.",
    purpose:
      "Defense, border control, signaling and movement management across northern frontiers.",
    facts: [
      "The monument is a network of many wall segments rather than one continuous wall built at one time.",
      "Many Ming-era sections use fired brick and dressed stone.",
      "Beacon and watchtowers formed an important communication system.",
    ],
  },
  {
    id: "petra",
    name: "Petra",
    slug: "petra",
    category: "Seven Wonders",
    type: "Ancient City",
    location: "Ma'an Governorate",
    country: "Jordan",
    era: "Ancient Era",
    year: "c. 4th century BCE – 2nd century CE",
    architect: "Nabataean builders",
    materials: "Rose sandstone, limestone, carved rock",
    heroImage: petra,
    description:
      "Famous for its rock-cut architecture and water conduit system, Petra is known as the Rose City due to the color of the stone out of which it is carved.",
    historicalBackground:
      "Petra developed as the capital of the Nabataean Kingdom and prospered through trade routes connecting Arabia, the Levant and the wider Mediterranean world.",
    architecture:
      "Monumental facades were carved into sandstone cliffs, while dams, channels and cisterns helped manage water in an arid environment.",
    purpose:
      "Capital city, trading hub, ceremonial center and funerary landscape.",
    facts: [
      "The famous Siq is a narrow natural gorge forming the main approach to the city center.",
      "The Treasury is a carved facade rather than a freestanding building.",
      "Petra combines monumental rock carving with sophisticated water management.",
    ],
  },
  {
    id: "colosseum",
    name: "The Colosseum",
    slug: "colosseum",
    category: "Seven Wonders",
    type: "Amphitheater",
    location: "Rome",
    country: "Italy",
    era: "Classical Era",
    year: "70–80 CE",
    architect: "Flavian imperial building program",
    materials: "Travertine, tuff, brick-faced concrete",
    heroImage: colosseum,
    description:
      "The largest ancient amphitheater ever built, representing the scale of Roman engineering and public entertainment architecture.",
    historicalBackground:
      "Commissioned under the Flavian emperors, the amphitheater became one of the principal venues for spectacles in imperial Rome.",
    architecture:
      "A layered system of arches, vaults, corridors and seating enabled large crowds to enter and leave the building efficiently.",
    purpose:
      "Public spectacle venue for games, performances and civic entertainment.",
    facts: [
      "Its original Latin name was Amphitheatrum Flavium.",
      "The building used a complex network of corridors and stairways for crowd movement.",
      "An arena floor once covered the underground service spaces beneath it.",
    ],
  },
  {
    id: "chichen-itza",
    name: "Chichén Itzá",
    slug: "chichen-itza",
    category: "Seven Wonders",
    type: "Ancient City & Temple",
    location: "Yucatán",
    country: "Mexico",
    era: "Classical Era",
    year: "c. 600–1200 CE",
    architect: "Maya civilization",
    materials: "Limestone, plaster and carved stone",
    heroImage: chichenItza,
    description:
      "A major focal point in the Northern Maya Lowlands, featuring the monumental step-pyramid known as El Castillo (Temple of Kukulcán).",
    historicalBackground:
      "Chichén Itzá became one of the most prominent Maya urban centers in the Yucatán and preserves evidence of long-distance cultural exchange.",
    architecture:
      "Its ceremonial core combines pyramids, ball courts, colonnades and astronomical or calendrical architectural alignments.",
    purpose:
      "Ceremonial, political, astronomical and civic center.",
    facts: [
      "The stepped pyramid is strongly associated with the feathered-serpent deity Kukulcán.",
      "The site contains one of the largest surviving ancient Maya ball courts.",
      "Architectural alignments reflect sophisticated calendrical observation.",
    ],
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    slug: "machu-picchu",
    category: "Seven Wonders",
    type: "Citadel & Royal Estate",
    location: "Cusco Region",
    country: "Peru",
    era: "Medieval Era",
    year: "c. 1450 CE",
    architect: "Inca Empire under Pachacuti",
    materials: "Polished granite ashlar masonry",
    heroImage: machuPicchu,
    description:
      "A 15th-century Inca citadel situated on a 2,430-meter mountain ridge above the Sacred Valley, renowned for mortarless stonework.",
    historicalBackground:
      "Built during the height of the Inca Empire, Machu Picchu combines elite architecture, agricultural terraces and ceremonial spaces within a steep mountain landscape.",
    architecture:
      "Precisely cut stone blocks were fitted without mortar, while terraces, channels and drainage systems adapted the site to heavy rainfall and steep slopes.",
    purpose:
      "Royal estate, ceremonial sanctuary and agricultural center.",
    facts: [
      "Many stones are fitted so tightly that joints are difficult to see.",
      "Terraces and drainage systems are essential parts of the site's engineering.",
      "The Intihuatana is commonly interpreted as a ritual or astronomical stone feature.",
    ],
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    slug: "taj-mahal",
    category: "Seven Wonders",
    type: "Mausoleum",
    location: "Agra, Uttar Pradesh",
    country: "India",
    era: "Early Modern Era",
    year: "1631–1653 CE",
    architect: "Ustad Ahmad Lahori and Mughal court architects",
    materials: "Makrana marble, sandstone, inlaid gemstones",
    heroImage: tajMahal,
    description:
      "An immense mausoleum of white marble commissioned by Mughal Emperor Shah Jahan in memory of Mumtaz Mahal.",
    historicalBackground:
      "Constructed during the Mughal period, the complex brought together Persianate, Indian and Islamic architectural traditions in a highly ordered garden setting.",
    architecture:
      "The complex centers on a symmetrical tomb with a large dome, four minarets, marble screens and refined pietra dura inlay.",
    purpose:
      "Imperial mausoleum and memorial complex.",
    facts: [
      "The principal mausoleum stands within a larger charbagh garden complex.",
      "The minarets are positioned at the corners of the main plinth.",
      "Pietra dura inlay uses contrasting stones to create floral and geometric decoration.",
    ],
  },
  {
    id: "christ-the-redeemer",
    name: "Christ the Redeemer",
    slug: "christ-the-redeemer",
    category: "Seven Wonders",
    type: "Monumental Statue",
    location: "Rio de Janeiro",
    country: "Brazil",
    era: "Modern Era",
    year: "1922–1931 CE",
    architect: "Paul Landowski, Heitor da Silva Costa and collaborators",
    materials: "Reinforced concrete and soapstone tiles",
    heroImage: christTheRedeemer,
    description:
      "An Art Deco statue of Jesus Christ overlooking Rio de Janeiro from the summit of Mount Corcovado.",
    historicalBackground:
      "Designed and built in the early twentieth century, the monument became one of Rio de Janeiro's most recognizable landmarks.",
    architecture:
      "The figure uses a reinforced concrete structure faced with small soapstone tiles, with the open-arm pose creating a strong symmetrical silhouette.",
    purpose:
      "Religious monument, civic landmark and major cultural symbol.",
    facts: [
      "The outstretched arms create a span of roughly 28 meters.",
      "The statue stands at the summit of Mount Corcovado above Rio de Janeiro.",
      "Its Art Deco design emphasizes geometric simplicity and monumentality.",
    ],
  },
  {
    id: "noor-mahal",
    name: "Noor Mahal",
    slug: "noor-mahal",
    category: "Palace",
    type: "Italianate Palace",
    location: "Bahawalpur, Punjab",
    country: "Pakistan",
    era: "Early Modern Era",
    year: "1872–1875 CE",
    architect: "Mr. Heenan",
    materials: "Brick, stucco, marble and stained glass",
    heroImage: noorMahal,
    description:
      "An Italianate neoclassical palace built in Bahawalpur, blending European neoclassicism with Islamic architectural elements.",
    historicalBackground:
      "Commissioned in the nineteenth century, the palace became an important royal residence and ceremonial building in Bahawalpur.",
    architecture:
      "Its composition combines classical columns, arches, domes, ornamental details and formal garden geometry.",
    purpose:
      "Royal residence, state guest palace and ceremonial venue.",
    facts: [
      "The palace is noted for its blend of European and regional architectural influences.",
      "Its interiors include ornamental finishes, decorative furniture and formal halls.",
      "The building forms part of Bahawalpur's historic architectural heritage.",
    ],
  },
  {
    id: "alhambra",
    name: "The Alhambra",
    slug: "alhambra",
    category: "Palace",
    type: "Islamic Fortress Palace",
    location: "Granada, Andalusia",
    country: "Spain",
    era: "Medieval Era",
    year: "1238–1358 CE",
    architect: "Nasrid dynasty builders",
    materials: "Rammed earth, stucco, marble and glazed tile",
    heroImage: alhambra,
    description:
      "A palace and fortress complex representing the sophistication of Nasrid-era Islamic architecture in Granada.",
    historicalBackground:
      "The Alhambra grew through successive Nasrid building campaigns and became a royal citadel overlooking the city and surrounding plain.",
    architecture:
      "Courtyards, fountains, muqarnas, calligraphic decoration, tiled surfaces and carefully controlled light define the complex.",
    purpose:
      "Royal citadel, court residence, administrative center and garden estate.",
    facts: [
      "The Court of the Lions is one of the complex's best-known courtyards.",
      "Water is integrated into the design of courtyards and gardens.",
      "Decorative inscriptions and geometric patterns are major elements of the interior design.",
    ],
  },
  {
    id: "angkor-wat",
    name: "Angkor Wat",
    slug: "angkor-wat",
    category: "Temple",
    type: "Temple Mountain",
    location: "Siem Reap",
    country: "Cambodia",
    era: "Classical Era",
    year: "1113–1150 CE",
    architect: "Khmer builders under Suryavarman II",
    materials: "Sandstone and laterite",
    heroImage: angkorWat,
    description:
      "A monumental Khmer temple complex originally constructed as a Hindu temple dedicated to Vishnu.",
    historicalBackground:
      "Built in the early twelfth century, Angkor Wat became one of the defining monuments of the Khmer Empire and later served Buddhist communities.",
    architecture:
      "Concentric galleries, towers, moats and carved bas-reliefs create a temple-mountain composition representing a sacred cosmic order.",
    purpose:
      "State temple, ceremonial center and royal religious monument.",
    facts: [
      "The site is surrounded by a broad moat and large outer enclosure.",
      "Its galleries contain extensive narrative and devotional bas-reliefs.",
      "The central towers are commonly interpreted as representing Mount Meru.",
    ],
  },
  {
    id: "hagia-sophia",
    name: "Hagia Sophia",
    slug: "hagia-sophia",
    category: "Religious Architecture",
    type: "Byzantine Dome Monument",
    location: "Istanbul",
    country: "Turkey",
    era: "Classical Era",
    year: "532–537 CE",
    architect: "Isidore of Miletus and Anthemius of Tralles",
    materials: "Brick, mortar, marble, porphyry and mosaics",
    heroImage: hagiaSophia,
    description:
      "A landmark of Byzantine engineering, famous for its massive central dome and long architectural history.",
    historicalBackground:
      "Commissioned by Emperor Justinian I in the sixth century, the building later served as an Ottoman mosque and has undergone multiple phases of restoration and reuse.",
    architecture:
      "The central dome is supported by pendentives, creating a vast interior volume framed by galleries, arches and marble surfaces.",
    purpose:
      "Major religious and ceremonial monument with a long history of changing use.",
    facts: [
      "The central dome spans more than 30 meters across.",
      "The interior combines marble revetments with surviving mosaic decoration.",
      "Its engineering influenced later monumental dome architecture.",
    ],
  },
];

export const SEVEN_WONDERS_DATA = MONUMENTS_DATA.slice(0, 7);
export const ARCHITECTURE_DATA = MONUMENTS_DATA.slice(7);
