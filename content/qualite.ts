/**
 * Contenu de la page « Démarche qualité ».
 * Textes repris du site actuel. La section « Accréditation Platine »
 * n'existait qu'en français : les versions ar et en sont des traductions
 * à faire relire par la direction.
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
        "Le management de la qualité et la gestion des risques devient un impératif non seulement pour la performance, mais aussi pour la survie des organisations dans un environnement qui exerce de plus en plus de pression sur le système de santé. Nous assistons à une modification des exigences des usagers où la relation soignant-soigné, autrefois basée sur une rencontre entre la confiance du soigné et la conscience du soignant, est devenue une confrontation entre une exigence et une méfiance de la part du soigné.",
        "Nous assistons également à une modification des exigences des financiers, des instances de tutelle et du politique dans un environnement de concurrence, de mondialisation et de globalisation alimenté par les nouvelles technologies de l'information et de la communication.",
        "Notre projet qualité est lancé sous le signe de la qualité et de l'accréditation, où l'usager représente le centre d'intérêt de l'établissement et des professionnels de santé qui s'efforceront de lui offrir des soins de qualité en intégrant la maîtrise des risques, les vigilances sanitaires et la gestion de la douleur, en veillant au respect de ses droits, à sa bientraitance et à l'évitement de sa maltraitance.",
        "Ce projet veille également à l'amélioration de l'information et de la communication interne et externe, au développement professionnel continu, à la fidélisation de nos chers médecins et à l'attraction d'une patientèle étrangère dans le cadre de la promotion de nos prestations aux pays voisins maghrébins, en Afrique et en Europe.",
      ],
    },

    project: {
      heading: "Projet qualité",
      missionTitle: "Notre mission",
      mission:
        "Promouvoir des prestations de soins de qualité en veillant sur la sécurité des usagers et des professionnels de santé.",
      visionTitle: "Notre vision, orientée selon quatre axes",
      vision: [
        "Offrir à nos patients les soins les mieux adaptés à leur état de santé.",
        "Être un lieu privilégié de suivi et d'acquisition de technologies de santé qui ne sont pas offertes dans notre région, en participant aux activités de planification et de suivi des besoins en santé de la région.",
        "Ouvrir notre établissement sur son environnement pour faciliter la communication et la circulation de l'information avec nos partenaires des secteurs public et privé de la santé et avec les usagers.",
        "Renforcer notre démarche qualité en vue du maintien et de la consolidation de l'accréditation de notre établissement et de la promotion de nos services à des patients étrangers.",
      ],
      valuesTitle: "Nos valeurs",
      values: [
        "La compétence de chacun d'entre nous dans son domaine.",
        "Le respect des usagers, des professionnels de santé, de nos partenaires et des autorités locales et nationales.",
        "L'ambition et la volonté de viser l'excellence, de nous dépasser et d'être le moteur du changement et de l'innovation.",
      ],
    },

    platine: {
      heading: "Accréditation Platine",
      intro: [
        "Un nouveau palier d'excellence pour la clinique ESSALEM Sousse : en décrochant l'accréditation niveau platine de l'INEAS, elle devient la première clinique privée en Tunisie à recevoir ce label, symbole de son dévouement à la qualité des soins et à la sécurité des patients.",
        "L'obtention de l'accréditation niveau platine est l'aboutissement d'un long et rigoureux processus. L'équipe de la clinique ESSALEM Sousse a travaillé d'arrache-pied pour mettre en place des normes et des procédures rigoureuses dans tous les aspects de ses pratiques, de la qualité des soins à la gestion des risques.",
      ],
      guaranteeTitle: "Elle permet d'assurer aux patients :",
      guarantees: [
        "Des soins de haute qualité, conformes aux normes et exigences internationales les plus strictes",
        "Une sécurité optimale des patients",
        "Un environnement de soins propre et accueillant",
        "Une équipe médicale et paramédicale compétente et dévouée",
        "Une communication transparente et efficace",
      ],
      commitmentTitle: "Un engagement continu envers l'amélioration",
      commitment:
        "L'obtention de l'accréditation niveau platine n'est pas une fin en soi. La clinique ESSALEM Sousse s'engage à poursuivre sa dynamique d'amélioration continue et à offrir à ses patients les meilleurs soins possibles.",
      expectTitle: "Nos patients peuvent désormais s'attendre à :",
      expect: [
        "Des soins encore plus personnalisés et centrés sur leurs besoins",
        "Une meilleure coordination des soins entre les différents intervenants",
        "Un renforcement de la qualité de l'information et de la communication à l'intérieur et à l'extérieur de l'établissement",
      ],
    },
  },

  ar: {
    title: "مسار الجودة",

    system: {
      heading: "نظام إدارة الجودة",
      paragraphs: [
        "تثير جودة الخدمات الصحية المزيد من الاهتمام في الوقت الحاضر، وهي رهان أساسي للنظام الصحي وللطب المعاصر. وقد أصبحت إدارة الجودة والتحكّم في المخاطر أمراً ضرورياً، ليس فقط لتحسين الأداء، ولكن أيضاً من أجل حفاظ المؤسسة على الدوام في بيئة تشهد المزيد من الضغط على النظام الصحي.",
        "كما يشهد العالم حالياً تغيّرات في متطلبات المستفيدين من الخدمات الصحية، حيث أن العلاقة بين الإطار الصحي والمريض، التي كانت ترتكز على اندماج بين ثقة المريض وضمير الإطار الصحي، أصبحت اليوم مواجهة بين متطلبات المريض والحذر والتخوّف من جانبه. كما نشهد تغيّراً في متطلبات الممولين والهيئات الرقابية والسياسة في بيئة منافسة وعولمة تغذيها التقنيات الحديثة للمعلومات والاتصالات.",
        "وقد تم إطلاق مشروع نظام الجودة بمؤسستنا تحت علامة الجودة والاعتماد، حيث يمثّل المريض مركز اهتمام المؤسسة ومهنيي الصحة الذين سوف يبذلون جهودهم لتقديم خدمات عالية الجودة للمرضى، من خلال التحكّم في المخاطر الناتجة عن العلاجات واليقظة الصحية والسيطرة على أوجاعهم، مع ضمان احترام حقوقهم وحسن معاملتهم وتجنّب سوء معاملتهم.",
        "كما يضمن هذا المشروع تحسين تبادل المعلومات وحسن الاتصال الداخلي والخارجي، والتكوين المهني المستمر، وولاء أطبائنا الأعزاء، واستقطاب المرضى الأجانب في إطار ترويج خدماتنا في البلدان المغاربية المجاورة والبلدان الإفريقية والأوروبية.",
      ],
    },

    project: {
      heading: "نظام الجودة",
      missionTitle: "مهمتنا",
      mission:
        "الرقيّ بالجودة في خدماتنا الصحية مع ضمان سلامة المستفيدين ومهنيي الصحة.",
      visionTitle: "تتركّز رؤيتنا على أربعة محاور",
      vision: [
        "توفير الخدمات الصحية الأنسب لمرضانا.",
        "أن نكون موقعاً متميّزاً لرصد واكتساب التقنيات الصحية غير المتوفّرة في منطقتنا، من خلال المشاركة في التخطيط الصحي وفي مراقبة الاحتياجات الصحية للجهة.",
        "انفتاح مؤسستنا على محيطها لتسهيل الاتصال وتبادل المعلومات مع شركائنا في القطاعين العام والخاص للصحة ومع المرضى.",
        "تطوير نظام الجودة لمؤسستنا لتثبيت شهادة الاعتماد وتعزيز خدماتنا تجاه المرضى.",
      ],
      valuesTitle: "تستند قيمنا على",
      values: [
        "اختصاص كلّ منّا في مجاله.",
        "احترام المرضى ومهنيي الصحة وشركائنا والسلطات المحلية والمركزية.",
        "الطموح والإرادة للسعي للتميّز والتفوّق، وأن نكون محرّك التغيير والابتكار.",
      ],
    },

    // ⚠ Traduction à faire relire par la direction
    platine: {
      heading: "الاعتماد البلاتيني",
      intro: [
        "مستوى جديد من التميّز لمصحة السلام سوسة. بحصولها على الاعتماد البلاتيني من الهيئة الوطنية للاعتماد في الصحة (INEAS)، تصبح أول مصحة خاصة في تونس تنال هذا التصنيف، رمزاً لتفانيها في جودة الرعاية وسلامة المرضى.",
        "الحصول على الاعتماد البلاتيني تتويج لمسار طويل ودقيق. عمل فريق مصحة السلام سوسة بلا كلل لإرساء معايير وإجراءات صارمة في كل جوانب ممارساتها، من جودة الرعاية إلى إدارة المخاطر.",
      ],
      guaranteeTitle: "يضمن هذا الاعتماد للمرضى:",
      guarantees: [
        "رعاية عالية الجودة مطابقة لأشدّ المعايير والمتطلبات الدولية",
        "سلامة مثلى للمرضى",
        "بيئة علاجية نظيفة ومرحّبة",
        "فريق طبي وشبه طبي كفؤ ومتفانٍ",
        "تواصل شفّاف وفعّال",
      ],
      commitmentTitle: "التزام متواصل بالتحسين",
      commitment:
        "الحصول على الاعتماد البلاتيني ليس غاية في ذاته. تلتزم مصحة السلام سوسة بمواصلة دينامية التحسين المستمر وتقديم أفضل رعاية ممكنة لمرضاها.",
      expectTitle: "يمكن لمرضانا من الآن فصاعداً أن يتوقّعوا:",
      expect: [
        "رعاية أكثر تخصيصاً وتمحوراً حول حاجاتهم",
        "تنسيقاً أفضل للرعاية بين مختلف المتدخّلين",
        "تعزيز جودة المعلومة والتواصل داخل المؤسسة وخارجها",
      ],
    },
  },

  // ⚠ Version anglaise à compléter depuis le site actuel
   en: {
    title: "Quality approach",

    system: {
      heading: "Quality management system",
      paragraphs: [
        "The quality of care is of growing interest today and is a key concern for the health care system and for contemporary medicine.",
        "Quality management and risk management are becoming essential not only for the performance, but also for the survival of organizations in an environment that is putting increasing pressure on the healthcare system. We are witnessing a change in the demands of users where the caregiver-patient relationship, once based on a mutual trust between the patient and the caregiver, has become a confrontation between a desire and a mistrust from the patient's side.",
        "We are also witnessing a change in the requirements of financiers, supervising authorities and policies in an environment of competition, and globalization fueled by new information and communication technologies.",
        "Our quality project is launched under the name of quality and accreditation, where the client is the center of interest of the institution and the healthcare professionals who will strive to offer them high-quality care by combining risk control, health vigilance and pain management, ensuring that their rights are respected, that they are treated well and that they are well taken care of.",
        "This project also ensures the improvement of information and internal as well as external communication, the continuous professional development, the loyalty of our dear doctors and the attraction of foreign patients by promoting our services in neighboring Maghrebian countries, in Africa and in Europe.",
      ],
    },

    project: {
      heading: "Quality project",
      missionTitle: "Our mission",
      mission:
        "To promote quality health care services by ensuring the safety of both patients and health care professionals.",
      visionTitle: "Our vision is oriented according to four axes",
      vision: [
        "Offer our patients the care best adapted to their health condition.",
        "Be a privileged place for the follow-up and acquisition of health technologies that are not offered in our region, by participating in planning and following the health needs of the region.",
        "Open our establishment to its community in order to facilitate communication and the exchange of information with our partners in the public and private health sectors and with our patients.",
        "Enhance our quality approach with a focus on the accreditation of our establishment and the promotion of our services to foreign patients.",
      ],
      valuesTitle: "Our values are based on",
      values: [
        "The expertise of each one of us in his or her field.",
        "The respect of patients, health professionals, our partners as well as local and national authorities.",
        "The ambition and the will to aim for excellence, to surpass ourselves and to be the driving force of change and innovation.",
      ],
    },

    // ⚠ Section absente du site actuel en anglais — traduction à faire relire
    platine: {
      heading: "Platinum Accreditation",
      intro: [
        "A new level of excellence for Clinique ESSALEM Sousse. By obtaining platinum-level accreditation from INEAS, it becomes the first private clinic in Tunisia to receive this label, a symbol of its dedication to quality of care and patient safety.",
        "Obtaining platinum-level accreditation is the culmination of a long and rigorous process. The team at Clinique ESSALEM Sousse worked relentlessly to implement strict standards and procedures across every aspect of its practice, from quality of care to risk management.",
      ],
      guaranteeTitle: "This accreditation guarantees patients:",
      guarantees: [
        "High-quality care meeting the strictest international standards and requirements",
        "Optimal patient safety",
        "A clean and welcoming care environment",
        "A competent and dedicated medical and paramedical team",
        "Transparent and effective communication",
      ],
      commitmentTitle: "A continuous commitment to improvement",
      commitment:
        "Platinum-level accreditation is not an end in itself. Clinique ESSALEM Sousse is committed to pursuing its dynamic of continuous improvement and providing its patients with the best possible care.",
      expectTitle: "Patients can now expect:",
      expect: [
        "Care that is even more personalised and centred on their needs",
        "Better coordination of care between the various practitioners",
        "Stronger quality of information and communication inside and outside the establishment",
      ],
    },
  },

};