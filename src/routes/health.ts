import type { FastifyPluginAsync } from "fastify";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async () => ({
    status: "ok",
    service: "api",
    timestamp: new Date().toISOString(),
  }));
};

// patch: 2026-06-05T08:27:41.538455

// patch: 2026-06-11T13:59:59.999990
