export class UserMedicines {
    
    constructor(public id?: number, public userId?: number, public medicineId?: number, public fromDate?: Date, public toDate?:Date,public amount?:number,public timesADay?:number,public frequency?:number,public unitsInStock?:number) {
    }

}