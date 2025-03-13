const { exec } = require("child_process");
const path = require("path");
const scriptPath = path.join(__dirname, "clearCart.js");

const cron = require("node-cron");

cron.schedule("0 0 */3 * *", () => {
  exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Cron Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Cron Stderr: ${stderr}`);
      return;
    }
    console.log(`Cron Output: ${stdout}`);
  });
});
