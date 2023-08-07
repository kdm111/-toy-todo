const today = document.querySelector("#todayMain")
const important = document.querySelector("#importantMain")
const calendar = document.querySelector("#calenderMain")
const todoAddBtn = document.querySelector("#todoAddBtn")
const todoAddForm = document.querySelector("#todoAddForm")
const todoAddInput = document.querySelector("#todoAddInput")
const todayTodoList = document.querySelector("#todayTodoList")
const importantTodoList = document.querySelector("#importantTodoList")
const checkImportant = document.querySelector("#checkImportant")

class Todo {
  constructor(content , isImportant, isDone) {
    this.content = content
    this.isImportant = isImportant
    this.isDone = (isDone === undefined ? false : true)
    const date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth() + 1
    this.date = date.getDate()
  }
}

const todo1 = new Todo("잘 자기", true)
todo1.year = 2023; todo1.month = 8; todo1.date = 4
const todo2 = new Todo("밥 먹기", false)
todo2.year = 2023; todo2.month = 8; todo2.date = 5
const todo3 = new Todo("출근하기", true, true)
todo3.year = 2023; todo3.month = 8; todo3.date = 3


let todayTodo = []
todayTodo.push(todo1); todayTodo.push(todo2); todayTodo.push(todo3)
let importantTodo = todayTodo.filter((el)=> {
  return el.isImportant === true
})

todoAddForm.style.display = "none"
important.style.display = "none"
calendar.style.display = "none"


const todoStyle = ["w-11/12" ,"bg-white", "list-none", "p-0", "m-5", "text-3xl", "flex", "items-center", "p-5", "rounded-xl"]
const normalSpanStyle = ["mx-3", "p-2", "bg-yellow-500", "rounded-full"]
const importantSpanStyle = ["mx-3", "p-2", "bg-red-500", "rounded-full"]
const contentSpanStyle = ["w-11/12"]
const checkSpanStyle = ["mx-3", "p-2", "bg-lime-500", "rounded-full"]
const checkDoneStyle = ["mx-3", "p-2",  "bg-blue-500",  "rounded-full"]


function showTodoList (todoes, todoesList) {
  for (let todo of todoes) {
    const newTodo = document.createElement("li")
    for (let style of todoStyle) {
      newTodo.classList.add(style)
    }
    const imgSpan = document.createElement("span")
    if (todo.isImportant) {
      for (let style of importantSpanStyle) {
        imgSpan.classList.add(style)
      }
    } else {
      for (let style of normalSpanStyle) {
        imgSpan.classList.add(style)
      }
    }
    const contentSpan = document.createElement("span")
    for (let style of contentSpanStyle) {
      contentSpan.classList.add(style)
    }
    contentSpan.innerText = todo.content
    const checkSpan = document.createElement("span")
    checkSpan.type="checkbox";
    if (todo.isDone === true) {
      for (let style of checkDoneStyle) {
        checkSpan.classList.add(style)
        contentSpan.classList.add("line-through")
      }
    } else {
      for (let style of checkSpanStyle) {
        checkSpan.classList.add(style)
      }
    }
    checkSpan.addEventListener("click", (e) => {
      if (e.target.classList.contains("bg-blue-500")) {
        e.target.classList.remove("bg-blue-500")
        e.target.classList.add("bg-lime-500")
        for (let todo of todayTodo) {
          if (e.target.previousSibling.innerText === todo.content) {
            todo.isDone = false; break 
          }
        }
        for (let todo of importantTodo) {
          if (e.target.previousSibling.innerText === todo.content) {
            todo.isDone = false; break 
          }
        }
      } else {
        e.target.classList.remove("bg-lime-500")
        e.target.classList.add("bg-blue-500")
        for (let todo of todayTodo) {
          if (e.target.previousSibling.innerText === todo.content) {
            todo.isDone = true; break 
          }
        }
        for (let todo of importantTodo) {
          if (e.target.previousSibling.innerText === todo.content) {
            todo.isDone = true; break 
          }
        }
      }
      e.target.previousSibling.classList.toggle("line-through")
      importantTodo = todoes.filter((el) => el.isImportant === true)
    })
    newTodo.append(imgSpan, contentSpan, checkSpan)
    todoesList.append(newTodo)
  }
}

showTodoList(todayTodo, todayTodoList)
// showTodoList(importantTodo, importantTodoList)

todoAddBtn.addEventListener("click", () => {
  if (todoAddForm.classList.contains("flex")) {
    todoAddForm.classList.remove("flex")
    todoAddBtn.classList.remove("bg-gray-600", "text-base")
    todoAddBtn.classList.add("bg-blue-900")
    todoAddBtn.innerText = "ADD"
    todoAddForm.style.display = "none"
  } else {
    todoAddForm.classList.add("flex")
    todoAddForm.style.display = "flex"
    todoAddBtn.classList.remove("bg-blue-900")
    todoAddBtn.classList.add("bg-gray-600", "text-base")
    todoAddBtn.innerText = "UNDO"
  }
})

function blankList(list) {
  let i = 0
  while (i < list.childNodes.length) {
    let node = list.childNodes[i]
    if (node.nodeName != "#text" && node.classList.contains("list-none")) {
      node.remove()
    } else {
      i += 1
    }
  }
}

todoAddForm.addEventListener("submit", (e) => {
  e.preventDefault()
  if (todoAddInput.value === '') {
    return ;
  }
  const newTodo = new Todo(todoAddInput.value, checkImportant.checked)
  todoAddInput.value = ""
  todayTodo.push(newTodo)
  importantTodo = todayTodo.filter((el) => {
    return (el.isImportant === true)
  })
  blankList(todayTodoList)
  showTodoList(todayTodo, todayTodoList)
})


const navBtn = document.querySelectorAll(".navBtn")
navBtn.forEach((el) => {
  el.addEventListener("click", (el) => {
    const tab = el.target.innerText
    if (tab === "TODAY") {
      important.style.display = "none"
      calendar.style.display = "none"
      today.style.display = "flex"
      blankList(todayTodoList)
      showTodoList(todayTodo, todayTodoList)
    } else if (tab === "IMPORTANT") {
      important.style.display = "flex"
      calendar.style.display = "none"
      today.style.display = "none"
      blankList(importantTodoList)
      showTodoList(importantTodo, importantTodoList)
    } else if (tab === "CALENDAR") {
      important.style.display = "none"
      calendar.style.display = "flex"
      today.style.display = "none"
    }
  })
})



