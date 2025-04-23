import { PrismaClient } from "@prisma/client";

// Create a new Prisma client instance
const prisma = new PrismaClient();

// Add event listeners for SIGINT and SIGTERM to gracefully close Prisma connection
const handleShutdown = () => {
  console.log("Received termination signal, closing Prisma client...");
  prisma
    .$disconnect()
    .then(() => {
      console.log("Prisma client disconnected.");
      process.exit(0); // Exit the process successfully
    })
    .catch((error) => {
      console.error("Error during Prisma client disconnection:", error);
      process.exit(1); // Exit with error code if something goes wrong
    });
};

// Listen for SIGINT (Ctrl+C) and SIGTERM (e.g., Kubernetes pod termination)
process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);

export { prisma };
