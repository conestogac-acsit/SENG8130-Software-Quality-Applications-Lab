import express, { Request, Response } from 'express';
import { sendEmail } from '../BroadcastMailService/mailService';

const router = express.Router();

router.post('/send-email', async (req: Request, res: Response): Promise<void> => {
  const { smtpUser, smtpPass, from, to, subject, message } = req.body;

  if (!smtpUser || !smtpPass || !from || !to || !subject || !message) {
    res.status(400).json({ success: false, error: 'Missing required fields' });
    return;
  }

  const result = await sendEmail({ smtpUser, smtpPass, from, to, subject, message });

  if (result.success) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: result.error });
  }
});

export default router;
