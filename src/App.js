import React, { useState, useRef, useEffect } from "react";
import Plotly from "plotly.js-dist-min";
import "./App.css";

const questions = [
  // ציר X: סמכותני (1) - חירותני (7)
  { text: "המדינה צריכה להתערב פחות בחיי האזרחים", axis: "x", reverse: false },
  {
    text: "חוקים נוקשים הם הדרך הטובה ביותר לשמור על הסדר",
    axis: "x",
    reverse: true,
  },
  {
    text: "אנשים צריכים חופש מוחלט לקבל החלטות בעצמם",
    axis: "x",
    reverse: false,
  },
  { text: "סמכות חזקה חיונית ליציבות חברתית", axis: "x", reverse: true },
  {
    text: "המדינה צריכה להגן על החירות האישית בכל מחיר",
    axis: "x",
    reverse: false,
  },
  { text: "חברה זקוקה למנהיגות תקיפה שתכוון אותה", axis: "x", reverse: true },
  {
    text: "המדינה צריכה פיקוח מינימלי על חיי האזרחים",
    axis: "x",
    reverse: false,
  },
  {
    text: "משמעת וסדר הם ערכים חשובים יותר מחירות אישית",
    axis: "x",
    reverse: true,
  },
  { text: "אנשים לא זקוקים להכוונה מלמעלה", axis: "x", reverse: false },
  { text: "חברה צריכה מסגרת ברורה של כללים והגבלות", axis: "x", reverse: true },

  // ציר Y: שמרנות (1) מול פרוגרסיביות (7)
  { text: "שינויים חברתיים הם בדרך כלל דבר חיובי", axis: "y", reverse: false },
  { text: "המסורת היא המצפן הטוב ביותר לחברה", axis: "y", reverse: true },
  { text: "יש לשמר ערכים מסורתיים בכל מחיר", axis: "y", reverse: true },
  { text: "החברה צריכה להתקדם ולהשתנות כל הזמן", axis: "y", reverse: false },
  { text: "ערכים ישנים לא מתאימים לעולם המודרני", axis: "y", reverse: false },
  { text: "שינויים מהירים מסוכנים לחברה", axis: "y", reverse: true },
  { text: "המסורת מגבילה את ההתפתחות החברתית", axis: "y", reverse: false },
  {
    text: "עדיף לשמור על הקיים מאשר לנסות דברים חדשים",
    axis: "y",
    reverse: true,
  },
  { text: "החברה צריכה להיות יותר פתוחה לשינויים", axis: "y", reverse: false },
  { text: "ערכים מסורתיים הם הבסיס לחברה בריאה", axis: "y", reverse: true },

  // ציר Z: ציניות (1) מול אידאליזם (7)
  {
    text: "אפשר לבנות עולם טוב יותר דרך ערכים ואידאלים",
    axis: "z",
    reverse: false,
  },
  { text: "בני אדם הם אנוכיים מטבעם", axis: "z", reverse: true },
  { text: "רוב האנשים הם טובים בבסיסם", axis: "z", reverse: false },
  { text: "אי אפשר לסמוך על אנשים בלי אינטרס", axis: "z", reverse: true },
  { text: "אידאלים יכולים לשנות את העולם", axis: "z", reverse: false },
  { text: "כל אחד דואג רק לעצמו בסופו של דבר", axis: "z", reverse: true },
  { text: "יש דברים שהם מעבר לאינטרס האישי", axis: "z", reverse: false },
  { text: "אמונה בטוב שבאדם היא נאיבית", axis: "z", reverse: true },
  { text: "שיתוף פעולה עדיף על תחרות", axis: "z", reverse: false },
  { text: "מי שמאמין לכולם בסוף מתאכזב", axis: "z", reverse: true },
];

