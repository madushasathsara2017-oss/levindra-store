// EmailJS මුලින්ම සක්‍රීය කිරීම (Initialize)
const PUBLIC_KEY = 'IDmKdyQasLxiJ9S6J'; // ඔයාගේ Public Key එක මෙතනට දාන්න
emailjs.init(PUBLIC_KEY);

function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (cart.length === 0) {
        alert("ඔබේ කරත්තය හිස්!");
        return;
    }

    // Email එකට යන දත්ත සකස් කිරීම
    const orderItems = cart.map(item => ({
        name: item.name,
        units: item.qty,
        price: item.price * item.qty
    }));

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const orderID = "ORD-" + Math.floor(Math.random() * 1000000);

    const templateParams = {
        order_id: orderID,
        email: user ? user.email : "guest@example.com",
        orders: orderItems, // Template එකේ ඇති {{#orders}} ලූප් එක සඳහා
        cost: {
            shipping: 0,
            tax: 0,
            total: totalPrice
        }
    };

    // EmailJS Dashboard එකේ ID දෙක මෙතනට දාන්න
    const serviceID = 'service_u37hzbm'; 
    const templateID = 'template_662jahl';

    // Email එක යැවීම
    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
            alert("ඕඩරය සාර්ථකයි! විස්තර විද්‍යුත් තැපෑලට ලැබෙනු ඇත.");
            localStorage.removeItem('cart'); // ඕඩර් එක අවසන් නිසා කරත්තය හිස් කිරීම
            window.location.href = "index.html";
        }, function(error) {
            alert("Email යැවීමේ දෝෂයක්: " + JSON.stringify(error));
        });
}