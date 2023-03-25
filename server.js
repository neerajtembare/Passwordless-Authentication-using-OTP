const express = require("express");
const app = express();
const PORT = 3000;

const accountSid = "ACc5a4efdedda7d58cfe8ebe2993ba2a5d";
const authToken = "f33722b1ac57d81ed21b3c547653ca8f";
const serviceId = "VA7faf86329e868b32ce29ee3d9bf073ec"
const client = require('twilio')(accountSid, authToken);

app.use(express.static("public"));
app.use(express.json());

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post(`/send-verification-otp`, (req, res) => {
  const { mobileNumber } = req.body;

  client.verify.v2
    .services(serviceId)
    .verifications.create({ to: "+91" + mobileNumber, channel: "sms" })
    .then((verification) => {
      return res.status(200).json({ verification });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
});

app.post(`/verify-otp`, (req, res) => {
  const { mobileNumber, code } = req.body;
  client.verify.v2
    .services(serviceId)
    .verificationChecks.create({ to: "+91" + mobileNumber, code })
    .then((verification_check) => {
      return res.status(200).json({ verification_check });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
