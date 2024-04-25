const $form = document.querySelector('.form');
const $input = document.querySelector('.form__input');
const $submitButton = document.querySelector('.form__button');
const $todos = document.querySelector('.todo');

const todos = getSavedTodos();

renderTodos();

$form.addEventListener('submit', (event) => {
	$todos.innerHTML = '';
	event.preventDefault();

	addNewTodo();
	renderTodos();
	saveTodos();
});

$todos.addEventListener('click', (event) => {
	$todos.innerHTML = '';

	if (event.target.className === 'todo__text') {
		handleCheckTodo(event);
	} else if (event.target.className === 'todo__delete-button') {
		handleDeleteTodo(event);
	}
	renderTodos();
	saveTodos();
});

function getSavedTodos() {
	const savedTodos = localStorage.getItem('todos');

	return JSON.parse(savedTodos) ?? [];
}

function addNewTodo() {
	const id = generateID();

	todos.push({ id, value: $input.value, checked: false });
	$input.value = '';
}

function renderTodos() {
	for (const todo of todos) {
		const $li = document.createElement('li');
		const $text = document.createElement('span');
		const $deleteButton = document.createElement('button');

		$deleteButton.classList.add('todo__delete-button');
		$deleteButton.innerText = '삭제';

		$text.classList.add(todo.checked ? 'todo__text--checked' : 'todo__text');
		$text.innerText = todo.value;

		$li.classList.add = 'todo__item';
		$li.id = todo.id;

		$li.appendChild($text);
		$li.appendChild($deleteButton);

		$todos.appendChild($li);
	}
}

function generateID() {
	return Math.random().toString(36).substring(2, 16);
}

function handleCheckTodo(event) {
	const $li = event.target.closest('li');
	const { id } = $li;

	const targetIndex = todos.findIndex((todo) => todo.id === id);
	todos[targetIndex].checked = !todos[targetIndex].checked;
}

function handleDeleteTodo(event) {
	const $li = event.target.closest('li');
	const { id } = $li;

	const targetIndex = todos.findIndex((todo) => todo.id === id);
	todos.splice(targetIndex, 1);
}

function saveTodos() {
	localStorage.setItem('todos', JSON.stringify(todos));
}
