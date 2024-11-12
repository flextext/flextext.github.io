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
    { masculine: "לדעתך", feminine: "לדעתך", plural: "לדעתכם", both: "לדעתכם/ן" },
  ];
  /*
  const createReplacementsDictionary = (tableData) => {
    const replacements = {};
    tableData.forEach((entry) => {
      replacements[entry.both] = [entry.masculine, entry.feminine, entry.plural];
    });
    return replacements;
  };
  function replaceWords(content) {
    const replacements = createReplacementsDictionary(tableData);
    for (const [replacement, words] of Object.entries(replacements)) {
      //const regex = new RegExp(`\\b(${words.join("|")})\\b`, "g");
      const regex = new RegExp(`(?<![\\w])([ו|ש|ל]?)${words.join("|")}(?<!/)(?![א-ת])`, 'g');
      content = content.replace(regex, replacement);
    }
    return content;
  }
  */
  const createReplacementsDictionary = (tableData) => {
    const replacements = {};
    /*tableData.forEach((entry) => {
      // ביטוי רגולרי לטיפול במילים עם תחיליות אופציונליות 'ו', 'ש', או 'ל'
      const regex = new RegExp(`\\b(?:[ושל])?(${entry.masculine}|${entry.feminine}|${entry.plural})\\b`, "g");
      replacements[regex] = entry.both;
    });*/
   
    tableData.forEach((entry) => {
      // ביטויים רגולריים נפרדים עבור כל צורת מילה: תחילה ננסה ללא תחיליות, ואז עם תחיליות 'ו', 'ש', או 'ל'
      replacements[entry.masculine] = entry.both;
      replacements[entry.feminine] = entry.both;
      replacements[entry.plural] = entry.both;
    });
    return replacements;

  };
  const replaceWords = (text) => {
    const replacements = createReplacementsDictionary(tableData);
    for (const [originalWord, replacement] of Object.entries(replacements)) {
      // חיפוש מילים שלמות
      const wholeWordRegex = new RegExp(`\\b${originalWord}\\b`, "g");
      if (wholeWordRegex.test(text)) {
        text = text.replace(wholeWordRegex, replacement);
      } else {
        // חיפוש מילים עם תחיליות 'ו', 'ש', או 'ל'
        const prefixedRegex = new RegExp(`\\b[ושל]${originalWord}\\b`, "g");
        text = text.replace(prefixedRegex, replacement);
      }
    }
    return text;
  };
  
  function replaceWords2(text) {
    tableData.forEach(({ masculine, feminine, plural, both }) => {
        const wordForms = [masculine, feminine, plural];

        wordForms.forEach(word => {
          const exactPattern = new RegExp(`\\b${word}\\b`, 'g');
          text = text.replace(exactPattern, both);
          const prefixes = ["ו", "ש", "ל"];
            prefixes.forEach(prefix => {
                const prefixedPattern = new RegExp(`\\b${prefix}${word}\\b`, 'g');
                text = text.replace(prefixedPattern, `${prefix}${both}`);
            });
        });
    });
    return text;
}
  // =================================================

function replaceWords1(text) {
  const words = text.split(/\s+/);
  const newWords = [];
  const prefixes = ['ו', 'ש', 'ל'];

  words.forEach(word => {
    let replaced = false;

    // בודקים התאמה מדויקת כמו קודם
    for (const entry of tableData) {
      if (word === entry.masculine || word === entry.feminine || word === entry.plural) {
        newWords.push(entry.both);
        replaced = true;
        break;
      }
    }

    // בודקים התאמה עם תחילית
    if (!replaced) {
      for (const prefix of prefixes) {
        if (word.startsWith(prefix) && tableData.some(entry => word.slice(1) === entry.masculine || word.slice(1) === entry.feminine || word.slice(1) === entry.plural)) {
          newWords.push(prefix + tableData.find(entry => word.slice(1) === entry.masculine || word.slice(1) === entry.feminine || word.slice(1) === entry.plural).both);
          replaced = true;
          break;
        }
      }
    }

    if (!replaced) {
      newWords.push(word);
    }
  });

  return newWords.join(' ');
}

  // =================================================
  function processDocument(text) {
    tableData.forEach(row => {
      const patterns = [row.masculine, row.feminine, row.plural];
      
      patterns.forEach(pattern => {
        //text = text.replace(`(\s|^)${pattern}(?=\s|$)`,row.both);
        
        //const regex = new RegExp(`\\b(?<![\\w])([ו|ש|ל]?)${pattern}\\b(?![\\w/])`, 'g');
        const regex = new RegExp(`(?<![\\w])([ו|ש|ל]?)${pattern}(?<!/)(?![א-ת])`, 'g');
        //const regex = new RegExp(`(?<![\\w])([ו|ש|ל]?)${pattern}(?<!/)\\b`, 'g');
        //const regex = new RegExp(`\\b([ו|ש|ל]?)+${pattern}+\\b`, 'g');
        text = text.replace(regex, (match, prefix) => {
          //return prefix + row.both;
          return (prefix + pattern === row.both) ? match : prefix + row.both;
        });
      });
    });
    return text;
  }  
    // =================================================
  function processDocument3(text) {
    //const words = text.split(/(\s+|[\.,?!<>\/:\"=0-9\[\]]+)/);
    const words = text.split(/(\s+|[\.,?!<>:\"=0-9\[\]]+)/);

    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        // עיבוד המילה מול המילון
        tableData.forEach(row => {
            const regex_both = new RegExp(`^([ו|ש|ל]?)${row.both}$`);
            const match_both = word.match(regex_both);
            if(!match_both){
              const patterns = [row.masculine, row.feminine, row.plural];
              patterns.forEach(pattern => {
                // ביטוי רגולרי למציאת המילה עם תחילית אופציונלית
                const regex = new RegExp(`^([ו|ש|ל]?)${pattern}$`);
                const match = word.match(regex);

                // בדיקת התאמה וקבלת התחילית אם קיימת
                if (match) {
                    const prefix = match[1] || "";
                    const replacement = prefix + row.both;

                    // בדיקה אם המילה אינה שווה ליעד ההחלפה, כולל עם תחילית
                    if (word !== replacement) {
                        words[i] = replacement;
                    }
                }
              });
            }
        });
    }

    // החזרת הטקסט המלא לאחר ההחלפות
    return words.join('');
  }

//import init, { replace_words } from './text_replacer.wasm';
// =================================================
async function run(text) {
  WebAssembly.instantiateStreaming(fetch("text_replacer.wasm"), importObject).then(
    (obj) => {
      // Call an exported function:
      obj.instance.exports.init();
      console.log("Original Text:", text);
      const newText = obj.replace_words(text);
      console.log("Modified Text:", newText);
      return newText;
    },
  );
 

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
        let newDocumentXml = processDocument3(documentXml);
        //let newDocumentXml = replaceWords1(documentXml);
        //let newDocumentXml = run(documentXml);

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
