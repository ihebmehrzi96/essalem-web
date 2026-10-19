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
    social: string;
  };
};

export const contact: Record<Locale, ContactContent> = {
  fr: {
    eyebrow: "Nous écrire",
    title: "Contact",
    intro:
      "Si vous souhaitez obtenir d'amples informations, veuillez nous contacter en remplissant le formulaire suivant. Nous nous engageons à vous répondre dans les plus brefs délais.",
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
      social: "Social",
    },
  },

  ar: {
    eyebrow: "راسلنا",
    title: "اتصل بنا",
    intro:
      "إذا كنت ترغب في مزيد من المعلومات، يرجى الاتصال بنا عن طريق ملء النموذج التالي. نحن ملتزمون بالإجابة في أقرب وقت ممكن.",
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
      social: "تابعنا",
    },
  },

  en: {
    eyebrow: "Write to us",
    title: "Contact us",
    intro:
      "If you would like more information, please contact us by filling out this form. We promise to contact you as soon as possible.",
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
      social: "Social",
    },
  },
};