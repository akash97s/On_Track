db.enablePersistence().catch(err => { // show events when offline
  if(err.code == "failed-precondition") {
    console.log("Multple tabs opened");
  }
  else if(err.code == 'unimplemented') {
    console.log("Browser not supported")
  }
})

const todoForm = document.querySelector(".add_item form")
const addItemModal = document.querySelector("#add_item_modal")

const editForm = document.querySelector(".edit_item form")
const editItemModal = document.querySelector("#edit_item_modal")

let updateId = null;
// add to firestore
todoForm.addEventListener("submit", e => {
  e.preventDefault();
  const item = {
    name: todoForm.itemName.value,
    time: todoForm.itemTime.value
  }
  db.collection('todo').add(item).then(() => {
  todoForm.reset();
  var instance = M.Modal.getInstance(addItemModal);
  instance.close();

  todoForm.querySelector('.error').textContent = "";

}).catch(err => {
  todoForm.querySelector('.error').textContent = err.message;
})

})
// edit in feature
editForm.addEventListener("submit", e => {
  e.preventDefault();
  const item = {
    name: editForm.itemName.value,
    time: editForm.itemTime.value
  }
  db.collection('todo').doc(updateId).update(item).then(() => {
  editForm.reset();
  var instance = M.Modal.getInstance(editItemModal);
  instance.close();

  editForm.querySelector('.error').textContent = "";

}).catch(err => {
  editForm.querySelector('.error').textContent = err.message;
})

})

// real time updates
db.collection('todo').onSnapshot(snapshot => {
  // console.log(snapshot.docChanges())
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      // console.log(`${ change.doc.id } is added` );
      renderTodoItems(change.doc.data(), change.doc.id);
    }
    if(change.type === 'removed') {
      // console.log(`${ change.doc.id } is removed` );
      removeItem(change.doc.id);
    }
  })
})

const todoContainer = document.querySelector('.items');
todoContainer.addEventListener('click', e => {
  // console.log('todo click', e.target);
  if(e.target.textContent === 'delete_outline') {
    const id = e.target.parentElement.getAttribute('data-id');
    db.collection('todo').doc(id).delete();
  }

  if(e.target.textContent === 'edit') {
    updateId = e.target.parentElement.getAttribute('data-id');
    console.log("Selected Item: ", updateId);
    const item = document.querySelector(`.items[data-id=${updateId}]`);
    const name = item.querySelector('.name').innerHTML;
    const time = item.querySelector('.time').innerHTML;
    // console.log(name, time);
    editForm.itemName.value = name;
    editForm.itemTime.value = time;
    // db.collection('todo').doc(id).de
  }
})
