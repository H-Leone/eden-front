"use client";

import { styled } from "@mui/system"; 

export const StyledSidebar = styled("aside")<{ isMenuOpen: boolean; }>((props) => ({
    position: "fixed",
    top: 0, left: 0,
    width: 240,
    height: "100dvh",
    backgroundColor: "#191B1D",
    padding: 15,
    boxSizing: "border-box",
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    gap: 25,

    "& > section": {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    }
}));