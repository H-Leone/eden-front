export function getCitiesByService(service: string) {
    const def = "Todas as cidades";
    switch (service) {
        case "aws":
            return [def, "Sao Paulo", "Virginia"];
        case "oracle":
            return [def, "Sao Paulo", "Vinhedo"];
        default:
            return null;
    }
}