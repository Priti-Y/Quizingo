

export default async function fetchQuestions(count = 25) {
    const response = await fetch(`https://opentdb.com/api.php?amount=${count}&difficulty=medium&type=multiple`);
    const data = await response.json();
  
    const decoded = data.results.map(item => ({
      question: decodeHTML(item.question),
      answer: decodeHTML(item.correct_answer),
    }));
  
    return decoded;
  }
  
  function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

