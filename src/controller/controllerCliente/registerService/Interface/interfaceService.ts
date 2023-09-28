export interface Service {
    addressId: number,
    diaristId: number | null,
    bedroom: number,
    livingRoom: number,
    kitchen: number,
    bathroom: number,
    office: number,
    laundry: number,
    garage: number,
    yard: number,
    recreationArea: number,
    typeCleaningId: number,
    hasChildren: boolean,
    hasPet: boolean,
    observation: string | null,
    additionalTasks: string| null,
    date: string,
    startHour: string,
    value: string
}  

