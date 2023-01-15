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
    .then(() => {
      console.log("sended");
      Toastify({
        text: "Відправленно✅",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #2196f3)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    })
    .catch((e) => {
      console.error(e);
      Toastify({
        text: "Не відправленно⛔️",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #f42, #2196f3)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    })
    .finally(toggleModal());
};

form.addEventListener("submit", handleSubmit);
