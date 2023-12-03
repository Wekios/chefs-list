"use client";

import * as React from "react";
import Image from "next/image";
import {
  // Card,
  Button,
  Container,
  Box,
  List,
  ListItem,
} from "@mui/joy";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Typography, { typographyClasses } from "@mui/joy/Typography";
import Link from "next/link";

export default function LandingScreen({
  children,
  reversed,
}: React.PropsWithChildren<{ reversed?: boolean }>) {
  return (
    <Container
      sx={(theme) => ({
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: reversed ? "column-reverse" : "column",
        alignItems: "center",
        py: 10,
        gap: 4,
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
        priority
        width={500}
        height={500}
        src="/bulky-guy-chef-list-removebg-preview.png"
        alt="cutlery, veggies and list of ingredients"
      />
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "50ch",
          textAlign: "center",
          flexShrink: 999,
          [theme.breakpoints.up(834)]: {
            minWidth: 420,
            alignItems: "flex-start",
            textAlign: "initial",
          },
          [`& .${typographyClasses.root}`]: {
            textWrap: "balance",
          },
        })}
      >
        <Typography
          level="h1"
          fontWeight="xl"
          fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
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
        <Button size="lg" component={Link} href="/auth/sign-up">
          Get Started
        </Button>
        {/* </Link> */}
      </Box>
    </Container>
  );
}
