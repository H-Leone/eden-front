export function isToday(secs: number) {
    const d = new Date(secs * 1000);
    const n = new Date();

    return (
        d.getDate() === n.getDate() &&
        d.getMonth() === n.getMonth() &&
        d.getFullYear() === n.getFullYear()
    );
}