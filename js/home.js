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