import { Box, Button, Container, List, ListItem, Typography } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";

export default async function RootPage() {
  return (
    <main>
      <Container
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          gap: { lg: 12, md: 6, xs: 4 },
          minHeight: "100vh",
          position: "relative",
          py: 10,
        }}
      >
        <Image
          alt="cutlery, veggies and list of ingredients"
          height={500}
          priority
          src="/bulky-guy-chef-list-removebg-preview.png"
          width={500}
        />
        <Box
          sx={{
            alignItems: { md: "flex-start", xs: "center" },
            display: "flex",
            flexDirection: "column",
            flexShrink: 999,
            gap: "1rem",
            maxWidth: "50ch",
            textAlign: { md: "initial", xs: "center" },
          }}
        >
          <Typography
            fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            fontWeight="xl"
            level="h1"
            sx={{ textWrap: "balance" }}
          >
            Simplify meals and save time with a meal planner & shopping list
          </Typography>
          <List>
            <ListItem>Easily create and manage weekly meal plans</ListItem>
            <ListItem>Add recipes from your favorite cookbooks or websites</ListItem>
            <ListItem>Automatically generate shopping lists based on your meal plans</ListItem>
            <ListItem>Track your groceries and pantry items</ListItem>
            <ListItem>Share your meal plans and shopping lists with family and friends</ListItem>
          </List>

          <Button component={Link} href="/auth/sign-in" size="lg">
            Get Started
          </Button>
        </Box>
      </Container>
    </main>
  );
}
