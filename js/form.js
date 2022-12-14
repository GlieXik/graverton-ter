const form = document.querySelector(".modal-form");

function toggleModal() {
  refs.modal.classList.toggle("is-hidden");
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const {
    elements: { userName, userTel, userEmail, comment },
  } = event.currentTarget;

  const formData = {
    name: userName.value,
    phone: userTel.value,
    email: userEmail.value,
    comment: comment.value,
  };

  await axios
    .post("https://graverton-ter.onrender.com", formData)

    .catch((e) => console.error(e))
    .finally(toggleModal());
};

form.addEventListener("submit", handleSubmit);