const ideologies = [
  {
    name: "שמרנות ליברלית",
    icon: "⚖️",
    color: "#4169E1",
    coords: [5, 3, 4],
    desc: "שילוב בין ערכים שמרניים לחירויות אישיות וכלכליות.",
    examples: ["דוד בן-גוריון", "קונרד אדנאואר", "וינסטון צ'רצ'יל"],
    keyFigures: {
      politicians: [
        "דוד בן-גוריון",
        "קונרד אדנאואר",
        "וינסטון צ'רצ'יל",
        "לודוויג ארהרד",
      ],
      thinkers: ["וילהלם רופקה", "ריימון ארון", "קרל פופר", "ישעיהו ברלין"],
    },
    characteristics: [
      "איזון בין מסורת לקדמה",
      "כלכלת שוק חברתית",
      "דמוקרטיה ליברלית",
      "פרגמטיזם מדיני",
      "חירויות אזרח",
      "מדינה מתונה",
    ],
    longDesc: `השמרנות הליברלית משלבת בין ערכים שמרניים מסורתיים לבין עקרונות ליברליים.
    דוגלת בשינוי הדרגתי ומתון, תוך שמירה על מוסדות דמוקרטיים וחירויות אזרח.
    תומכת בכלכלת שוק חברתית, המאזנת בין יעילות כלכלית לצדק חברתי.`,
  },
  {
    name: "שמרנות קלאסית",
    icon: "🏛️",
    color: "#8B4513",
    coords: [3, 2, 5],
    desc: "הדגשת מסורת, זהות לאומית, ערכים יציבים וסמכות מוסרית.",
    examples: [
      "בנימין נתניהו",
      "מרגרט תאצ'ר",
      "רונלד רייגן",
      "אדמונד ברק",
      "זאב ז'בוטינסקי",
    ],
    keyFigures: {
      politicians: [
        "מנחם בגין",
        "מרגרט תאצ'ר",
        "רונלד רייגן",
        "זאב ז'בוטינסקי",
      ],
      thinkers: ["אדמונד ברק", "זאב ז'בוטינסקי", "ראסל קירק", "מיכאל אוקשוט"],
    },
    characteristics: [
      "שמירה על מסורת ומורשת",
      "כלכלת שוק חופשי מפוקחת",
      "חיזוק הזהות הלאומית",
      "ביטחון לאומי חזק",
      "ערכי משפחה מסורתיים",
    ],
    longDesc: `השמרנות הקלאסית דוגלת בשמירה על מסורות ומוסדות חברתיים מבוססים, תוך התנגדות לשינויים מהירים ודרסטיים. 
    הגישה מדגישה את חשיבות הסדר החברתי, המשפחה המסורתית, והזהות הלאומית.
    שמרנים קלאסיים תומכים בשוק חופשי מפוקח, מדינה חזקה בתחומי הביטחון והמשפט, ושמירה על ערכי המסורת.`,
  },
  {
    name: "ליברליזם קלאסי",
    icon: "📜",
    color: "#2B6CB0",
    coords: [6.5, 4, 5],
    desc: "שוק חופשי, ממשל מוגבל, זכויות פרט, חירות אישית.",
    examples: [
      "מילטון פרידמן",
      "פרידריך האייק",
      "אהרן ברק",
      "ג'ון לוק",
      "אדם סמית",
    ],
    keyFigures: {
      politicians: [
        "תומס ג'פרסון",
        "ג'יימס מדיסון",
        "פרידריך נאומן",
        "לודוויג ארהרד",
      ],
      thinkers: [
        "ג'ון לוק",
        "אדם סמית",
        "מילטון פרידמן",
        "פרידריך האייק",
        "אהרן ברק",
      ],
    },
    characteristics: [
      "חירות אישית וכלכלית",
      "זכויות קניין",
      "שלטון החוק",
      "ממשל מוגבל",
      "שוק חופשי",
    ],
    longDesc: `הליברליזם הקלאסי מדגיש את חירות הפרט, זכויות הקניין, והגבלת כוחה של המדינה.
    הגישה תומכת בשוק חופשי עם מינימום התערבות ממשלתית, שלטון החוק, וחירויות אזרח בסיסיות.
    ליברלים קלאסיים מאמינים שחופש כלכלי ואישי הוא המפתח לשגשוג חברתי.`,
  },
  {
    name: "נאציזם",
    icon: "⚠️",
    color: "#222",
    coords: [1, 7, 1],
    desc: "טוטליטריות לאומנית קיצונית, אידאולוגיה של כוח ומאבק, דרוויניזם חברתי.",
    examples: ["אדולף היטלר", "יוזף גבלס", "היינריך הימלר"],
    keyFigures: {
      politicians: ["אדולף היטלר", "יוזף גבלס", "היינריך הימלר"],
      thinkers: ["אלפרד רוזנברג", "קרל שמיט", "יוליוס שטרייכר"],
    },
    characteristics: [
      "טוטליטריות מוחלטת",
      "לאומנות קיצונית",
      "גזענות",
      "אנטישמיות",
      "מיליטריזם",
      "דרוויניזם חברתי",
      "שאיפה לשינוי רדיקלי של העולם",
    ],
    longDesc: `אידיאולוגיה טוטליטרית המבוססת על תפיסת עולם של מאבק בין גזעים וקבוצות.
    דגלה בשינוי רדיקלי של הסדר העולמי תוך שימוש בכוח מוחלט.
    שילבה סמכותנות קיצונית עם תפיסה צינית של יחסי כוח ומאבק נצחי.`,
  },
  {
    name: "קומוניזם",
    icon: "☭",
    color: "#AA0000",
    coords: [1, 7, 7],
    desc: "שוויון כלכלי, ביטול רכוש פרטי, אידאליזם מהפכני.",
    examples: ["קרל מרקס", "ולדימיר לנין", "מאו דזה-דונג"],
    keyFigures: {
      politicians: ["ולדימיר לנין", "לב טרוצקי", "יוסיף סטלין", "מאו דזה-דונג"],
      thinkers: [
        "קרל מרקס",
        "פרידריך אנגלס",
        "רוזה לוקסמבורג",
        "אנטוניו גרמשי",
      ],
    },
    characteristics: [
      "ביטול הקפיטליזם",
      "שוויון כלכלי מוחלט",
      "בעלות ציבורית",
      "מהפכה פרולטרית",
      "אינטרנציונליזם",
      "תכנון מרכזי",
    ],
    longDesc: `אידיאולוגיה השואפת ליצירת חברה שוויונית ללא מעמדות וללא רכוש פרטי.
    דוגלת בבעלות משותפת על אמצעי הייצור ותכנון כלכלי מרכזי.
    מאמינה במהפכה פרולטרית ובביטול הקפיטליזם.`,
  },
  {
    name: "צדק ירוק",
    icon: "🌿",
    color: "#228B22",
    coords: [4, 6, 7],
    desc: "קיימות סביבתית, צדק חברתי, חקיקה סביבתית אידאליסטית.",
    examples: ["הנרי וולאס", "הרברט מוריסון", "פיטר קרופוטקין", "ויליאם מוריס"],
    keyFigures: {
      politicians: ["הנרי וולאס", "הרברט מוריסון", "אולוף פלמה", "וילי ברנדט"],
      thinkers: [
        "ויליאם מוריס",
        "פיטר קרופוטקין",
        "מוריי בוקצ'ין",
        "רודולף רוקר",
      ],
    },
    characteristics: [
      "הגנת הסביבה",
      "צדק אקלימי",
      "זכויות בעלי חיים",
      "כלכלה מעגלית",
      "צדק חברתי",
      'שוויון מגדרי ולהט"בי',
    ],
    longDesc: `אידיאולוגיה המשלבת מודעות סביבתית עם צדק חברתי.
    דוגלת בפעולה דחופה נגד משבר האקלים ושינוי מערכתי בכלכלה.
    מקדמת אנרגיה מתחדשת, כלכלה מעגלית, וצמצום צריכה.`,
  },
  {
    name: "סוציאל-דמוקרטיה",
    icon: "🤝",
    color: "#4682B4",
    coords: [3.5, 5, 6],
    desc: "שילוב בין שוק חופשי לרווחה, מדינת רווחה עם חופש אישי.",
    examples: ["יצחק רבין", "אולף פלמה", "ברלין סקולץ", "ברני סנדרס"],
    keyFigures: {
      politicians: ["אולוף פלמה", "וילי ברנדט", "יצחק רבין", "גולדה מאיר"],
      thinkers: ["אדוארד ברנשטיין", "קרל קאוצקי", "יאיר צבן", "מרדכי נמיר"],
    },
    characteristics: [
      "מדינת רווחה",
      "איזון בין שוק לרווחה",
      "זכויות עובדים",
      "חינוך ובריאות ציבוריים",
      "דמוקרטיה חברתית",
    ],
    longDesc: `גישה המשלבת כלכלת שוק עם מדינת רווחה חזקה.
    תומכת בזכויות עובדים, ביטוח בריאות ממלכתי, וחינוך ציבורי.
    מאמינה באיזון בין צמיחה כלכלית לצדק חברתי.`,
  },
  {
    name: "לאומנות סמכותנית",
    icon: "🏛️",
    color: "#800000",
    coords: [2, 2, 4],
    desc: "פטריוטיות מוקצנת, סדר וסמכות על חשבון חירות הפרט.",
    examples: ["ולדימיר פוטין", "ויקטור אורבן", "רג'פ טאיפ ארדואן"],
    keyFigures: {
      politicians: [
        "פרנסיסקו פרנקו",
        "אנטוניו סלזאר",
        "אוגוסטו פינושה",
        "יואן פרון",
      ],
      thinkers: ["קרל שמיט", "איוון אילין", "ג'ובאני ג'נטילה"],
    },
    characteristics: [
      "שלטון מרכזי חזק",
      "לאומנות",
      "מסורתיות",
      "אנטי-ליברליזם",
      "פופוליזם",
      "הגבלת תקשורת",
    ],
    longDesc: `משטר המדגיש סמכות מרכזית חזקה ולאומיות.
    דוגל בשליטה ממשלתית הדוקה, הגבלת התקשורת, וריכוזיות פוליטית.
    מקדם ערכים מסורתיים ומתנגד להשפעות זרות.`,
  },
  {
    name: "אנרכיזם",
    icon: "⚡",
    color: "#000000",
    coords: [7, 6, 6],
    desc: "ביטול מוחלט של המדינה, חירות מלאה, התארגנות וולונטרית.",
    examples: ["פיוטר קרופוטקין", "אמה גולדמן", "נועם חומסקי", "מיכאיל בקונין"],
    keyFigures: {
      politicians: [
        "פיוטר קרופוטקין",
        "בואנוונטורה דורוטי",
        "לוסי פרסונס",
        "אמה גולדמן",
      ],
      thinkers: [
        "פיוטר קרופוטקין",
        "אמה גולדמן",
        "מיכאיל בקונין",
        "ארקו מאלטסטה",
      ],
    },
    characteristics: [
      "התנגדות לכל צורות השלטון",
      "עזרה הדדית",
      "דמוקרטיה ישירה",
      "ביטול היררכיות",
      "התארגנות וולונטרית",
    ],
    longDesc: `אידיאולוגיה השואפת לביטול כל צורות השלטון והכפייה.
    דוגלת בהתארגנות וולונטרית, עזרה הדדית, ודמוקרטיה ישירה.
    מתנגדת לכל צורה של היררכיה כפויה ושליטה מוסדית.`,
  },
  {
    name: "ליברטריאניזם",
    icon: "🗽",
    color: "#FFD700",
    coords: [7, 4, 3],
    desc: "מינימום התערבות ממשלתית, שוק חופשי, חירויות אישיות.",
    examples: ["רון פול", "איין ראנד", "משה פייגלין", "מילטון פרידמן"],
    keyFigures: {
      politicians: ["רון פול", "משה פייגלין", "גארי ג'ונסון"],
      thinkers: ["איין ראנד", "מוריי רותברד", "רוברט נוזיק", "דיוויד פרידמן"],
    },
    characteristics: [
      "מינימום מדינה",
      "שוק חופשי מוחלט",
      "זכויות קניין מוחלטות",
      "אי-התערבות צבאית",
      "חירות אישית מקסימלית",
    ],
    longDesc: `אידיאולוגיה המקדשת את חירות הפרט וזכות הקניין.
    מתנגדת להתערבות ממשלתית בכלכלה ובחיי הפרט.
    תומכת בשוק חופשי מוחלט ובצמצום דרסטי של המדינה.`,
  },
  {
    name: "ריאליזם שמרני",
    icon: "🎭",
    color: "#4B0082",
    coords: [3, 2, 2],
    desc: "פרגמטיזם מדיני, ספקנות כלפי אידאולוגיות, שמירת המסורת.",
    examples: ["הנרי קיסינג'ר", "אריאל שרון", "אנגלה מרקל", "אוטו פון ביסמרק"],
    keyFigures: {
      politicians: [
        "הנרי קיסינג'ר",
        "אריאל שרון",
        "אנגלה מרקל",
        "אוטו פון ביסמרק",
      ],
      thinkers: ["האנס מורגנטאו", "ריינהולד ניבור", "ג'ורג' קנאן"],
    },
    characteristics: [
      "פרגמטיזם מדיני",
      "ריאל-פוליטיק",
      "איזון כוחות",
      "אינטרסים לאומיים",
      "ספקנות כלפי אידאולוגיות",
    ],
    longDesc: `גישה פרגמטית המדגישה ריאל-פוליטיק ויציבות.
    מעדיפה פתרונות מעשיים על פני אידאולוגיה טהורה.
    תומכת בשינויים הדרגתיים ובשמירה על יציבות מדינית.`,
  },
  {
    name: "שמאל פרוגרסיבי",
    icon: "🌈",
    color: "#FF69B4",
    coords: [4, 7, 6],
    desc: "זכויות מיעוטים, פמיניזם, צדק חברתי ואקלימי.",
    examples: ["ברני סנדרס", "אלכסנדריה אוקסיו-קורטז", "תמר זנדברג"],
    keyFigures: {
      politicians: [
        "ברני סנדרס",
        "אלכסנדריה אוקסיו-קורטז",
        "תמר זנדברג",
        "ג'רמי קורבין",
      ],
      thinkers: ["בל הוקס", "ג'ודית באטלר", "נעמי קליין", "סלבוי ז'יז'ק"],
    },
    characteristics: [
      "צדק חברתי",
      "פמיניזם",
      'זכויות להט"ב',
      "רב-תרבותיות",
      "צדק אקלימי",
      "זכויות מיעוטים",
    ],
    longDesc: `תנועה המקדמת שינוי חברתי מתקדם, שוויון זכויות, וצדק חברתי.
    דוגלת בהגנה על זכויות מיעוטים, פמיניזם, והגנת הסביבה.
    תומכת במדינת רווחה חזקה ורגולציה על תאגידים.`,
  },
];

