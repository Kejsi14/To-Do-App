const addButton = document.getElementById('add-btn');

const data = [];

function createLiElement(spanValue, checkboxValue) {
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.checked = checkboxValue;
	const span = document.createElement('span');
	span.innerText = spanValue;

	const li = document.createElement('li');

	li.appendChild(span);
	li.appendChild(checkbox);

	li.classList.add('list-group-item', 'd-flex', 'justify-content-between');

	const list = document.getElementById('list');
	list.appendChild(li);

	return checkbox;
}

function createAndWireCheckbox(element, spanValue, checkboxValue) {
	const checkbox = createLiElement(spanValue, checkboxValue);
	checkbox.addEventListener('change', function (e) {
		element.completed = e.target.checked;
	});
}

function filterData(type){ //flirton te dhena dhe per kto te dhena qe ka flirtuar te krijoj elementet.Kte ben ky fnx
	let filteredData = [];
	if (type != null) {
		filteredData = data.filter(x => x.completed === type);
	}else{
		filteredData = [...data]; //esht nje objekt.??
	}
	const list = document.getElementById('list');
	list.innerHTML = '';
	filteredData.forEach((element) => {
		createAndWireCheckbox(element, element.title, element.completed);
	});
}

addButton.addEventListener('click', function () {
	const input = document.getElementById('todo-value');
	const valueToAdd = {
		title: input.value,
		completed: false
	};

	createAndWireCheckbox(valueToAdd, input.value, false);
	
	data.push(valueToAdd);
	input.value = '';
});

const inProgressButton = document.getElementById('in_progress');
const doneButton = document.getElementById('done');
const allButton = document.getElementById('all');

inProgressButton.addEventListener('click', function () {
	filterData(false);
});

doneButton.addEventListener('click', function () {
	filterData(true);
});

allButton.addEventListener('click', function () {
	filterData(null);
});