const products = [
    { id: 101, name: "Levindra Purple Bottle", category: "Bottles", price: 850, img: "images/IMG_20260108_151623_026.jpg" },
    { id: 102, name: "Levindra Sport Black", category: "Bottles", price: 1100, img: "images/IMG_20260108_151626_500.jpg" }
    // Shoes, Bags, Books මෙතනට පසුව ඇතුළත් කරන්න
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    filterProducts('Bottles'); // පටන් ගන්න කොට Bottles පෙන්වයි
});

function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authUI = document.getElementById('auth-ui');
    
    if (user) {
        const profilePicUrl = user.profilePic ? user.profilePic : 'images/default-avatar.png';
        
        authUI.innerHTML = `
            <div class="profile-only-section">
                <a href="account.html">
                    <img src="${profilePicUrl}" class="nav-profile-img-standalone" title="Go to My Account">
                </a>
            </div>
        `;
    } else {
        authUI.innerHTML = `
            <a href="auth.html" class="nav-btn-login" style="background: white; color: var(--main-purple); padding: 8px 20px; border-radius: 50px; text-decoration: none; font-weight: 600;">Login</a>
        `;
    }
}

let currentOpenCat = ""; 

function showSub(cat) {
    const subBar = document.getElementById('sub-nav-bar');
    
    // Toggle Logic
    if (currentOpenCat === cat) {
        subBar.style.display = "none";
        currentOpenCat = "";
        return;
    }

    const subData = {
        'Shoes': ['Mens', 'Ladies', 'Students'],
        'Books': ['CR', 'EX'],
        'Bags': ['Boys', 'Girls', 'Ladies'],
        'Bottles': []
    };

    const subs = subData[cat] || [];
    
    // Sub-categories නැතිනම් කෙලින්ම Filter කරන්න
    if (subs.length === 0) {
        subBar.style.display = "none";
        currentOpenCat = "";
        filterProducts(cat); 
        return;
    }

    // showSub function එක ඇතුළත මේක දාන්න (event එක pass කරලා තියෙන්න ඕනේ)
const rect = event.target.getBoundingClientRect();
subBar.style.left = `${rect.left + (rect.width / 2)}px`;

    subBar.innerHTML = "";
    subBar.style.display = "flex";
    currentOpenCat = cat;

    subs.forEach(s => {
        const btn = document.createElement('button');
        btn.innerText = s;
        btn.className = 'sub-item-btn';
        btn.onclick = () => {
            filterProducts(cat, s);
            // බටන් එකක් එබූ පසු sub-menu එක වැසීමට ඕනේ නම්:
            // subBar.style.display = "none";
            // currentOpenCat = "";
        };
        subBar.appendChild(btn);
    });
}
// වෙනත් තැනක් (Books/Bottles) එබූ විට sub bar එක ඉබේම වැසීමට
function filterProducts(mainCat, subCat = null) {
    if(!subCat) {
        document.getElementById('sub-nav-bar').style.display = "none";
        currentOpenCat = "";
    }
    
    // කලින් තිබුණු ඉතිරි filterProducts කේතය මෙතැනින් පල්ලෙහාට තබන්න...
    const filtered = products.filter(p => p.category === mainCat);
    const root = document.getElementById('product-display');
    root.innerHTML = filtered.map(p => `
        <div class="product-card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p class="purple-text"><b>Rs. ${p.price}</b></p>
            <button onclick="addToCart(${p.id})" class="btn-primary">Add to Cart</button>
        </div>
    `).join('');
}

function filterProducts(mainCat, subCat = null) {
    if(!subCat) document.getElementById('sub-nav-bar').style.display = "none";
    const filtered = products.filter(p => p.category === mainCat);
    const root = document.getElementById('product-display');
    root.innerHTML = filtered.map(p => `
        <div class="product-card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p class="purple-text"><b>Rs. ${p.price}</b></p>
            <button onclick="addToCart(${p.id})" class="btn-primary">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('levindra_cart')) || [];
    let product = products.find(p => p.id === id);
    
    // Product eka kalin thiyenawada balala quantity wadi karanawa
    let existing = cart.find(item => item.id === id);
    if(existing) {
        existing.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    localStorage.setItem('levindra_cart', JSON.stringify(cart));
    updateCartUI();
    alert(product.name + " added to cart!");
}

function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem('levindra_cart')) || [];
    let count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    let total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    if(document.getElementById('cart-count')) document.getElementById('cart-count').innerText = count;
    if(document.getElementById('total-price')) document.getElementById('total-price').innerText = total;
}
function togglePaymentFields() {
    const method = document.getElementById('paymentMethod').value;
    document.getElementById('cod-fields').style.display = method === 'cod' ? 'block' : 'none';
    document.getElementById('card-fields').style.display = method === 'card' ? 'block' : 'none';
}

// Format Card Number
document.getElementById('cardNumber').addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
});

function confirmOrder() {
    // පාරිභෝගිකයා විස්තර පුරවා ඇත්දැයි බැලීම
    const name = document.getElementById('shipName').value;
    const phone = document.getElementById('shipPhone').value;
    
    if(!name || !phone) {
        alert("කරුණාකර නම සහ දුරකථන අංකය ඇතුළත් කරන්න.");
        return;
    }

    // ඕඩර් එක Confirm වූ පසු cart.js එකේ ඇති placeOrder ක්‍රියාත්මක කරයි
    if(typeof placeOrder === "function") {
        placeOrder(); 
    } else {
        console.error("cart.js එක නිවැරදිව සම්බන්ධ වී නැත.");
    }
}
function showProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('u-name').innerText = user.name;
    document.getElementById('u-email').innerText = user.email;
    document.getElementById('u-date').innerText = user.joinedDate || "N/A";
    document.getElementById('user-profile-section').style.display = 'block';
}

function closeProfile() { document.getElementById('user-profile-section').style.display = 'none'; }
function showCheckout() { document.getElementById('checkout-modal').style.display = 'flex'; }
function closeCheckout() { document.getElementById('checkout-modal').style.display = 'none'; }
function logout() { localStorage.removeItem('currentUser'); location.reload(); }