const getScoreText = (score, axis) => {
  if (axis === "x") {
    if (score >= 6) return "חירותני מובהק";
    if (score >= 5) return "חירותני";
    if (score > 3 && score < 5) return "נייטרלי";
    if (score <= 3) return "סמכותני";
    if (score <= 2) return "סמכותני מובהק";
  }
  if (axis === "y") {
    if (score <= 2) return "שמרן מובהק";
    if (score <= 3) return "שמרן";
    if (score > 3 && score < 5) return "נייטרלי";
    if (score >= 5) return "פרוגרסיבי";
    return "פרוגרסיבי מובהק";
  }
  if (axis === "z") {
    if (score <= 2) return "ציניקן מובהק";
    if (score <= 3) return "ציניקן";
    if (score > 3 && score < 5) return "נייטרלי";
    if (score >= 5) return "אידאליסט";
    return "אידאליסט מובהק";
  }
};

const getAIAnalysis = (scores, answers) => {
  const { x, y, z } = scores;

  // מציאת האידאולוגיה הקרובה ביותר
  const distance = (a, b) =>
    Math.sqrt(
      Math.pow(a.x - b[0], 2) +
        Math.pow(a.y - b[1], 2) +
        Math.pow(a.z - b[2], 2)
    );

  const closestIdeology = ideologies.reduce(
    (prev, curr) => {
      const d = distance(scores, curr.coords);
      return d < prev.dist ? { ideology: curr, dist: d } : prev;
    },
    { ideology: null, dist: Infinity }
  ).ideology;

  // ניתוח מגמות בתשובות
  const trends = {
    authority:
      answers
        .filter((a, i) => questions[i].axis === "x")
        .reduce((acc, val) => acc + val, 0) / 10,
    progress:
      answers
        .filter((a, i) => questions[i].axis === "y")
        .reduce((acc, val) => acc + val, 0) / 10,
    idealism:
      answers
        .filter((a, i) => questions[i].axis === "z")
        .reduce((acc, val) => acc + val, 0) / 10,
  };

  // זיהוי סתירות וקונפליקטים
  const contradictions = [];
  if (Math.abs(x - trends.authority) > 2) {
    contradictions.push(
      "יש לך תשובות מעורבות בנושא סמכות וחירות, מה שמראה על חשיבה מורכבת בנושאי ממשל וחופש אישי"
    );
  }
  if (Math.abs(y - trends.progress) > 2) {
    contradictions.push(
      "התשובות שלך מראות מורכבות בין שמרנות לפרוגרסיביות, המשקפת הבנה של הצורך באיזון בין שינוי ליציבות"
    );
  }
  if (Math.abs(z - trends.idealism) > 2) {
    contradictions.push(
      "יש מתח מעניין בין הציניות והאידאליזם בתפיסת עולמך, המצביע על יכולת לראות את המציאות במורכבותה"
    );
  }

  // מציאת נושאים חזקים
  const strongBeliefs = [];
  answers.forEach((answer, i) => {
    if (answer === 1 || answer === 7) {
      strongBeliefs.push(questions[i].text);
    }
  });

  // המלצות קריאה מותאמות אישית
  const readingRecommendations = [];

  if (x <= 3) {
    readingRecommendations.push("'על החירות' מאת ג'ון סטיוארט מיל");
    readingRecommendations.push("'אנרכיזם ומאמרים אחרים' מאת אמה גולדמן");
  } else if (x >= 5) {
    readingRecommendations.push("'הנסיך' מאת מקיאוולי");
    readingRecommendations.push("'לוויתן' מאת תומס הובס");
  }

  if (y <= 3) {
    readingRecommendations.push("'מסורת ומשבר' מאת יעקב כ\"ץ");
    readingRecommendations.push("'שמרנות' מאת רוג'ר סקרוטון");
  } else if (y >= 5) {
    readingRecommendations.push("'צדק כהוגנות' מאת ג'ון רולס");
    readingRecommendations.push("'הקפיטל' מאת קרל מרקס");
  }

  if (z <= 3) {
    readingRecommendations.push("'הנסיך' מאת מקיאוולי");
    readingRecommendations.push("'ריאליזם פוליטי' מאת הנס מורגנטאו");
  } else if (z >= 5) {
    readingRecommendations.push("'אוטופיה' מאת תומס מור");
    readingRecommendations.push("'חזון אחרית הימים' מאת ישעיהו ברלין");
  }

  // ניתוח מעמיק
  let analysis = `ניתוח מעמיק של תשובותיך מגלה תמונה מרתקת:

1. נטיות עיקריות:
${
  x < 4
    ? "• אתה נוטה לתמוך במבנים סמכותניים ובסדר חברתי מוגדר, מה שמשקף הבנה של חשיבות המסגרת החברתית"
    : "• אתה מעדיף חירות אישית ואוטונומיה, עם דגש על זכויות הפרט וצמצום התערבות חיצונית"
}
${
  y < 4
    ? "• יש לך נטייה לשמור על המסורת והמוכר, עם הערכה לניסיון העבר ולחכמת הדורות"
    : "• אתה פתוח לשינויים ורעיונות חדשים, עם אמונה בקדמה ובשיפור מתמיד"
}
${
  z < 4
    ? "• גישתך פרגמטית וספקנית, המאפשרת ניתוח מפוכח של המציאות"
    : "• יש לך אמונה חזקה באידאלים ובשינוי חיובי, המניעה לפעולה ושיפור"
}

2. מורכבויות וניואנסים:
${contradictions.map((c) => "• " + c).join("\n")}

3. עמדות חזקות במיוחד:
${
  strongBeliefs.length > 0
    ? strongBeliefs.map((b) => "• " + b).join("\n")
    : "• לא נמצאו עמדות קיצוניות במיוחד, מה שמעיד על גישה מאוזנת"
}

4. קרבה לאידאולוגיות קיימות:
• האידאולוגיה הקרובה ביותר אליך היא ${closestIdeology.name}
• ${closestIdeology.desc}
• דמויות מפתח שכדאי להכיר: ${closestIdeology.keyFigures.thinkers
    .slice(0, 2)
    .join(", ")}

5. המלצות קריאה מותאמות אישית:
${readingRecommendations.map((r) => "• " + r).join("\n")}

6. כיווני התפתחות מומלצים:
• ${
    x < 4
      ? "חקור רעיונות של חירות אישית וביזור כוח דרך הגותם של הוגים ליברטריאנים"
      : "העמק בהבנת התפקיד החיובי של מוסדות וסמכות בחברה"
  }
• ${
    y < 4
      ? "הרחב אופקים דרך היכרות עם רעיונות חדשניים ופורצי דרך בתחומי חברה ותרבות"
      : "למד להעריך את ערך המסורת והיציבות דרך לימוד היסטוריה ומחשבה שמרנית"
  }
• ${
    z < 4
      ? "חפש השראה באידאלים ובחזונות חיוביים של מתקני עולם לאורך ההיסטוריה"
      : "פתח חשיבה ביקורתית ופרגמטית דרך לימוד מדע המדינה והיסטוריה"
  }

7. סיכום:
תפיסת עולמך משלבת אלמנטים מעניינים של ${getScoreText(x, "x")}, ${getScoreText(
    y,
    "y"
  )}, ו${getScoreText(z, "z")}.
זוהי תפיסה ${
    contradictions.length > 1
      ? "מורכבת ורב-ממדית המשקפת הבנה עמוקה של מורכבות החיים החברתיים"
      : "עקבית וברורה המעידה על משנה סדורה"
  }.`;

  return { analysis, closestIdeology };
};

