var doc_postfix = "_female.docx";
var convert_to = 0
// =================================================
const tableData = [
    { masculine: "תאר", feminine: "תארי", plural: "תארו", both: "תאר/י" },
    { masculine: "הצג", feminine: "הציגי", plural: "הציגו", both: "הצג/י" },
    { masculine: "הסבר", feminine: "הסבירי", plural: "הסבירו", both: "הסבר/י" },
    { masculine: "סקר", feminine: "סקרי", plural: "סקרו", both: "סקר/י" },
    { masculine: "נמק", feminine: "נמקי", plural: "נמקו", both: "נמק/י" },
    { masculine: "הדגם", feminine: "הדגימי", plural: "הדגימו", both: "הדגים/י" },
    { masculine: "דון", feminine: "דוני", plural: "דונו", both: "דון/י" },
    { masculine: "העריך", feminine: "העריכי", plural: "העריכו", both: "העריך/י" },
    { masculine: "בקר", feminine: "בקרי", plural: "בקרו", both: "בקר/י" },
    { masculine: "השווה", feminine: "השווי", plural: "השוו", both: "השווה/י" },
    { masculine: "הבחן", feminine: "הבחיני", plural: "הבחינו", both: "הבחין/י" },
    { masculine: "הוכח", feminine: "הוכיחי", plural: "הוכיחו", both: "הוכיח/י" },
    { masculine: "סכם", feminine: "סכמי", plural: "סכמו", both: "סכם/י" },
    { masculine: "כתוב", feminine: "כתבי", plural: "כתבו", both: "כתוב/י" },
    { masculine: "העתק", feminine: "העתיקי", plural: "העתיקו", both: "העתק/י" },
    { masculine: "ציין", feminine: "צייני", plural: "ציינו", both: "ציין/י" },
    { masculine: "קבע", feminine: "קבעי", plural: "קבעו", both: "קבע/י" },
    { masculine: "נסח", feminine: "נסחי", plural: "נסחו", both: "נסח/י" },
    { masculine: "אפיין", feminine: "אפייני", plural: "אפיינו", both: "אפיין/י" },
    { masculine: "מיין", feminine: "מייני", plural: "מיינו", both: "מיין/י" },
    { masculine: "פרט", feminine: "פרטי", plural: "פרטו", both: "פרט/י" },
    { masculine: "צטט", feminine: "צטטי", plural: "צטטו", both: "צטט/י" },
    { masculine: "בסס", feminine: "בססי", plural: "בססו", both: "בסס/י" },
    { masculine: "הסיק", feminine: "הסיקי", plural: "הסיקו", both: "הסיק/י" },
    { masculine: "הבא", feminine: "הביאי", plural: "הביאו", both: "הביא/י" },
    { masculine: "תכנן", feminine: "תכנני", plural: "תכננו", both: "תכנן/י" },
    { masculine: "סדר", feminine: "סדרי", plural: "סדרו", both: "סדר/י" },
    { masculine: "מצא", feminine: "מצאי", plural: "מצאו", both: "מצא/י" },
    { masculine: "ספר", feminine: "ספרי", plural: "ספרו", both: "ספר/י" },
    { masculine: "הדגש", feminine: "הדגישי", plural: "הדגישו", both: "הדגש/י" },
    { masculine: "סמן", feminine: "סמני", plural: "סמנו", both: "סמן/י" },
    { masculine: "הקף", feminine: "הקיפי", plural: "הקיפו", both: "הקף/י" },
    { masculine: "מלא", feminine: "מלאי", plural: "מלאו", both: "מלא/י" },
    { masculine: "צרף", feminine: "צרפי", plural: "צרפו", both: "צרף/י" },
    { masculine: "חשב", feminine: "חשבי", plural: "חשבו", both: "חשב/י" },
    { masculine: "ענה", feminine: "עני", plural: "ענו", both: "ענה/י" },
    { masculine: "פתור", feminine: "פתרי", plural: "פתרו", both: "פתור/י" },
    { masculine: "השתמש", feminine: "השתמשי", plural: "השתמשו", both: "השתמש/י" },
    { masculine: "התמקד", feminine: "התמקדי", plural: "התמקדו", both: "התמקד/י" },
    { masculine: "לפניך", feminine: "לפניך", plural: "לפניכם", both: "לפניכם/ן" },
    { masculine: "לדעתך", feminine: "לדעתך", plural: "לדעתכם", both: "לדעתכם/ן" },
    { masculine: "קרא", feminine: "קראי", plural: "קראו", both: "קרא/י" },
];

// =================================================
const selectElement = document.getElementById('mySelect');
selectElement.addEventListener('change', () => {
  const selectedValue = selectElement.value;
  if (selectedValue == 'toFemale'){
    convert_to = 0;
    doc_postfix = "_female.docx";
  }if (selectedValue == 'toMale'){
    convert_to = 1;
    doc_postfix = "_male.docx";
  }
  
  if (selectedValue == 'toPlural'){
    convert_to = 2;
    doc_postfix = "_plural.docx";
  }
  if (selectedValue == 'toBoth'){
    convert_to = 3;
    doc_postfix = "_both.docx";
  }
  //toBoth
});
// =================================================
function processDocument(text) {
  const words = text.split(/(\s+|[\.,?!<>:\"=0-9\[\]]+)/);

  for (let i = 0; i < words.length; i++) {
    let word = words[i];

    // עיבוד המילה מול המילון
    tableData.forEach(row => {
      var patterns = [row.masculine, row.both, row.plural];
      var reolaceTo = row.feminine;
      if (convert_to == 1){
        patterns = [row.both, row.feminine, row.plural];
        reolaceTo = row.masculine;
      }
      if (convert_to == 2){
        patterns = [row.masculine, row.feminine, row.both];
        reolaceTo = row.plural;
      }
      if (convert_to == 3){
        patterns = [row.masculine, row.feminine, row.plural];
        reolaceTo = row.both;
      }
      patterns.forEach(pattern => {
        // ביטוי רגולרי למציאת המילה עם תחילית אופציונלית
        const regex = new RegExp(`^([ו|ש|ל]?)${pattern}$`);
        const match = word.match(regex);

        // בדיקת התאמה וקבלת התחילית אם קיימת
        if (match) {
          const prefix = match[1] || "";
          const replacement = prefix + reolaceTo;

          // בדיקה אם המילה אינה שווה ליעד ההחלפה, כולל עם תחילית
          if (word !== replacement) {
              words[i] = replacement;
          }
        }
      });
    });
  }
  // החזרת הטקסט המלא לאחר ההחלפות
  return words.join('');
}
// =================================================
async function processDocxWithReplacements() {
    const docxFile = document.getElementById('docxInput').files[0];

    if (!docxFile) {
        alert("יש לבחור גם קובץ DOCX");
        return;
    }
    try {    
        const zip = new JSZip();
        const content = await zip.loadAsync(docxFile);

        const documentXml = await zip.file('word/document.xml').async('string');
        let newDocumentXml = processDocument(documentXml);
        
        zip.file('word/document.xml', newDocumentXml);

        const newFileContent = await zip.generateAsync({ type: 'blob' });
        const newFileName = docxFile.name.replace('.docx', doc_postfix );
        const newFile = new File([newFileContent], newFileName, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(newFile);
        link.download = newFileName;
        link.click();
        URL.revokeObjectURL(link.href);

        alert(`הקובץ ${newFileName} נוצר בהצלחה!`);
    } catch (error) {
        console.error("שגיאה:", error);
        alert("אירעה שגיאה במהלך עיבוד הקובץ");
    }
}
