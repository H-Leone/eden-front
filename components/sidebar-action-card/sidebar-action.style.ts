import { styled } from "@mui/system";

export const StyledSidebarActionCard = styled("div")<{
    isMenuOpen: boolean;
}>((props) => ({
    fontSize: 14,
    cursor: "pointer",
    userSelect: "none",

    "& > section": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12.5,
        boxSizing: "border-box",
        borderRadius: 8,
        backgroundColor: "#303133",
        width: "100%",
        height: 40,

        "& > section": {
            display: "flex",
            alignItems: "center",
            gap: 10,
        },
        "& > span": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: props.isMenuOpen && "rotate(180deg)",
            transitionDuration: "0.2s"
        },
        transitionDuration: "0.2s",
        "&:hover": {
            backgroundColor: "rgba(48, 49, 51, 0.6)"
        }
    },

    "& > div": {
        marginTop: 5,
        minWidth: "100%",
        display: props.isMenuOpen ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "center",
    },
}));