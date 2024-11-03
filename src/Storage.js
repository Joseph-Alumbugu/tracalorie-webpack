class Storage {
    static  getCalorieLimit(defaultLimit = 2000) {
        let calorieLimit;
        if(localStorage.getItem('calorieLimit') === null){
            calorieLimit = defaultLimit
        }else {
            calorieLimit = +localStorage.getItem('calorieLimit')
        }
        return calorieLimit
    }

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit',calorieLimit)
    }

    static getTotalCalories(defaultCalories = 0) {
        let totalCalories 

        if(localStorage.getItem('totalCalories') === null){
            totalCalories = defaultCalories
        }else{
           totalCalories = +localStorage.getItem('totalCalories')
        }

        return totalCalories

    }

    static updateTotalcolories(calories){
        localStorage.setItem('totalCalories',calories)
    }

    static getMeals() {
        let meals = []

        if(localStorage.getItem('meal') === null){
            meals = []
        }else{
           meals = (JSON.parse(localStorage.getItem('meal')))
        }

        return meals;

    }


    static saveMeal(meal) {
        let storage = Storage.getMeals() 
        storage.push(meal)

        localStorage.setItem('meal',JSON.stringify(storage))
    }

    static getWorkout() {
        let workout = []

        if(localStorage.getItem('workouts') === null){
            workout = []
        }else{
           workout = (JSON.parse(localStorage.getItem('workouts')))
        }

        return workout;

    }

    static saveWorkout(workout) {
        let storage = Storage.getWorkout()
        storage.push(workout)

        localStorage.setItem('workouts',JSON.stringify(storage))
    }
    
    static removeMeal (id) {
        let storage = JSON.parse(localStorage.getItem('meal'))
        const index = storage.findIndex(((meal) => meal.id === id) )
        if (!index) {    
            storage.splice(index,1)
           
        }
        return localStorage.setItem('meal',JSON.stringify(storage))
             
    }
    static removeWorkout (id) {
        const workouts = JSON.parse(localStorage.getItem('workouts'))
        
        
        workouts.forEach((workout,index) => {
            
            if (workout.id === id) {    
               workouts.splice(index,1)
               
            }
        })
        return localStorage.setItem('workouts',JSON.stringify(workouts))
    }

    static clearAll () {
        localStorage.removeItem('totalCalories')
        localStorage.removeItem('workouts')
        localStorage.removeItem('meal')

    }
}

export default Storage