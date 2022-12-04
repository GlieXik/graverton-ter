const app = require("./app");

const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const connectionDb = mongoose.connect(process.env.HOST);

connectionDb
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
