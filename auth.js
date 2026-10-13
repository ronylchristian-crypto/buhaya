// js/auth.js
import { 
    auth, 
    db, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail,
    ref, 
    set 
} from "./firebase-config.js";
import { sendOtpEmail } from "./email-service.js";

const recoveryStore = {}; // Holds temporary OTP codes in memory

export async function registerAccount(email, password, userData) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        const defaultWalletId = 'w_main_' + Date.now();
        const userRecord = {
            uid: uid,
            email: email,
            username: userData.username.toLowerCase(),
            name: userData.name,
            age: userData.age,
            phone: userData.phone,
            address: userData.address,
            wallets: {
                [defaultWalletId]: {
                    id: defaultWalletId,
                    name: "Main Wallet",
                    balance: 0.00,
                    cardNo: "3200 " + Math.floor(1000 + Math.random() * 9000) + " 8888 1234"
                }
            },
            activeWalletId: defaultWalletId,
            transactions: {}
        };

        await set(ref(db, 'users/' + uid), userRecord);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function loginAccount(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function requestPasswordResetCode(email) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    recoveryStore[email] = { code, expires: Date.now() + 600000 };

    await sendOtpEmail(email, code);

    try {
        await sendPasswordResetEmail(auth, email);
    } catch (e) {}

    return code;
}

export function verifyOtpCode(email, inputCode) {
    const record = recoveryStore[email];
    if (!record) return { valid: false, message: "No active recovery request found." };
    if (Date.now() > record.expires) return { valid: false, message: "Verification code expired." };
    if (record.code !== inputCode) return { valid: false, message: "Invalid verification code." };

    delete recoveryStore[email];
    return { valid: true };
}