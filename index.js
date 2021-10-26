const form = document.querySelector('#form');
const title = document.querySelector('#todo-title');
const category = document.querySelector('#todo-category');
const filter = document.querySelector('#todo-filter');
const list = document.querySelector('#todo-list');

// array of todos
let todos = [
  {
    title: 'Learn Programming',
    category: 'personal',
  },
  {
    title: "Drink coffee at 9 o'clock",
    category: 'hobby',
  },
  {
    title: 'Go and take a f*cking job',
    category: 'work',
  },
  {
    title: 'Learn JavaScript',
    category: 'personal',
  },
];

// render function
const render = (items) => {
  list.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p class="li-title">${item.title}</p>
      <span class="gray">#${item.category}</span>
      <span id="remove-item" class="remove-item"></span>
    `;

    list.appendChild(li);
  });
};

// render todos on page load
render(todos);

// remove todo by his title
const eventRemoveTodo = (event) => {
  if (event.target.className === 'remove-item') {
    removeTodo(todos, event.target.parentElement.firstElementChild.textContent);
  }
};

list.addEventListener('click', eventRemoveTodo);

// add new todo
const addTodo = (title, category) => {
  const todo = {
    title,
    category,
  };

  todos.push(todo);
};

// remove todo
const removeTodo = (items, value) => {
  todos = items.filter((item) => {
    return !value.includes(item.title);
  });

  filter.value = '';
  render(todos);
};

// submit the form, add a new todo
form.addEventListener('submit', (event) => {
  event.preventDefault();

  addTodo(title.value, category.value);
  render(todos);

  title.value = '';
  category.value = '';
});

// get the personal todo
const getPersonal = () => {
  return todos.filter((todo) => todo.category === 'personal');
};

// get the hobby todo
const getHobby = () => {
  return todos.filter((todo) => todo.category === 'hobby');
};

// get the work todo
const getWork = () => {
  return todos.filter((todo) => todo.category === 'work');
};

// filter todos by category
filter.addEventListener('change', () => {
  if (filter.value === 'personal') {
    render(getPersonal());
  } else if (filter.value === 'hobby') {
    render(getHobby());
  } else if (filter.value === 'work') {
    render(getWork());
  } else {
    render(todos);
  }
});
