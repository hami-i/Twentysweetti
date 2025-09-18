// main.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// เพิ่มสินค้าในตะกร้า
function addToCart(item, price) {
    cart.push({ name: item, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));

    // โหลดหน้า Order ถ้าอยู่หน้า Order
    const activePage = document.querySelector(".menu a.active");
    if (activePage && activePage.dataset.page === "order") {
        loadPage("order");
    }

    // แสดงข้อความบนหน้า
    const msg = document.getElementById('cartMessage');
    if (msg) {
        msg.textContent = `${item} ถูกเพิ่มในตะกร้าแล้ว!`;
        msg.style.color = 'green';
        setTimeout(() => { msg.textContent = ''; }, 2000); // ลบข้อความหลัง 2 วินาที
    }
}


// ลบสินค้าออกจากตะกร้า
function removeFromCart(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadPage("order");
}

// สร้าง HTML หน้า Order
function renderOrderPage() {
    if (cart.length === 0) {
        return `<h2 class="section-title">Your Cart</h2>
                <p class="empty-cart">ตะกร้าว่างเปล่า</p>`;
    }
    const rows = cart.map((item, i) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.price}฿</td>
          <td><button class="btn" onclick="removeFromCart(${i})">ลบ</button></td>
        </tr>`).join("");
    const total = cart.reduce((s, it) => s + it.price, 0);
    return `
      <h2 class="section-title">Your Cart</h2>
      <div class="order-card">
        <table>
          <tr><th>สินค้า</th><th>ราคา</th><th>ลบ</th></tr>
          ${rows}
        </table>
        <div class="order-total">รวมทั้งหมด: ${total} ฿</div>
      </div>`;
}

// ---- หน้าต่าง ๆ ----
const pages = {
    home: (user) => {
        if (user) {
            return `<h2 class="section-title">Welcome, ${user}!</h2>
                    <div style="text-align:center; margin-top:20px;">
                                <img src="image/logo.jpg" alt="Logo" style="width:150px; height:150px; border-radius:50%; box-shadow: 0 8px 20px rgba(0,0,0,0.2);">
                    <p style="text-align:center; font-size:24px; margin-top:20px;">
                    <p>ยินดีต้อนรับเข้าสู่ร้านไอติม <b>Twentysweetti</b> 🍦</p>`;
        } else {
            return `<h2 class="section-title">Welcome</h2>
                    <div style="text-align:center; margin-top:20px;">
                                <img src="image/logo.jpg" alt="Logo" style="width:150px; height:150px; border-radius:50%; box-shadow: 0 8px 20px rgba(0,0,0,0.2);">
                    <p style="text-align:center; font-size:24px; margin-top:20px;">
                    <p>ยินดีต้อนรับเข้าสู่ร้านไอติม <b>Twentysweetti</b> 🍦</p>`;
        }
    },
    product: `<h2 class="section-title">Product</h2>
    <h3 class="section-title">Ice Cream</h3>
    <div class="row">
      <div class="ice-item"><img src="strawberry-png.webp"><div class="label">Strawberry</div><button class="btn" onclick="addToCart('Strawberry',50)">สั่งซื้อ</button></div>
      <div class="ice-item"><img src="matcha.png"><div class="label">Matcha</div><button class="btn" onclick="addToCart('Matcha',45)">สั่งซื้อ</button></div>
      <div class="ice-item"><img src="mintchoc.webp"><div class="label">MintChoc</div><button class="btn" onclick="addToCart('MintChoc',50)">สั่งซื้อ</button></div>
      <div class="ice-item"><img src="choc.webp"><div class="label">Chocolate</div><button class="btn" onclick="addToCart('Chocolate',50)">สั่งซื้อ</button></div>
    </div>
    <h3 class="section-title">Toppings</h3>
    <div class="row">
      <div class="topping-item"><img src="Gummy.png"><div class="label">Gummy</div><button class="btn" onclick="addToCart('Gummy',15)">สั่งซื้อ</button></div>
      <div class="topping-item"><img src="whip.webp"><div class="label">Whip</div><button class="btn" onclick="addToCart('Whip',10)">สั่งซื้อ</button></div>
      <div class="topping-item"><img src="strawberry.webp"><div class="label">Strawberry</div><button class="btn" onclick="addToCart('Strawberry',20)">สั่งซื้อ</button></div>
      <div class="topping-item"><img src="caramel.jpg"><div class="label">Caramel</div><button class="btn" onclick="addToCart('Caramel',25)">สั่งซื้อ</button></div>
    </div>`,
    about: `<h2 class="section-title">About us</h2>
          <p>ร้านไอติม Twentysweetti 🍨</p>`,
    contact: `<h2 class="section-title">Contact</h2>
            <p>📍 ที่อยู่: กรุงเทพฯ</p>
            <p>📞 โทร: xxx-xxx-xxxx</p>`,
    login: `<div class="form-container">
        <h2>Log In</h2>
        <input type="text" id="loginUser" placeholder="Username">
        <input type="password" id="loginPass" placeholder="Password">
        <button class="btn" onclick="doLogin()">Log In</button>
      </div>`,
    register: `<div class="form-container">
           <h2>Register</h2>
           <input type="text" id="regUser" placeholder="Username">
           <input type="password" id="regPass" placeholder="Password">
           <button class="btn" onclick="doRegister()">Register</button>
         </div>`
};

// โหลดหน้า
function loadPage(page) {
    const user = localStorage.getItem('user');
    const html = page === "order" ? renderOrderPage() : (typeof pages[page] === 'function' ? pages[page](user) : pages[page]);
    document.getElementById("content").innerHTML = html;
    document.querySelectorAll(".menu a").forEach(a => a.classList.remove("active"));
    const link = document.querySelector(`.menu a[data-page="${page}"]`);
    if (link) link.classList.add("active");
}

// ---- ระบบ Login / Register ----
function doLogin() {
    const user = document.getElementById('loginUser').value.trim();
    const msg = document.getElementById('loginMessage');
    if (!user) {
        msg.textContent = 'กรุณากรอก Username';
        msg.style.color = 'red';
        return;
    }
    localStorage.setItem('user', user);
    updateAuthUI();
    loadPage('home');
    msg.textContent = `สวัสดี ${user}! คุณล็อกอินเรียบร้อยแล้ว`;
    msg.style.color = 'green';
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
}

function doRegister() {
    const user = document.getElementById('regUser').value.trim();
    const msg = document.getElementById('regMessage');
    if (!user) {
        msg.textContent = 'กรุณากรอก Username';
        msg.style.color = 'red';
        return;
    }
    localStorage.setItem('user', user);
    msg.textContent = `สมัครสมาชิกเรียบร้อย! ยินดีต้อนรับ ${user}`;
    msg.style.color = 'green';
    updateAuthUI();
    loadPage('home');
    document.getElementById('regUser').value = '';
    document.getElementById('regPass').value = '';
}




function logoutUser() {
    localStorage.removeItem('user');
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateAuthUI();
    loadPage('home');
}

// แสดง/ซ่อนปุ่มตามสถานะล็อกอิน
function updateAuthUI() {
    const user = localStorage.getItem('user');
    const logged = !!user;
    document.getElementById('loginBtn').style.display = logged ? 'none' : 'inline-block';
    document.getElementById('registerBtn').style.display = logged ? 'none' : 'inline-block';
    document.getElementById('logoutBtn').style.display = logged ? 'inline-block' : 'none';
    // แสดงชื่อผู้ใช้ใน sidebar
    const welcomeText = document.getElementById('welcomeText');
    if (logged) {
        welcomeText.innerHTML = `Welcome, <b>${user}</b>`;
    } else {
        welcomeText.innerHTML = `Welcome To<br><strong style="font-family:'Baloo 2';font-size:20px">Twentysweetti</strong>`;
    }
}

// เริ่มต้นเมื่อ DOM โหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(".menu a").forEach(a =>
        a.addEventListener("click", () => loadPage(a.dataset.page))
    );
    document.getElementById('logoutBtn').addEventListener('click', logoutUser);
    updateAuthUI();
    loadPage('home');
});