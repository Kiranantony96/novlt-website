const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Replace with your Gmail + app password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "novltassociates@gmail.com",         // your Gmail address
    pass: "YOUR_APP_PASSWORD_HERE"             // your app password (not Gmail login password!)
  }
});

app.post("/enquiry", (req, res) => {
  const { name, phone, time, message } = req.body;

  console.log("New Enquiry:", { name, phone, time, message });

  const mailOptions = {
    from: "novltassociates@gmail.com",
    to: "novltassociates@gmail.com", // you can add more recipients
    subject: "New Service Enquiry from Website",
    text: `
      Name: ${name}
      Phone: ${phone}
      Preferred Time: ${time}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      res.status(500).json({ message: "Failed to send enquiry email." });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Enquiry received and emailed!" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
