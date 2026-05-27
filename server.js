require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { sendInquiryEmail } = require('./utils/emailService');

const app = express();

app.use(cors({
    origin: [
        'https://dev-ameen.netlify.app',
        'https://dev-ameen.vercel.app'
    ],
    methods: ['GET', 'POST']
}));
app.use(express.json({
    limit: '10kb'
}));
app.use(helmet());
app.disable('x-powered-by');
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message:
            'Too many inquiries. Please try again later.'
    }
});

app.use('/contact', contactLimiter);

app.get('/', (req, res) => {
    res.send('Mail server running 😭🔥');
});

app.post('/contact', async (req, res) => {

    const { name, email, message } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'All fields required'
        });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email'
        });
    }

    if (name.length > 80) {
        return res.status(400).json({
            success: false,
            message: 'Name too long'
        });
    }

    if (message.length > 2000) {
        return res.status(400).json({
            success: false,
            message: 'Message too long'
        });
    }
    
    try {
        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const cleanMessage = message.trim();

        await sendInquiryEmail({
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage
        });

        res.status(200).json({
            success: true,
            message: 'Mail sent'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Mail failed'
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});