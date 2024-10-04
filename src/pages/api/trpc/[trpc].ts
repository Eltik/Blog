import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// export API handler
export default createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
    maxBodySize: 100000,
    allowBatching: true,
    onError:
        env.NODE_ENV === "development"
            ? ({ path, error }) => {
                  console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
              }
            : undefined,
});

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "100mb",
        },
        responseLimit: "100mb",
    },
};
