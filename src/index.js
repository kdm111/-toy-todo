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
  }
}

const todo1 = new Todo("잘 자기", true)
const todo2 = new Todo("밥 먹기", false)
const todo3 = new Todo("출근하기", true, true)


let todayTodo = []
todayTodo.push(todo1); todayTodo.push(todo2); todayTodo.push(todo3)
let importantTodo = todayTodo.filter((el)=> {
  return el.isImportant === true
})

important.style.display = "none"
calendar.style.display = "none"
const todoStyle = ["w-11/12" ,"bg-white", "list-none", "p-0", "m-5", "text-3xl", "flex", "items-center", "p-5", "rounded-xl"]
const normalSpanStyle = ["mx-3", "p-2", "bg-yellow-500", "rounded-full"]
const importantSpanStyle = ["mx-3", "p-2", "bg-red-500", "rounded-full"]
const contentSpanStyle = ["w-11/12"]
const checkSpanStyle = ["mx-3", "p-2", "bg-lime-500", "rounded-full"]
const checkDoneStyle = ["mx-3", "p-2",  "bg-blue-500",  "rounded-full"]


function showTodoList (todayTodo, todayTodoList) {
  for (let todo of todayTodo) {
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
      } else {
        e.target.classList.remove("bg-lime-500")
        e.target.classList.add("bg-blue-500")
        for (let todo of todayTodo) {
          if (e.target.previousSibling.innerText === todo.content) {
            todo.isDone = true; break 
          }
        }
      }
      e.target.previousSibling.classList.toggle("line-through")
      importantTodo = todayTodo.filter((el) => el.isImportant === true)
    })
    newTodo.append(imgSpan, contentSpan, checkSpan)
    todayTodoList.append(newTodo)
  }
}

showTodoList(todayTodo, todayTodoList)
showTodoList(importantTodo, importantTodoList)

todoAddBtn.addEventListener("click", () => {
  if (todoAddForm.classList.contains("flex")) {
    todoAddForm.classList.remove("flex")
    todoAddForm.style.display = "none"
  } else {
    todoAddForm.classList.add("flex")
    todoAddForm.style.display = "flex"
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



