let todo = document.getElementsByClassName("todo")
let todoList = document.getElementsByClassName("todo-list")
let doneList = document.getElementsByClassName("done-list")
let liststyle = document.getElementById("list-style")
let todostyle = document.getElementById("todo-style")
let donestyle = document.getElementById("done-style")


// document.querySelector('#push').onclick = function(){
//     if(document.querySelector('#newtask input').value.length == 0){
//         alert("Please Enter a Task")
//     }
//     else{
//         document.querySelector('#tasks').innerHTML += `
//             <div class="task">
//                 <span id="taskname">
//                     ${document.querySelector('#newtask input').value}
//                 </span>
//                 <button class="delete">
//                     delete
//                 </button>
//             </div>
//         `;

//         var current_tasks = document.querySelectorAll(".delete");
//         for(var i=0; i<current_tasks.length; i++){
//             current_tasks[i].onclick = function(){
//                 this.parentNode.remove();
//             }
//         }

      

 
//     }
// }
  
window.addEventListener("keydown", pressedKeyDown)

function pressedKeyDown(evt) {
    // console.log(evt);
    if (evt.code == "Enter") {
        addNewList()
        todo.value = " "
    }
}


function addNewList(){
   
    var NewList = document.createElement("div")
    NewList.className = "todo-list"
    var List = document.createElement("p")
    List.className = "todoVal"
    var inputValue = todo[0].value
    var t = document.createTextNode(inputValue)
    if(inputValue != ""){
    List.append(t)
    NewList.append(List)
    todostyle.appendChild(NewList)

    let newDoneButton = document.createElement("input")
    newDoneButton.value='Done'
    newDoneButton.type='button'
    newDoneButton.className='DoneButton'
    newDoneButton.onclick= function(){
            listNode = this.parentNode
            donestyle.append(listNode)
            newDoneButton.remove()
    }
    NewList.append(newDoneButton)

    let newDeleteButton = document.createElement("input")
    newDeleteButton.value='Delete'
    newDeleteButton.type='button'
    newDeleteButton.className='DeleteButton'
    newDeleteButton.onclick= DeleteList
    // console.log(document.getElementById(addbtn.onclick))
    NewList.append(newDeleteButton)
        //  newList.setAttribute("class","todolist")

    todo[(todo.length -1)].value=""
    }
}
function DeleteList(){
    listNode=this.parentNode
    listNode.remove()
}


    
