// server/routes/contacto.js
const express = require("express");
const sgMail = require("@sendgrid/mail");

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const to = process.env.EMAIL_TO || process.env.EMAIL_USER;
    const from = process.env.EMAIL_USER;

    const text = `
Nombre: ${nombre}
Correo: ${email}
Teléfono: ${telefono || "-"}

Mensaje:
${mensaje}
    `;

    const html = `
      <h2>Nuevo mensaje desde la web</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono || "-"}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje.replace(/\n/g, "<br/>")}</p>
    `;

    const msg = {
      to,
      from,
      subject: "Nuevo mensaje desde el formulario de contacto",
      text,
      html,
    };

    const [response] = await sgMail.send(msg);

    console.log("✅ SendGrid statusCode:", response.statusCode);
    console.log("✅ SendGrid headers:", response.headers);

    return res.json({ ok: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo de contacto (SendGrid):", error);

    if (error.response && error.response.body) {
      console.error(
        "Detalle SendGrid:",
        JSON.stringify(error.response.body, null, 2)
      );
    }

    return res.status(500).json({ error: "Error al enviar el mensaje" });
  }
});

module.exports = router;
