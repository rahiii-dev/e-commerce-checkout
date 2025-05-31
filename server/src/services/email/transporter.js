import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { requireEnv } from "../../utils/helper.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: requireEnv('MAILTRAP_HOST'),
  port: Number(requireEnv('MAILTRAP_PORT')),
  auth: {
    user: requireEnv('MAILTRAP_USER'),
    pass: requireEnv('MAILTRAP_PASS'),
  },
});

// Configure Handlebars plugin
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.join(__dirname, "./templates"),
      layoutsDir: path.join(__dirname, "./templates"),
      defaultLayout: false,
    
    },
    viewPath: path.join(__dirname, "./templates"),
    extName: ".hbs",
  })
);

export default transporter;
