export function isValid(value) {
  return value.length >= 10;
}

export function createModal(title, content) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <h1>${title}</h1>
  <div class="modal-content">${content}</div>
`;
  mui.overlay("on", modal);
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = "8cC5Wi7xhtYsfN0ryqgLYY1UyjW2";
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => data.idToken);
}
