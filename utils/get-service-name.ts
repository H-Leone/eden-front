export default function getServiceName(name: string) {
    switch (name) {
        case "jira":
            return "Jira - Atlassian";
        case "oracle":
            return "Oracle Cloud Infrastructure";
        case "aws":
            return "Amazon Web Services";
        default:
            return "Error";
    }
}