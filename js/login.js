document.getElementById('login-btn').addEventListener('click', function () {
 const userInputField = document.getElementById('user-input-field').value;
 const passwordInputField = document.getElementById('password-input-field').value;
 if (userInputField === 'admin' && passwordInputField === 'admin123') {
  setTimeout(function () {
   window.location.href = "home.html";
  }, 1000);
  return alert('login successfully');
 }
 else {
  return alert('login failed');
 }

})