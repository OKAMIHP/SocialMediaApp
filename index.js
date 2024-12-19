let usersData = [];

async function loadData() {
  const usersResponse = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  usersData = await usersResponse.json();

  const postsResponse = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts = await postsResponse.json();

  const galleryContainer = document.getElementById("gallery-container");

  posts.forEach((post) => {
    const user = usersData.find((u) => u.id === post.userId);
    const postElement = document.createElement("div");
    postElement.className = "post";

    const usernameLink = document.createElement("button");
    usernameLink.className = "username-link";
    usernameLink.textContent = `${user.name} @${user.username}`;
    usernameLink.addEventListener("click", (event) => {
      event.stopPropagation();
      showUserPage(post.userId);
    });

    const postTitle = document.createElement("h1");
    postTitle.textContent = post.title;

    const postBody = document.createElement("p");
    postBody.textContent = post.body;

    postElement.appendChild(usernameLink);
    postElement.appendChild(postTitle);
    postElement.appendChild(postBody);

    galleryContainer.appendChild(postElement);
  });
}

loadData();

async function showUserPage(userId) {
  const user = usersData.find((user) => user.id === userId);
  const galleryContainer = document.getElementById("gallery-container");
  const userPageContainer = document.getElementById("user-page-container");

  galleryContainer.style.display = "none";
  userPageContainer.style.display = "block";

  const userInfo = document.getElementById("user-info");
  userInfo.innerHTML = `
    <h1>${user.name}</h1>
    <h3>@${user.username}</h3>
    <p>${user.email}</p>
    <p>${user.address.city}, ${user.address.street}</p>
  `;

  const postsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  const posts = await postsResponse.json();
  const userPosts = document.getElementById("user-posts");
  userPosts.innerHTML = `<h2>Posts:</h2>`;

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";

    const postTitle = document.createElement("h3");
    postTitle.textContent = post.title;

    const postBody = document.createElement("p");
    postBody.textContent = post.body;

    postElement.appendChild(postTitle);
    postElement.appendChild(postBody);

    userPosts.appendChild(postElement);
  });
}

async function showPostPage(postId) {
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await postResponse.json();

  const user = usersData.find((u) => u.id === post.userId);
  const commentsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  const comments = await commentsResponse.json();

  const galleryContainer = document.getElementById("gallery-container");
  const userPageContainer = document.getElementById("user-page-container");

  galleryContainer.style.display = "none";
  userPageContainer.style.display = "block";

  const userInfo = document.getElementById("user-info");
  userInfo.innerHTML = `
    <div id="post-title">
      <h1>${post.title}</h1>
      <p>by <button class="username-link">${user.name} @${user.username}</button></p>
    </div>
    <p>${post.body}</p>
  `;

  const userPosts = document.getElementById("user-posts");
  userPosts.innerHTML = `<h2>Comments:</h2>`;

  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.className = "user-comment";

    const commentName = document.createElement("h4");
    commentName.textContent = comment.name;

    const commentBody = document.createElement("p");
    commentBody.textContent = comment.body;

    const commentEmail = document.createElement("p");
    commentEmail.innerHTML = `<i>by ${comment.email}</i>`;

    commentElement.appendChild(commentName);
    commentElement.appendChild(commentBody);
    commentElement.appendChild(commentEmail);

    userPosts.appendChild(commentElement);
  });
}

function goBack() {
  const userPageContainer = document.getElementById("user-page-container");
  const galleryContainer = document.getElementById("gallery-container");

  userPageContainer.style.display = "none";
  galleryContainer.style.display = "block";
}