const IdeologyModal = ({ ideology, onClose }) => (
  <div className="ideology-modal-overlay" onClick={onClose}>
    <div className="ideology-modal" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <h3 style={{ color: ideology.color }}>
        {ideology.icon} {ideology.name}
      </h3>
      <p className="ideology-long-desc">{ideology.longDesc}</p>

      <div className="ideology-characteristics">
        <h4>מאפיינים עיקריים:</h4>
        <ul className="characteristics-list">
          {ideology.characteristics.map((char, i) => (
            <li key={i}>{char}</li>
          ))}
        </ul>
      </div>

      <div className="ideology-key-figures">
        <h4>דמויות מפתח:</h4>
        <div className="key-figures-section">
          <h5>פוליטיקאים:</h5>
          <ul>
            {ideology.keyFigures.politicians.map((figure, i) => (
              <li key={i}>{figure}</li>
            ))}
          </ul>
        </div>
        <div className="key-figures-section">
          <h5>הוגי דעות:</h5>
          <ul>
            {ideology.keyFigures.thinkers.map((figure, i) => (
              <li key={i}>{figure}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ideology-coords">
        <p>
          <strong>מיקום במפה:</strong>
        </p>
        <ul>
          <li>חירות-סמכות: {ideology.coords[0]}</li>
          <li>שמרנות-פרוגרסיביות: {ideology.coords[1]}</li>
          <li>ציניות-אידאליזם: {ideology.coords[2]}</li>
        </ul>
      </div>
    </div>
  </div>
);

export default function App() {
  const [started, setStarted] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(4));
  const [selectedIdeology, setSelectedIdeology] = useState(null);
  const [selectedAxes, setSelectedAxes] = useState({
    x: true,
    y: true,
    z: true,
  }); // Replace dimensions state
  const chartRef = useRef(null);
  const [label, setLabel] = useState("");
  const [scores, setScores] = useState({ x: 4, y: 4, z: 4 });
  const [aiAnalysis, setAiAnalysis] = useState("");

  // Replace DimensionSelector with AxesSelector
  const AxesSelector = () => {
    const axesLabels = {
      x: "סמכות-חירות",
      y: "שמרנות-פרוגרסיביות",
      z: "ציניות-אידאליזם",
    };

    return (
      <div
        className="axes-selector"
        style={{ margin: "1em 0", textAlign: "center" }}
      >
        <div style={{ marginBottom: "1em" }}>בחר צירים להצגה:</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1em",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(axesLabels).map(([axis, label]) => (
            <label
              key={axis}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5em",
                padding: "0.5em",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: selectedAxes[axis] ? "#e6f3ff" : "white",
              }}
            >
              <input
                type="checkbox"
                checked={selectedAxes[axis]}
                onChange={() => {
                  const activeAxesCount =
                    Object.values(selectedAxes).filter(Boolean).length;
                  // Don't allow unchecking if it's the last active axis
                  if (selectedAxes[axis] && activeAxesCount <= 1) return;
                  setSelectedAxes((prev) => ({
                    ...prev,
                    [axis]: !prev[axis],
                  }));
                }}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!showGraph) return;
    const totals = { x: 0, y: 0, z: 0 },
      counts = { x: 0, y: 0, z: 0 };
    questions.forEach((q, i) => {
      const val = q.reverse ? 8 - answers[i] : answers[i];
      totals[q.axis] += val;
      counts[q.axis]++;
    });
    const s = {
      x: totals.x / counts.x,
      y: totals.y / counts.y,
      z: totals.z / counts.z,
    };
    setScores(s);
    const { analysis, closestIdeology } = getAIAnalysis(s, answers);
    setAiAnalysis(analysis);
    setSelectedIdeology(closestIdeology);

    const getLabel = (val, axis) => {
      if (axis === "x")
        return val >= 5 ? "חירותני" : val <= 3 ? "סמכותני" : "נייטרלי";
      if (axis === "y")
        return val <= 3 ? "שמרני" : val >= 5 ? "פרוגרסיבי" : "נייטרלי";
      if (axis === "z")
        return val <= 3 ? "ציניקן" : val >= 5 ? "אידאליסט" : "נייטרלי";
      return "";
    };
    setLabel(
      `${getLabel(s.x, "x")} ${getLabel(s.y, "y")} ${getLabel(s.z, "z")}`
    );

    // Get active axes
    const activeAxes = Object.entries(selectedAxes)
      .filter(([_, isActive]) => isActive)
      .map(([axis]) => axis);

    // Create traces based on selected axes
    const createTraces = () => {
      const userTrace = {
        mode: "markers+text",
        text: ["🧭 אתה כאן"],
        textposition: "top center",
        marker: { size: 12, color: "#2b6cb0", opacity: 0.95 },
        name: "המיקום שלך",
      };

      const ideologyTraces = ideologies.map((i) => ({
        mode: "markers+text",
        text: [i.icon + " " + i.name],
        name: i.name,
        customdata: [i.desc],
        hovertemplate: "%{text}<br>%{customdata}<extra></extra>",
        textposition: "top center",
        marker: {
          size: 8,
          color: i.color || "#999",
          symbol: "circle",
        },
      }));

      const is3D = activeAxes.length === 3;
      const is2D = activeAxes.length === 2;
      const is1D = activeAxes.length === 1;

      if (is3D) {
        userTrace.type = "scatter3d";
        userTrace.x = [s.x];
        userTrace.y = [s.y];
        userTrace.z = [s.z];
        ideologyTraces.forEach((trace) => {
          trace.type = "scatter3d";
          const ideology = ideologies.find((i) => i.name === trace.name);
          trace.x = [ideology.coords[0]];
          trace.y = [ideology.coords[1]];
          trace.z = [ideology.coords[2]];
        });
      } else if (is2D) {
        userTrace.type = "scatter";
        userTrace.x = [s[activeAxes[0]]];
        userTrace.y = [s[activeAxes[1]]];
        ideologyTraces.forEach((trace) => {
          trace.type = "scatter";
          const ideology = ideologies.find((i) => i.name === trace.name);
          trace.x = [
            ideology.coords[
              activeAxes[0] === "x" ? 0 : activeAxes[0] === "y" ? 1 : 2
            ],
          ];
          trace.y = [
            ideology.coords[
              activeAxes[1] === "x" ? 0 : activeAxes[1] === "y" ? 1 : 2
            ],
          ];
        });
      } else {
        // 1D
        userTrace.type = "scatter";
        userTrace.x = [s[activeAxes[0]]];
        userTrace.y = [0];
        ideologyTraces.forEach((trace) => {
          trace.type = "scatter";
          const ideology = ideologies.find((i) => i.name === trace.name);
          trace.x = [
            ideology.coords[
              activeAxes[0] === "x" ? 0 : activeAxes[0] === "y" ? 1 : 2
            ],
          ];
          trace.y = [0];
        });
      }

      return [userTrace, ...ideologyTraces];
    };

    // Create layout based on selected axes
    const createLayout = () => {
      const axisLabels = {
        x: "סמכות ← חירות",
        y: "שמרנות ← פרוגרסיביות",
        z: "ציניות ← אידאליזם",
      };

      const baseLayout = {
        paper_bgcolor: "#f0f0f0",
        plot_bgcolor: "#ffffff",
        showlegend: true,
        legend: {
          x: 1,
          y: 0.5,
        },
        width: 850,
        height: activeAxes.length === 1 ? 400 : 700,
        margin: { l: 50, r: 50, b: 50, t: 50 },
      };

      if (activeAxes.length === 1) {
        return {
          ...baseLayout,
          xaxis: {
            title: axisLabels[activeAxes[0]],
            range: [1, 7],
          },
          yaxis: {
            showticklabels: false,
            zeroline: false,
            range: [-1, 1],
          },
        };
      } else if (activeAxes.length === 2) {
        return {
          ...baseLayout,
          xaxis: {
            title: axisLabels[activeAxes[0]],
            range: [1, 7],
          },
          yaxis: {
            title: axisLabels[activeAxes[1]],
            range: [1, 7],
          },
        };
      } else {
        // 3D
        return {
          ...baseLayout,
          scene: {
            xaxis: { title: axisLabels.x, range: [1, 7] },
            yaxis: { title: axisLabels.y, range: [1, 7] },
            zaxis: { title: axisLabels.z, range: [1, 7] },
          },
        };
      }
    };

    const plot = Plotly.newPlot(
      chartRef.current,
      createTraces(),
      createLayout()
    );

    // הוספת אירוע לחיצה
    chartRef.current.on("plotly_click", (data) => {
      const clickedPoint = data.points[0];
      const clickedIdeology = ideologies.find(
        (i) => i.name === clickedPoint.data.name
      );
      if (clickedIdeology) {
        setSelectedIdeology(clickedIdeology);
      }
    });
  }, [showGraph, answers, selectedAxes]); // Replace dimensions with selectedAxes in dependencies

  const getScoreText = (score, axis) => {
    if (axis === "x") {
      if (score >= 6) return "חירותני מובהק";
      if (score >= 5) return "חירותני";
      if (score > 3 && score < 5) return "נייטרלי";
      if (score <= 3) return "סמכותני";
      if (score <= 2) return "סמכותני מובהק";
    }
    if (axis === "y") {
      if (score <= 2) return "שמרן מובהק";
      if (score <= 3) return "שמרן";
      if (score > 3 && score < 5) return "נייטרלי";
      if (score >= 5) return "פרוגרסיבי";
      return "פרוגרסיבי מובהק";
    }
    if (axis === "z") {
      if (score <= 2) return "ציניקן מובהק";
      if (score <= 3) return "ציניקן";
      if (score > 3 && score < 5) return "נייטרלי";
      if (score >= 5) return "אידאליסט";
      return "אידאליסט מובהק";
    }
  };

  const ScaleLegend = ({ isResults = false }) => (
    <div className="scale-legend">
      <h4>מקרא ערכים:</h4>
      <div className="scale-items">
        <div className="scale-item">
          <span className="scale-value">1</span>
          <span className="scale-label">
            {isResults ? "סמכותני מובהק" : "לא מסכים בכלל"}
          </span>
        </div>
        <div className="scale-item">
          <span className="scale-value">2</span>
          <span className="scale-label">
            {isResults ? "סמכותני" : "לא מסכים"}
          </span>
        </div>
        <div className="scale-item">
          <span className="scale-value">3</span>
          <span className="scale-label">
            {isResults ? "נוטה לסמכותני" : "נוטה לא להסכים"}
          </span>
        </div>
        <div className="scale-item">
          <span className="scale-value">4</span>
          <span className="scale-label">
            {isResults ? "נייטרלי" : "נייטרלי"}
          </span>
        </div>
        <div className="scale-item">
          <span className="scale-value">5</span>
          <span className="scale-label">
            {isResults ? "נוטה לחירותני" : "נוטה להסכים"}
          </span>
        </div>
        <div className="scale-item">
          <span className="scale-value">6</span>
          <span className="scale-label">{isResults ? "חירותני" : "מסכים"}</span>
        </div>
        <div className="scale-item">
          <span className="scale-value">7</span>
          <span className="scale-label">
            {isResults ? "חירותני מובהק" : "מסכים מאוד"}
          </span>
        </div>
      </div>
      <div className="scale-axes">
        <div className="scale-axis">
          <strong>ציר X:</strong> סמכותני (1) ↔ חירותני (7)
        </div>
        <div className="scale-axis">
          <strong>ציר Y:</strong> שמרני (1) ↔ פרוגרסיבי (7)
        </div>
        <div className="scale-axis">
          <strong>ציר Z:</strong> ציניקן (1) ↔ אידאליסט (7)
        </div>
      </div>
    </div>
  );

  const getNarrative = () => {
    const { x, y, z } = scores;

    const getIdeologyName = (x, y, z) => {
      // מגדירים את הקטגוריות לכל ציר
      const xLabel = x <= 3 ? "סמכותני" : x >= 5 ? "חירותני" : "מרכזי";
      const yLabel = y <= 3 ? "שמרני" : y >= 5 ? "פרוגרסיבי" : "מתון";
      const zLabel = z <= 3 ? "ציניקן" : z >= 5 ? "אידאליסט" : "פרגמטיסט";

      // קומבינציות מיוחדות
      if (x >= 5 && y >= 5 && z >= 5) return "אוטופיסט רדיקלי";
      if (x <= 3 && y <= 3 && z <= 3) return "ריאליסט שמרני";
      if (x >= 5 && y <= 3 && z >= 5) return "חירותן מסורתי";
      if (x <= 3 && y >= 5 && z >= 5) return "רפורמיסט מהפכני";
      if (x >= 5 && y >= 5 && z <= 3) return "ליברטריאן פרגמטי";

      // קומבינציות של שני צירים דומיננטיים
      if (x >= 5 && y <= 3) return "שמרן-חירותני";
      if (x <= 3 && y <= 3) return "שמרן-סמכותני";
      if (y >= 5 && z >= 5) return "אידאליסט פרוגרסיבי";
      if (y <= 3 && z <= 3) return "ריאליסט מסורתי";
      if (x >= 5 && z >= 5) return "חירותן אידאליסט";
      if (x <= 3 && z >= 5) return "רפורמיסט מוסדי";

      // קומבינציות רגילות
      return `${xLabel} ${yLabel} ${zLabel}`;
    };

    const ideologyName = getIdeologyName(x, y, z);

    const narrativeText = `בציר הסמכות-חירות אתה ${getScoreText(x, "x")};
בציר השמרנות-פרוגרסיביות אתה ${getScoreText(y, "y")};
ובציר הציניות-אידאליזם אתה ${getScoreText(z, "z")}.

על פי הניתוח, הגישה האידאולוגית שלך היא: "${ideologyName}".`;

    const distance = (a, b) =>
      Math.sqrt(
        Math.pow(a.x - b[0], 2) +
          Math.pow(a.y - b[1], 2) +
          Math.pow(a.z - b[2], 2)
      );

    const closest = ideologies.reduce(
      (prev, curr) => {
        const d = distance(scores, curr.coords);
        return d < prev.dist
          ? { name: curr.name, desc: curr.desc, dist: d }
          : prev;
      },
      { name: "", desc: "", dist: Infinity }
    );

    return (
      <div className="results-container">
        <h3>הניתוח האידאולוגי שלך</h3>
        <div className="ideology-name">
          <h2>{ideologyName}</h2>
        </div>
        <div className="scores-summary">
          <h4>מיקום בכל ציר:</h4>
          <div className="score-item">
            <span>ציר הסמכות-חירות:</span>
            <strong>
              {x.toFixed(1)} - {getScoreText(x, "x")}
            </strong>
          </div>
          <div className="score-item">
            <span>ציר השמרנות-פרוגרסיביות:</span>
            <strong>
              {y.toFixed(1)} - {getScoreText(y, "y")}
            </strong>
          </div>
          <div className="score-item">
            <span>ציר הציניות-אידאליזם:</span>
            <strong>
              {z.toFixed(1)} - {getScoreText(z, "z")}
            </strong>
          </div>
        </div>
        <p className="narrative-text">{narrativeText}</p>
        <div className="ai-analysis">
          <h4>ניתוח AI מעמיק</h4>
          <div className="ai-content">
            {aiAnalysis.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
        <div className="closest-ideology">
          <h4>ההשקפה הקרובה ביותר אליך:</h4>
          <p>
            <strong>{closest.name}</strong> – {closest.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      {selectedIdeology && (
        <IdeologyModal
          ideology={selectedIdeology}
          onClose={() => setSelectedIdeology(null)}
        />
      )}
      {!started ? (
        <div className="home-screen fade-in">
          <h1>גלה איפה אתה באמת</h1>
          <p>לא שמאל. לא ימין. מצפן.</p>
          <p
            style={{
              fontSize: "0.9em",
              color: "#555",
              maxWidth: "600px",
              margin: "2em auto 1em",
              lineHeight: "1.4",
            }}
          >
            פותח למען פיתוח עניין והעמקה ברעיונות המעצבים את המציאות שלנו
          </p>
          <button onClick={() => setStarted(true)}>יאללה, תבדוק את עצמך</button>
          <div
            style={{
              fontSize: "0.75em",
              color: "#888",
              marginTop: "2em",
              opacity: 0.8,
            }}
          >
            ע״י יובל פרידמן, 2025
          </div>
        </div>
      ) : showGraph ? (
        <div
          className="fade-in"
          style={{ padding: "2em", backgroundColor: "#f2f2f2" }}
        >
          <h2>המפה האידאולוגית שלך</h2>
          <div
            style={{
              maxWidth: "700px",
              margin: "2em auto",
              color: "#222",
              textAlign: "center",
              lineHeight: "1.6",
            }}
          >
            <h4>איך לקרוא את המפה:</h4>
            <p>
              {selectedAxes.x && (
                <>
                  הציר {selectedAxes.y || selectedAxes.z ? "האופקי" : "היחיד"}{" "}
                  מציין את היחס בין <strong>חירות</strong> לבין{" "}
                  <strong>סמכות</strong>
                  {selectedAxes.y || selectedAxes.z ? ";" : "."}
                </>
              )}
              {selectedAxes.y && (
                <>
                  {" "}
                  {selectedAxes.x ? "הציר האנכי" : "הציר היחיד"} עוסק ב
                  <strong>שמרנות</strong> מול <strong>פרוגרסיביות</strong>
                  {selectedAxes.z ? ";" : "."}
                </>
              )}
              {selectedAxes.z && (
                <>
                  {" "}
                  {selectedAxes.x || selectedAxes.y
                    ? "והעומק"
                    : "הציר היחיד"}{" "}
                  בודק את נטייתך ל<strong>אידאליזם</strong> מול{" "}
                  <strong>ציניות</strong>.
                </>
              )}
            </p>
          </div>

          <AxesSelector />
          <div ref={chartRef} style={{ margin: "2em auto" }} />
          <ScaleLegend isResults={true} />
          {getNarrative()}
          <div className="share-buttons">
            <a
              href={`https://wa.me/?text=בדוק את המצפן האידיאולוגי שלך כאן!%0aהאידיאולוגיה שלי: ${label}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button whatsapp"
            >
              📱 שתף ב־WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=מצפן+אידיאולוגי&text=האידיאולוגיה+שלי:+${label}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button telegram"
            >
              ✈️ שתף ב־Telegram
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("הקישור הועתק");
              }}
              className="share-button copy"
            >
              🔗 העתק קישור
            </button>
          </div>
          <div className="action-buttons">
            <button onClick={() => setShowGraph(false)}>חזור לשאלון</button>
            <button onClick={() => window.print()}>הורד תוצאה כ־PDF</button>
          </div>
        </div>
      ) : (
        <div className="fade-in" style={{ padding: "2em" }}>
          <h1>שאלון אידאולוגי</h1>
          <ScaleLegend isResults={false} />
          {questions.map((q, i) => (
            <div key={i} className="question-container">
              <label className="question-text">{q.text}</label>
              <input
                type="range"
                min="1"
                max="7"
                value={answers[i]}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[i] = parseInt(e.target.value);
                  setAnswers(newAnswers);
                }}
              />
              <div className="range-value">
                {answers[i] === 1
                  ? "לא מסכים בכלל"
                  : answers[i] === 2
                  ? "לא מסכים"
                  : answers[i] === 3
                  ? "נוטה לא להסכים"
                  : answers[i] === 4
                  ? "נייטרלי"
                  : answers[i] === 5
                  ? "נוטה להסכים"
                  : answers[i] === 6
                  ? "מסכים"
                  : "מסכים מאוד"}
              </div>
            </div>
          ))}
          <div style={{ textAlign: "center" }}>
            <button onClick={() => setShowGraph(true)}>
              סיים וראה את המפה שלך
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
