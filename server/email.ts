import { Resend } from 'resend';

const resend = new Resend('re_db9PFA39_K2AzsaXgh4jvVUKUUyJPQ2pi');

export async function sendEmail(to: string, subject: string, html: string) {
  const result = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: to,
    subject: subject,
    html: html,
  });
  
  if (result.error) {
    console.error('Resend email error:', result.error);
    throw new Error(`Failed to send email: ${result.error.message || JSON.stringify(result.error)}`);
  }
  
  if (!result.data) {
    console.error('Resend returned no data:', result);
    throw new Error('Failed to send email: No data returned from Resend');
  }
  
  console.log('Email sent successfully:', result.data);
  return result.data;
}
