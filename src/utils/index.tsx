export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const setFiterTitle = (item: string) => {
    return item === "brand" && "Brend" || item === "operation_time" && "İşləmə müddəti" || item === "ram" &&
        "Operativ yaddaş" || item === "memory" && "Daxili yaddaş" || item === "screen_size" && "Ekran diaqonalı" ||
        item === "screen_permission" && "Ekran İcazəsi" || item === "management_type" && "İdarəetmə növü" || item === "capacity" && "Tutum"
        || item === "area" && "Təsir sahəsi" || item === "engine_type" && "Mühərrik növü"
    }