import { styled } from "@mui/system";

export const StyledFilterInput = styled("span")<{
    width?: number;
}>((props) => ({
    width: props.width ? props.width : "100%",
    height: "fit-content",
    position: "relative",

    "& > input": {
        width: "100%",
        height: 40,
        borderRadius: 8,
        outline: "none",
        border: "none",
        boxSizing: "border-box",
        backgroundColor: "#303133",
        padding: 10,
        paddingLeft: 42.5,
        color: "#FFFFFF",
        fontSize: 14
    },
    "& > span": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 12.5, top: "50%",
        transform: "translate(0, -50%)"
    }
}));