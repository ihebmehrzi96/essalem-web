/**
 * Contenu de la page « Démarche qualité » dans les trois langues.
 */

export type Locale = "fr" | "ar" | "en";

export type QualiteContent = {
  title: string;

  system: { heading: string; paragraphs: string[] };

  project: {
    heading: string;
    missionTitle: string;
    mission: string;
    visionTitle: string;
    vision: string[];
    valuesTitle: string;
    values: string[];
  };

  platine: {
    heading: string;
    intro: string[];
    guaranteeTitle: string;
    guarantees: string[];
    commitmentTitle: string;
    commitment: string;
    expectTitle: string;
    expect: string[];
  };
};

export const qualite: Record<Locale, QualiteContent> = {
  fr: {
    title: "Démarche qualité",

    system: {
      heading: "Système de management de la qualité",
      paragraphs: [
        "La qualité des soins suscite de nos jours un intérêt de plus en plus important et constitue un enjeu primordial pour le système de santé et pour la médecine contemporaine.",
        "Le management de la qualité et la gestion des risques deviennent un impératif non seulement pour la performance, mais aussi pour la pérennité des organisations dans un environnement qui exerce de plus en plus de pression sur le système de santé. Nous assistons à une évolution des attentes des usagers où la relation soignant-soigné, autrefois basée sur une rencontre entre la confiance du patient et la conscience du soignant, est parfois confrontée à une exigence accrue et à une certaine méfiance.",
        "Nous assistons également à un renforcement des exigences des organismes financeurs, des instances de tutelle et des pouvoirs publics dans un environnement de concurrence et de mondialisation alimenté par les nouvelles technologies de l'information et de la communication.",
        "Notre projet qualité est placé sous le signe de l'excellence et de l'accréditation, où le patient représente le centre d'intérêt de l'établissement et des professionnels de santé, qui s'efforcent de lui offrir des soins de haute qualité en intégrant la maîtrise des risques, les vigilances sanitaires et la prise en charge de la douleur, tout en veillant au respect de ses droits, à sa bientraitance et à la prévention de toute maltraitance.",
        "Ce projet veille également à l'amélioration de l'information et de la communication interne et externe, au développement professionnel continu, à la fidélisation de nos médecins partenaires et à l'accueil d'une patientèle internationale dans le cadre du rayonnement de nos prestations auprès des pays voisins du Maghreb, d'Afrique et d'Europe.",
      ],
    },

    project: {
      heading: "Projet qualité",
      missionTitle: "Notre mission",
      mission:
        "Promouvoir des prestations de soins de qualité en veillant à la sécurité des patients et des professionnels de santé.",
      visionTitle: "Notre vision, orientée selon quatre axes",
      vision: [
        "Offrir à nos patients les soins les mieux adaptés à leur état de santé.",
        "Être un pôle de référence pour le suivi et l'acquisition de technologies médicales innovantes, en participant activement à la réponse aux besoins de santé de notre région.",
        "Ouvrir notre établissement sur son environnement afin de faciliter la communication et la circulation de l'information avec nos partenaires des secteurs public et privé de la santé ainsi qu'avec les usagers.",
        "Renforcer notre démarche qualité en vue du maintien et de la consolidation de l'accréditation de notre établissement et du rayonnement de nos services auprès des patients internationaux.",
      ],
      valuesTitle: "Nos valeurs",
      values: [
        "La compétence et l'expertise de chacun d'entre nous dans son domaine.",
        "Le respect des patients, des professionnels de santé, de nos partenaires et des autorités locales et nationales.",
        "L'ambition et la volonté de viser l'excellence, de nous dépasser et d'être un moteur du changement et de l'innovation.",
      ],
    },

    platine: {
      heading: "Accréditation Platine",
      intro: [
        "Un nouveau palier d'excellence pour la Clinique Essalem Sousse : en décrochant l'accréditation de niveau Platine délivrée par l'INEAS, elle devient la première clinique privée en Tunisie à recevoir cette distinction, symbole de son engagement envers la qualité des soins et la sécurité des patients.",
        "L'obtention de l'accréditation de niveau Platine est l'aboutissement d'un processus long et rigoureux. L'ensemble des équipes de la Clinique Essalem Sousse s'est mobilisé pour mettre en place des référentiels et des procédures exigeants dans tous les aspects de ses pratiques, de la qualité des soins à la gestion des risques.",
      ],
      guaranteeTitle: "Elle permet d'assurer aux patients :",
      guarantees: [
        "Des soins de haute qualité, conformes aux normes et exigences internationales les plus strictes",
        "Une sécurité optimale des patients à chaque étape du parcours de soins",
        "Un environnement de soins propre, sécurisé et accueillant",
        "Une équipe médicale et paramédicale compétente et dévouée",
        "Une communication transparente et efficace",
      ],
      commitmentTitle: "Un engagement continu envers l'amélioration",
      commitment:
        "L'obtention de l'accréditation de niveau Platine n'est pas une fin en soi. La Clinique Essalem Sousse s'engage à poursuivre sa dynamique d'amélioration continue et à offrir à ses patients les meilleurs soins possibles.",
      expectTitle: "Nos patients peuvent désormais s'attendre à :",
      expect: [
        "Des soins encore plus personnalisés et centrés sur leurs besoins",
        "Une coordination optimale des soins entre les différents intervenants",
        "Un renforcement continu de la qualité de l'information et de la communication à l'intérieur et à l'extérieur de l'établissement",
      ],
    },
  },

  ar: {
    title: "مسار الجودة",

    system: {
      heading: "نظام إدارة الجودة",
      paragraphs: [
        "تحظى جودة الرعاية الصحية باهتمام متزايد في عصرنا الحاضر، وتشكّل رهاناً أساسياً للنظام الصحي وللطب الحديث. وقد أصبحت إدارة الجودة والتحكّم في المخاطر ضرورةً حتمية، ليس فحسب لتحسين الأداء، بل أيضاً لضمان استمرارية المؤسسات الصحية وبقائها في ظل بيئة تفرض ضغوطاً متزايدة على القطاع الصحي.",
        "كما نشهد اليوم تطوّراً في تطلّعات المنتفعين بالخدمات الصحية؛ إذ إن العلاقة بين الإطار الصحي والمريض، التي كانت تقوم تقليدياً على التلاقي بين ثقة المريض وضمير المعالج، باتت تواجه أحياناً سقفاً عالياً من المتطلبات ونوعاً من الحذر والترقّب من جانب المريض. وبالمثل، تتزايد متطلبات هيئات التمويل والسلطات الرقابية وصنّاع القرار في بيئة تتّسم بالمنافسة والعولمة وتغذّيها التقنيات الحديثة للمعلومات والاتصالات.",
        "وقد أُطلق مشروع الجودة بمؤسستنا تحت شعار التميّز والاعتماد، حيث يمثّل المريض محور اهتمام المصحة ومهنيي الصحة الذين يكرّسون جهودهم لتقديم رعاية عالية الجودة، عبر التحكّم في المخاطر المرتبطة بالعلاج، واليقظة الصحية، والتكفّل بالألم، مع الحرص التام على احترام حقوق المريض وحسن رعايته والوقاية من أي تقصير أو سوء معاملة.",
        "كما يرمي هذا المشروع إلى تطوير منظومة الإعلام والتواصل الداخلي والخارجي، ودعم التكوين المهني المستمر، وتعزيز ثقة وولاء أطبائنا الشركاء، واستقطاب المرضى الدوليين في إطار إشعاع خدماتنا في البلدان المغاربية المجاورة وسائر بلدان إفريقيا وأوروبا.",
      ],
    },

    project: {
      heading: "مشروع الجودة",
      missionTitle: "مهمتنا",
      mission:
        "الارتقاء بجودة الخدمات الصحية مع ضمان سلامة المرضى ومهنيي الصحة.",
      visionTitle: "تتركّز رؤيتنا على أربعة محاور",
      vision: [
        "توفير الرعاية الصحية الأنسب للحالة الصحية لكل مريض.",
        "أن نكون قطباً مرجعياً لرصد واقتناء التقنيات الطبية المتطوّرة، عبر المساهمة الفاعلة في تلبية الاحتياجات الصحية لجهتنا.",
        "انفتاح مؤسستنا على محيطها لتيسير التواصل وتبادل المعلومات مع شركائنا في القطاعين العام والخاص للصحة ومع المرضى.",
        "تعزيز مسار الجودة بمؤسستنا للحفاظ على شهادة الاعتماد وتدعيمها، وتطوير إشعاع خدماتنا لدى المرضى الأجانب.",
      ],
      valuesTitle: "تستند قيمنا إلى",
      values: [
        "كفاءة وخبرة كلّ فرد منّا في مجال اختصاصه.",
        "احترام المرضى ومهنيي الصحة وشركائنا والسلطات المحلية والوطنية.",
        "الطموح والإرادة لبلوغ التميّز وتجاوز الذات، وأن نكون قاطرةً للتغيير والابتكار.",
      ],
    },

    platine: {
      heading: "الاعتماد البلاتيني",
      intro: [
        "ارتقاء جديد نحو التميّز لمصحة السلام بسوسة: بحصولها على شهادة الاعتماد الصحي من المستوى البلاتيني الصادرة عن الهيئة الوطنية للتقييم والاعتماد في المجال الصحي (INEAS)، تصبح أول مصحة خاصة في تونس تنال هذا التصنيف الرفيع، تتويجاً لالتزامها الراسخ بجودة الرعاية وسلامة المرضى.",
        "يمثّل الحصول على الاعتماد البلاتيني ثمرة مسار طويل ودقيق؛ فقد تضافرت جهود كافة فرق مصحة السلام بسوسة لإرساء معايير وبروتوكولات صارمة في مختلف جوانب الممارسة الطبية والإدارية، من جودة الرعاية إلى إدارة المخاطر.",
      ],
      guaranteeTitle: "ويضمن هذا الاعتماد للمرضى:",
      guarantees: [
        "رعاية صحية عالية الجودة تستجيب لأدقّ المعايير والمتطلبات الدولية",
        "سلامة مثلى للمرضى في كافة مراحل المسار العلاجي",
        "بيئة استشفائية نظيفة وآمنة ومرحّبة",
        "فريقاً طبياً وشبه طبي ذا كفاءة عالية وتفانٍ في العمل",
        "تواصلاً شفّافاً وفعّالاً",
      ],
      commitmentTitle: "التزام متواصل بالتحسين المستمر",
      commitment:
        "إن الحصول على الاعتماد البلاتيني ليس غايةً في حدّ ذاته، بل تلتزم مصحة السلام بسوسة بمواصلة دينامية التحسين المستمر وتقديم أفضل رعاية ممكنة لمرضاها.",
      expectTitle: "ويمكن لمرضانا أن يتطلّعوا دائماً إلى:",
      expect: [
        "رعاية أكثر تخصيصاً وتمحوراً حول احتياجاتهم الفردية",
        "تنسيق أمثل للرعاية بين مختلف المتدخّلين الصحيين",
        "تعزيز متواصل لجودة المعلومة والتواصل داخل المؤسسة وخارجها",
      ],
    },
  },

  en: {
    title: "Quality Approach",

    system: {
      heading: "Quality Management System",
      paragraphs: [
        "Quality of care attracts growing attention today and stands as a vital priority for modern healthcare systems and contemporary medicine.",
        "Quality management and clinical risk management have become essential not only for institutional performance, but also for the long-term sustainability of healthcare organizations operating under increasing pressure. Patient expectations have evolved significantly: the caregiver–patient relationship, once grounded solely in implicit trust, now requires meeting high expectations and addressing growing wariness with transparency and rigor.",
        "At the same time, funding bodies, regulatory authorities, and policymakers are setting ever-stricter standards in a competitive, globalized environment driven by modern information and communication technologies.",
        "Our quality initiative is built under the banner of excellence and accreditation, placing the patient at the very center of our institution and healthcare teams. We strive to deliver high-quality care that integrates risk control, healthcare vigilance, and pain management, while upholding patients' rights, promoting compassionate care, and preventing any form of mistreatment.",
        "This initiative also strengthens internal and external communication, supports continuous professional development, fosters the loyalty of our partner physicians, and welcomes international patients from neighboring Maghreb countries, across Africa, and throughout Europe.",
      ],
    },

    project: {
      heading: "Quality Project",
      missionTitle: "Our mission",
      mission:
        "To promote high-quality healthcare services while ensuring the safety of both patients and healthcare professionals.",
      visionTitle: "Our vision is structured around four key pillars",
      vision: [
        "Provide our patients with care best suited to their medical condition.",
        "Serve as a leading center for adopting and monitoring advanced medical technologies, actively contributing to the healthcare needs of our region.",
        "Open our institution to its wider community to facilitate seamless communication and information sharing with public and private healthcare partners as well as patients.",
        "Strengthen our quality management system to maintain and consolidate our healthcare accreditation and expand our services to international patients.",
      ],
      valuesTitle: "Our values",
      values: [
        "Proven competence and expertise in each professional's respective field.",
        "Respect for patients, healthcare professionals, partners, and local and national authorities.",
        "The ambition and determination to pursue excellence, surpass ourselves, and drive meaningful innovation.",
      ],
    },

    platine: {
      heading: "Platinum Accreditation",
      intro: [
        "A new milestone of excellence for Clinique Essalem Sousse: by earning Platinum-level accreditation from INEAS, it has become the first private clinic in Tunisia to receive this prestigious distinction—a testament to its unwavering dedication to quality of care and patient safety.",
        "Achieving Platinum-level accreditation is the culmination of a long and rigorous process. Every team at Clinique Essalem Sousse worked tirelessly to establish strict protocols and international standards across all areas of practice, from clinical care to risk management.",
      ],
      guaranteeTitle: "This accreditation guarantees our patients:",
      guarantees: [
        "High-quality care meeting the strictest international standards and requirements",
        "Optimal patient safety at every stage of the care pathway",
        "A clean, safe, and welcoming clinical environment",
        "A skilled and dedicated medical and paramedical team",
        "Transparent and effective communication",
      ],
      commitmentTitle: "A continuous commitment to improvement",
      commitment:
        "Achieving Platinum-level accreditation is not an end in itself. Clinique Essalem Sousse remains committed to continuous improvement and to providing its patients with the highest standard of care.",
      expectTitle: "Our patients can always expect:",
      expect: [
        "Care that is increasingly personalized and centered on their needs",
        "Seamless coordination among all medical and paramedical practitioners",
        "Continuously enhanced information and communication both within and outside the clinic",
      ],
    },
  },
};
