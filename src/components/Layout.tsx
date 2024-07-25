import Box, { BoxProps } from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import * as React from "react";

function Root(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        {
          display: "grid",
          gridTemplateColumns: {
            md: "minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)",
            sm: "minmax(64px, 200px) minmax(450px, 1fr)",
            xs: "1fr",
          },
          gridTemplateRows: "64px 1fr",
          minHeight: "100vh",
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function Header(props: BoxProps) {
  return (
    <Box
      component="header"
      {...props}
      sx={[
        {
          alignItems: "center",
          bgcolor: "background.surface",
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "row",
          gap: 2,
          gridColumn: "1 / -1",
          justifyContent: "space-between",
          p: 2,
          position: "sticky",
          top: 0,
          zIndex: 1100,
        },
      ]}
    />
  );
}

function SideNav(props: BoxProps) {
  return (
    <Box
      className="Navigation"
      component="nav"
      {...props}
      sx={[
        {
          bgcolor: "background.surface",
          borderColor: "divider",
          borderRight: "1px solid",
          display: { sm: "initial", xs: "none" },
          p: 2,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function SidePane(props: BoxProps) {
  return (
    <Box
      className="Inbox"
      {...props}
      sx={[
        {
          bgcolor: "background.surface",
          borderColor: "divider",
          borderRight: "1px solid",
          display: {
            md: "initial",
            xs: "none",
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function Main(props: BoxProps) {
  return (
    <Box
      className="Main"
      component="main"
      {...props}
      sx={[{ p: 2 }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
    />
  );
}

function SideDrawer(props: { onClose: React.MouseEventHandler<HTMLDivElement> } & BoxProps) {
  const { onClose, ...other } = props;
  return (
    <Box
      {...other}
      sx={[
        { height: "100%", position: "fixed", width: "100%", zIndex: 1200 },
        ...(Array.isArray(other.sx) ? other.sx : [other.sx]),
      ]}
    >
      <Box
        onClick={onClose}
        role="button"
        sx={{
          bgcolor: (theme) => `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
          inset: 0,
          position: "absolute",
        }}
      />
      <Sheet
        sx={{
          bgcolor: "background.surface",
          boxShadow: "lg",
          height: "100%",
          minWidth: 256,
          p: 2,
          width: "max-content",
        }}
      >
        {props.children}
      </Sheet>
    </Box>
  );
}

const Layout = {
  Header,
  Main,
  Root,
  SideDrawer,
  SideNav,
  SidePane,
};

export default Layout;
