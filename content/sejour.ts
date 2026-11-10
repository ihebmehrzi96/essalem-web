/** Contenu de la page « Votre séjour » dans les trois langues. */

export type Locale = "fr" | "ar" | "en";

export type SejourContent = {
  title: string;
  sections: { id: string; label: string; body: string[] }[];
  rulesIntro: string;
  rules: string[];
  notes: string[];
  question: string;
};

export const sejour: Record<Locale, SejourContent> = {
  fr: {
    title: "Votre séjour",
    sections: [
      {
        id: "visites",
        label: "Visites",
        body: [
          "Les patients hospitalisés peuvent recevoir la visite de leurs proches tous les jours de la semaine de 10h00 à 22h00 dans l'ensemble des unités de soins conventionnelles. Les visites en réanimation et en soins intensifs sont autorisées de 15h00 à 17h00.",
        ],
      },
      {
        id: "hebergement",
        label: "Hébergement & Restauration",
        body: [
          "Votre prise en charge peut s'effectuer dans le cadre d'une hospitalisation classique ou en hôpital de jour. Une chambre vous est proposée selon votre choix et en fonction des disponibilités : chambre individuelle, chambre double ou suite premium. L'un de vos proches peut être hébergé à vos côtés et vous accompagner durant votre séjour, sauf contre-indication médicale.",
          "Nos chefs cuisiniers et nos diététiciennes veillent à répondre à vos besoins nutritionnels en vous proposant des menus équilibrés et adaptés, élaborés à partir de produits frais et servis sur des plateaux isothermes. Un service de restauration est également proposé à vos accompagnants.",
        ],
      },
      {
        id: "transport",
        label: "Transport sanitaire",
        body: [
          "Nous disposons d'une ambulance médicalisée entièrement équipée, mise à votre disposition pour assurer vos transferts et transports sanitaires en toute sécurité.",
        ],
      },
      {
        id: "objets",
        label: "Biens et objets de valeur",
        body: [
          "Afin de garantir la sécurité de vos effets personnels et objets de valeur (bijoux, portefeuilles, téléphones…), une procédure dédiée ainsi qu'un coffre-fort sécurisé sont mis à votre disposition dès votre admission.",
          "Les biens et objets non déposés au coffre demeurent sous l'entière responsabilité du patient en cas de perte ou de détérioration.",
        ],
      },
    ],
    rulesIntro:
      "Pour votre confort et votre sécurité, nous vous prions de bien vouloir respecter le règlement intérieur de l'établissement ainsi que les consignes suivantes :",
    rules: [
      "Ne pas fumer dans l'enceinte de l'établissement (décret n° 98-2248 du 16/11/1998)",
      "Ne pas introduire ni consommer de boissons alcoolisées",
      "Ne pas introduire d'animaux au sein de l'établissement",
      "Ne pas apporter de fleurs coupées ni de plantes en pot dans les unités de réanimation et de soins intensifs",
    ],
    notes: [
      "Un livret d'accueil personnalisé vous est remis lors de votre admission",
      "Le plan d'évacuation est affiché dans les espaces communs ainsi que dans votre chambre",
      "La grille tarifaire des prestations et le règlement intérieur sont consultables dans votre chambre",
    ],
    question: "Une question concernant votre séjour ?",
  },

  ar: {
    title: "إقامتكم",
    sections: [
      {
        id: "visites",
        label: "أوقات الزيارة",
        body: [
          "بإمكان مرضانا المقيمين بالمصحة استقبال زيارات أقاربهم طيلة أيام الأسبوع من الساعة العاشرة صباحاً (10:00) إلى الساعة العاشرة ليلاً (22:00) في جميع وحدات الإقامة العادية. أمّا في قسمَي الإنعاش والعناية المركّزة، فيُسمح بالزيارة يومياً من الساعة الثالثة بعد الزوال (15:00) إلى الساعة الخامسة مساءً (17:00).",
        ],
      },
      {
        id: "hebergement",
        label: "الإقامة والتغذية",
        body: [
          "يمكن أن يتمّ إيواؤكم بالمصحة في إطار إقامة استشفائية عادية أو بالمستشفى النهاري لبضع ساعات وفق توصيات طبيبكم المباشر. وتوضع على ذمّتكم غرفة حسب اختياركم وحسب التوفّر (غرفة فردية، أو مزدوجة، أو جناح ممتاز). كما يمكن لأحد أقاربكم المبيت إلى جانبكم ومرافقتكم طيلة فترة إقامتكم ما لم توجد موانع طبية.",
          "تحرص فرق الطبخ وأخصائيو التغذية لدينا على تلبية حاجياتكم الغذائية عبر إعداد وجبات صحية متوازنة ومدروسة، محضّرة بمنتجات طازجة ومقدّمة في أطباق حافظة للحرارة، مع توفير إمكانية الإطعام لمرافقيكم أيضاً.",
        ],
      },
      {
        id: "transport",
        label: "النقل الصحي",
        body: [
          "تضع المصحة على ذمّتكم سيارة إسعاف طبية مجهّزة بالكامل لتأمين تنقّلاتكم الصحية في أفضل ظروف الراحة والسلامة.",
        ],
      },
      {
        id: "objets",
        label: "الممتلكات والأشياء الثمينة",
        body: [
          "حرصاً على سلامة مقتنياتكم وأشيائكم الثمينة (المجوهرات، المحافظ، الهواتف…)، ندعوكم عند القبول إلى التصريح بها لإيداعها وحفظها في الخزنة المؤمّنة للمصحة.",
          "أمّا الأشياء والممتلكات التي لم يتمّ إيداعها والتصريح بها لدى الإدارة، فتبقى تحت المسؤولية الكاملة للمريض في حال ضياعها.",
        ],
      },
    ],
    rulesIntro:
      "حرصاً على راحتكم وسلامتكم، نرجو منكم التقيّد بالنظام الداخلي للمصحة واحترام التعليمات التالية:",
    rules: [
      "يُمنع التدخين منعاً باتاً داخل كامل فضاءات المصحة (الأمر عدد 2248 لسنة 1998 المؤرّخ في 16/11/1998)",
      "يُمنع إدخال أو استهلاك المشروبات الكحولية",
      "يُمنع إدخال الحيوانات إلى المصحة",
      "يُمنع جلب الزهور المقطوفة أو النباتات إلى وحدات الإنعاش والعناية المركّزة",
    ],
    notes: [
      "يُسلَّم لكم كتيّب استقبال توجيهي عند إتمام إجراءات القبول",
      "مخطّط الإخلاء والطوارئ معلّق في مختلف أروقة المصحة وداخل غرفتكم",
      "تعريفة الخدمات الصحية والنظام الداخلي للمصحة موضوعان على ذمّتكم داخل الغرفة",
    ],
    question: "هل لديكم استفسار حول إقامتكم؟",
  },

  en: {
    title: "Your stay",
    sections: [
      {
        id: "visites",
        label: "Visiting hours",
        body: [
          "Inpatients may receive visits from family and loved ones every day of the week from 10:00 a.m. to 10:00 p.m. across all standard care units. In the Intensive Care and Resuscitation units, visiting hours are from 3:00 p.m. to 5:00 p.m.",
        ],
      },
      {
        id: "hebergement",
        label: "Accommodation & Dining",
        body: [
          "Your care may be arranged as an inpatient stay or in our day hospital. Depending on your preference and availability, you may choose between a private single room, a double room, or a premium suite. A family member may also stay overnight to accompany you throughout your hospitalization, unless medically contraindicated.",
          "Our chefs and clinical dietitians work together to meet your nutritional needs, preparing balanced, carefully crafted meals from fresh ingredients served in insulated thermal trays. Meal service is also available for accompanying family members.",
        ],
      },
      {
        id: "transport",
        label: "Medical transport",
        body: [
          "A fully equipped medical ambulance is available at your disposal to ensure safe and comfortable patient transfers.",
        ],
      },
      {
        id: "objets",
        label: "Valuables & personal belongings",
        body: [
          "To safeguard your valuables—such as jewelry, wallets, and mobile phones—a dedicated deposit procedure and a secure safe are available upon admission.",
          "Any personal items or valuables not declared and deposited in the clinic's safe remain under the sole responsibility of the patient in the event of loss.",
        ],
      },
    ],
    rulesIntro:
      "For your comfort and safety, we kindly ask that you respect our internal regulations and observe the following guidelines:",
    rules: [
      "Smoking is strictly prohibited throughout the clinic premises (Decree No. 98-2248 of November 16, 1998)",
      "Bringing or consuming alcoholic beverages is prohibited",
      "Pets and animals are not permitted inside the facility",
      "Cut flowers and potted plants are not permitted in the Intensive Care Unit",
    ],
    notes: [
      "A welcome guide is provided to you upon admission",
      "Emergency evacuation plans are displayed throughout the clinic and inside your room",
      "Service rates and internal regulations are also displayed in your room",
    ],
    question: "Have a question about your stay?",
  },
};
