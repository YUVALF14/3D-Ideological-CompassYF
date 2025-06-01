import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';

const questions = [
  { text: "המדינה צריכה לפקח על תכנים באינטרנט", axis: 'x', reverse: true },
  { text: "חופש הביטוי חשוב יותר מביטחון המדינה", axis: 'x', reverse: false },
  { text: "רק למדינה צריכה להיות זכות לנשק", axis: 'x', reverse: true },
  { text: "ראוי שהמשטרה תוכל לעקוב אחרי אזרחים", axis: 'x', reverse: true },
  { text: "החירות חשובה יותר מציות לחוק", axis: 'x', reverse: false },
  { text: "רצוי לצמצם את סמכויות הממשלה ככל האפשר", axis: 'x', reverse: false },
  { text: "צייתנות לחוק היא ערך עליון", axis: 'x', reverse: true },
  { text: "אין צורך בממשלה חזקה כדי לשמור על הסדר", axis: 'x', reverse: false },
  { text: "על המדינה להפעיל כוח נגד מתנגדים אידיאולוגיים", axis: 'x', reverse: true },
  { text: "לכל אדם מותר לנהוג לפי מצפונו, גם אם יסתור את החוק", axis: 'x', reverse: false },
  { text: "יש לעדכן חוקים מוסריים לפי רוח הזמן", axis: 'y', reverse: false },
  { text: "יש לשמר מוסדות מסורתיים כמו משפחה ודת", axis: 'y', reverse: true },
  { text: "על המדינה לעודד ערכים לאומיים", axis: 'y', reverse: true },
  { text: "שינוי חברתי הוא מנוע חיובי לחברה", axis: 'y', reverse: false },
  { text: "מוסדות ישנים עדיפים על פתרונות מודרניים", axis: 'y', reverse: true },
  { text: "נישואים חד מיניים צריכים להיות מוכרים בחוק", axis: 'y', reverse: false },
  { text: "יש ללמד מגדר וזהות עצמית בבתי ספר", axis: 'y', reverse: false },
  { text: "מסורת היא מקור לחכמה קולקטיבית", axis: 'y', reverse: true },
  { text: "יש לשמר את התרבות הלאומית מכל שינוי חיצוני", axis: 'y', reverse: true },
  { text: "יש להחליף מבנים ישנים בתפיסות חדשות", axis: 'y', reverse: false },
  { text: "לפעמים מותר לשקר כדי להגן על רעיון גדול", axis: 'z', reverse: true },
  { text: "יש לפעול רק בדרכים מוסריות, גם במחיר כישלון", axis: 'z', reverse: false },
  { text: "המטרה מקדשת את האמצעים", axis: 'z', reverse: true },
  { text: "חברה צודקת שווה להקרבה אישית קיצונית", axis: 'z', reverse: false },
  { text: "אין דבר כזה טוהר אידיאולוגי במציאות", axis: 'z', reverse: true },
  { text: "אם אין כוח, אין ערך לרעיון טוב", axis: 'z', reverse: true },
  { text: "ציניות פוליטית היא הכרח, לא בחירה", axis: 'z', reverse: true },
  { text: "אדם צריך לשאוף לעולם טוב יותר גם אם זה חסר סיכוי", axis: 'z', reverse: false },
  { text: "מוסר הוא חולשה במציאות פוליטית קשה", axis: 'z', reverse: true },
  { text: "ערכים מוחלטים חשובים יותר מהצלחה פוליטית", axis: 'z', reverse: false }
];

const ideologies = [
  { name: 'נאציזם', coords: [9, 9, 10] },
  { name: 'קומוניזם', coords: [9, 2, 1] },
  { name: 'ליברליזם קלאסי', coords: [2, 2, 3] },
  { name: 'שמרנות מערבית', coords: [3, 8, 6] },
  { name: 'שמאל פרוגרסיבי', coords: [2, 2, 2] },
  { name: 'פאשיזם', coords: [10, 10, 9] }
];

  const [answers, setAnswers] = useState(Array(questions.length).fill(3));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = parseInt(value);
    setAnswers(updated);
  };

  const [x, y, z] = useMemo(() => {
    let x = 0, y = 0, z = 0, xCount = 0, yCount = 0, zCount = 0;
    answers.forEach((val, i) => {
      const { axis, reverse } = questions[i];
      const score = reverse ? 6 - val : val;
      if (axis === 'x') { x += score; xCount++; }
      else if (axis === 'y') { y += score; yCount++; }
      else if (axis === 'z') { z += score; zCount++; }
    });
    return [x / xCount * 2, y / yCount * 2, z / zCount * 2];
  }, [answers]);

  return (
    <div style={{ padding: 20 }}>
      {!submitted ? (
        <form>
          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <label>{q.text}</label>
              <input
                type="range"
                min="1"
                max="5"
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          ))}
          <button onClick={() => setSubmitted(true)} type="button">
            הצג את המפה שלי
          </button>
        </form>
      ) : (
        <div>
          <Plot
            data={[
              {
                type: 'scatter3d',
                mode: 'markers+text',
                x: [x],
                y: [y],
                z: [z],
                marker: { size: 12, color: 'red', symbol: 'diamond' },
                text: ['אתה'],
                textposition: 'top center'
              },
              ...ideologies.map(ideology => ({
                type: 'scatter3d',
                mode: 'markers+text',
                x: [ideology.coords[0]],
                y: [ideology.coords[1]],
                z: [ideology.coords[2]],
                marker: { size: 8, color: 'gray' },
                text: [ideology.name],
                textposition: 'bottom center'
              }))
            ]}
            layout={{
              width: 800,
              height: 650,
              title: 'המיקום האידאולוגי שלך בתלת מימד',
              scene: {
                xaxis: { title: 'חירות ← סמכות', range: [1, 10] },
                yaxis: { title: 'פרוגרסיביות ← שמרנות', range: [1, 10] },
                zaxis: { title: 'אידאליזם ← ציניות', range: [1, 10] }
              }
            }}
          />
          <div>
            ציר חירות/סמכות: {x.toFixed(2)} | ציר פרוגרסיביות/שמרנות: {y.toFixed(2)} | ציר אידאליזם/ציניות: {z.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
export default function App() {
  // ...
}
