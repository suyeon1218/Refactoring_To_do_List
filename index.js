const to_do_form = document.querySelector('.form');
const to_do_input = document.querySelector('.form__input');
const to_do_submit = document.querySelector('.form__button');
const ul = document.querySelector('.todo');
const TODOLIST = 'lists';
let to_do_lists = JSON.parse(localStorage.getItem(TODOLIST));

function remove_list(event) {
	const list_value = event.target.previousSibling.data;
	const remove_index = () => {
		for (let index = 0; index < to_do_lists.length; index++) {
			if (to_do_lists[index] == list_value) {
				return index;
			}
		}
	};

	event.preventDefault();
	event.target.parentElement.remove();
	to_do_lists.splice(remove_index(), 1);
	localStorage.setItem(TODOLIST, JSON.stringify(to_do_lists));
}

function make_lists(todo_value) {
	const li = document.createElement('li');
	const button = document.createElement('button');

	li.innerText = todo_value;
	button.innerText = '❌';

	ul.appendChild(li);
	li.appendChild(button);

	button.addEventListener('click', remove_list);
}

function save_lists() {
	localStorage.setItem(TODOLIST, JSON.stringify(to_do_lists));
}

function form_submit_event(event) {
	const list_value = to_do_input.value;

	to_do_lists.push(list_value);
	to_do_input.value = '';
	event.preventDefault();
	make_lists(list_value);
	save_lists();
}

if (to_do_lists === null) {
	to_do_lists = [];
} else {
	to_do_lists.forEach((element) => {
		make_lists(element);
	});
}

to_do_form.addEventListener('submit', form_submit_event);
