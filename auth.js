function toggleAuth() {
    const l = document.getElementById('login-form'), r = document.getElementById('register-form');
    l.style.display = l.style.display === 'none' ? 'block' : 'none';
    r.style.display = r.style.display === 'none' ? 'block' : 'none';
}

function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const address = document.getElementById('regAddress').value;
    const pass = document.getElementById('regPass').value;

    if(name && email && phone && address && pass) {
        // Customer ge okkoma wisthara object ekakata gannawa
        const userData = { 
            name: name, 
            email: email, 
            phone: phone, 
            address: address, 
            pass: pass, 
            joinedDate: new Date().toLocaleDateString() 
        };
        
        // Email eka key eka widihata tiyala save karanawa
        localStorage.setItem(email, JSON.stringify(userData));
        
        alert("Account Created Successfully! Please Login.");
        toggleAuth();
    } else { 
        alert("Please fill all fields including Mobile Number and Address!"); 
    }
}

function login() {
    const email = document.getElementById('logEmail').value;
    const pass = document.getElementById('logPass').value;
    const authBox = document.getElementById('login-form'); // Login Box එක ලබා ගැනීම
    const user = JSON.parse(localStorage.getItem(email));

    if(user && user.pass === pass) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        // වැරදි නම් Shake Animation එක දමනවා
        authBox.classList.add('shake-animation');
        
        // තත්පර භාගයකට පසු Animation එක අයින් කරනවා (නැවත පාවිච්චි කිරීමට)
        setTimeout(() => {
            authBox.classList.remove('shake-animation');
        }, 400);

    }
}
// මේ function එක auth.js එකේ අන්තිමට දාන්න
function lookAtPassword(isFocusing) {
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        if (isFocusing) {
            // Password box එක දෙසට බැලීම
            pupil.style.transform = 'translateY(2px)'; 
        } else {
            // ආපසු මැදට ගැනීම (නොබලා සිටීම)
            pupil.style.transform = 'translateY(0)';
        }
    });
}
function togglePasswordVisibility() {
    const passInput = document.getElementById('logPass');
    const toggleBtn = document.getElementById('toggleBtn');
    const characters = document.querySelectorAll('.character');

    if (passInput.type === "password") {
        // Password එක පෙන්වන අවස්ථාව
        passInput.type = "text";
        toggleBtn.innerText = "🔒"; // Icon එක වෙනස් කිරීම
        
        // කාටුන් චරිත දෙන්නා 'සතුටින්' ඔබ දෙස බලයි
        characters.forEach(char => char.classList.add('looking'));
        characters.forEach(char => char.classList.remove('hiding'));
    } else {
        // Password එක සඟවන අවස්ථාව
        passInput.type = "password";
        toggleBtn.innerText = "👁️";
        
        // කාටුන් චරිත දෙන්නා ඇස් වසා ගනී හෝ අහක බලා ගනී
        characters.forEach(char => char.classList.add('hiding'));
        characters.forEach(char => char.classList.remove('looking'));
    }
}
// Password එක පෙන්වන සහ සඟවන (Show/Hide) function එක
function togglePasswordVisibility() {
    const passInput = document.getElementById('logPass');
    const toggleBtn = document.getElementById('toggleBtn');
    const characters = document.querySelectorAll('.character');

    if (passInput.type === "password") {
        // Password එක පෙන්වන (Show) විට
        passInput.type = "text";
        toggleBtn.innerText = "🔒"; // Icon එක වෙනස් කරනවා
        
        // කාටුන් චරිත දෙන්නා පියවි ඇසින් බලනවා (Looking class එක දානවා)
        characters.forEach(char => {
            char.classList.add('looking');
            char.classList.remove('hiding');
        });
    } else {
        // Password එක සඟවන (Hide) විට
        passInput.type = "password";
        toggleBtn.innerText = "👁️"; // Icon එක ආපසු ඇසක් බවට පත් කරනවා
        
        // කාටුන් චරිත දෙන්නා ඇස් වසා ගන්නවා (Hiding class එක දානවා)
        characters.forEach(char => {
            char.classList.add('hiding');
            char.classList.remove('looking');
        });
    }
}

// Password box එක Click කරන විට ඇස් පහළට හැරවීමේ function එක
function lookAtPassword(isFocusing) {
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        if (isFocusing) {
            pupil.style.transform = 'translateY(5px)'; // ඇස් පල්ලෙහාට බැලීම
        } else {
            pupil.style.transform = 'translateY(0)'; // ඇස් කෙළින් බැලීම
        }
    });
}