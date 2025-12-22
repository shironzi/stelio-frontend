// returns formatted date with Month and date (Dec 22)
export const formatDateMDY = (date: string) => {
    const newDate = new Date(date);

    return newDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
}

// returns year (2025)
export const formatDateYear = (date: string) => {
    const newDate = new Date(date);
    return newDate.getFullYear();
}