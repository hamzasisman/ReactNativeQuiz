export const getFormattedTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export const getAnswerTitleByIndex = (index) => {
    switch (index) {
        case 0:
            return "a)";
        case 1:
            return "b)";
        case 2:
            return "c)";
        case 3:
            return "d)";
    }
}