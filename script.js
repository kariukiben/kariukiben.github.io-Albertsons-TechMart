function welcomeMsg() {
    alert("Welcome to Albertsons TechMart — Innovation Meets Quality!");
}

function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("All fields are required!");
        return false;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return false;
    }

    alert("Thank you! Your message has been sent.");
    return true;
}

// SMOOTH PAGE LOAD
window.onload = () => {
    document.body.style.opacity = 0;
    document.body.style.transition = "opacity 1s";
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);
};
// NAVIGATION 
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
function filterProducts(category) {
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let productCategory = product.getAttribute("data-category");

        if (category === "all" || productCategory === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
// MENU TOGGLE 
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
} 
// CART LOGIC
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE CART
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ADD TO CART
function addToCart(product, price, qtyId){
  let qty = parseInt(document.getElementById(qtyId).value);

  let existing = cart.find(item => item.product === product);

  if(existing){
    existing.qty += qty;
  } else {
    cart.push({product, price, qty});
  }

  saveCart();
  displayCart();
}

// DISPLAY CART
function displayCart(){
  let cartTable = document.getElementById("cart-items");
  let grandTotal = document.getElementById("grand-total");

  cartTable.innerHTML = "";
  let total = 0;

  cart.forEach((item, index)=>{
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    cartTable.innerHTML += `
      <tr>
        <td>${item.product}</td>
        <td>KES ${item.price}</td>
        <td>
          <button onclick="changeQty(${index},-1)">-</button>
          ${item.qty}
          <button onclick="changeQty(${index},1)">+</button>
        </td>
        <td>KES ${itemTotal}</td>
        <td><button onclick="removeItem(${index})">Remove</button></td>
      </tr>
    `;
  });

  grandTotal.textContent = total;
}

// CHANGE QUANTITY
function changeQty(index, change){
  cart[index].qty += change;

  if(cart[index].qty <= 0){
    cart.splice(index,1);
  }

  saveCart();
  displayCart();
}

// REMOVE ITEM
function removeItem(index){
  cart.splice(index,1);
  saveCart();
  displayCart();
}

/* CHECKOUT LOGIC 
function checkout(){
  if(cart.length === 0){
    alert("Cart empty!");
    return;
  }

  let method = prompt(
    "Select Payment Method:\n1. M-Pesa\n2. Airtel Money\n3. T-Kash"
  );

  let paymentName;

  if(method === "1") paymentName = "M-Pesa";
  else if(method === "2") paymentName = "Airtel Money";
  else if(method === "3") paymentName = "T-Kash";
  else {
    alert("Invalid selection");
    return;
  }

  generateReceipt(paymentName);
}*/

// CHECKOUT & PAYMENT PROMPT
function checkout() {
  if(cart.length === 0){
    alert("Your basket is empty!");
    return;
  }

  let paymentMethod = prompt(
    "Choose payment method:\n1. Mpesa\n2. Airtel Money\n3. T-Kash\n\nEnter 1, 2 or 3"
  );

  switch(paymentMethod){
    case "1":
      processPayment("Mpesa");
      break;
    case "2":
      processPayment("Airtel Money");
      break;
    case "3":
      processPayment("T-Kash");
      break;
    default:
      alert("Invalid choice!");
  }
}

// SIMULATED PAYMENT
function processPayment(method){
  alert(`Payment of KES ${totalAmount} via ${method} successful!`);

  cart = [];
  totalAmount = 0;
  displayCart();
}

// RECEIPT
function generateReceipt(method){
  let receiptDiv = document.getElementById("receipt");
  let total = 0;

  let receiptHTML = `<h2>Payment Receipt</h2>`;
  receiptHTML += `<p>Payment Method: ${method}</p><hr>`;

  cart.forEach(item=>{
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    receiptHTML += `
      <p>${item.product} x ${item.qty} = KES ${itemTotal}</p>
    `;
  });

  receiptHTML += `<hr><h3>Total Paid: KES ${total}</h3>`;
  receiptHTML += `<p>Thank you for shopping with Albertsons TechMart!</p>`;

  receiptDiv.innerHTML = receiptHTML;
  receiptDiv.classList.remove("hidden");

  cart = [];
  saveCart();
  displayCart();
}

// LOAD CART ON PAGE OPEN
displayCart();
document.getElementById("search").addEventListener("input", filterProducts);
document.getElementById("categoryFilter").addEventListener("change", filterProducts);

function filterProducts(){
  let searchValue = document.getElementById("search").value.toLowerCase();
  let category = document.getElementById("categoryFilter").value;

  let products = document.querySelectorAll(".product");

  products.forEach(product=>{
    let name = product.querySelector("h3").textContent.toLowerCase();
    let productCategory = product.getAttribute("data-category");

    let matchSearch = name.includes(searchValue);
    let matchCategory = category === "all" || category === productCategory;

    product.style.display = matchSearch && matchCategory ? "block" : "none";
  });
}
// ADMIN PANEL LOGIC
let productsDB = JSON.parse(localStorage.getItem("products")) || [];

function addProduct(){
  let name = document.getElementById("productName").value;
  let price = document.getElementById("productPrice").value;
  let category = document.getElementById("productCategory").value;

  productsDB.push({name, price, category});
  localStorage.setItem("products", JSON.stringify(productsDB));

  alert("Product added!");
}
// CHECKOUT LOGIC
function checkout(){

  let method = prompt("Select payment:\n1 Mpesa\n2 Airtel Money\n3 T-Kash");

  if(method === "1"){
    let phone = prompt("Enter Mpesa phone number:");
    alert("STK Push sent to " + phone);
  }

  generateReceipt();
}
// RECEIPT LOGIC
receiptHTML += `
<div style="border:1px solid #ccc;padding:20px">
<h2>Albertsons TechMart</h2>
<p>Order Confirmed</p>
<p>Date: ${new Date().toLocaleString()}</p>
<hr>
`;
// DARK MODE PERSISTENCE
if(localStorage.getItem("darkMode") === "enabled"){
  document.body.classList.add("dark");
}

function toggleDarkMode(){
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    localStorage.setItem("darkMode","enabled");
  } else {
    localStorage.setItem("darkMode","disabled");
  }
}
/* HASH PASSWORD
function hashPassword(password){return btoa(password+'TechMartSecure2026');}
// LOGIN SYSTEM
function registerUser(){
let username=document.getElementById("regUsername").value;
let email=document.getElementById("regEmail").value;
let password=hashPassword(document.getElementById("regPassword").value);
let role=document.getElementById("role").value;
/* VALIDATION
let users=JSON.parse(localStorage.getItem("users"))||[];
users.push({username,email,password,role,approved:false});
localStorage.setItem("users",JSON.stringify(users));
alert("Registered. Await admin approval.");
window.location.href="login.html";
}

/* LOGIN SYSTEM
document.addEventListener("DOMContentLoaded",()=>{
let form=document.getElementById("loginForm");
if(!form) return;
form.addEventListener("submit",e=>{
e.preventDefault();
let username=document.getElementById("loginUsername").value;
let email=document.getElementById("loginEmail").value;
let password=hashPassword(document.getElementById("loginPassword").value);

let users=JSON.parse(localStorage.getItem("users"))||[];
let user=users.find(u=>u.username===username&&u.email===email&&u.password===password);

if(user){localStorage.setItem("sessionUser",JSON.stringify(user));window.location.href="dashboard.html";}
else alert("Invalid login");
});
});*/

