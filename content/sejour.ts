/** Contenu de la page « Votre séjour », repris du site actuel. */

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
          "Les patients hospitalisés peuvent recevoir les visites de leurs proches tous les jours de la semaine de 10h à 22h pour toutes les unités de soins conventionnelles. Les visites en réanimation et en soins intensifs sont autorisées de 15h à 17h.",
        ],
      },
      {
        id: "hebergement",
        label: "Hébergement — Restauration",
        body: [
          "Votre prise en charge peut se faire dans le cadre d'une hospitalisation classique ou en hôpital de jour. Une chambre vous sera proposée selon votre choix et en fonction des disponibilités. Votre hébergement peut avoir lieu en chambre individuelle, en chambre double ou en chambre premium. Un de vos proches peut être hébergé à vos côtés et vous accompagner durant votre séjour, sauf contre-indication médicale.",
          "Nos cuisiniers et nos diététiciennes s'efforceront de satisfaire vos besoins en vous proposant des plats équilibrés et bien étudiés, préparés avec des produits frais et servis dans des plateaux isothermes. Une possibilité s'offre aussi à vos accompagnants pour se restaurer.",
        ],
      },
      {
        id: "transport",
        label: "Transport sanitaire",
        body: [
          "Nous disposons d'une ambulance médicalisée qui est mise à votre disposition pour assurer vos transports sanitaires.",
        ],
      },
      {
        id: "objets",
        label: "Biens et objets de valeur",
        body: [
          "Dans le but d'assurer la sécurité de tous vos objets de valeur tels vos bijoux, vos portefeuilles, vos téléphones…, nous disposons d'une procédure et d'un coffre-fort pour y déposer tous ces objets.",
          "Les objets et biens non déclarés demeurent sous la responsabilité du patient en cas de perte.",
        ],
      },
    ],
    rulesIntro:
      "Pour votre sécurité, nous vous prions de respecter le règlement intérieur de notre établissement et de suivre les consignes suivantes :",
    rules: [
      "Ne pas fumer dans l'enceinte de l'établissement (décret n° 98-2248 du 16/11/98)",
      "Ne pas amener ni consommer de boissons alcoolisées",
      "Ne pas ramener des animaux dans l'enceinte de l'établissement",
      "Ne pas ramener des fleurs coupées ou plantes vertes en pot au service de réanimation",
    ],
    notes: [
      "Un livret d'accueil vous est remis à votre admission",
      "Le plan d'évacuation est affiché dans différents endroits de l'établissement et dans votre chambre",
      "La tarification des prestations et le règlement intérieur sont aussi affichés dans votre chambre",
    ],
    question: "Une question sur votre séjour ?",
  },

  ar: {
    title: "إقامتكم",
    sections: [
      {
        id: "visites",
        label: "الزيارة",
        body: [
          "بإمكان مرضانا المقيمين بالمصحة تلقّي زيارات من أقاربهم كامل أيام الأسبوع من الساعة 10 صباحاً إلى الساعة 10 مساءً لجميع وحدات الإقامة. أما بالنسبة لقسمَي الإنعاش والعناية المركّزة، فيُسمح بالزيارة من الساعة الثالثة إلى الساعة الخامسة مساءً.",
        ],
      },
      {
        id: "hebergement",
        label: "الإقامة والوجبات الغذائية",
        body: [
          "يمكن أن يكون إيواؤكم بالمصحة في إطار إقامة عادية، كما يمكن أن يكون في إطار إقامة قصيرة لا تفوق بعض الساعات بالمستشفى النهاري، حسب توصيات طبيبكم المباشر، وذلك في غرفة حسب اختياركم (غرفة مفردة أو مزدوجة أو رفيعة) وحسب الغرف المتوفّرة بالمصحة. وبإمكان أحد أقاربكم مرافقتكم أثناء إقامتكم ما لم تكن هناك موانع طبية.",
          "تُطبخ جميع الوجبات الغذائية المقدّمة لكم بالمصحة تحت مراقبة أخصائيي التغذية الذين يسهرون على تصميم أكلات متوازنة ومدروسة، معدّة بمنتجات طازجة، وتُقدَّم لكم في أطباق حافظة للحرارة.",
        ],
      },
      {
        id: "transport",
        label: "النقل الصحي",
        body: [
          "سيارة إسعاف طبية على ذمّتكم لتضمن لكم نقلاً صحياً في أفضل الظروف.",
        ],
      },
      {
        id: "objets",
        label: "الممتلكات والأشياء الثمينة",
        body: [
          "من أجل ضمان سلامة جميع الأشياء الثمينة الخاصة بكم، مثل المجوهرات والمحافظ والهواتف وما إلى ذلك، ندعوكم إلى التصريح بها ليقع حفظها في خزنة.",
          "أما بالنسبة للممتلكات التي لم يتم التصريح عنها لدى إدارة المصحة، فهي تظلّ تحت مسؤولية المريض في حال فقدانها.",
        ],
      },
    ],
    rulesIntro:
      "من أجل سلامتكم، نطلب منكم احترام النظام الداخلي لمؤسستنا واتباع التعليمات التالية:",
    rules: [
      "عدم التدخين داخل المصحة (المرسوم رقم 98-2248 بتاريخ 16/11/98)",
      "عدم جلب أو استهلاك المشروبات الكحولية",
      "عدم جلب الحيوانات إلى المصحة",
      "عدم جلب الزهور أو النباتات إلى وحدة العناية المركّزة",
    ],
    notes: [
      "يتم مدّكم بكتيّب استقبال عند الإيواء",
      "خطة الإخلاء معلّقة في أماكن مختلفة من المصحة وفي غرفكم",
      "التعريفات الخاصة بخدماتنا والنظام الداخلي للمصحة معروضة في غرفكم",
    ],
    question: "لديكم سؤال حول إقامتكم؟",
  },

  en: {
    title: "Your stay",
    sections: [
      {
        id: "visites",
        label: "Visits",
        body: [
          "Patients who are hospitalized can receive visits from their loved ones every weekday from 10 a.m. to 10 p.m. for all conventional care units. Resuscitation and intensive care visits are allowed from 3:00 p.m. to 5:00 p.m.",
        ],
      },
      {
        id: "hebergement",
        label: "Hosting — Meals",
        body: [
          "You can be treated in a conventional hospitalization or in a day hospital. A room will be offered to you according to your choice and according to availability. Your accommodation can be in a single room, a double room or a premium room. One of your relatives can be accommodated with you and accompany you during your stay, unless there is a medical contraindication.",
          "Our chefs and nutritionists will strive to satisfy your needs by offering you well-balanced and well-studied dishes, prepared with fresh products and served in isothermal dishes. Your companions will also be offered the possibility to have a meal too.",
        ],
      },
      {
        id: "transport",
        label: "Medical transport",
        body: [
          "We have a fully equipped ambulance at your disposal to ensure your medical transport.",
        ],
      },
      {
        id: "objets",
        label: "Goods and valuables",
        body: [
          "In order to ensure the security of all your valuables such as your jewelry, your wallets, your phones…, we have a procedure and a safe to store all these objects.",
          "Undeclared objects and goods remain under the responsibility of the patient in case of loss.",
        ],
      },
    ],
    rulesIntro:
      "For your safety, we ask you to respect the internal rules of our establishment and to follow the following instructions:",
    rules: [
      "Do not smoke inside the establishment (decree n° 98-2248 of 16/11/98)",
      "Do not bring or consume alcohol",
      "Do not bring animals to the establishment",
      "Do not bring cut flowers or green potted plants to the ICU",
    ],
    notes: [
      "A welcome booklet is given to you upon admission",
      "The evacuation plan is posted in different areas of the facility and in your room",
      "The rates and rules of procedure are also posted in your room",
    ],
    question: "A question about your stay?",
  },
};