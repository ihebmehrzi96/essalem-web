/**
 * Contenu éditorial des pages, dans les trois langues.
 */

type Locale = "fr" | "ar" | "en";

export type PageContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export const presentation: Record<Locale, PageContent> = {
  fr: {
    eyebrow: "La clinique",
    title: "Présentation",
    paragraphs: [
      "Active depuis plus de 20 ans, la Clinique Essalem est un établissement multidisciplinaire privé de soins offrant des prestations et des services médicaux et chirurgicaux qui répondent aux besoins de santé de nos patients.",
      "Situé dans l'un des quartiers les plus prisés et stratégiques de la ville de Sousse en Tunisie, notre établissement a connu une évolution continue de sa capacité d'accueil, de son plateau technique, de ses équipements lourds ainsi que de ses équipes médicales.",
      "Actuellement, la Clinique Essalem dispose de 105 lits d'hospitalisation, 8 salles opératoires dont 2 à flux unidirectionnel, une IRM, un scanner, une salle de cathétérisme cardiaque, un appareil de lithotripsie extracorporelle, une unité d'oxygénothérapie hyperbare monoplace et une multitude d'équipements de pointe à visée diagnostique ou thérapeutique tels que le cadre de biopsie stéréotaxique compatible IRM et scanner pour les tumeurs cérébrales et le microscope opératoire de très haute performance ZEISS KINEVO 900.",
      "Notre personnel médical et paramédical jouit d'une expérience et d'une compétence reconnues lui permettant d'accomplir sa mission dans les meilleures conditions, en garantissant la qualité et la sécurité des soins prodigués à nos patients.",
      "Engagé depuis 2004 dans une démarche d'amélioration continue de la qualité et de la sécurité des soins, notre établissement a mis en place, en 2009, un système de management de la qualité couvrant l'ensemble de ses services, couronné par l'obtention de la certification ISO 9001, renouvelée tous les trois ans. Dans cette dynamique de recherche d'excellence, la clinique a également obtenu, en 2024, l'accréditation de niveau Platine, renouvelée tous les trois ans.",
    ],
  },

  ar: {
    eyebrow: "المصحة",
    title: "تقديم",
    paragraphs: [
      "مصحة السلام مؤسسة صحية خاصة متعددة الاختصاصات تنشط منذ أكثر من 20 عاماً وتوفر خدمات طبية وجراحية متكاملة تستجيب لحاجيات مرضانا الكرام.",
      "تقع مصحة السلام في أحد أرقى وأهم أحياء مدينة سوسة بالجمهورية التونسية، وقد شهدت تطوراً مستمراً في مختلف المجالات، ولا سيما طاقة استيعابها ومنصتها التقنية وتجهيزاتها الثقيلة وكذلك مواردها البشرية.",
      "حالياً، تضم مصحة السلام 105 أسرّة استشفائية، و8 قاعات عمليات جراحية منها قاعتان ذواتا تدفق هوائي أحادي الاتجاه، وجهاز تصوير بالرنين المغناطيسي (IRM)، وجهاز تصوير مقطعي (مفراس)، وقاعة قسطرة قلبية، وجهاز لتفتيت الحصى خارج الجسم، ووحدة للعلاج بالأكسجين عالي الضغط أحادية المقعد، والعديد من التجهيزات الطبية الدقيقة ذات الغايات التشخيصية أو العلاجية كالإطار التجسيمي المتوافق مع الرنين المغناطيسي والمفراس لخزعة أورام الدماغ، والمجهر الجراحي فائق الأداء ZEISS KINEVO 900.",
      "تتمتع إطاراتنا الطبية وشبه الطبية بخبرة وكفاءة عاليتين تمكّنانها من أداء مهامها في أفضل الظروف، مع ضمان أعلى معايير الجودة والسلامة العلاجية لمرضانا الكرام.",
      "انخرطت مؤسستنا منذ عام 2004 في مسار التحسين المستمر لجودة وسلامة الرعاية الصحية، وأرست في عام 2009 نظام إدارة الجودة الشامل لجميع أقسامها، والذي تُوّج بالحصول على شهادة المواصفة القياسية ISO 9001 المجدَّدة كل ثلاث سنوات. وتتويجاً لهذا السعي الدائم نحو التميّز، أحرزت المصحة في عام 2024 شهادة الاعتماد الصحي من المستوى البلاتيني، والمجدَّدة بدورها كل ثلاث سنوات.",
    ],
  },

  en: {
    eyebrow: "The clinic",
    title: "About us",
    paragraphs: [
      "Operating for more than 20 years, Clinique Essalem is a private multidisciplinary healthcare facility offering comprehensive medical and surgical services tailored to the needs of our patients.",
      "Located in one of the most prestigious and central districts of Sousse, Tunisia, our institution has continuously expanded its inpatient capacity, surgical and diagnostic facilities, heavy medical equipment, and specialist teams.",
      "Currently, Clinique Essalem features 105 inpatient beds, 8 operating rooms including 2 with unidirectional laminar airflow, an MRI unit, a CT scanner, a cardiac catheterization laboratory, an extracorporeal shock wave lithotripsy unit, a monoplace hyperbaric oxygen therapy chamber, and a wide range of state-of-the-art diagnostic and therapeutic equipment—including an MRI- and CT-compatible stereotactic biopsy frame for brain tumors and the high-precision ZEISS KINEVO 900 surgical microscope.",
      "Our medical and paramedical staff bring extensive experience and recognized expertise, delivering care under optimal conditions while upholding the highest standards of quality and patient safety.",
      "Committed since 2004 to continuous improvement in healthcare quality and patient safety, our institution implemented a comprehensive quality management system across all departments in 2009, earning ISO 9001 certification, renewed every three years. Building on this pursuit of excellence, the clinic also achieved Platinum-level healthcare accreditation in 2024, likewise renewed every three years.",
    ],
  },
};
