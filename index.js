
var MALE_2_FEMALE = true;
var MALE_2_PLURAL = false;
var doc_postfix = "_female.docx";
// =================================================
const selectElement = document.getElementById('mySelect');
selectElement.addEventListener('change', () => {
  const selectedValue = selectElement.value;
  if (selectedValue == 'male2female'){
    MALE_2_FEMALE = true;
    MALE_2_PLURAL = false;
    doc_postfix = "_female.docx";
  }
  if (selectedValue == 'male2plural'){
    MALE_2_FEMALE = false;
    MALE_2_PLURAL = true;
    doc_postfix = "_plural.docx";
  }

});
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
async function loadReplacementsFromCSVFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const replacements = {};

        reader.onload = function (event) {
            const csvData = event.target.result;
            const rows = csvData.split('\n').slice(1); 

            rows.forEach(row => {
                const [male, female, plural] = row.split(',');
                if (male && female && plural) {
                    if (MALE_2_PLURAL){
                        replacements[male.trim()] = plural.trim();
                    }
                    if (MALE_2_FEMALE){
                        replacements[male.trim()] = female.trim();
                    }
                }
            });

            resolve(replacements);
        };

        reader.onerror = function () {
            reject("error read CSV file");
        };

        reader.readAsText(file);
    });
}

// =================================================
async function processDocxWithReplacements() {
    const csvFile = document.getElementById('csvInput').files[0];
    const docxFile = document.getElementById('docxInput').files[0];

    if (!csvFile || !docxFile) {
        alert("יש לבחור גם קובץ CSV וגם קובץ DOCX");
        return;
    }

    try {
        const replacements = await loadReplacementsFromCSVFile(csvFile);
    
        const zip = new JSZip();
        const content = await zip.loadAsync(docxFile);

        const documentXml = await zip.file('word/document.xml').async('string');
        let newDocumentXml = replaceWordsInXml(documentXml, replacements);
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