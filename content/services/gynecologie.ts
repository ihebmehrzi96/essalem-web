import type { Category } from "./types";

export const gynecologie: Category = {
  slug: "gynecologie-obstetrique",
  image: "/images/services/gynecologie-cover.jpg",
  title: {
    fr: "Gynécologie-Obstétrique",
    ar: "أمراض النساء والتوليد",
    en: "Gynaecology & Obstetrics",
  },
  // Pas d'introduction : le site actuel n'en a pas pour ce pôle.
  specialties: [
    {
      slug: "gynecologie",
      image: "/images/services/gynecologie-soins.jpg",
      title: {
        fr: "Gynécologie",
        ar: "طبّ النساء والجهاز التناسلي",
        en: "Gynecology",
      },
      body: {
        fr: "La gynécologie consiste en la prise en charge des pathologies de l'appareil génital féminin ainsi que des affections du sein de la femme, en dehors de la grossesse.\n\nNous disposons d'une équipe de chirurgiens gynécologues dotés d'une expertise reconnue dans la prise en charge de ces pathologies pouvant être en rapport avec une pathologie bénigne (les fibromes ou polypes), une pathologie cancéreuse, une affection utéro-annexielle (kystes ovariens, infections annexielles), un prolapsus, une incontinence urinaire, une infertilité, etc.\n\nLa prise en charge de nos patientes sera personnalisée avec des décisions chirurgicales adaptées à leurs pathologies afin de leur garantir un rétablissement rapide.",
        ar: "طبّ النساء اختصاص يعتني بأمراض الجهاز التناسلي وأمراض الثدي عند المرأة خارج فترات الحمل.\n\nفريقنا الطبي المتكامل سوف يسهر على معالجة جميع الأمراض المتعلّقة بالجهاز التناسلي لدى النساء، سواء كانت أمراضاً حميدة (أورام ليفية، سلائل…) أو أمراضاً سرطانية، أو أمراض الرحم والملحقات (تكيّسات المبيض، التهابات الملحقات)، وكذلك الأمراض الأخرى مثل التدلّي وسلس البول…",
        en: "Gynecology is the treatment of pathologies of the female reproductive system as well as diseases of the female breast, outside pregnancy.\n\nWe have a team of gynecologic surgeons with recognized expertise in the treatment of such pathologies that may be related to benign pathology (fibroids or polyps), cancerous pathology, utero-adnexal conditions (ovarian cysts, adnexal infections), prolapse, urinary incontinence, infertility, etc.\n\nThe care of our patients will be personalized with surgical decisions adapted to their conditions in order to guarantee a quick recovery.",
      },
    },
    {
      slug: "obstetrique",
      image: "/images/services/obstetrique.jpg",
      title: {
        fr: "Obstétrique",
        ar: "طبّ التوليد",
        en: "Obstetrics",
      },
      body: {
        fr: "L'obstétrique est la spécialité médico-chirurgicale relative à la prise en charge des femmes pendant la grossesse et pendant l'accouchement.\n\nNous disposons d'une maternité leader dans la région du centre, comportant 3 salles d'accouchement et un bloc opératoire pour césariennes, offrant aux futures mamans des prestations de qualité grâce au concours de médecins gynécologues accoucheurs de renom et grâce à nos sages-femmes et infirmières expérimentées.\n\nVotre nouveau-né sera pris en charge dès sa naissance par une équipe médicale et paramédicale qualifiée, et notre service de néonatologie, jouxtant les salles d'accouchement, dispose de couveuses pour la prise en charge des nouveau-nés souffrants.",
        // ⚠ Traduction arabe absente du site actuel : à faire relire par la direction.
        ar: "طبّ التوليد اختصاص طبّي جراحي يعتني بالنساء أثناء الحمل وأثناء الولادة.\n\nتتوفّر مصحتنا على قسم توليد رائد في منطقة الوسط، يضمّ 3 قاعات ولادة وقاعة عمليات للولادات القيصرية، ويقدّم للأمّهات المنتظرات خدمات عالية الجودة بفضل أطباء أمراض النساء والتوليد المشهود لهم بالكفاءة، وقابلاتنا وممرّضاتنا ذوات الخبرة.\n\nيتمّ التكفّل بمولودكم الجديد منذ ولادته من قبل فريق طبي وشبه طبي مؤهّل، ويتوفّر قسم حديثي الولادة المجاور لقاعات الولادة على حاضنات للتكفّل بالمواليد الجدد المتعبين.",
        en: "Obstetrics is the medical-surgical specialty related to the care of women during pregnancy and childbirth.\n\nWe have a leading maternity hospital in the central region, with 3 delivery rooms and an operating room for C-sections, offering future mothers high-quality services thanks to the assistance of reputable gynecologists, midwives and experienced nurses.\n\nFrom the moment of birth, your newborn baby will be cared for by a qualified medical and paramedical team. Our neonatology department next to the delivery rooms has incubators for the care of suffering newborns.",
      },
    },
  ],
};