import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { fingerprintRouter } from "./fingerprint";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  fingerprint: fingerprintRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
