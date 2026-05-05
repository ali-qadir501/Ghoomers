export interface DistrictContent {
  description: string;
  image: string;
  stats: {
    guides: number;
    expeditions: number;
    motoTours: number;
    villageActs: number;
  };
  locations: string[];
  treksHikes: string[];
  thingsToDo: string[];
}

export const DISTRICT_DATA: Record<string, DistrictContent> = {
  "Hunza": {
    "description": "A jewel of the Karakoram, famous for its emerald lakes, ancient forts, and the legendary hospitality of the Burusho people.",
    "image": "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=80",
    "stats": {
      "guides": 42,
      "expeditions": 15,
      "motoTours": 8,
      "villageActs": 24
    },
    "locations": [
      "Baltit Fort", "Altit Fort & Royal Garden", "Attabad Lake", "Passu Cones",
      "Hussaini Suspension Bridge", "Khunjerab Pass (China Border)", "Eagle's Nest (Duiker)",
      "Gulmit Village", "Borith Lake", "Passu Glacier", "Shimshal Valley", "Ondra Poygah (Ancient Stairs)"
    ],
    "treksHikes": [
      "Passu Glacier Trek", "Patundas Trek", "Ultar Meadows Trek", "Rakaposhi Base Camp (from Minapin)",
      "Ondra Poygah Hike", "Shimshal Pass Trek", "Batura Glacier Trek", "Rush Lake Trek (Nagar/Hunza border)"
    ],
    "thingsToDo": [
      "Sunset watch at Eagle's Nest", "Boating & Jet Skiing at Attabad Lake", "Crossing Hussaini Bridge",
      "Historical tour of Baltit/Altit Forts", "Selfie at world's highest ATM (Khunjerab)",
      "Apricot tasting in Karimabad", "Shopping for local handicrafts", "Stargazing at Borith Lake",
      "Wildlife spotting (Ibex/Markhor)", "Photography of Passu Cones", "Sampling Tumuro Tea",
      "Exploring Shimshal's stone houses", "Attending local music festivals", "Eating Chapshuro (meat pie)",
      "Hiking the ancient stairs of Ondra Poygah"
    ]
  },
  "Skardu": {
    "description": "The gateway to the world's highest peaks. A land of contrasts where cold deserts meet sapphire lakes and ancient Buddhist heritage markers.",
    "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    "stats": {
      "guides": 58,
      "expeditions": 22,
      "motoTours": 12,
      "villageActs": 18
    },
    "locations": [
      "Shangrila Resort", "Upper Kachura Lake", "Deosai National Park", "Katpana Cold Desert",
      "Sarfaranga Desert", "Kharpocho Fort", "Sadpara Lake", "Manthokha Waterfall",
      "Chunda Valley", "Basho Valley", "Buddha Rock Carvings", "Skardu Bazaar"
    ],
    "treksHikes": [
      "Marsur Rock Hike", "Burji La Pass Trek", "Deosai Plateau Hike", "Basho Meadows Hike",
      "Kharpocho Fort Trail", "Upper Kachura Lake circuit", "Chunda Valley ridges", "Sheosar Lake trek"
    ],
    "thingsToDo": [
      "Quad biking in Sarfaranga Desert", "Brown Bear spotting in Deosai", "Cliff jumping in Upper Kachura",
      "Visiting the Manthal Buddha Rock", "Shopping for gemstones and Salajeet", "Camping in Basho Valley",
      "Historical walk at Kharpocho Fort", "Photography at Shangrila Lake", "Trout fishing in Sadpara",
      "Off-roading to Deosai", "Eating Balti Mamtu (dumplings)", "Rafting in the Indus River",
      "Exploring Katpana sand dunes", "Hiking to the famous Marsur Rock", "Watching sunset from Chunda Valley"
    ]
  },
  "Ghanche (Khaplu)": {
    "description": "Steeped in history and spirituality. Known for its 700-year-old mosques and the majestic Khaplu Palace. A serene escape in the Shyok River valley.",
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    "stats": {
      "guides": 18,
      "expeditions": 6,
      "motoTours": 3,
      "villageActs": 15
    },
    "locations": [
      "Khaplu Palace (Serena)", "Chaqchan Mosque", "Hushe Valley", "Saling Valley",
      "Machulo La (K2 Viewpoint)", "Haldi Cones", "Shyok River", "Kanday Village",
      "Nangma Valley", "Khaplu Khanqah", "Thalay Valley", "Barah Valley"
    ],
    "treksHikes": [
      "Machulo La Trek (K2 view)", "Nangma Valley Base Camp", "Masherbrum Base Camp", "Thalay La Pass Trek",
      "Gondogoro La Trek", "Charakusa Glacier Trek", "K-6 Base Camp", "Hushe Valley circuit"
    ],
    "thingsToDo": [
      "Staying at Khaplu Palace", "Admiring 700-year-old Chaqchan architecture", "Trout feast at Saling Fish Farm",
      "Rock climbing in Nangma Valley", "Watching K2 from Machulo La", "Photography of Haldi Cones",
      "Visiting ancient Khaplu Khanqah", "Cherry picking in Barah Valley", "Buying Balti woolen Patti",
      "Walking across ancient suspension bridges", "Meeting mountaineers in Hushe", "Drinking fresh mountain water",
      "Cultural tour of Siachen Valley", "Exploring Kanday Village stones", "Attending local polo matches"
    ]
  },
  "Astore": {
    "description": "A hidden paradise of alpine meadows and the imposing Rupal Face of Nanga Parbat. Famous for Rama Meadows and the Rainbow Lake.",
    "image": "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80",
    "stats": {
      "guides": 12,
      "expeditions": 8,
      "motoTours": 2,
      "villageActs": 10
    },
    "locations": [
      "Rama Meadows", "Rama Lake", "Minimarg", "Rainbow Lake",
      "Domail", "Astore Valley", "Rupal Valley", "Tarishing",
      "Burzil Pass", "Kamri Pass", "Chillam Chowki", "Deosai Entry Point"
    ],
    "treksHikes": [
      "Rama Lake Hike", "Nanga Parbat Rupal Face Base Camp", "Chongra Peak Hike", "Minimarg to Rainbow Lake",
      "Mazeno Pass Trek", "Deosai Plateau crossing", "Astore to Skardu trek", "Kamri Pass trail"
    ],
    "thingsToDo": [
      "Camping at Rama Meadows", "Photography of Rainbow Lake", "Driving through Burzil Pass",
      "Witnessing the sheer Rupal Face", "Spotting Marmots in Deosai", "Drinking fresh milk in Minimarg",
      "Hiking through pine forests", "Stargazing in Rama", "Picnicking at Domail",
      "Meeting local shepherds", "Eating local Astore honey", "Horse riding in meadows",
      "Exploring Tarishing village", "Winter skiing in Rama (local)", "Collecting wildflowers (seasonal)"
    ]
  },
  "Ghizer": {
    "description": "Often called 'Little Kashmir' for its lush landscapes and meandering turquoise rivers. A fisherman's heaven with soul-stirring peace.",
    "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    "stats": {
      "guides": 15,
      "expeditions": 4,
      "motoTours": 4,
      "villageActs": 12
    },
    "locations": [
      "Phander Valley", "Phander Lake", "Khalti Lake", "Gupis Fort",
      "Ishkoman Valley", "Yasin Valley", "Darkut Valley", "Barsat",
      "Shandur Pass", "Hundur Village", "Koput Lake", "Imit"
    ],
    "treksHikes": [
      "Darkut Pass Trek", "Karambar Lake Trek", "Ishkoman to Chitral via Asumber Pass", "Thui Pass Trek",
      "Phander River bank walk", "Hundur Meadows hike", "Lakeside trails at Khalti", "Bozatar Trek"
    ],
    "thingsToDo": [
      "Trout fishing in Phander Lake", "Ice hockey on frozen Khalti Lake (winter)", "Polo at Shandur Pass (July)",
      "Camping in 'Little Kashmir' (Phander)", "History tour of Gupis Fort", "Taking a dip in blue river waters",
      "Exploring the remote Darkut village", "Photography of meandering rivers", "Listening to Kho music",
      "Sampling local Yasin apricots", "Boating in Phander", "Meeting locals in Ishkoman",
      "Visiting the Muduri Fort ruins", "Hiking to hidden alpine lakes", "Relaxing in the peaceful Barsat village"
    ]
  },
  "Gilgit": {
    "description": "The administrative heart and historical crossroads of the Silk Road. A hub of vibrant bazaars, ancient rock carvings, and the gateway to the world's most spectacular valleys.",
    "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    "stats": {
      "guides": 65,
      "expeditions": 18,
      "motoTours": 10,
      "villageActs": 30
    },
    "locations": [
      "Gilgit River Bridge", "Danyore Suspension Bridge", "Kargah Buddha", "Naltar Valley",
      "Naltar Lakes (Blue, Green, Azure)", "Bagrot Valley", "Haramosh Valley", "Jutial",
      "Basin area", "Gilgit Bazaar", "Chinese Graveyard", "Rakaposhi View Point (Dumani)"
    ],
    "treksHikes": [
      "Naltar to Ishkoman Trek", "Bagrot Valley Base Camp Trek", "Haramosh La Trek", "Kutwal Lake Trek",
      "Rakaposhi Base Camp (via Bagrot)", "Naltar Peak Hike", "Jutial Peak Hike", "Danyore Rock Carving Trail"
    ],
    "thingsToDo": [
      "Watching local Polo matches at Aga Khan Polo Ground", "Shopping for dry fruits and gems in Gilgit Bazaar", 
      "Visiting the 7th Century Kargah Buddha", "Experiencing the thrilling Danyore Tunnel drive",
      "Exploring the color-changing Naltar Lakes", "Skiing at Naltar (winter)", "Trout fishing in Naltar River",
      "Photography at Danyore Suspension Bridge", "Visiting the memorial at Chinese Graveyard",
      "Tasting local Gilgit Mamtu", "Walking through the narrow streets of the old town",
      "Witnessing the confluence of Gilgit & Indus rivers", "Hiking at the foot of world-famous peaks",
      "Meeting diverse ethnic groups in one city", "Experiencing local hospitality in Bagrot villages"
    ]
  },
  "Chitral (Upper & Lower)": {
    "description": "Land of legends and the unique Kalash culture. Nestled under the mighty Tirich Mir, it offers a blend of raw adventure and deep history.",
    "image": "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1200&q=80",
    "stats": {
      "guides": 26,
      "expeditions": 10,
      "motoTours": 6,
      "villageActs": 22
    },
    "locations": [
      "Kalash Valleys (Bumburet, Rumbur, Birir)", "Chitral Fort", "Shahi Masjid", "Garam Chashma",
      "Chitral Gol National Park", "Shandur Top", "Mastuj", "Booni",
      "Tirich Mir Base Camp", "Ayun Valley", "Qaqlasht Meadows", "Golen Valley"
    ],
    "treksHikes": [
      "Tirich Mir Base Camp Trek", "Kalash Valley ridge hikes", "Darkot to Chitral trek", "Gol National Park trails",
      "Zani Pass Trek", "Mastuj to Gilgit trek", "Golen Valley waterfall hike", "Qaqlasht plateau walk"
    ],
    "thingsToDo": [
      "Attending Kalash Chilimjusht Festival", "Soaking in Garam Chashma hot springs", "Watching Markhor in the wild",
      "Buying a Chitrali Pakol (hat)", "Witnessing 'Freestyle Polo' at Shandur", "Exploring the Mehtar's Palace",
      "Photography of Shahi Masjid", "Camping at Qaqlasht (spring)", "Eating Ghalmandi (local cheese pancake)",
      "Rafting in Chitral River", "Visiting the Kalasha Dur Museum", "Tirich Mir viewpoint at sunset",
      "Strolling through Chitral Bazaar", "Handicraft shopping (waistcoats)", "Staying in a local homestay in Ayun"
    ]
  },
  "Diamer (Chilas)": {
    "description": "Known for its ancient rock petroglyphs and the magical meadows at the foot of Nanga Parbat. The gateway to the legendary Fairy Meadows.",
    "image": "https://images.unsplash.com/photo-1587570441551-789069d2d2a4?auto=format&fit=crop&w=1200&q=80",
    "stats": {
      "guides": 20,
      "expeditions": 12,
      "motoTours": 5,
      "villageActs": 8
    },
    "locations": [
      "Fairy Meadows", "Raikot Bridge", "Beyal Camp", "Nanga Parbat Base Camp",
      "Chilas Rock Carvings", "Bunur Valley", "Thor Valley", "Kiner Valley",
      "Tangir Valley", "Darel Valley", "Babusar Top", "Lulusar Lake (border)"
    ],
    "treksHikes": [
      "Fairy Meadows Trek", "Nanga Parbat Base Camp (Raikot Face)", "Jalipur Peak Hike", "Babusar Top ridge",
      "Bunur Valley trails", "Darel-Tangir crossing", "Raikot to Beyal Camp walk", "Ancient rock carving site hikes"
    ],
    "thingsToDo": [
      "Jeep ride on the world's most dangerous road", "Sleeping in wood cabins at Fairy Meadows",
      "Photographing Nanga Parbat at sunrise", "Examining ancient rock carvings in Chilas",
      "Crossing the Raikot Bridge", "Bonfire at Beyal Camp", "Drinking glacier-cold water",
      "Shopping for pine nuts (Chilghoza)", "Trekking to the foot of Nanga Parbat", "Exploring Darel/Tangir culture",
      "Picnic at Babusar Top", "Horse riding in Fairy Meadows", "Sampling local mountain honey",
      "Bird watching in Bunur", "Viewing the Indus River gorge"
    ]
  },
  "Nagar": {
    "description": "Home to the mighty Rakaposhi and the mysterious Hopar Glacier. A valley of glaciers and gemstone mines where every peak tells a story.",
    "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    "stats": {
      "guides": 14,
      "expeditions": 6,
      "motoTours": 2,
      "villageActs": 11
    },
    "locations": [
      "Hopar Valley", "Hopar Glacier", "Minapin", "Rakaposhi Viewpoint",
      "Rush Lake", "Diran Peak Base Camp", "Golden Peak (Spantik)", "Hispar Valley",
      "Sumayar Valley", "Nagar Khas", "Chaprote", "Bar Valley"
    ],
    "treksHikes": [
      "Rush Lake Trek (Highest lake in Pak)", "Rakaposhi Base Camp Trek (Minapin)", "Diran Base Camp Trek",
      "Hispar-Biafo Snow Lake Trek", "Hopar Glacier walk", "Golden Peak Base Camp", "Sumayar Valley hike", "Hapakun Meadows trail"
    ],
    "thingsToDo": [
      "Walking on the black Hopar Glacier", "Eating fresh cherries and apples in Nagar Khas",
      "Hiking to the alpine Rush Lake", "Photography of Rakaposhi from Minapin",
      "Camping at Hapakun Meadows", "Exploring the 700-year-old wooden architecture",
      "Meeting local gem miners", "Taking the Snow Lake expedition (advanced)", "Sampling 'Mamoosa' (local dish)",
      "Bird watching in Bar Valley", "Watching sunset on Spantik (Golden Peak)", "Listening to Brushaski music",
      "Visiting ancient fort ruins in Nagar Khas", "Glacier trekking for beginners in Hopar", "Fruit orchard tours"
    ]
  }
};
