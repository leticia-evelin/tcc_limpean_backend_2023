export interface Service {
    addressId: number,
    bedroom: number,
    bathroom: number,
    office: number,
    laundry: number,
    garage: number,
    yard: number,
    idTypeCleaning: number,
    hasChildren: boolean,
    hasPet: boolean,
    observation: string | null,
    additionalTasks: string| null,
    date: string,
    startHour: string,
    value: string
}  

