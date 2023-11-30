import { styled } from "@mui/system";

export const StyledStatusList = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "space-evenly",
    "&::-webkit-scrollbar": {
        display: "none",
    },

    "& > div": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        "& > div": {
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "space-evenly",
            marginTop: 30,
        },

        "& p": {
            margin: 0,
        },
        "& > section": {
            height: 20,
            backgroundColor: "#1A1D1F",
            padding: 15,
            userSelect: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
            borderRadius: 4,
        }
    }
});