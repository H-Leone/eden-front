import { styled } from "@mui/system";

export const StyledActionItem = styled("div")({
    "& > *": {
        margin: "0 auto",
        display: "flex",
        minWidth: "92.5%",
        maxWidth: "92.5%",
        height: 40,
        alignItems: "center",
        gap: 10,
        padding: 10,
        boxSizing: "border-box",
        textDecoration: "none",
        color: "#FFFFFF",
        borderRadius: 8,
        transitionDuration: "0.2s",

        "& > p": {
            fontSize: 10
        },
        "& > span": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },  
        "&:hover": {
            backgroundColor: "rgba(48, 49, 51, 0.6)"
        }
    }    
});