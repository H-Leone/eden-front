import { styled } from "@mui/system";

export const StyledServicesNavigation = styled("nav")({
    display: "flex",
    alignItems: "center",
    gap: 15,

    "& div": {
        width: 60,
        height: 60,
        backgroundColor: "#191B1D",
        borderRadius: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    }
});