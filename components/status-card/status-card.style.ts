import { styled } from "@mui/system";

export const StyledStatusCard = styled("div")<{
    isInfoOpen: boolean;
}>((props) => ({
    "& > section": {
        zIndex: 5,
        width: 320,
        height: 60,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        boxSizing: "border-box",
        borderRadius: props.isInfoOpen ? "8px 8px 0 0" : 8,
        backgroundColor: "#303133",
        userSelect: "none",
        cursor: "pointer",
    
        "& > div": {
            display: "flex",
            alignItems: "center",
            gap: 10,
    
            "& > p": {
                fontSize: 13,
                minWidth: 230,
                maxWidth: 230,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            },
            "& > span": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }
        },
        "& > svg": {
            transform: props.isInfoOpen && "rotate(180deg)",
            transitionDuration: "0.3s"
        }
    },
    "& > div": {
        width: 320,
        height: 70,
        padding: "0 15px",
        boxSizing: "border-box",
        backgroundColor: "#1A1D1F",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        "& > p": {
            margin: 0,
            fontSize: 13,
        }
    }
}));