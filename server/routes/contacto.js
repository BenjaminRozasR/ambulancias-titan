// server/routes/contacto.js
const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");

// Configurar SendGrid con la API key del entorno
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const to = process.env.EMAIL_TO || process.env.EMAIL_FROM;
    const from = process.env.EMAIL_FROM;

    const mailOptions = {
      to,
      from,
      subject: "Nuevo mensaje desde el formulario de contacto",
      text: `
Nombre: ${nombre}
Correo: ${email}
Teléfono: ${telefono || "-"}
Mensaje:
${mensaje}
      `,
      html: `
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || "-"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, "<br/>")}</p>
      `,
    };

    await sgMail.send(mailOptions);

    res.json({ ok: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo de contacto (SendGrid):", error);
    res
      .status(500)
      .json({ error: "Error al enviar el mensaje", detail: error.message });
  }
});

module.exports = router;
