const socket = io("https://graverton-ter.onrender.com", {
  transports: ["websocket"],
});

axios.defaults.baseURL = "https://graverton-ter.onrender.com";
const order = (data) => {
  const maping = data
    .map(({ _id: id, name, phone, email, comment, status }) => {
      const checkStatus = status ? "checked" : "";

      return ` <div class="order">
    <div class="order__name">
      Name:<br />
      ${name}
    </div>
    <div class="order__phone">
      Phone:<br />
      ${phone}
    </div>
    <div class="order__email">
      Email:<br />
      ${email}
    </div>
    <div class="order__comment">
      Comment:<br />
     ${comment ? comment : "Empty"}


    </div>
      
    <label class="containerCheck">
    <input type="checkbox" name="status" id="status" ${checkStatus}  onchange="toggleStatus(this,'${id}')" >
    <span class="checkmark"></span>
  </label>


    <button class="admin-button" onclick='getId("${id}")'>
    <svg class="menu-btn__icon">
    <use
      href="./images/icon/icons.svg#icon-bin"

    ></use>

  </svg>
  </button>
    </div>
    `;
    })
    .join(" ");
  container.innerHTML = maping;
};
var orderList;
socket.on("start", (data) => {
  console.log("connect", data);
  orderList = data;

  order(orderList.reverse());
});
socket.on("change", (data) => {
  console.log("change", data);
  orderList = data;
  order(orderList.reverse());
});

const container = document.getElementById("orders");

async function getId(id) {
  const del = await axios.delete(`${id}`);
  location.reload();
}
async function toggleStatus(element, id) {
  const bool = element.checked;
  console.log("====================================");
  console.log("id", element.checked, id);
  console.log("====================================");

  await axios({
    method: "patch",
    url: `${id}/status`,
    data: {
      status: bool,
    },
  });
}
