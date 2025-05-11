export class Movie {
    constructor(
        public title: string,
        public director: string,
        public releaseDate: Date,
        public duration: string,
        public readonly id?: string,
    )
    {}
}
