const ADMIN_PASSWORD = "1234"; // BURAYI DEĞİŞTİREBİLİRSİN
const KEY = "blog_posts";

let isAdmin = false;

function login() {
  const pw = document.getElementById("password").value;
  if (pw === ADMIN_PASSWORD) {
    isAdmin = true;
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("loginBox").style.display = "none";
    render();
  } else {
    alert("Şifre yanlış");
  }
}

function loadPosts() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function savePosts(posts) {
  localStorage.setItem(KEY, JSON.stringify(posts));
}

function addPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  if (!title || !content) return;

  const posts = loadPosts();
  posts.unshift({ title, content });
  savePosts(posts);

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  render();
}

function deletePost(i) {
  const posts = loadPosts();
  posts.splice(i, 1);
  savePosts(posts);
  render();
}

function render() {
  const posts = loadPosts();
  const box = document.getElementById("posts");
  box.innerHTML = "";

  posts.forEach((p, i) => {
    box.innerHTML += `
      <div class="card post">
        <h3>${p.title}</h3>
        <p>${p.content}</p>
        ${isAdmin ? `<button onclick="deletePost(${i})">Sil</button>` : ""}
      </div>
    `;
  });
}

render();
