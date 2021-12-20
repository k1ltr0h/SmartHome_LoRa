export class Room {
    constructor(name = '', temp = 0, hum = 0){
        this.name = name;
        this.temp = temp;
        this.hum = hum;
    }
    name: string;
    temp: number;
    hum: number;
}
