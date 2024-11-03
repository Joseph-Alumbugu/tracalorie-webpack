class Meal {
    constructor (name,calorie) {
        this.id =  Math.random().toString(16).slice(2)
        this.name = name;
        this.calorie = calorie
    }
}

class Workout {
    constructor (name,calorie) {
        this.id =  Math.random().toString(16).slice(2)
        this.name = name;
        this.calorie = calorie
    }
}

export {
    Meal,
    Workout
}