var doc_postfix = "_fixed.docx";
// =================================================
const tableData = [
    { masculine: "תאר", feminine: "תארי", plural: "תארו", both: "תאר/י" },
    { masculine: "הצג", feminine: "הציגי", plural: "הציגו", both: "הצג/י" },
    { masculine: "הסבר", feminine: "הסבירי", plural: "הסבירו", both: "הסביר/י" },
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
    { masculine: "לדעתך", feminine: "לדעתך", plural: "לדעתכם", both: "לדעתכם.ן" },
  ];
  // =================================================
  function processDocument(text) {
    tableData.forEach(row => {
      const patterns = [row.masculine, row.feminine, row.plural];
      
      patterns.forEach(pattern => {
        const regex = new RegExp(`(?<![\\w])([ו|ש]?)${pattern}(?![א-ת])`, 'g');
        text = text.replace(regex, (match, prefix) => {
          return prefix + row.both;
        });
      });
    });
    return text;
  }
  
  
// =================================================
function replaceWordsInXml(xmlString, replacements) {

    for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(`(?<![\\w])([ו|ש]?)${key}(?![א-ת])`, 'g');
        xmlString = xmlString.replace(regex, (match, prefix) => {
            return prefix + value;
        });
    }
    return xmlString;
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
        //let newDocumentXml = replaceWordsInXml(documentXml, replacements);
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
