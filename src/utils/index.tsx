export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const setFiterTitle = (item: string) => {
    return item === "brand" && "Brend" || item === "operation_time" && "İşləmə müddəti" || item === "ram" &&
        "Operativ yaddaş" || item === "memory" && "Daxili yaddaş" || item === "screen_size" && "Ekran diaqonalı" ||
        item === "screen_permission" && "Ekran İcazəsi" || item === "management_type" && "İdarəetmə növü" || item === "capacity" && "Tutum"
        || item === "area" && "Təsir sahəsi" || item === "engine_type" && "Mühərrik növü"
}

export const stringToURLFriendly = (str : string) => {
    str = str.toLowerCase();
    str = str.replace(/\s+/g, '-');
    str = str.replace(/ğ/g, 'g');
    str = str.replace(/ü/g, 'u');
    str = str.replace(/ş/g, 's');
    str = str.replace(/ı/g, 'i');
    str = str.replace(/ö/g, 'o');
    str = str.replace(/ç/g, 'c');
    str = str.replace(/ə/g, 'e');
    str = str.replace(/[^a-z0-9-]/g, '');
    return str;
}