import Winston from "winston";

function template(info: Winston.Logform.TransformableInfo) {
  return `${info.level} - ${new Date().toISOString()}  ${info.message}`;
}

const logger = Winston.createLogger({
  level: "info",
  format: Winston.format.combine(Winston.format.colorize(), Winston.format.printf(template)),
  transports: [new Winston.transports.Console()],
});

export default logger;
