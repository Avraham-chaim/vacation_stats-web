export class LikeModel {
    public destination: string;
    public likes: number;

    constructor(destination: string, likes: number) {
        this.destination = destination;
        this.likes = likes;
    }
}
