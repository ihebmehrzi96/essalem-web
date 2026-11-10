/** Contenu de la page « Contact », repris du site actuel. */

export type Locale = "fr" | "ar" | "en";

export type ContactContent = {
  eyebrow: string;
  title: string;
  intro: string;

  form: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    sending: string;
    required: string;
    successTitle: string;
    successBody: string;
    errorRequired: string;
    errorEmail: string;
  };

  aside: {
    contact: string;
    address: string;
    addressLines: [string, string, string];
    social: string;
  };
};

export const contact: Record<Locale, ContactContent> = {
  fr: {
    eyebrow: "Nous écrire",
    title: "Contact",
    intro:
      "Si vous souhaitez obtenir de plus amples informations, veuillez nous contacter en remplissant le formulaire suivant. Nous nous engageons à vous répondre dans les plus brefs délais.",
    form: {
      name: "Votre nom",
      email: "E-mail",
      subject: "Sujet",
      message: "Message",
      submit: "Envoyer message",
      sending: "Envoi en cours…",
      required: "obligatoire",
      successTitle: "Message envoyé",
      successBody:
        "Nous avons bien reçu votre message et nous nous engageons à vous répondre dans les plus brefs délais.",
      errorRequired: "Nom, e-mail et message sont obligatoires.",
      errorEmail: "Adresse e-mail invalide.",
    },
    aside: {
      contact: "Contact",
      address: "Clinique Essalem",
      addressLines: ["Place du Maghreb Arabe", "4000, Sousse", "Tunisie"],
      social: "Social",
    },
  },

  ar: {
    eyebrow: "راسلنا",
    title: "اتصل بنا",
    intro:
      "إذا كنتم ترغبون في الحصول على مزيد من المعلومات، يرجى الاتصال بنا عن طريق ملء النموذج التالي. نحن ملتزمون بالردّ عليكم في أقرب الآجال.",
    form: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      submit: "إرسال الرسالة",
      sending: "جارٍ الإرسال…",
      required: "إجباري",
      successTitle: "تم إرسال رسالتك",
      successBody:
        "لقد تلقّينا رسالتكم ونلتزم بالردّ عليها في أقرب وقت ممكن.",
      errorRequired: "الاسم والبريد الإلكتروني والرسالة حقول إجبارية.",
      errorEmail: "عنوان بريد إلكتروني غير صالح.",
    },
    aside: {
      contact: "اتصل بنا",
      address: "مصحة السلام",
      addressLines: ["ساحة المغرب العربي", "4000، سوسة", "تونس"],
      social: "تابعنا",
    },
  },

  en: {
    eyebrow: "Write to us",
    title: "Contact us",
    intro:
      "If you would like further information, please contact us by filling out the form below. We are committed to replying as soon as possible.",
    form: {
      name: "Your name",
      email: "E-mail",
      subject: "Subject",
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      required: "required",
      successTitle: "Message sent",
      successBody:
        "We have received your message and will get back to you as soon as possible.",
      errorRequired: "Name, e-mail and message are required.",
      errorEmail: "Invalid e-mail address.",
    },
    aside: {
      contact: "Contact",
      address: "Clinique Essalem",
      addressLines: ["Place du Maghreb Arabe", "4000, Sousse", "Tunisia"],
      social: "Social",
    },
  },
};
