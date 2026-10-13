// js/email-service.js

// EmailJS configuration (kept in sync with index.html defaults)
const EMAILJS_PUBLIC_KEY = "3-hyzSwBnkYvOkKdq";
const EMAILJS_SERVICE_ID = "service_bznl0xg";
const EMAILJS_OTP_TEMPLATE_ID = "template_9r0wfeo";
const EMAILJS_RECEIPT_TEMPLATE_ID = "template_2jvaakh";

// Initialize EmailJS if available in the browser environment
if (typeof window !== 'undefined' && window.emailjs) {
    try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (e) { console.warn('EmailJS init failed:', e); }
}

/**
 * Sends a 6-digit verification code to user's registered Gmail
 */
export async function sendOtpEmail(recipientEmail, otpCode) {
    try {
        if (typeof window !== 'undefined' && window.emailjs) {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OTP_TEMPLATE_ID, {
                to_email: recipientEmail,
                otp_code: otpCode,
                message: `Your Crocodile Wallet password reset code is: ${otpCode}. Valid for 10 minutes.`
            });
        }
        console.log(`Verification code [${otpCode}] dispatched to ${recipientEmail}`);
        return true;
    } catch (error) {
        console.error("EmailJS dispatch error:", error);
        return false;
    }
}

/**
 * Dispatches an automated transaction receipt email
 */
export async function sendReceiptEmail(recipientEmail, recipientName, txData) {
    const receiptRef = "REC-" + Math.floor(100000 + Math.random() * 900000);
    try {
        if (typeof window !== 'undefined' && window.emailjs) {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_RECEIPT_TEMPLATE_ID, {
                to_email: recipientEmail,
                to_name: recipientName,
                receipt_id: receiptRef,
                amount: `₱${parseFloat(txData.amount).toFixed(2)}`,
                category: txData.category,
                type: (txData.type || '').toUpperCase(),
                description: txData.description,
                date: new Date().toLocaleString()
            });
        }
        console.log(`Receipt ${receiptRef} emailed to ${recipientEmail}`);
        return receiptRef;
    } catch (error) {
        console.error("Receipt email error:", error);
        return receiptRef;
    }
}