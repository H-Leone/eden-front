interface Props {
    amount: number;
    name: string;
}

function InfoCard({ amount, name }: Props) {
    return (
        <div style={{
            width: 300,
            height: 300,
            backgroundColor: "#191B1D",
            border: "2px solid #454648",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#FFFFFF",
            userSelect: "none"
        }}>
            <h2 style={{ margin: 0, fontSize: 60 }}>{amount}</h2>
            <p style={{ margin: 0, fontSize: 20 }}>{name}</p>
        </div>
    );
}

export default InfoCard;