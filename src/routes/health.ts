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

// patch: 2026-06-23T08:27:41.538445

// patch: 2026-06-26T02:55:23.076905

// patch: 2026-07-04T10:18:27.692285

// patch: 2026-07-05T19:32:18.461515
