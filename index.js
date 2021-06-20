
let currentHour = new moment();

//Functionality only during 9a-5p. type: currentHour.hour(9-5) i.e. currentHour.hour(9)  to see functonality outside of designated hours.
function get_todos() {
    let m = moment()
    m.hour(8)
    m.minute(0)


    let todos = []
    for (let index = 0; index < 9; index++) {

        todos.push({ time: m.add(1, 'h').toISOString(true), description: '' })

    }
    console.log(todos)



    var todos_str = localStorage.getItem('todo');


// if the todos are not absent value (null) then parse, which returns the values to non-strings

    if (todos_str !== null) {
        let localtodo = JSON.parse(todos_str);
        var dateToCompare = moment(localtodo[0].time);
        let today = moment()
        if (dateToCompare.startOf('day').isSame(today.startOf('day'))) {
            todos = localtodo
        }

    }
    return todos;
}

// document.getElementById('saveButton').addEventListener('click', () => { handleSave() })

function show() {
    let todo = get_todos()
    console.log(todo)
    //below is the commented out for loop that .map is implementing. 
    // for (let index = 0; index < todo.length; index++) {
    //     const item = todo[index];

    //     $('.container').append(`
    //             <div class="timeLine flex-row">
                
    //             <div class="timebox">
    //             ${moment(item.time).format('hh A')}
    //             </div>
    //             <input value="${item.description}" class="flex1 timeline-description"/>
                
    //             <button id="${i}" class="save-container remove">
    //             save
    //             </button>
                
                
    //             </div>`)

    // }
    //.map is similar to a for loop, but it is only useable for arrays. Map will create a new array with new data. Worked on implementation with tutor.
    // button id used instead of a button class so that users can add content but selectively chose what they would like to save. Set to index i, so that id is dynamically created.
    todo.map((item, i) => {
            
      
      

        $('.container').append(`
        <div class="timeLine flex-row">
        
        <div class="timebox">
        ${moment(item.time).format('hh A')}
        </div>
        <input value="${item.description}" class="flex1 timeline-description"/>
        
        <button id="${i}" class="save-container remove">
        save
        </button>
        
        
        </div>`)

    }
    )
    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        if (currentHour.hours() == moment(element.time).hours()) {
            document.getElementsByClassName('timeline-description')[index].style.backgroundColor = "red"
        } else
            if (currentHour > moment(element.time)) {
                document.getElementsByClassName('timeline-description')[index].setAttribute("disabled", true);
                document.getElementsByClassName('timeline-description')[index].style.backgroundColor = "grey"
            }


    }


    var buttons = document.getElementsByClassName('remove');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', handleSave);
    };

}
function handleSave() {
    let todo = get_todos()
    var id = this.getAttribute('id');

    let description = document.getElementsByClassName('timeline-description')[id].value
    console.log(id, description)

    todo[id].description = description


//JSON.stringify("object") is how data is stored in local storage. 
    localStorage.setItem('todo', JSON.stringify(todo));

    show();



}


//Init day planner
show()