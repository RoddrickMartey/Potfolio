import { PrismaClient } from "@prisma/client";

// Create a new Prisma client instance
const prisma = new PrismaClient();

// Add event listeners for SIGINT and SIGTERM to gracefully close Prisma connection
const handleShutdown = () => {
  prisma
    .$disconnect()
    .then(() => {
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
