document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.getElementById("likeBtn");
  const likeCount = document.getElementById("likeCount");
  const newsForm = document.getElementById("newsForm");
  const photoInput = document.getElementById("photoInput");
  const captionInput = document.getElementById("captionInput");
  const imagesContainer = document.getElementById("imagesContainer");

  // Initialize likes from localStorage
  let likes = localStorage.getItem("likes") || 0;
  let liked = localStorage.getItem("liked") === "true";
  likeCount.textContent = likes;

  if (liked) {
    likeBtn.disabled = true;
    likeBtn.textContent = "❤️ Liked";
  }

  likeBtn.addEventListener("click", () => {
    if (!liked) {
      likes++;
      localStorage.setItem("likes", likes);
      localStorage.setItem("liked", "true");
      likeCount.textContent = likes;
      likeBtn.textContent = "❤️ Liked";
      likeBtn.disabled = true;
    }
  });

  newsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photoInput.files[0]);
    formData.append("caption", captionInput.value);

    const res = await fetch("/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (data.filename) {
      displayNewsItem(data.filename, captionInput.value);
      photoInput.value = "";  // Reset file input
      captionInput.value = "";  // Reset caption input
    }
  });

  function displayNewsItem(filename, caption) {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");

    const img = document.createElement("img");
    img.src = `/uploads/${filename}`;
    newsItem.appendChild(img);

    const captionText = document.createElement("p");
    captionText.textContent = caption;
    newsItem.appendChild(captionText);

    imagesContainer.appendChild(newsItem);
  }

  // Fetch and display already uploaded news items (images and captions)
  fetch("/uploads-list")
    .then(res => res.json())
    .then(files => {
      files.forEach(file => {
        displayNewsItem(file.filename, "Caption for image"); // Replace with actual caption when storing it in backend
      });
    });
});
