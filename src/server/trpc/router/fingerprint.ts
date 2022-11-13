import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const fingerprintRouter = router({
  getAllFingerprints: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.fingerprint_locations.findMany({
        select: {
          //id: true,
          room: true,
          coord: true,
          signal: true,
        },
        orderBy: {
          room: "desc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),
  postFingerprint: protectedProcedure
    .input(
      z.object({
        room: z.string(),
        coord: z.string(),
        signal: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.fingerprint_locations.create({
          data: {
            room: input.room,
            coord: input.coord,
            signal: input.signal,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
