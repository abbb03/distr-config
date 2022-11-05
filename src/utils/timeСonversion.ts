export const hoursToMillis = (hours: number): number => {
    return 1000 * 3600 * hours;
}

export const millisToHours = (millis: number): number => {
    return millis / (1000 * 3600);
}
