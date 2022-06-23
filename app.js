const API_URL = "https://62b21703c7e53744afc76e45.mockapi.io/info";
const tableBody = document.querySelector("#infoTable tbody");
const pagination = document.querySelector('.pagination');
const pageCount = 10;
let currPage = 1;
document.addEventListener("DOMContentLoaded", () => {
  readUsers();
});

function readUsers() {
    tableBody.innerHTML = '';
  fetch(`${API_URL}/info${generateQueryParams(currPage)}`)
    .then((response) => response.json())
    .then((user) => {
      const { items, count } = user;
      items.forEach(addToDom);
      createPagination(count)
    });
}

function addToDom(items) {
  
  let html = `
  <tr>
                            <td>${items.id}</td>
                            <td>${items.Name}</td>
                            <td>${items.family}</td>
                            <td>${items.birthday}</td>
                            <td>${items.nationalID}</td>
                            <td>${items.fatherName}</td>
                            <td>${items.job}</td>
                            <td>${items.education}</td>
                            <td>${items.gender}</td>
                            <td>${items.country}</td>
                            <td>${items.state}</td>
                            <td>${items.city}</td>
                            <td>${items.street}</td>
                            <td>${items.block}</td>
                            <td>${items.no}</td>
                            <td>${items.floor}</td>
                            <td>${items.unit}</td>
                            <td><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                              </svg>
                            </td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" style="width:30px;"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                            </td>
                        </tr>
  `;
  tableBody.innerHTML += html;
  console.log(tableBody);
}

function createPagination(count){
    const pageNum = Math.ceil(count/pageCount);
    let str = '';
    for (let i = 1; i <= pageNum; i++) {
        str += `<li class="page-item ${i === currPage ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
    }
    pagination.innerHTML = str;
}


function generateQueryParams(page=1) {
    let queryParams = `?page=${page}&limit=${pageCount}`;
    return queryParams;
 }

document.querySelector('.pagination').addEventListener('click', (e)=> {
    let lis = document.querySelectorAll('.pagination li');
    lis.forEach((li)=>{
        li.classList.remove('active');
    })
    e.target.parentElement.classList.add('active');
    currPage = +e.target.innerHTML;
    readUsers();
})

function searchUser(info){
  return fetch(`${API_URL}/info?search=${info}`)
  .then(response => response.json())
  .then(data => {
    tableBody.innerHTML = "";
    data.items.forEach(addToDom);

    console.log(data);
    
  }
  );
}

var debounced = _.debounce(searchUser, 1000);
document.querySelector('#searchBox').addEventListener('input', (e) =>
{
  debounced(e.target.value);
})
