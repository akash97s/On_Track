const items = document.querySelector('.items')

document.addEventListener('DOMContentLoaded', function() {
    var sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
    var modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
    var floatingActionButton = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(floatingActionButton);
  });

const renderTodoItems = (data, id) => {
  const html =  `
  <li class="collection-item items avatar" data-id=${id}>
    Name: <span class="name"> ${data.name} </span>
    <p>Time: <span class="time"> ${data.time} </span></p>
    <div href="#!" class="secondary-content" data-id=${id}>
      <i class="material-icons modal-trigger" style="cursor:pointer"
      href="#edit_item_modal">edit</i>
      <i class="material-icons" style="cursor:pointer">delete_outline</i>
    </div>
  </li>
  `;
  items.innerHTML += html;
}

const removeItem = (id) => {
  const item = document.querySelector(`.items[data-id=RTSHm2dCkIiIIuOsSbkO]`);
  item.remove();
};
