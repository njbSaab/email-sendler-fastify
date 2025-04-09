const fastify = require("fastify")({
  logger: true,
});
const path = require("path");
const sendMail = require("./config"); // Предполагаем, что файл config остается тем же

// Регистрируем плагины
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

fastify.register(require("@fastify/cors"));

// Маршрут для главной страницы
fastify.get("/", (request, reply) => {
  reply.sendFile("index.html");
});

// Новый endpoint для массовой отправки email
fastify.post("/users/email/send-bulk", async (request, reply) => {
  const { emails, subject, content } = request.body;
  request.log.info("Received bulk email request:", {
    emails,
    subject,
    content,
  });

  if (
    !emails ||
    !Array.isArray(emails) ||
    emails.length === 0 ||
    !subject ||
    !content
  ) {
    reply.code(400);
    return {
      success: false,
      message: "Emails array, subject, and content are required.",
    };
  }

  try {
    const isHtml = content.includes("<html");
    const emailPromises = emails.map((email) =>
      sendMail(email, subject, content, isHtml)
    );

    await Promise.all(emailPromises);

    reply.code(200);
    return {
      success: true,
      message: `Emails sent successfully to ${emails.length} recipients.`,
    };
  } catch (error) {
    request.log.error("Error sending bulk emails:", error);
    reply.code(500);
    return {
      success: false,
      message: "Failed to send bulk emails.",
    };
  }
});

// Запуск сервера
const start = async () => {
  try {
    const PORT = process.env.PORT || 3113;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server is running on port http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
