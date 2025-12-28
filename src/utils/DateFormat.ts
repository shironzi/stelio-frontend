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

export const chatDateFormatted = (date: string) => {
    const newDate = new Date(date);
    const today = new Date();

    if (newDate.getDate() === today.getDate() &&
        newDate.getMonth() === today.getMonth() &&
        newDate.getFullYear() === today.getFullYear()) {
        return 'Today';
    }

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    if (newDate >= startOfWeek && newDate <= endOfWeek) {
        const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
        return newDate.toLocaleDateString('en-US', options);
    }

    return newDate.toLocaleDateString();
}
