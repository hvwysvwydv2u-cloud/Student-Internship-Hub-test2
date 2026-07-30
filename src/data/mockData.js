export const factories = [
  {
    id: 1,
    name: "مصنع النيل للصناعات",
    hours: 120,
    location: "القاهرة",
    department: "هندسة ميكانيكية",
    matchScore: 95,
    description: "رائد في مجال التصنيع الميكانيكي وتطوير الآلات الثقيلة.",
    contact: "02-23456789",
    departments: ["ميكانيكا", "إنتاج", "تصميم"]
  },
  {
    id: 2,
    name: "مصنع الدلتا للكيماويات",
    hours: 160,
    location: "الإسكندرية",
    department: "هندسة كيميائية",
    matchScore: 87,
    description: "متخصص في إنتاج المواد الكيميائية والأسمدة الصناعية.",
    contact: "03-45678912",
    departments: ["كيمياء", "تحليل مخبري", "جودة"]
  },
  {
    id: 3,
    name: "مصنع القاهرة للهندسة",
    hours: 200,
    location: "الجيزة",
    department: "هندسة كهربائية",
    matchScore: 73,
    description: "تصميم وتصنيع اللوحات الكهربائية والأنظمة الذكية.",
    contact: "02-98765432",
    departments: ["كهرباء", "تحكم", "إلكترونيات"]
  },
  {
    id: 4,
    name: "مصنع الإسكندرية للبلاستيك",
    hours: 240,
    location: "الإسكندرية",
    department: "هندسة مواد",
    matchScore: 65,
    description: "أحدث تقنيات حقن وتشكيل البلاستيك للمنتجات الطبية.",
    contact: "03-76543210",
    departments: ["مواد", "بوليمرات", "تصنيع"]
  },
  {
    id: 5,
    name: "مصنع سيناء للمعادن",
    hours: 180,
    location: "شمال سيناء",
    department: "هندسة تعدين",
    matchScore: 50,
    description: "استخراج ومعالجة المعادن الخام بأحدث الوسائل التكنولوجية.",
    contact: "068-1234567",
    departments: ["تعدين", "جيولوجيا", "استكشاف"]
  },
  {
    id: 6,
    name: "مصنع الصعيد للغذائيات",
    hours: 150,
    location: "أسيوط",
    department: "هندسة غذائية",
    matchScore: 92,
    description: "تصنيع وتعبئة المواد الغذائية وفقاً للمعايير العالمية.",
    contact: "088-2345678",
    departments: ["غذائية", "جودة", "تغليف"]
  }
];

export const housing = [
  {
    id: 1,
    name: "سكن النيل",
    location: "المنيل، القاهرة",
    price: "800 ج/شهر",
    contact: "01001234567",
    isComingSoon: false
  },
  {
    id: 2,
    name: "سكن الطلاب المركزي",
    location: "مدينة نصر",
    price: "650 ج/شهر",
    contact: "01112345678",
    isComingSoon: false
  },
  {
    id: 3,
    name: "بيت الهندسة",
    location: "الدقي، الجيزة",
    price: "750 ج/شهر",
    contact: "01223456789",
    isComingSoon: false
  },
  {
    id: 4,
    name: "سكن المستقبل",
    location: "6 أكتوبر",
    price: "---",
    contact: "---",
    isComingSoon: true
  },
  {
    id: 5,
    name: "مجمع النخبة",
    location: "العاصمة الإدارية",
    price: "---",
    contact: "---",
    isComingSoon: true
  }
];

export const governorates = [
  "القاهرة", "الإسكندرية", "الجيزة", "القليوبية", "الدقهلية", "المنوفية", 
  "الشرقية", "الغربية", "البحيرة", "دمياط", "بورسعيد", "الإسماعيلية", 
  "السويس", "كفر الشيخ", "الفيوم", "بني سويف", "المنيا", "أسيوط", 
  "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد", 
  "مطروح", "شمال سيناء", "جنوب سيناء"
];
