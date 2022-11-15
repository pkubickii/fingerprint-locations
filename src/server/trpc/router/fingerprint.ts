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
  getFingerprint: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.fingerprint_locations.findUnique({
          where: {
            id: input.id,
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
  updateFingerprint: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        room: z.string(),
        coord: z.string(),
        signal: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.fingerprint_locations.update({
          where: {
            id: input.id,
          },
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
