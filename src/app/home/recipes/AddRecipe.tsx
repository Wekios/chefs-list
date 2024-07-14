"use client";

import BackspaceIcon from "@mui/icons-material/Backspace";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import {
  Box,
  Button,
  Chip,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Option,
  Select,
  Stack,
  Textarea,
} from "@mui/joy";
import { IngredientUnit, MealType } from "@prisma/client";
import { Fragment, useEffect, useState } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { AddRecipeSchema } from "~/app/validation";
import { api } from "~/trpc/react";

const defaultIngredient = { name: "", quantity: 1, unit: IngredientUnit.PIECE };

export default function AddRecipe() {
  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const { control, handleSubmit, reset, watch } = useForm<AddRecipeSchema>({
    defaultValues: {
      description: "",
      ingredients: [defaultIngredient],
      mealType: [],
      name: "",
    },
  });
  const { append, fields, remove, replace } = useFieldArray({ control, name: "ingredients" });
  const addRecipe = api.recipe.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      utils.recipe.getAll.invalidate();
    },
  });

  useEffect(() => {
    reset();
  }, [open, reset]);

  const ingredientFields = watch("ingredients");

  const handleAddAnotherField = () => {
    append(defaultIngredient);
  };

  const onSubmit: SubmitHandler<AddRecipeSchema> = (fields) => {
    addRecipe.mutate({
      ...fields,
      ingredients: fields.ingredients.map((ingredient) => ({
        ...ingredient,
        name: ingredient.name.trim(),
        quantity: Number(ingredient.quantity),
      })),
    });
  };

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} size="sm" startDecorator={<CreateRoundedIcon />}>
        Add new recipe
      </Button>
      <Modal onClose={() => setOpen(false)} open={open}>
        <ModalOverflow>
          <ModalDialog minWidth="md">
            <ModalClose />
            <DialogTitle>Create recipe</DialogTitle>
            <DialogContent>Fill in the recipe information.</DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormControl error={Boolean(fieldState.error)}>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} />
                    <FormHelperText>{fieldState.error?.message}</FormHelperText>
                  </FormControl>
                )}
                rules={{ required: "Required" }}
              />
              <Stack mb={3} spacing={1}>
                {fields.map((ingredient, index) => (
                  <Box display="flex" gap={1} key={ingredient.id}>
                    <Controller
                      control={control}
                      name={`ingredients.${index}.name`}
                      render={({ field, fieldState }) => (
                        <FormControl error={Boolean(fieldState.error)}>
                          <FormLabel>Ingredient {index + 1}</FormLabel>
                          <Input
                            {...field}
                            autoFocus={ingredientFields.length > 0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddAnotherField();
                              }
                            }}
                          />
                        </FormControl>
                      )}
                      rules={{ required: "Required" }}
                    />
                    <Box alignItems="flex-end" display="flex">
                      <Controller
                        control={control}
                        name={`ingredients.${index}.quantity`}
                        render={({ field, fieldState }) => (
                          <FormControl error={Boolean(fieldState.error)}>
                            <FormLabel>Quantity</FormLabel>
                            <Input sx={{ width: "86px" }} type="number" {...field} />
                          </FormControl>
                        )}
                        rules={{ required: "Required" }}
                      />

                      <Controller
                        control={control}
                        name={`ingredients.${index}.unit`}
                        render={({ field, fieldState }) => (
                          <FormControl error={Boolean(fieldState.error)}>
                            <Select
                              sx={{ minWidth: "90px" }}
                              {...field}
                              onChange={(_, value) => field.onChange(value)}
                            >
                              {Object.keys(IngredientUnit).map((unit) => (
                                <Option key={unit} value={unit}>
                                  {unit.toLowerCase()}
                                </Option>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                        rules={{ required: "Required" }}
                      />

                      <IconButton
                        color="danger"
                        disabled={fields.length === 1}
                        onClick={() => remove(index)}
                        type="button"
                      >
                        <BackspaceIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
                <Box display="flex" gap={2} justifyContent="space-between">
                  <Button
                    autoFocus={false}
                    onClick={handleAddAnotherField}
                    sx={{
                      visibility: ingredientFields.at(-1)?.name === "" ? "hidden" : "visible",
                    }}
                    type="button"
                    variant="plain"
                  >
                    Add another ingredient
                  </Button>
                  <Button
                    color="danger"
                    disabled={fields.length <= 1}
                    onClick={() => replace([defaultIngredient])}
                    type="button"
                    variant="outlined"
                  >
                    Clear all
                  </Button>
                </Box>
              </Stack>

              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="mealType"
                  render={({ field, fieldState }) => (
                    <FormControl error={Boolean(fieldState.error)}>
                      <FormLabel>Meal type (optional)</FormLabel>
                      <Select
                        multiple
                        onChange={(_, value) => field.onChange(value)}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", gap: "0.25rem" }}>
                            {selected.map((selectedOption) => (
                              <Chip color="primary" key={selectedOption.value} variant="soft">
                                {selectedOption.label}
                              </Chip>
                            ))}
                          </Box>
                        )}
                        value={field.value}
                      >
                        {[MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER, MealType.SNACK].map(
                          (option) => (
                            <Option key={option} value={option}>
                              {option.toLowerCase()}
                            </Option>
                          ),
                        )}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <FormControl error={Boolean(fieldState.error)}>
                      <FormLabel>Instructions</FormLabel>
                      <Textarea minRows={2} {...field} />
                      <FormHelperText>{fieldState.error?.message}</FormHelperText>
                    </FormControl>
                  )}
                  rules={{ required: "Required" }}
                />

                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button
                    color="danger"
                    onClick={() => setOpen(false)}
                    type="button"
                    variant="plain"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </Box>
              </Stack>
            </form>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </Fragment>
  );
}
