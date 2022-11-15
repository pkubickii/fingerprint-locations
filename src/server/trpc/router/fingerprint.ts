import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const fingerprintRouter = router({
  getAllFingerprints: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.fingerprint_locations.findMany({
        select: {
          id: true,
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
  editFingerprint: protectedProcedure
    .input(
      z.object({
        room: z.string(),
        signal: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.fingerprint_locations.updateMany({
          where: {
            room: input.room,
          },
          data: {
            signal: input.signal,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  deleteFingerprint: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.fingerprint_locations.deleteMany({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
