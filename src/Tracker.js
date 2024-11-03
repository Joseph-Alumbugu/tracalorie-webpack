import Storage from "./Storage";

class CalorieTracker {
    constructor() {
        this._calorieLimit = Storage.getCalorieLimit()
        this._totalCalories = Storage.getTotalCalories(0) ;
        this._meals = Storage.getMeals()
        this._workouts = Storage.getWorkout()

        this._displayCaloriesLimit()
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemain()

        document.getElementById('limit').value = this._calorieLimit
    }

    //PUBLIC METHODS

    addMeal(meal) {
        this._meals.push(meal)
        this._totalCalories += meal.calorie
        Storage.updateTotalcolories(this._totalCalories)
        Storage.saveMeal(meal)
        this._displayNewMeal(meal)
        this._render()
    }
    addWorkout(workout) {
        this._workouts.push(workout)
        this._totalCalories -= workout.calorie
        Storage.updateTotalcolories(this._totalCalories)
        Storage.saveWorkout(workout)
        this._displayNewWorkOut(workout)
        this._render()
    }

    removeMeal(id) {
        const index = this._meals.findIndex(((meal) => meal.id === id) )

        if (index !== -1) {
            const meal = this._meals[index]
            this._totalCalories -= meal.calorie
            Storage.updateTotalcolories(this._totalCalories)
            this._meals.splice(index,1)
            Storage.removeMeal(id)
            this._render()
        }

       

    }
    removeWorkout(id) {
        const index = this._workouts.findIndex(((workout) => workout.id === id) )
        

        if (index !== -1) {
            const workout = this._workouts[index]
            this._totalCalories += workout.calorie
            Storage.updateTotalcolories(this._totalCalories)
            this._workouts.splice(index,1)
            Storage.removeWorkout(id)
            this._render()
        }
    }

    reset() {
        this._totalCalories = 0
        this._meals = []
        this._workouts = []
        this._render()
    }

    caloriesLimit(limit) {
       
        this._calorieLimit = limit
        Storage.setCalorieLimit(limit)
        document.getElementById('calories-limit').textContent = this._calorieLimit
        this._render()
    }

    loadItems () {
        this._meals.forEach(meal => this._displayNewMeal(meal))
        this._workouts.forEach(workout => this._displayNewWorkOut(workout))
    }
    //PRIVATE METHODS
    _displayCaloriesTotal(){
        const totalCaloriesEl = document.getElementById('calories-total')  
        totalCaloriesEl.innerHTML = this._totalCalories
        
        if(this._totalCalories > this._calorieLimit ){
            totalCaloriesEl.parentElement.parentElement.classList.remove('bg-primary')
            totalCaloriesEl.parentElement.parentElement.classList.add('bg-danger')
        }else{
            totalCaloriesEl.parentElement.parentElement.classList.remove('bg-danger')
            totalCaloriesEl.parentElement.parentElement.classList.add('bg-primary')

        }
        
    }
    _displayCaloriesLimit(){
        const caloriesLimitEl = document.getElementById('calories-limit')  
        caloriesLimitEl.innerHTML = this._calorieLimit
        
    }

    _displayCaloriesConsumed () {
        const caloriesConsumedEl = document.getElementById('calories-consumed')
        let total = 0

        const consumed = this._meals.forEach( meal => total += meal.calorie)
        caloriesConsumedEl.innerHTML = total
    }

    _displayCaloriesBurned () {
        const caloriesburnedEl = document.getElementById('calories-burned')
        

        const burned = this._workouts.reduce( (total,workout) => total += workout.calorie,0)
        caloriesburnedEl.innerHTML = burned
    }

    _displayCaloriesRemain () {
        const caloriesRemainingEl = document.getElementById('calories-remaining')
        const progressEl = document.getElementById('calorie-progress')
        const totalCaloriesEl = document.getElementById('calories-total')

        const remaining = this._calorieLimit - this._totalCalories
        caloriesRemainingEl.innerHTML = remaining
 
        if(remaining <= 0) {
             
            progressEl.classList.remove('bg-success')       
            progressEl.classList.add('bg-danger')
        }else{
      
            progressEl.classList.remove('bg-danger')       
            progressEl.classList.add('bg-success')
        }

       
    }

    _displayCaloriesProgress() {
        const progressEl = document.getElementById('calorie-progress')
        const percentange = (this._totalCalories/this._calorieLimit) * 100
        
        const width = Math.min(percentange,100)
        progressEl.style.width = `${width}%`

    }


    _displayNewMeal(meal) {

        const newMealEl = document.getElementById('meal-items')
        const mealDiv = document.createElement('div')
        mealDiv.classList.add('card', 'my-2',)
        mealDiv.setAttribute('data-id',meal.id)
        mealDiv.innerHTML=`
        
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calorie}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            
        `
        newMealEl.appendChild(mealDiv)
    }
    _displayNewWorkOut(workout) {
        const newworkoutEl = document.getElementById('workout-items')
        const workoutDiv = document.createElement('div')
        workoutDiv.classList.add('card', 'my-2',)
        workoutDiv.setAttribute('data-id',workout.id)
        workoutDiv.innerHTML=`
        
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calorie}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            
        `
        newworkoutEl.appendChild(workoutDiv)
    }
    _
    _render() {
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned ()
        this._displayCaloriesRemain()
        this._displayCaloriesProgress()
    }
}

export default CalorieTracker