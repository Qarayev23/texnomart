export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const setFiterTitle = (item : string) => {
    return item ===  "brand" && "Brend" || item ===  "operationTime" && "İşləmə müddəti" || item ===  "ram" && "Operativ yaddaş" || item ===  "memory" && "Daxili yaddaş"
  }