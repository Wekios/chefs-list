import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { ingredientList, recipeList } from "./seedData";

const createPrismaClient = () => new PrismaClient({ log: ["query", "error", "warn"] });

const db = createPrismaClient();

const run = async () => {
  // TODO: delete all data

  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync("password", salt);

  const user = await db.user.upsert({
    create: {
      email: "user@test.com",
      name: "Veljko Blagojevic",
      password: hashedPassword,
    },
    update: {},
    where: { email: "user@test.com" },
  });

  // create ingredients
  await Promise.all(
    ingredientList.map(async (ingredient) => db.ingredient.create({ data: ingredient })),
  );

  await Promise.all(
    recipeList.map(async (recipe) => {
      return db.recipe.upsert({
        create: {
          createdBy: { connect: { id: user.id } },
          description: recipe.description,
          mealIngredient: {
            create: recipe.mealIngredient.map((ingredient) => ({
              ingredient: { connect: { id: ingredient.ingredientId } },
              quantity: ingredient.quantity,
              unit: ingredient.unit,
            })),
          },
          mealType: recipe.mealType,
          name: recipe.name,
        },
        update: {},
        where: { id: recipe.id },
      });
    }),
  );
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.info("seeding complete");
    await db.$disconnect();
  });

// const run = async () => {
//   await Promise.all(
//     artistsData.map(async (artist) => {
//       return db.artist.upsert({
//         where: { name: artist.name },
//         update: {},
//         create: {
//           name: artist.name,
//           songs: {
//             create: artist.songs.map((song) => ({
//               name: song.name,
//               duration: song.duration,
//               url: song.url,
//             })),
//           },
//         },
//       });
//     })
//   );

//   const salt = bcrypt.genSaltSync();
//   const hashedPassword = bcrypt.hashSync("password", salt);

//   const user = await db.user.upsert({
//     where: { email: "user@test.com" },
//     update: {},
//     create: {
//       email: "user@test.com",
//       password: hashedPassword,
//       firstName: "Veljko",
//       lastName: "Blagojevic",
//     },
//   });

//   const songs = await db.song.findMany({});
//   await Promise.all(
//     new Array(10).fill(1).map(async (_, i) => {
//       return db.playlist.create({
//         data: {
//           name: `Playlist #${i + 1}`,
//           user: {
//             connect: { id: user.id },
//           },
//           songs: {
//             connect: songs.map((song) => ({
//               id: song.id,
//             })),
//           },
//         },
//       });
//     })
//   );
// };
