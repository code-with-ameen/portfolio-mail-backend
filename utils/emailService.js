const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendInquiryEmail = async ({ name, email, message }) => {

    // ==================================================
    // 1. MAIL TO YOU
    // ==================================================
    await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.RECEIVER_EMAIL,
        reply_to: email,
        subject: `New Inquiry From ${name}`,

        html: `
        <div style="
            background:#0a0a0a;
            color:white;
            padding:40px;
            font-family:Arial,sans-serif;
        ">
            <h1>New Inquiry</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="
                margin-top:20px;
                padding:20px;
                border-radius:16px;
                background:#111;
                border:1px solid rgba(255,255,255,.08);
            ">
                ${message}
            </div>
        </div>
        `
    });

    // ==================================================
    // 2. REPLY MAIL TO USER
    // ==================================================
    await resend.emails.send({
        from: 'Ameen <onboarding@resend.dev>',
        to: email,
        subject: 'Your inquiry has been received — Ameen',

        html: `
        <body style="
            margin:0;
            padding:0;
            background:#050505;
            font-family:Arial,sans-serif;
            color:#ffffff;
        ">
        <div style="
            max-width:700px;
            margin:40px auto;
            background:#0b0b0b;
            border:1px solid rgba(255,255,255,.08);
            border-radius:32px;
            overflow:hidden;
        ">
            <div style="padding:60px 50px;">

                <div style="
                    font-size:14px;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    color:#777;
                    margin-bottom:24px;
                ">
                    Inquiry Received
                </div>

                <h1 style="
                    font-size:48px;
                    line-height:1.1;
                    margin:0 0 24px;
                    font-weight:700;
                ">
                    Let's build something
                    <span style="color:#38bdf8;">meaningful.</span>
                </h1>

                <p style="color:#bdbdbd; font-size:18px; line-height:1.8; margin-bottom:24px;">
                    Hey ${name},
                </p>

                <p style="color:#bdbdbd; font-size:18px; line-height:1.8;">
                    Thank you for reaching out. I've successfully received your inquiry
                    and will personally review it.
                </p>

                <p style="color:#bdbdbd; font-size:18px; line-height:1.8;">
                    You can typically expect a reply within
                    <strong style="color:white;">24 hours</strong>.
                </p>

                <div style="
                    margin:40px 0;
                    padding:24px;
                    border-radius:24px;
                    background:#111;
                    border:1px solid rgba(255,255,255,.08);
                ">
                    <div style="
                        color:#777;
                        margin-bottom:10px;
                        font-size:14px;
                        text-transform:uppercase;
                    ">
                        Your Message
                    </div>
                    <div style="color:#fff; line-height:1.8;">
                        ${message}
                    </div>
                </div>

                <p style="color:#bdbdbd; font-size:18px; line-height:1.8;">
                    Appreciate your trust.
                </p>

                <h3 style="margin-top:40px; font-size:28px;">— Ameen</h3>

            </div>
        </div>
        </body>
        `
    });
};

module.exports = { sendInquiryEmail };