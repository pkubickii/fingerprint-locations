import { prisma } from "../src/server/db/client";

async function main() {
  const room = "22";
  const coord = "13, 13";
  const beacons = [{ name: "beacon1", power: "102", roomId: room }];
  await prisma.example.upsert({
    where: {
      room,
    },
    create: {
      room,
      coord,
      beacons,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
