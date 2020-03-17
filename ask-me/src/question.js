export class Question {
  static create(question) {
    return fetch("https://prodject-2525f.firebaseio.com/questions.json", {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        question.id = response.name;
        return question;
      })
      .then(addToLocalStorage)
      .then(Question.renderList);
  }
  static fetch(token) {
    if (!token) {
      return Promise.resolve(' <p class="error">У вас нема доступу</p> ');
    }
    return fetch(
      `https://prodject-2525f.firebaseio.com/questions.json?auth=${token}`
    )
      .then(response => response.json())
      .then(response => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`;
        }
        return response
          ? Object.keys(response).map(key => ({ ...response[key], id: key }))
          : [];
      });
  }

  static renderList() {
    const questions = getQuestionFromLocalStoradge();
    const html = questions.length
      ? questions.map(toCard).join("")
      : `<div class="mui--text-headline">Ви нічого не запитували</div>`;

    const list = document.getElementById("list");

    list.innerHTML = html;
  }
  static listToHtml(questions) {
    return questions.length
      ? `<ol>${questions
          .map(
            q => `<li>${q.text + "\xa0" + q.date}</li>
          `
          )
          .join("")}</ol>`
      : "<p>Нема питань</p>";
  }
}

function addToLocalStorage(question) {
  const all = getQuestionFromLocalStoradge();
  all.push(question);
  localStorage.setItem("questions", JSON.stringify(all));
}
function getQuestionFromLocalStoradge() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}
function toCard(question) {
  return ` <div class="mui--text-black-54">
      ${new Date(question.date)}
   </div>
   <div>
    ${question.text}
  </div>
  <br>  `;
}
