import { PrismaClient } from "@prisma/client";

import { ingredientList, recipeList } from "./seedData";

const createPrismaClient = () =>
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

const db = createPrismaClient();

const USER_ID = "clw22cg6l0001a0qck6jtvyx4";

const run = async () => {
  // delete all data

  // NOTE: user has to be already created

  // create ingredients
  await Promise.all(
    ingredientList.map(async (ingredient) => {
      return db.ingredient.create({
        data: { ...ingredient },
      });
    }),
  );

  await Promise.all(
    recipeList.map(async (recipe) => {
      return db.recipe.upsert({
        // data: {
        //   name: ingredient.name,
        //   description: ingredient.description,
        //   mealType: ingredient.mealType,
        //   createdBy: { connect: { id: USER_ID } },
        //   mealIngredient: {
        //     create: ingredient.mealIngredient.map((ingredient) => ({
        //       quantity: ingredient.quantity,
        //       unit: ingredient.unit,
        //       ingredient: { connect: { id: ingredient.ingredientId } },
        //     })),
        //   },
        create: {
          createdBy: { connect: { id: USER_ID } },
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
        // },
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
