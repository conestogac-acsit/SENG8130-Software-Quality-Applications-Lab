// mailService.test.ts

import nodemailer from 'nodemailer';
import { sendEmail, MailOptions } from './mailService';

// Mock nodemailer module
jest.mock('nodemailer');

const mockSendMail = jest.fn();

// Setup mock implementation before tests
beforeAll(() => {
  // @ts-ignore - mock createTransport to return an object with sendMail method
  nodemailer.createTransport.mockReturnValue({
    sendMail: mockSendMail,
  });
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('sendEmail function', () => {
  const mailOptions: MailOptions = {
    smtpUser: 'testuser@gmail.com',
    smtpPass: 'testpassword',
    from: 'testuser@gmail.com',
    to: 'recipient@example.com',
    subject: 'Hello',
    message: 'Test message body',
  };

  it('should send email successfully', async () => {
    mockSendMail.mockResolvedValueOnce(true);

    const result = await sendEmail(mailOptions);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.message,
    });

    expect(result).toEqual({ success: true });
  });

  it('should return error when sendMail throws', async () => {
    const error = new Error('SMTP failure');
    mockSendMail.mockRejectedValueOnce(error);

    const result = await sendEmail(mailOptions);

    expect(result.success).toBe(false);
    expect(result.error).toBe('SMTP failure');
  });
});