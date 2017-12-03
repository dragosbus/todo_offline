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

function createLi(text) {
  let li = createEl('li');
  let textLi = createEl('p', 'textContent', text);
  let editBtn = createEl('button', 'textContent', 'Edit', 'edit');
  let removeBtn = createEl('button', 'textContent', 'Remove', 'remove');
  
  li.appendChild(textLi);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);
  task.appendChild(li);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let text = value.value;
  createLi(text);
  localStorage.setItem(localStorage.length, text);
});

task.addEventListener('click', e => {
  let target = e.target;
  if (target.tagName === 'BUTTON') {
    let li = target.parentNode;
    if (target.textContent === 'Edit') {
      let p = li.querySelector('p');
      let inputEdit = createEl('input', 'type', 'text');
      inputEdit.value = p.textContent;
      li.insertBefore(inputEdit,p);
      li.removeChild(p);
      target.textContent = 'Save';
    } else if (target.textContent === 'Remove') {

    } else if(target.textContent === 'Save') {
      let inputEdited = li.querySelector('input');
      let p = createEl('p','textContent',inputEdited.value);
      li.insertBefore(p,inputEdited);
      li.removeChild(inputEdited);
      target.textContent = 'Edit';
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < localStorage.length; i++) {
    createLi(localStorage[i]);
  }
});