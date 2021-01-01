const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());

// sendMail helper
function sendMail(mailOptions, transporter) {
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
}

// transporter
app.use(async (req, res, next) => {
  const { host, port, secure, username, password } = req.query;

  req.transporter = nodemailer.createTransport({
    host,
    port: port ? port : 465,
    secure: secure ? secure : true,
    auth: {
      user: username,
      pass: password,
    },
  });

  next();
});

// @POST
app.post("/api/mail", async (req, res) => {
  const { sender, recipients, subject, message } = req.body;

  try {
    recipients.forEach(async (rcp) => {
      await sendMail(
        {
          from: sender,
          to: rcp,
          subject,
          html: message,
        },
        req.transporter
      );
    });

    res.send('success');
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Server
app.listen(process.env.PORT || 8000, () =>
  console.log(`Server Running On Port:8000`)
);
