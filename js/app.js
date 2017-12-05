const form = document.querySelector('#form');
const value = document.querySelector('.form-text');
const task = document.querySelector('.tasks');

function createEl(element, type, value, myClass) {
  let el = document.createElement(element);
  el[type] = value;
  if (myClass !== undefined) {
    el.classList.add(myClass);
  }
  return el;
}

function edit(btn, li) {
  let p = li.querySelector('p');
  let input = createEl('input', 'type', 'text', 'edit-input');
  input.value = p.textContent;
  li.insertBefore(input, p);
  li.removeChild(p);
  btn.textContent = 'Save';
}

function save(btn, li) {
  let input = li.querySelector('input');
  let p = createEl('p', 'textContent', input.value, 'task-text');
  li.insertBefore(p, input);
  li.removeChild(input);
  btn.textContent = 'Edit'
}

function createLi(text) {
  let li = createEl('li');
  let textLi = createEl('p', 'textContent', text, 'task-text');
  let editBtn = createEl('button', 'textContent', 'Edit', 'edit');
  let removeBtn = createEl('button', 'textContent', 'Remove', 'remove');

  li.appendChild(textLi);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);

  return li;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let text = value.value;
  let li = createLi(text);
  localStorage.setItem(localStorage.length, text);
  task.appendChild(li);
});

task.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    let target = e.target;
    let li = target.parentNode;
    let tasks = document.querySelectorAll('li');
    if (target.textContent === 'Remove') {
      task.removeChild(li);
      localStorage.clear();
    } else if (target.textContent === 'Edit') {
      edit(target, li);
    } else if (target.textContent === 'Save') {
      save(target, li);
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === li) {
          localStorage[i] = tasks[i].querySelector('p').textContent;
        }
      }
    }
  }
});
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < localStorage.length; i++) {
    let li = createLi(localStorage.getItem(i));
    task.appendChild(li);
  }
});