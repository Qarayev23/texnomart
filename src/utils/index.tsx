export default function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertIntObj(obj: any): any {
    const res: any = {};
    for (const prop in obj) {
        const parsed = parseInt(obj[prop], 10);
        res[prop] = isNaN(parsed) ? obj[prop] : parsed;
    }
    return res;
}