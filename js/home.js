let currentStatus = 'all';

const activeTab = ['bg-primary', 'text-white'];
const inActiveTab = ['bg-gray', 'text-black'];

function switchTab(tab) {

  const tabs = ["all", "open", "closed"];
  for (const t of tabs) {
    const tabName = document.getElementById(t + '-tab');
    if (t === tab) {
      tabName.classList.add(...activeTab);
      tabName.classList.remove(...inActiveTab);
    } else {
      tabName.classList.remove(...activeTab);
      tabName.classList.add(...inActiveTab);
    }


  }
}
switchTab(currentStatus);

const showArrayProducts = arr => arr.map(er => `<span class="bg-orange-300 text-red-700 px-2 rounded-lg">${er}</span>`).join(" ");

const loadCardData = async () => {

  const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const data = await response.json();
  displayCardData(data.data);
  filterData(data.data);

}

const displayCardData = (datas) => {



  const cardContainer = document.getElementById('cards-container');
  const countIssue = document.getElementById('count-issue');
  cardContainer.innerHTML = "";
  countIssue.innerText = datas.length;
  for (const data of datas) {


    let priorityColor = "";
    let borderColor = "";

    if (data.priority === "high") {
      priorityColor = "bg-red-300 text-red-700";
    }
    else if (data.priority === "medium") {
      priorityColor = "bg-yellow-300 text-yellow-700";
    }
    else {
      priorityColor = "bg-purple-500 text-purple-700";
    }

    if (data.status === "open") {
      borderColor = "border-green-500 border-t-4";
    }
    else if (data.status === "closed") {
      borderColor = "border-purple-500 border-t-4";
    }
    // console.log(data.status);
    cardContainer.innerHTML += `
     <div onclick="loadModalCardData(${data.id})" class="card bg-base-100 ${borderColor} shadow-lg p-5 space-y-5 ">
       <div class="flex justify-between items-center">
        <img src="./assets/${data.status}.status.png" alt="">
        <button class="bg-red-300 text-red-700 px-2 ${priorityColor} rounded-lg">${data.priority}</button>
       </div>
       <h2 class="text-xl font-bold">${data.title}</h2>
       <p class="text-[#64748B] ">${data.description}.</p>
       <div>
${showArrayProducts(data.labels)}

       
       </div>
       <p>#${data.id}
        by ${data.author}</p>
       <p>${data.createdAt}</p>
      </div>

    `;

  }


}

const filterData = (datas) => {

  document.getElementById('all-tab').addEventListener('click', function () {
    displayCardData(datas);


  })
  document.getElementById('open-tab').addEventListener('click', function () {
    const openFilterData = datas.filter(data => data.status === 'open');

    displayCardData(openFilterData);
  })
  document.getElementById('closed-tab').addEventListener('click', function () {
    const closedFilterData = datas.filter(data => data.status === 'closed');

    displayCardData(closedFilterData);
  })
}


const loadModalCardData = async (id) => {
  const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
  const datas = await response.json();
  displayModalCard(datas.data);


}

const displayModalCard = (datas) => {

  const modalBox = document.getElementById('modal-card-box');
  let priorityColor = "";
  let buttonColor = "";
  if (datas.priority === "high") {
    priorityColor = "bg-red-300 text-red-700";
  }
  else if (datas.priority === "medium") {
    priorityColor = "bg-yellow-300 text-yellow-700";
  }
  else {
    priorityColor = "bg-purple-500 text-purple-700";
  }

  if (datas.status === "open") {
    buttonColor = "bg-green-500 text-green-700";
  }
  else if (datas.status === "closed") {
    buttonColor = "bg-purple-500 text-purple-700";
  }
  modalBox.innerHTML = `

  <h1 class="text-2xl font-bold">${datas.title}</h1>
  <div class="flex items-center">
  <button class="border-0 px-5 text-white rounded-lg ${buttonColor}">${datas.status}</button> <span class="mx-5">${datas.status} by ${datas.author}</span><span>${datas.createdAt}</span>
  
  </div>
  <div>
  ${showArrayProducts(datas.labels)}
  </div>
  <p class="text-[#64748B]">${datas.description}</p>
  <div class="flex justify-between items-center">
   <div>
    <h1>Assignee:</h1>
    <p>${datas.author}</p>
   </div>
   <div class="pr-30">
    <p>
     priority
    </p>
   <button class="bg-red-300 text-red-700 ${priorityColor} px-2 mt-1 rounded-lg">${datas.priority}</button>
   </div>
  </div>

  <div class="modal-action">
    <form method="dialog">
     <!-- if there is a button in form, it will close the modal -->
     <button class="btn">Close</button>
    </form>
   </div>
  `
  document.getElementById('model_card').showModal();
}

loadCardData();