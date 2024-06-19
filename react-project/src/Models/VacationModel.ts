export class VacationModel {
    public past_vacations: number;
    public on_going_vacations: number;
    public future_vacations: number;

    constructor(past_vacations: number, on_going_vacations: number, future_vacations: number) {
        this.past_vacations = past_vacations;
        this.on_going_vacations = on_going_vacations;
        this.future_vacations = future_vacations;
    }
}
