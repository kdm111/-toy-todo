const today = document.querySelector("#todayMain")
const important = document.querySelector("#importantMain")
const calendar = document.querySelector("#calenderMain")
const todoAddBtn = document.querySelector("#todoAddBtn")
const todoAddForm = document.querySelector("#todoAddForm")
const todoAddInput = document.querySelector("#todoAddInput")
const todayTodoList = document.querySelector("#todayTodoList")

class Todo {
  constructor(content , isImportant) {
    this.content = content
    this.isImportant = isImportant
  }
}

const todo1 = new Todo("잘 자기", true)
const todo2 = new Todo("밥 먹기", false)

let todayTodo = []
todayTodo.push(todo1); todayTodo.push(todo2)

important.style.display = "none"
calendar.style.display = "none"

const todoStyle = ["w-11/12" ,"bg-white", "list-none", "p-0", "m-5", "text-3xl", "flex", "items-center", "p-5", "rounded-xl"]
const imgSpanStyle = ["mx-3", "p-2", "bg-yellow-500", "rounded-full"]
const contentSpanStyle = ["w-11/12"]
const checkSpanStyle = ["mx-3", "p-2", "bg-lime-500", "rounded-full"]

function showTodayTodoList () {
  for (let todo of todayTodo) {
    const newTodo = document.createElement("li")
    for (let style of todoStyle) {
      newTodo.classList.add(style)
    }
    const imgSpan = document.createElement("span")
    for (let style of imgSpanStyle) {
      imgSpan.classList.add(style)
    }
    const contentSpan = document.createElement("span")
    for (let style of contentSpanStyle) {
      contentSpan.classList.add(style)
    }
    contentSpan.innerText = todo.content
    const checkSpan = document.createElement("span")
    for (let style of checkSpanStyle) {
      checkSpan.classList.add(style)
    }
    newTodo.append(imgSpan, contentSpan, checkSpan)
    todayTodoList.append(newTodo)
  }
}

showTodayTodoList()
todoAddBtn.addEventListener("click", () => {
  if (todoAddForm.classList.contains("flex")) {
    todoAddForm.classList.remove("flex")
    todoAddForm.style.display = "none"
  } else {
    todoAddForm.classList.add("flex")
    todoAddForm.style.display = "flex"
  }
})

todoAddForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const newTodo = new Todo(todoAddInput.value)
  todoAddInput.value = ""
  todayTodo.push(newTodo)
  console.log(todayTodoList.leng)
  let i = 0
  while (i < todayTodoList.childNodes.length) {
    let node = todayTodoList.childNodes[i]
    if (node.nodeName != "#text" && node.classList.contains("list-none")) {
      node.remove()
    } else {
      i += 1
    }
  }
  showTodayTodoList()
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
    } else if (tab === "CALENDAR") {
      important.style.display = "none"
      calendar.style.display = "flex"
      today.style.display = "none"
    }
  })
})



