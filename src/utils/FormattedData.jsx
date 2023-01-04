export const formattedDate = (date) => {
    let d = new Date(date);
    let cd = (num) => num.toString().padStart(2, 0);
    return (
        cd(d.toString().substring(4, 8)) +
        " " +
        cd(d.getDate()) +
        " at " +
        cd(d.getHours()) +
        ":" +
        cd(d.getMinutes())
    );
};
