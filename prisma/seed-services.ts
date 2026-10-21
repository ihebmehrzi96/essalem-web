import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const data = [
  {
    slug: "specialites-chirurgicales",
    order: 1,
    titles: {
      fr: "Spécialités chirurgicales",
      ar: "الاختصاصات الجراحية",
      en: "Surgical specialties",
    },
    intros: {
      fr: "La clinique Essalem propose une grande variété de services au niveau du pôle chirurgical.",
      ar: "تقدّم مصحة السلام مجموعة متنوّعة من الخدمات في قطبها الجراحي.",
      en: "Clinique Essalem offers a wide variety of services within its surgical department.",
    },
    specialties: [
      { slug: "chirurgie-cardiaque", fr: "Chirurgie cardiaque", ar: "جراحة القلب", en: "Cardiac surgery" },
      { slug: "chirurgie-vasculaire", fr: "Chirurgie vasculaire", ar: "جراحة الشرايين", en: "Vascular surgery" },
      { slug: "chirurgie-thoracique", fr: "Chirurgie thoracique", ar: "جراحة الصدر", en: "Thoracic surgery" },
      { slug: "chirurgie-neurologique", fr: "Chirurgie neurologique", ar: "جراحة الأعصاب", en: "Neurosurgery" },
      { slug: "chirurgie-orthopedique", fr: "Chirurgie orthopédique et traumatologique", ar: "جراحة العظام والمفاصل", en: "Orthopaedic and trauma surgery" },
      { slug: "chirurgie-urologique", fr: "Chirurgie urologique", ar: "جراحة المسالك البولية", en: "Urological surgery" },
      { slug: "chirurgie-digestive", fr: "Chirurgie digestive", ar: "جراحة الجهاز الهضمي", en: "Digestive surgery" },
      { slug: "chirurgie-esthetique", fr: "Chirurgie esthétique", ar: "جراحة التجميل", en: "Aesthetic surgery" },
      { slug: "chirurgie-maxillo-faciale", fr: "Chirurgie maxillo-faciale", ar: "جراحة الفكّ والوجه", en: "Maxillofacial surgery" },
      { slug: "chirurgie-obesite", fr: "Chirurgie de l'obésité (bariatrique)", ar: "جراحة السمنة", en: "Bariatric surgery" },
    ],
  },
  {
    slug: "specialites-medicales",
    order: 2,
    titles: {
      fr: "Spécialités médicales",
      ar: "الاختصاصات الطبية",
      en: "Medical specialties",
    },
    intros: {
      fr: "[INTRO À REPRENDRE DU SITE ACTUEL]",
      ar: "[نص يُستكمل]",
      en: "[TEXT TO BE ADDED]",
    },
    specialties: [],
  },
  {
    slug: "gynecologie-obstetrique",
    order: 3,
    titles: {
      fr: "Gynécologie-Obstétrique",
      ar: "أمراض النساء والتوليد",
      en: "Gynaecology & Obstetrics",
    },
    intros: { fr: "[INTRO]", ar: "[نص]", en: "[TEXT]" },
    specialties: [],
  },
  {
    slug: "plateau-technique",
    order: 4,
    titles: {
      fr: "Plateau technique",
      ar: "المنصة التقنية",
      en: "Technical platform",
    },
    intros: { fr: "[INTRO]", ar: "[نص]", en: "[TEXT]" },
    specialties: [],
  },
  {
    slug: "urgences",
    order: 5,
    titles: {
      fr: "Service des urgences",
      ar: "قسم الاستعجالي",
      en: "Emergency department",
    },
    intros: { fr: "[INTRO]", ar: "[نص]", en: "[TEXT]" },
    specialties: [],
  },
];

async function main() {
  for (const cat of data) {
    const category = await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: { order: cat.order },
      create: { slug: cat.slug, order: cat.order },
    });

    for (const locale of ["fr", "ar", "en"] as const) {
      await prisma.serviceCategoryTranslation.upsert({
        where: { categoryId_locale: { categoryId: category.id, locale } },
        update: { title: cat.titles[locale], intro: cat.intros[locale] },
        create: {
          categoryId: category.id,
          locale,
          title: cat.titles[locale],
          intro: cat.intros[locale],
        },
      });
    }

    for (const [i, spec] of cat.specialties.entries()) {
      const specialty = await prisma.specialty.upsert({
        where: { categoryId_slug: { categoryId: category.id, slug: spec.slug } },
        update: { order: i + 1 },
        create: { categoryId: category.id, slug: spec.slug, order: i + 1 },
      });

      for (const locale of ["fr", "ar", "en"] as const) {
        await prisma.specialtyTranslation.upsert({
          where: {
            specialtyId_locale: { specialtyId: specialty.id, locale },
          },
          update: { title: spec[locale] },
          create: { specialtyId: specialty.id, locale, title: spec[locale] },
        });
      }
    }

    console.log(`${cat.slug} : ${cat.specialties.length} spécialités`);
  }
}

main().finally(() => prisma.$disconnect());