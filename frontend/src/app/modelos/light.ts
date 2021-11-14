export class Light {
    constructor(name = '', room_name = '', state = false){
        this.name = name;
        this.room_name = room_name;
        this.state = state;
    }
    name: string;
    room_name: string;
    state: boolean;
}
