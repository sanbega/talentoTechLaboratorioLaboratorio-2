document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("consultaForm");
  const commentDetails = document.getElementById("commentDetails");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const commentId = document.getElementById("commentId").value;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${commentId}/comments`
      );
      const comments = await response.json();
      displayComments(comments);
    } catch (error) {
      console.error("Error fetching the comments:", error);
      commentDetails.innerHTML =
        "<p>Error fetching the comments. Please try again.</p>";
    }
  });

  function displayComments(comments) {
    commentDetails.innerHTML = "";
    if (comments.length === 0) {
      commentDetails.innerHTML = "<p>No comments found for this ID.</p>";
      return;
    }

    comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";
      commentDiv.innerHTML = `
                <p><strong>Post ID:</strong> ${comment.postId}</p>
                <p><strong>ID:</strong> ${comment.id}</p>
                <p><strong>Name:</strong> ${comment.name}</p>
                <p><strong>Email:</strong> ${comment.email}</p>
                <p><strong>Body:</strong> ${comment.body}</p>
            `;
      commentDetails.appendChild(commentDiv);
    });
  }
});
