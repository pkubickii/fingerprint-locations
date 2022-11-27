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
          beacons: true,
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
          select: {
            id: true,
            room: true,
            coord: true,
            beacons: true,
          },
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
        beacons: z.object({
          name: z.string(),
          power: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.fingerprint_locations.create({
          data: {
            room: input.room,
            coord: input.coord,
            beacons: {
              create: {
                name: input.beacons.name,
                power: input.beacons.power,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  updateFingerprint: protectedProcedure
    .input(
      z.object({
        id: z.optional(z.string()),
        room: z.optional(z.string()),
        coord: z.optional(z.string()),
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
