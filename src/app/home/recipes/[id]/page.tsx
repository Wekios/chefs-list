"use client";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FolderIcon from "@mui/icons-material/Folder";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import Snackbar from "@mui/joy/Snackbar";
import Tooltip from "@mui/joy/Tooltip";
import Typography from "@mui/joy/Typography";
import { useState } from "react";

export default function RecipeIdPage({ params }: { params: { id: string } }) {
  const [open, setOpen] = useState({ 0: false, 1: false, 2: false });

  const handleSnackbarOpen = (index: number) => {
    setOpen((prev) => ({ ...prev, [index]: true }));
  };

  const handleSnackbarClose = (index: number) => {
    setOpen((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <Sheet sx={{ borderRadius: "sm", mb: 3, minHeight: 500, p: 2 }} variant="outlined">
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Avatar src="https://i.pravatar.cc/40?img=3" srcSet="https://i.pravatar.cc/80?img=3" />
          <Box sx={{ ml: 2 }}>
            <Typography level="title-sm" mb={0.5} textColor="text.primary">
              Alex Jonnold
            </Typography>
            <Typography level="body-xs" textColor="text.tertiary">
              21 Oct 2022
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, height: "32px" }}>
          <Button
            color="neutral"
            onClick={() => handleSnackbarOpen(0)}
            size="sm"
            startDecorator={<ReplyRoundedIcon />}
            variant="plain"
          >
            Reply
          </Button>
          <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            color="success"
            endDecorator={
              <Button
                color="neutral"
                onClick={() => handleSnackbarClose(0)}
                size="sm"
                variant="soft"
              >
                Dismiss
              </Button>
            }
            onClose={() => handleSnackbarClose(0)}
            open={open[0]}
            startDecorator={<CheckCircleRoundedIcon />}
          >
            Your message has been sent.
          </Snackbar>
          <Button
            color="neutral"
            onClick={() => handleSnackbarOpen(1)}
            size="sm"
            startDecorator={<ForwardToInboxRoundedIcon />}
            variant="plain"
          >
            Forward
          </Button>
          <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            color="success"
            endDecorator={
              <Button
                color="neutral"
                onClick={() => handleSnackbarClose(1)}
                size="sm"
                variant="soft"
              >
                Dismiss
              </Button>
            }
            onClose={() => handleSnackbarClose(1)}
            open={open[1]}
            startDecorator={<CheckCircleRoundedIcon />}
          >
            Your message has been forwarded.
          </Snackbar>
          <Button
            color="danger"
            onClick={() => handleSnackbarOpen(2)}
            size="sm"
            startDecorator={<DeleteRoundedIcon />}
            variant="plain"
          >
            Delete
          </Button>
          <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            color="danger"
            endDecorator={
              <Button
                color="neutral"
                onClick={() => handleSnackbarClose(2)}
                size="sm"
                variant="soft"
              >
                Dismiss
              </Button>
            }
            onClose={() => handleSnackbarClose(2)}
            open={open[2]}
            startDecorator={<CheckCircleRoundedIcon />}
          >
            Your message has been deleted.
          </Snackbar>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ alignItems: "start", display: "flex", flexDirection: "column", py: 2 }}>
        <Typography
          endDecorator={
            <Chip color="warning" component="span" size="sm" variant="outlined">
              Personal
            </Chip>
          }
          level="title-lg"
          textColor="text.primary"
        >
          Details for our Yosemite Park hike
        </Typography>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mt: 1,
          }}
        >
          <div>
            <Typography component="span" level="body-sm" sx={{ display: "inline-block", mr: 1 }}>
              From
            </Typography>
            <Tooltip size="sm" title="Copy email" variant="outlined">
              <Chip color="primary" onClick={() => {}} size="sm" variant="soft">
                alex.jonnold@hike.com
              </Chip>
            </Tooltip>
          </div>
          <div>
            <Typography component="span" level="body-sm" sx={{ display: "inline-block", mr: 1 }}>
              to
            </Typography>
            <Tooltip size="sm" title="Copy email" variant="outlined">
              <Chip color="primary" onClick={() => {}} size="sm" variant="soft">
                steve@mail.com
              </Chip>
            </Tooltip>
          </div>
        </Box>
      </Box>
      <Divider />
      <Typography level="body-sm" mb={2} mt={2}>
        Hello, my friend!
        <br />
        <br />
        So, it seems we are getting there! Our trip is finally here. As you know, I love Yosemite
        National Park, a lot of great climbers and explorers have made history there, so I&apos;m
        very excited to bring you with me in this journey.
        <br />
        <br />
        There are plenty of amazing things to see there, from internationally recognized granite
        cliffs, waterfalls, clear streams, giant sequoia groves, lakes, mountains, meadows,
        glaciers, and a lot o biological diversity. It is amazing that almost 95 percent of the park
        is designated wilderness. Yosemite is one of the largest and least fragmented habitat blocks
        in the Serra Nevada, and the park supports a fantastic diversity of plants and animals.
        <br />
        <br />
        I really hope you love coming along with me, we will have an awesome time! I&apos;m
        attaching a few pics I took on the last time I went there-get excited!
        <br />
        <br />
        See you soon, Alex Jonnold
      </Typography>
      <Divider />
      <Typography level="title-sm" mb={2} mt={2}>
        Attachments
      </Typography>
      <Box
        sx={(theme) => ({
          "& > div": {
            "--Card-padding": "0px",
            "--Card-radius": theme.vars.radius.sm,
            boxShadow: "none",
          },
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        })}
      >
        <Card variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
            <img
              alt="Yosemite National Park"
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&h=80"
              srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&h=160 2x"
            />
          </AspectRatio>
        </Card>
        <Card variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
            <img
              alt="Yosemite National Park"
              src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&h=80"
              srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&h=160 2x"
            />
          </AspectRatio>
        </Card>
        <Card orientation="horizontal" variant="outlined">
          <CardOverflow>
            <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
              <div>
                <FolderIcon />
              </div>
            </AspectRatio>
          </CardOverflow>
          <Box sx={{ pr: 2, py: { sm: 2, xs: 1 } }}>
            <Typography color="primary" level="title-sm">
              videos-hike.zip
            </Typography>
            <Typography level="body-xs">100 MB</Typography>
          </Box>
        </Card>
      </Box>
    </Sheet>
  );
}
