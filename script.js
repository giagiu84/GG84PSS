
function generatePublic() {
    const input = document.getElementById('privateKey').value;
    if (!validatePrivateKey(input)) {
        alert("Password non valida: min 8 caratteri, almeno 1 maiuscola e 1 simbolo.");
        return;
    }
    const hash = simpleHash(input);
    document.getElementById("publicKey").textContent = hash;
}

function copyPub() {
    const key = document.getElementById("publicKey").textContent;
    navigator.clipboard.writeText(key);
}

function generateSharedSecret() {
    const myPriv = document.getElementById("privateKey").value;
    const theirPub = document.getElementById("receivedPubKey").value;
    if (!validatePrivateKey(myPriv) || !theirPub) {
        alert("Controlla che entrambi i campi siano compilati correttamente.");
        return;
    }

    // ✅ Nuova logica simmetrica: entrambe le chiavi pubbliche vengono usate in ordine ordinato
    const myPub = simpleHash(myPriv);
    const keysOrdered = [myPub, theirPub].sort(); // garantisce simmetria tra i due lati
    const combined = keysOrdered[0] + keysOrdered[1];

    const hash = simpleHash(combined);
    const password = formatPassword(hash);
    document.getElementById("sharedSecret").textContent = password;
}

function copySharedSecret() {
    const key = document.getElementById("sharedSecret").textContent;
    navigator.clipboard.writeText(key);
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString();
}

function validatePrivateKey(pw) {
    return pw.length >= 8 && /[A-Z]/.test(pw) && /[^a-zA-Z0-9]/.test(pw);
}

function formatPassword(base) {
    let chars = base.padEnd(12, 'x').split('');
    chars[0] = String.fromCharCode((chars[0].charCodeAt(0) % 26) + 65); // Uppercase letter
    chars[1] = '@';
    return chars.join('').substring(0, 12);
}

function togglePassword() {
    const input = document.getElementById("privateKey");
    const btn = document.getElementById("togglePasswordBtn");
    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🙈";
    } else {
        input.type = "password";
        btn.textContent = "👁️";
    }
}
