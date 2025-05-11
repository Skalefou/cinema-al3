export class MovieTheater {
    constructor(
       public name: string,
       public description: string,
       public images: string[],
       public capacity: number,
       public disabledAccess: boolean,
       public id?: string,
    ) {}
}