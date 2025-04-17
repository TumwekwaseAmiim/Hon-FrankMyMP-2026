document.addEventListener('DOMContentLoaded', () => {
    // Get like button and like count elements
    const likeBtn = document.getElementById('likeBtn');
    const likeCountElem = document.getElementById('likeCount');
  
    // Check if the user has already liked this post (using localStorage)
    if (localStorage.getItem('likedFrank') === 'yes') {
      likeBtn.disabled = true;
      likeBtn.textContent = 'You have already liked this';
    }
  
    // Like button click handler
    likeBtn.addEventListener('click', async () => {
      if (localStorage.getItem('likedFrank') === 'yes') {
        alert('You have already liked this!');
        return;
      }
  
      // Send a request to the server to update the like count
      const res = await fetch('/likes', { method: 'POST' });
      const data = await res.json();
  
      // Update the like count and disable the button
      likeCountElem.textContent = `Likes: ${data.likes}`;
      localStorage.setItem('likedFrank', 'yes');  // Remember that the user liked
      likeBtn.disabled = true;  // Disable the button to prevent further likes
      likeBtn.textContent = 'You have already liked this';
    });
  });
  