"use client";

import {
  Box,
  // Card,
  Button,
  Container,
  List,
  ListItem,
} from "@mui/joy";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Typography, { typographyClasses } from "@mui/joy/Typography";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function LandingScreen({
  children,
  reversed,
}: React.PropsWithChildren<{ reversed?: boolean }>) {
  return (
    <Container
      sx={(theme) => ({
        alignItems: "center",
        display: "flex",
        flexDirection: reversed ? "column-reverse" : "column",
        gap: 4,
        minHeight: "100vh",
        position: "relative",
        py: 10,
        [theme.breakpoints.up(834)]: {
          flexDirection: "row",
          gap: 6,
        },
        [theme.breakpoints.up(1199)]: {
          gap: 12,
        },
      })}
    >
      <Image
        alt="cutlery, veggies and list of ingredients"
        height={500}
        priority
        src="/bulky-guy-chef-list-removebg-preview.png"
        width={500}
      />
      <Box
        sx={(theme) => ({
          [`& .${typographyClasses.root}`]: {
            textWrap: "balance",
          },
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          flexShrink: 999,
          gap: "1rem",
          maxWidth: "50ch",
          textAlign: "center",
          [theme.breakpoints.up(834)]: {
            alignItems: "flex-start",
            minWidth: 420,
            textAlign: "initial",
          },
        })}
      >
        <Typography
          fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
          fontWeight="xl"
          level="h1"
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
        {/* <Card
          variant="outlined"
          color="neutral"
          orientation="horizontal"
          sx={{ gap: 2, my: 1, textAlign: "left" }}
        >
          <AutoAwesomeIcon color="success" fontSize="medium" />
          <div>
            <Typography fontSize="xl" fontWeight="lg" sx={{ mb: 1 }}>
              The new version is out.
            </Typography>
            <Typography level="body-sm">
              This is where a notification message will appear. <br />
              Enter text into this container.
            </Typography>
          </div>
        </Card> */}
        {/* <Link href="> */}
        <Button component={Link} href="/auth/sign-in" size="lg">
          Get Started
        </Button>
        {/* </Link> */}
      </Box>
    </Container>
  );
}
