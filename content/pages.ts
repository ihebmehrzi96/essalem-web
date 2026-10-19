/**
 * Contenu éditorial des pages, dans les trois langues.
 * Les textes sont repris du site actuel. La direction les relira
 * et enverra ses corrections.
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
      "Active depuis plus de 20 ans, la Clinique ESSALEM est un établissement multidisciplinaire privé de soins offrant des prestations et des services médicaux et chirurgicaux qui répondent aux besoins de santé de nos patients.",
      "Situé dans un des quartiers les plus influents de la ville de Sousse en Tunisie, notre établissement a connu une évolution progressive de sa capacité d'accueil, de son plateau technique et de ses équipements lourds ainsi que de son personnel.",
      "Actuellement, la clinique ESSALEM dispose de 105 lits d'hospitalisation, 8 salles opératoires dont 2 à flux unidirectionnel, une IRM, un scanner, une salle de cathétérisme cardiaque, un appareil de lithotripsie extracorporelle, oxygénothérapie hyperbare monoplace et une multitude d'équipements de pointe à visée diagnostique ou thérapeutique comme le cadre de biopsie stéréotaxique IRM et scanner compatible des tumeurs cérébrales et le microscope opératoire de très haute performance ZEISS KINEVO 900.",
      "Ce personnel jouit d'une expérience et d'une compétence accrues lui permettant d'exécuter ses tâches et de jouer son rôle dans les meilleures conditions, en assurant la qualité et la sécurité des soins prodigués à nos chers patients.",
      "Engagé depuis 2004 dans une démarche d'amélioration continue de la qualité et de la sécurité des soins, notre établissement a mis en place, en 2009, un système de management de la qualité couvrant l'ensemble de ses services, couronné par l'obtention de la certification ISO 9001, renouvelée tous les trois ans. Dans cette dynamique de recherche d'excellence, la clinique a également obtenu, en 2024, l'accréditation de niveau Platine, renouvelée tous les trois ans.",
    ],
  },

  ar: {
    eyebrow: "المصحة",
    title: "تقديم",
    paragraphs: [
      "مصحة السلام مؤسسة صحية خاصة متعددة الاختصاصات تنشط منذ أكثر من 20 عاماً وتوفر خدمات طبية وجراحية تستجيب لحاجيات حرفائها الكرام.",
      "تقع مصحة السلام في إحدى المناطق الأكثر تأثيراً بمدينة سوسة بالجمهورية التونسية، وقد شهدت عديد التطورات في مختلف المجالات، نذكر خاصة طاقة استيعابها وتجهيزاتها الفنية وتجهيزاتها الثقيلة وكذلك مواردها البشرية.",
      "حالياً، تعد المصحة 105 أسرّة، و8 قاعات عمليات جراحية منها قاعتان ذواتا تدفق هوائي أحادي الاتجاه، وجهاز تصوير بالرنين المغناطيسي، وقاعة قسطرة قلبية، وجهاز لتفتيت الحصى، والعديد من التجهيزات الطبية العلاجية أو التشخيصية كالإطار التجسيمي لخزع أورام المخ والمجهر الجراحي ذي الأداء العالي والحديث الاقتناء ZEISS KINEVO.",
      "إطاراتنا الطبية وشبه الطبية يتمتعون بخبرة ومهارات تمكّنهم من أداء مهامهم ولعب دورهم في أفضل الظروف، مع ضمان الجودة والسلامة العلاجية لحرفائنا الكرام.",
      "نعمل منذ عام 2004 على تحسين جودة وسلامة الرعاية، وفي عام 2009 أنشأت مؤسستنا نظام إدارة الجودة الذي يغطي جميع خدماتها، وتُوّج هذا النظام بالحصول على شهادة ISO 9001 التي تُجدَّد كل ثلاث سنوات. واستمراراً لهذا السعي نحو التميّز، حصلت مؤسستنا أيضاً في عام 2024 على شهادة الاعتماد البلاتيني التي تُجدَّد كل ثلاث سنوات.",
    ],
  },

  en: {
    eyebrow: "The clinic",
    title: "About us",
    paragraphs: [
      "Operating for more than 20 years, our ESSALEM Clinic is a private multidisciplinary health care facility offering medical and surgical services that meet the needs of patients.",
      "Located in one of the most prestigious areas of Sousse, Tunisia, our establishment has experienced a continuous evolution of its hosting capacity, its technical platform and its technical equipment as well as its personnel.",
      "Currently, the ESSALEM clinic has 105 hospital beds, 8 operating rooms including 2 with unidirectional flow, an MRI, a scanner, a cardiac catheterization room, an extracorporeal lithotripsy device and a multitude of advanced equipment for diagnostic or therapeutic purposes such as the MRI stereotactic biopsy frame compatible with brain tumors and the very high performing operating microscope KINEVO ZEISS.",
      "Our staff is highly experienced and competent, allowing us to carry out the tasks and play our role in the best possible conditions, ensuring the quality and safety of the treatments provided to our dear patients.",
      "Since 2004, our Clinic has invested all efforts in a continuous process of improving the quality and safety of care. In 2009, we implemented a total quality management system covering all our departments, which was rewarded by the ISO 9001 certification, renewed every three years. Continuing this pursuit of excellence, the clinic also achieved Platinum-level accreditation in 2024, which is also renewed every three years.",
    ],
  },
};