
import type { Category } from "./types";

export const plateauTechnique: Category = {
  slug: "plateau-technique",
  image: "/images/services/plateau-technique-cover.jpg",

  title: {
    fr: "Plateau technique",
    ar: "التجهيزات الطبية والتقنية",
    en: "Technical Facilities",
  },

  intro: {
    fr: "Découvrez les équipements et les unités techniques de la Clinique Essalem, dédiés au diagnostic, aux explorations médicales et aux traitements spécialisés.",
    ar: "اكتشفوا التجهيزات والوحدات التقنية في مصحة السلام، المخصصة للتشخيص والفحوصات الطبية والعلاجات المتخصصة.",
    en: "Discover Clinique Essalem's medical equipment and technical units dedicated to diagnosis, medical investigations, and specialized treatments.",
  },

  specialties: [
    {
      slug: "oxygenotherapie-hyperbare",
      image: "/images/services/oxygenotherapie-hyperbare.jpg",

      title: {
        fr: "Oxygénothérapie hyperbare",
        ar: "العلاج بالأكسجين عالي الضغط",
        en: "Hyperbaric Oxygen Therapy",
      },

      body: {
        fr: `Notre unité dispose d'un caisson hyperbare monoplace à moyenne pression. Le traitement se déroule dans un caisson pressurisé à 1,4 bar, où le patient respire de l'oxygène pur à une pression supérieure à la pression atmosphérique normale.

Cette technique vise notamment à favoriser l'oxygénation des tissus et peut être envisagée dans certaines situations médicales, après évaluation par un médecin.

Une consultation médicale préalable est nécessaire afin de déterminer si ce traitement est adapté au patient.`,

        ar: `تتوفر المصحة على جهاز للعلاج بالأكسجين عالي الضغط مخصص لمريض واحد. يتم العلاج داخل حجرة مضغوطة بضغط يصل إلى 1.4 بار، حيث يتنفس المريض أكسجينًا نقيًا تحت ضغط أعلى من الضغط الجوي العادي.

تهدف هذه التقنية إلى تحسين وصول الأكسجين إلى الأنسجة، ويمكن استعمالها في حالات طبية معينة بعد تقييم الطبيب.

يجب إجراء استشارة طبية مسبقة لتحديد مدى ملاءمة العلاج للمريض.`,

        en: `Our unit is equipped with a single-person, medium-pressure hyperbaric chamber. The treatment takes place in a pressurized chamber at 1.4 bar, where the patient breathes pure oxygen at a pressure higher than normal atmospheric pressure.

This technique aims to improve oxygen delivery to tissues and may be considered in certain medical situations following a doctor's assessment.

A prior medical consultation is required to determine whether the treatment is suitable for the patient.`,
      },
    },

    {
      slug: "bloc-operatoire-sterilisation",
      image: "/images/services/bloc-operatoire.jpg",

      title: {
        fr: "Bloc opératoire et stérilisation",
        ar: "غرف العمليات ووحدة التعقيم",
        en: "Operating Rooms and Sterilization",
      },

      body: {
        fr: `Notre bloc opératoire pluridisciplinaire comprend huit salles opératoires, dont deux salles ISO 5 à flux unidirectionnel, ainsi que deux salles de surveillance post-interventionnelle.

Une unité centrale de stérilisation attenante au bloc assure la collecte, le lavage, le conditionnement et la stérilisation des instruments médicaux, avant leur stockage. Le suivi des cycles de stérilisation et de l'utilisation des instruments est assuré par une application informatique.`,

        ar: `يضم قسم العمليات متعدد الاختصاصات ثماني غرف عمليات، من بينها غرفتان بمعيار ISO 5 وتدفق هواء أحادي الاتجاه، بالإضافة إلى غرفتين لمراقبة المرضى بعد التدخل الجراحي.

وتوجد وحدة مركزية للتعقيم بجانب غرف العمليات، تتولى جمع الأدوات الطبية وغسلها وتجهيزها وتعقيمها قبل تخزينها. كما تتم متابعة دورات التعقيم واستعمال الأدوات بواسطة نظام معلوماتي.`,

        en: `Our multidisciplinary operating department includes eight operating rooms, including two ISO 5 rooms with unidirectional airflow, as well as two post-operative recovery rooms.

A central sterilization unit next to the operating department handles the collection, washing, packaging, and sterilization of medical instruments before storage. Sterilization cycles and instrument usage are tracked through a computerized system.`,
      },
    },

    {
      slug: "catheterisme-cardiaque",
      image: "/images/services/catheterisme-cardiaque-essalem-1.png",

      title: {
        fr: "Salle de cathétérisme cardiaque",
        ar: "قاعة قسطرة القلب",
        en: "Cardiac Catheterization Unit",
      },

      body: {
        fr: `Notre établissement dispose d'une salle de cathétérisme cardiaque équipée pour l'exploration du cœur et des artères coronaires.

Les examens permettent notamment d'étudier les pressions dans les cavités cardiaques, le fonctionnement du cœur et l'état des artères coronaires. La coronarographie utilise un produit de contraste pour repérer d'éventuelles obstructions ou rétrécissements.

Les actes réalisés peuvent comprendre l'angioplastie coronaire avec pose de stents, le traitement de certaines occlusions coronaires, la prise en charge de lésions calcifiées, certains traitements par radiofréquence et la pose de pacemakers, selon l'indication médicale.`,

        ar: `تتوفر المصحة على قاعة لقسطرة القلب مجهزة لاستكشاف القلب والشرايين التاجية.

تساعد الفحوصات على دراسة الضغط داخل حجرات القلب ووظيفته وحالة الشرايين التاجية. ويُستخدم في تصوير الشرايين التاجية منتج تباين للكشف عن الانسدادات أو التضيق المحتمل.

يمكن أن تشمل الإجراءات توسيع الشرايين التاجية وتركيب الدعامات، وعلاج بعض الانسدادات والآفات المتكلسة، وبعض علاجات اضطرابات النظم بالترددات الراديوية، وتركيب أجهزة تنظيم ضربات القلب، حسب الحالة الطبية.`,

        en: `Our clinic has a cardiac catheterization unit equipped to investigate the heart and coronary arteries.

These examinations help assess pressures within the heart chambers, cardiac function, and the condition of the coronary arteries. Coronary angiography uses a contrast agent to identify possible blockages or narrowing.

Procedures may include coronary angioplasty with stent placement, treatment of certain coronary occlusions and calcified lesions, selected radiofrequency treatments for rhythm disorders, and pacemaker implantation, depending on the medical indication.`,
      },
    },

    {
      slug: "lithotripsie-extracorporelle",
      image: "/images/services/lithotripsie.jpg",

      title: {
        fr: "Lithotripsie extracorporelle",
        ar: "تفتيت الحصى خارج الجسم",
        en: "Extracorporeal Lithotripsy",
      },

      body: {
        fr: `Notre installation de lithotripsie extracorporelle permet de réaliser des séances visant à fragmenter certains calculs des voies urinaires supérieures afin de faciliter leur élimination naturelle par les voies urinaires.

Après la séance, le patient doit suivre les recommandations médicales, notamment concernant l'hydratation, selon sa situation clinique.`,

        ar: `تتيح تجهيزات تفتيت الحصى خارج الجسم إجراء جلسات تهدف إلى تكسير بعض حصوات المسالك البولية العلوية لتسهيل خروجها طبيعيًا عبر الجهاز البولي.

بعد الجلسة، ينبغي للمريض اتباع تعليمات الطبيب، بما في ذلك التوصيات المتعلقة بشرب الماء وفقًا لحالته الصحية.`,

        en: `Our extracorporeal lithotripsy equipment is used in sessions designed to fragment certain stones in the upper urinary tract, helping them pass naturally through the urinary system.

After the procedure, patients should follow their doctor's recommendations, including hydration advice appropriate to their clinical situation.`,
      },
    },

    {
      slug: "epreuve-effort",
      image: "/images/services/epreuve-effort.jpg",

      title: {
        fr: "Salle d'épreuve d'effort",
        ar: "قاعة اختبار الجهد القلبي",
        en: "Cardiac Stress Testing Room",
      },

      body: {
        fr: `Notre salle d'épreuve d'effort permet d'enregistrer l'activité électrique du cœur pendant un exercice physique contrôlé.

Cet examen peut être prescrit pour aider au diagnostic, à l'évaluation ou au dépistage de certains problèmes cardiovasculaires, notamment en cas de suspicion de trouble du rythme ou de rétrécissement des artères coronaires.

L'examen dure environ vingt minutes. Le patient doit suivre les consignes communiquées par l'équipe médicale. Il est accompagné par un cardiologue et une infirmière pendant l'épreuve.`,

        ar: `تُجرى في قاعة اختبار الجهد فحوصات لتسجيل النشاط الكهربائي للقلب أثناء ممارسة مجهود بدني مراقب.

قد يطلب الطبيب هذا الفحص للمساعدة على تشخيص بعض أمراض القلب والأوعية الدموية أو تقييمها أو الكشف عنها، خاصة عند الاشتباه في اضطرابات النظم أو تضيق الشرايين التاجية.

تستغرق العملية حوالي عشرين دقيقة. ويجب على المريض اتباع تعليمات الفريق الطبي، مع متابعة طبيب قلب وممرض أثناء الاختبار.`,

        en: `Our cardiac stress testing room is used to record the heart's electrical activity during controlled physical exercise.

The test may be prescribed to help diagnose, assess, or screen for certain cardiovascular conditions, including suspected rhythm disorders or narrowing of the coronary arteries.

The examination takes approximately twenty minutes. Patients should follow the medical team's instructions and are supervised by a cardiologist and a nurse throughout the test.`,
      },
    },

    {
      slug: "irm",
      image: "/images/services/irm.jpg",

      title: {
        fr: "Unité IRM",
        ar: "وحدة التصوير بالرنين المغناطيسي",
        en: "MRI Unit",
      },

      body: {
        fr: `Notre unité d'imagerie par résonance magnétique est équipée d'un appareil IRM à tunnel court, conçu pour améliorer le confort de certains patients et produire des images détaillées des organes et des tissus.

L'IRM peut être utilisée pour explorer notamment le cerveau, la colonne vertébrale, les articulations et les organes abdominaux. Avant l'examen, le patient doit signaler tout implant ou dispositif métallique et retirer les objets métalliques conformément aux instructions de l'équipe.

L'examen dure généralement entre vingt et quarante minutes, selon la zone étudiée et le protocole utilisé.`,

        ar: `تضم وحدة التصوير بالرنين المغناطيسي جهازًا ذا نفق قصير، صُمم لتحسين راحة بعض المرضى وتوفير صور دقيقة للأعضاء والأنسجة.

يمكن استعمال التصوير بالرنين المغناطيسي لفحص الدماغ والعمود الفقري والمفاصل وأعضاء البطن وغيرها. قبل الفحص، يجب إبلاغ الفريق الطبي عن أي زرعات أو أجهزة معدنية، ونزع الأغراض المعدنية وفق التعليمات.

تتراوح مدة الفحص عادة بين عشرين وأربعين دقيقة حسب المنطقة المراد تصويرها وطريقة الفحص.`,

        en: `Our magnetic resonance imaging unit is equipped with a short-bore MRI scanner designed to improve comfort for some patients while producing detailed images of organs and tissues.

MRI can be used to examine areas such as the brain, spine, joints, and abdominal organs. Before the scan, patients must inform the medical team about any implants or metallic devices and remove metal objects as instructed.

The examination generally takes between twenty and forty minutes, depending on the area being examined and the protocol used.`,
      },
    },

    {
      slug: "scanner",
      image: "/images/services/scanner.png",

      title: {
        fr: "Scanner 64 barrettes, 128 coupes",
        ar: "جهاز التصوير المقطعي 64 صفًا و128 مقطعًا",
        en: "64-Row, 128-Slice CT Scanner",
      },

      body: {
        fr: `Notre unité d'imagerie médicale comprend un scanner utilisant les rayons X pour produire des images en coupes du corps humain à des fins diagnostiques.

Cet examen aide à rechercher des anomalies qui ne sont pas toujours visibles à la radiographie standard ou à l'échographie. Selon la zone étudiée et l'indication médicale, une injection de produit de contraste peut être nécessaire.`,

        ar: `تضم وحدة التصوير الطبي جهازًا للتصوير المقطعي يستخدم الأشعة السينية لإنتاج صور مقطعية للجسم بهدف التشخيص.

يساعد هذا الفحص على البحث عن تغيّرات قد لا تظهر بوضوح في الأشعة العادية أو التصوير بالموجات فوق الصوتية. وقد يتطلب الفحص حقن مادة تباين حسب المنطقة المراد تصويرها والتقييم الطبي.`,

        en: `Our medical imaging unit includes a CT scanner that uses X-rays to produce cross-sectional images of the body for diagnostic purposes.

This examination helps identify abnormalities that may not be visible on standard X-rays or ultrasound. Depending on the area being examined and the medical indication, an injection of contrast agent may be required.`,
      },
    },

    {
      slug: "endoscopie-digestive-bronchique",
      image: "/images/services/endoscopie.jpg",

      title: {
        fr: "Endoscopie digestive et bronchique",
        ar: "التنظير الهضمي والشعبي",
        en: "Digestive and Bronchial Endoscopy",
      },

      body: {
        fr: `Notre unité d'endoscopie est équipée de colonnes permettant de réaliser des examens digestifs hauts et bas pour explorer notamment l'œsophage, l'estomac, le duodénum, le rectum et le côlon.

L'unité permet également certaines explorations des voies biliaires et pancréatiques, notamment par écho-endoscopie et par des techniques spécialisées telles que la CPRE. La bronchoscopie permet l'exploration de la trachée et des bronches. L'exploration de la vessie peut aussi être réalisée à l'aide d'un cystoscope souple, selon l'indication médicale.`,

        ar: `تجهزت وحدة التنظير بأجهزة تسمح بإجراء تنظير الجهاز الهضمي العلوي والسفلي لفحص المريء والمعدة والاثني عشر والمستقيم والقولون.

كما تتيح الوحدة إجراء بعض فحوصات القنوات الصفراوية والبنكرياسية، بما في ذلك التنظير بالموجات فوق الصوتية وتقنيات متخصصة مثل CPRE. ويُستخدم تنظير القصبات لفحص القصبة الهوائية والشعب الهوائية. ويمكن كذلك فحص المثانة بواسطة منظار مرن عند الحاجة الطبية.`,

        en: `Our endoscopy unit is equipped with systems for upper and lower digestive endoscopy, allowing examination of areas such as the oesophagus, stomach, duodenum, rectum, and colon.

The unit also supports selected investigations of the bile and pancreatic ducts, including endoscopic ultrasound and specialized techniques such as ERCP. Bronchoscopy is used to examine the trachea and bronchi. Bladder examination may also be performed using a flexible cystoscope when medically indicated.`,
      },
    },

    {
      slug: "chimiotherapie",
      image: "/images/services/chimiotherapie.jpg",

      title: {
        fr: "Unité de chimiothérapie",
        ar: "وحدة العلاج الكيميائي",
        en: "Chemotherapy Unit",
      },

      body: {
        fr: `Notre plateau technique comprend une hotte à flux laminaire destinée à la préparation des protocoles de chimiothérapie.

Cet équipement contribue à protéger le patient, le professionnel qui prépare le traitement et l'environnement. La préparation et l'administration des traitements sont réalisées selon les protocoles applicables et les indications de l'équipe médicale.`,

        ar: `تضم التجهيزات التقنية للمصحة خزانة ذات تدفق هواء صفائحي مخصصة لتحضير بروتوكولات العلاج الكيميائي.

يساهم هذا الجهاز في حماية المريض ومهني الرعاية الصحية الذي يحضّر العلاج والبيئة المحيطة. ويتم تحضير العلاجات وإعطاؤها وفق البروتوكولات المعتمدة وتعليمات الفريق الطبي.`,

        en: `Our technical facilities include a laminar-flow hood intended for the preparation of chemotherapy protocols.

This equipment helps protect the patient, the healthcare professional preparing the treatment, and the surrounding environment. Treatments are prepared and administered according to applicable protocols and the medical team's instructions.`,
      },
    },
  ],
};
