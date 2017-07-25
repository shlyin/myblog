// 用一个 todo 参数返回一个 todo cell 的 HTML 字符串
const templateTodo = (todo) => {
    var t = `
        <div class="todo-cell">
            <i class="fa fa-circle-o todo-done" aria-hidden="true" data-action="todo_done" title="完成"></i>
            <span class="todo-task">${todo}</span>
            <i class="fa fa-trash todo-delete" aria-hidden="true" data-action="todo_delete" title="删除"></i>
        </div>
    `
    return t
}

// 载入所有存储在 localStorage 里面的 todo
const loadTodos = () => {
    var s = localStorage.savedTodos
    if (s == undefined) {
        return []
    } else {
        var ts = JSON.parse(s)
        return ts
    }
}
// 获取所有存储在 localStorage 里的 todos
const todos = loadTodos()
// 把所有的 todos 插入到页面中
const insertTodos = (todos) => {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        var t = templateTodo(todo)
        e('#id-div-container').insertAdjacentHTML('beforeend', t)
    }
}
// 把 todo 存储到 localStorage 里面
const saveTodo = (todos) => {
    var s = JSON.stringify(todos)
    localStorage.savedTodos = s
}
// add todo
const todoAdd = (event) => {
    var todo = e('#id-span-todo').innerHTML
    todos.push(todo)
    saveTodo(todos)
    var t = templateTodo(todo)
    e('#id-div-container').insertAdjacentHTML('beforeend', t)
    e('#id-span-todo').innerHTML = ''
}
// 删除 todo
const todoDelete = (event) => {
    var self = event.target
    var todo = self.closest('.todo-cell')
    var father = self.closest('#id-div-container')
    var todoCells = father.querySelectorAll('.todo-cell')
    for (var i = 0; i < todoCells.length; i++) {
        var todoCell = todoCells[i]
        if (todo == todoCell) {
            todos.splice(i, 1)
            todo.remove()
            saveTodo(todos)
        }
    }
}
// 是否完成todo
const todoDone = (event) => {
    var self = event.target
    var father = self.closest('.todo-cell')
    var task = father.querySelector('.todo-task')
    var c = event.target.classList
    if (!task.classList.contains('done')) {
        c.remove('fa-circle-o')
        c.add('fa-check-circle-o')
        task.classList.add('done')
    } else {
        c.remove('fa-check-circle-o')
        c.add('fa-circle-o')
        task.classList.remove('done')

    }
}

const bindTodoClickEvents = () => {
    var actions = {
        'todo_add': todoAdd,
        'todo_delete': todoDelete,
        'todo_done': todoDone,
    }
    var b = e('body')
    b.addEventListener('click', function(event){
        var self = event.target
        var actionName = self.dataset.action
        var action = actions[actionName]
        if (action != undefined) {
            action(event)
        }
    })
}
