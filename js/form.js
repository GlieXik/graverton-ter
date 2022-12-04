const form = document.querySelector(".modal-form");

const handleSubmit = (event) => {
  event.preventDefault();
  const {
    elements: { userName, userTel, userEmail, comment, modalCheckbox },
  } = event.currentTarget;

  const formData = {
    name: userName.value,
    phone: userTel.value,
    email: userEmail.value,
    comment: comment.value,
    confirmation: modalCheckbox.checked,
  };

  axios.post("http://localhost:3000", formData).catch((e) => console.error(e));
};

form.addEventListener("submit", handleSubmit);
