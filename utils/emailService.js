const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,        // ← 465 ki jagah 587
    secure: false,    // ← 587 ke liye false hona chahiye
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendInquiryEmail = async ({ name, email, message }) => {

    // ==================================================
    // 1. MAIL TO YOU
    // ==================================================
    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: `New Inquiry From ${name}`,
            html: `
            <div style="background:#0a0a0a;color:white;padding:40px;font-family:Arial,sans-serif;">
                <h1>New Inquiry</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <div style="margin-top:20px;padding:20px;border-radius:16px;background:#111;border:1px solid rgba(255,255,255,.08);">
                    ${message}
                </div>
            </div>
            `
        });
        console.log('✅ Mail 1 sent to:', process.env.RECEIVER_EMAIL);
    } catch (err) {
        console.error('❌ Mail 1 FAILED:', err.message);
        throw err;
    }

    // ==================================================
    // 2. REPLY MAIL TO USER
    // ==================================================
    try {
        await transporter.sendMail({
            from: `"Ameen" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your inquiry has been received — Ameen',
            html: `
            <body style="margin:0;padding:0;background:#050505;font-family:Arial,sans-serif;color:#ffffff;">
            <div style="max-width:700px;margin:40px auto;background:#0b0b0b;border:1px solid rgba(255,255,255,.08);border-radius:32px;overflow:hidden;">
                <div style="padding:60px 50px;">
                    <div style="font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#777;margin-bottom:24px;">Inquiry Received</div>
                    <h1 style="font-size:48px;line-height:1.1;margin:0 0 24px;font-weight:700;">
                        Let's build something <span style="color:#38bdf8;">meaningful.</span>
                    </h1>
                    <p style="color:#bdbdbd;font-size:18px;line-height:1.8;margin-bottom:24px;">Hey ${name},</p>
                    <p style="color:#bdbdbd;font-size:18px;line-height:1.8;">Thank you for reaching out. I've successfully received your inquiry and will personally review it.</p>
                    <p style="color:#bdbdbd;font-size:18px;line-height:1.8;">You can typically expect a reply within <strong style="color:white;">24 hours</strong>.</p>
                    <div style="margin:40px 0;padding:24px;border-radius:24px;background:#111;border:1px solid rgba(255,255,255,.08);">
                        <div style="color:#777;margin-bottom:10px;font-size:14px;text-transform:uppercase;">Your Message</div>
                        <div style="color:#fff;line-height:1.8;">${message}</div>
                    </div>
                    <p style="color:#bdbdbd;font-size:18px;line-height:1.8;">Appreciate your trust.</p>
                    <h3 style="margin-top:40px;font-size:28px;">— Ameen</h3>
                </div>
            </div>
            </body>
            `
        });
        console.log('✅ Mail 2 sent to:', email);
    } catch (err) {
        console.error('❌ Mail 2 FAILED:', err.message);
        throw err;
    }
};

module.exports = { sendInquiryEmail };