// HASH PASSWORD
function hashPassword(password){
  return btoa(password + "secureKey123");
}

// REGISTER USER
function registerUser(){

  let username = document.getElementById("regUsername").value;
  let email = document.getElementById("regEmail").value;
  let password = document.getElementById("regPassword").value;
  let role = document.getElementById("role").value;

  if(password.length < 6){
    alert("Password must be at least 6 characters");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.find(user => user.email === email);

  if(exists){
    alert("User already exists");
    return;
  }

  users.push({
    username,
    email,
    password: hashPassword(password),
    role
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  window.location.href="login.html";
}

// LOGIN SYSTEM
document.addEventListener("DOMContentLoaded", ()=>{

  let loginForm = document.getElementById("loginForm");
  if(!loginForm) return;

  loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    let username = document.getElementById("loginUsername").value;
    let email = document.getElementById("loginEmail").value;
    let password = hashPassword(document.getElementById("loginPassword").value);

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user =>
      user.username === username &&
      user.email === email &&
      user.password === password
    );

    if(validUser){

      // CREATE SESSION
      localStorage.setItem("sessionUser", JSON.stringify(validUser));

      // ROLE BASED REDIRECT
      if(validUser.role === "admin"){
        window.location.href="admin.html";
      } else {
        window.location.href="dashboard.html";
      }

    } else {
      alert("Invalid login credentials");
      trackLoginAttempts();
    }

  });
});

// LOGIN ATTEMPT LIMITER
function trackLoginAttempts(){
  let attempts = localStorage.getItem("loginAttempts") || 0;
  attempts++;

  localStorage.setItem("loginAttempts", attempts);

  if(attempts >= 5){
    alert("Too many attempts. Try again later.");
  }
}

// LOGOUT
function logout(){
  localStorage.removeItem("sessionUser");
  window.location.href="login.html";
}

// SESSION CHECK
function checkSession(){
  let session = localStorage.getItem("sessionUser");

  if(!session){
    window.location.href="login.html";
  }
}
// SHOW/HIDE PASSWORD
function togglePassword(){
  let pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

// LOGIN VALIDATION
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = users.find(user =>
    user.username === username &&
    user.email === email &&
    user.password === password
  );

  if(validUser){
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid login details");
  }
});

function registerUser(){

  let username = document.getElementById("newUsername").value;
  let email = document.getElementById("newEmail").value;
  let password = document.getElementById("newPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({username,email,password});
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  window.location.href="login.html";
}
// OTP
function verifyOTP(){
let entered=document.getElementById("otpInput").value;
let stored=localStorage.getItem("otp");
if(entered==stored){alert("Verified");window.location.href="dashboard.html";}
else alert("Invalid OTP");
}
// CHECK SESSION
function checkSession(){
if(!localStorage.getItem("sessionUser")) window.location.href="login.html";
}
function logout(){
localStorage.removeItem("sessionUser");
window.location.href="login.html";
}
