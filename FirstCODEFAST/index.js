let likesCounter = 0;
const likeButton = document.getElementById("likeButton");

// a function that increments no. of likes
const addLike = (incrementBy) => {
  likesCounter += incrementBy;
  // show no. of likes on the button, like this (3) Like 👍
  likeButton.innerText = `(${likesCounter}) Like 👍`;

  if (likesCounter === 10) {
    alert("Congrats!");
  }
};

likeButton.addEventListener("click", () => {
  addLike(1);
});
