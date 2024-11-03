import '@fortawesome/fontawesome-free/js/all';
import { Modal,Collapse } from 'bootstrap';
import CalorieTracker from './Tracker'
import { Meal,Workout } from './Item';
import './CSS/bootstrap.css'
import './CSS/style.css'

class App {
    constructor() {
        this._tracker = new CalorieTracker()
        this._loadEventListners()

    }

    _loadEventListners() {
        document.getElementById('meal-form').addEventListener('submit',this._newItem.bind(this))
        document.getElementById('workout-form').addEventListener('submit',this._newItem.bind(this))
        document.getElementById('meal-items').addEventListener('click',this._removeItem.bind(this,'meal'))
        document.getElementById('workout-items').addEventListener('click',this._removeItem.bind(this,'workout'))
        document.getElementById('filter-meals').addEventListener('keyup',this._filterItem.bind(this,'meal'))
        document.getElementById('filter-workouts').addEventListener('keyup',this._filterItem.bind(this,'workout'))
        document.getElementById('limit-form').addEventListener('submit',this._setLimit.bind(this))
        document.getElementById('reset').addEventListener('click',this._reset.bind(this))
        document.addEventListener('DOMContentLoaded',this._tracker.loadItems(this))
    }
    _newItem(e) {
        e.preventDefault()
        
        const type = e.target.id.split('-')[0]
        const name = document.getElementById(`${type}-name`) 
        const calories = document.getElementById(`${type}-calories`) 
       
        //Validate inputs
        if(name.value === '' || calories.value === '') {
            alert('Please Enter All fields')
            return
        }

        if (e.target.id === 'meal-form' ){  
            const meal = new Meal(name.value, +calories.value)
            this._tracker.addMeal(meal)
            const collapseMeal = document.getElementById('collapse-meal')
            const bsCollapse = new Collapse(collapseMeal,{
                toggle:true
        })        
        }else{     
            const workout = new Workout(name.value, +calories.value)
            this._tracker.addWorkout(workout)
            const collapseWorkout  = document.getElementById('collapse-workout')
            const bsCollapse = new Collapse(collapseWorkout,{
                toggle:true
        })
            }
        name.value = ''
        calories.value = ''        
    }

    _removeItem(type,e) {

        if(
            e.target.classList.contains('delete') ||
            e.target.classList.contains('fa-xmark')
        ){
            const id = e.target.closest('.card').getAttribute('data-id')
           

            type === 'meal' 
                ?this._tracker.removeMeal(id)
                :this._tracker.removeWorkout(id)
            
            e.target.closest('.card').remove()

            

        }        
    }

    _filterItem (type,e) {
        const item = e.target.value.toLowerCase()
        const text =e.currentTarget.value

 
    
        document.querySelectorAll(`#${type}-items .card`).forEach(item => 
            {
            const name = item.firstElementChild.firstElementChild.firstElementChild.textContent
          

            if (name.toLowerCase().indexOf(text) !== -1) {
                item.style.display = 'block'
            }else{
                item.style.display = 'none'
            }
        })      
        
    }

    _reset() {
        // console.log('ran')
        this._tracker.reset()
        document.getElementById('meal-items').innerHTML = ''
        document.getElementById('workout-items').innerHTML = ''
        document.getElementById('filter-meals').value = ''
        document.getElementById('filter-workouts').valueL = ''
        Storage.clearAll()
       
    }

    _setLimit(e) {

        e.preventDefault()
        const limit = document.getElementById('limit')
        if(limit ===  ''){
            alert('please add a limit')
            return;
        }
        this._tracker.caloriesLimit(+limit.value)
        limit.value = ' '

        const modalEl = document.getElementById('limit-modal')
        const modal = Modal.getInstance(modalEl)
        modal.hide()
        
    }
   
    
}


const app = new App()
