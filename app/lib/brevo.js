// Brevo Transactional Email Integration using HTTP REST API

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

async function sendBrevoEmail({ toEmail, toName, subject, htmlContent }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Grand Golden Lawn";

  if (!apiKey) {
    console.error("BREVO_API_KEY environment variable is not defined.");
    return { success: false, error: "BREVO_API_KEY missing" };
  }
  if (!senderEmail) {
    console.error("BREVO_SENDER_EMAIL environment variable is not defined.");
    return { success: false, error: "BREVO_SENDER_EMAIL missing" };
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: toEmail,
            name: toName,
          },
        ],
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, messageId: data.messageId };
    } else {
      const errorText = await response.text();
      console.error("Brevo API call failed with response:", errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error("Error calling Brevo REST API:", error);
    return { success: false, error: error.message };
  }
}

// Common HTML styles wrapper for luxury digital wedding invitation appearance
const getEmailWrapper = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grand Golden Wedding Lawn</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        padding: 8px !important;
      }
      .content-td {
        padding: 35px 20px !important;
      }
      .action-btn-cell {
        display: block !important;
        width: 100% !important;
        padding: 8px 0 !important;
      }
      .action-btn {
        padding: 16px 12px !important;
        font-size: 12px !important;
      }
      .voucher-table td {
        display: block !important;
        width: 100% !important;
        text-align: left !important;
        padding: 4px 0 !important;
      }
      .voucher-label {
        border-bottom: none !important;
        padding-bottom: 0 !important;
      }
      .voucher-value {
        border-bottom: 1px solid #F4EFE6 !important;
        padding-bottom: 8px !important;
      }
    }
  </style>
</head>
<body style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #FAF8F2; color: #2C0808; margin: 0; padding: 20px 0; -webkit-font-smoothing: antialiased;">
  <table class="email-container" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto; background-color: #FFFDF9; border: 1px solid #DFB76C; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(44, 8, 8, 0.05);">
    <!-- Gold double outer frame effect -->
    <tr>
      <td style="padding: 6px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E6D8BF; border-radius: 10px;">
          <!-- Centered Crest Header -->
          <tr>
            <td align="center" style="background-color: #5B1C1C; padding: 40px 20px; border-bottom: 2px solid #C5A059; border-radius: 9px 9px 0 0;">
              <div style="width: 60px; height: 60px; line-height: 60px; border-radius: 50%; border: 1px solid #C5A059; background-color: #5B1C1C; text-align: center; display: inline-block; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
                <span style="font-family: 'Playfair Display', 'Georgia', serif; font-size: 26px; font-weight: 300; color: #C5A059; letter-spacing: 1px; line-height: 60px;">G</span>
              </div>
              <div style="font-family: 'Playfair Display', 'Georgia', serif; font-size: 14px; letter-spacing: 4px; text-transform: uppercase; color: #E6D8BF; margin-top: 16px; font-weight: 400;">Grand Golden</div>
              <div style="font-family: 'Cormorant Garamond', 'Georgia', serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #C5A059; margin-top: 4px; font-style: italic;">Where Celebrations Become Timeless Memories</div>
            </td>
          </tr>
          
          <!-- Inner content body -->
          <tr>
            <td class="content-td" style="padding: 45px 40px; background-color: #FFFDF9;">
              ${content}
            </td>
          </tr>
          
          <!-- Ornate Footer -->
          <tr>
            <td align="center" style="background-color: #F4EFE6; padding: 30px 20px; border-top: 1px solid #E6D8BF; border-radius: 0 0 9px 9px;">
              <p style="font-family: 'Cormorant Garamond', 'Georgia', serif; font-size: 13px; font-style: italic; color: #8C6F32; margin: 0 0 8px 0; font-weight: 500;">Grand Golden Wedding Lawn & Destination Venue</p>
              <p style="font-family: 'Inter', Arial, sans-serif; font-size: 9px; color: #A28242; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Premium Bypass Road, Mumbai, IN | concierge@grandgoldenlawn.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// 1. Send Booking Request Notification to Admin
export async function sendAdminNotificationEmail(booking, confirmUrl, delayUrl, rejectUrl) {
  const adminEmail = process.env.BREVO_RECIEVER_EMAIL || process.env.BREVO_RECEIVER_EMAIL || process.env.BREVO_SENDER_EMAIL;
  const subject = `[NEW BOOKING REQUEST] ${booking.customerName} - ${booking.eventDate}`;

  const bodyContent = `
    <h2 style="font-family: 'Playfair Display', 'Georgia', serif; font-size: 22px; font-weight: 300; color: #5B1C1C; margin-top: 0; margin-bottom: 8px; text-align: center; letter-spacing: 0.5px;">New Reservation Inquiry</h2>
    <p style="font-family: 'Cormorant Garamond', 'Georgia', serif; font-size: 14px; color: #8C6F32; text-align: center; margin-top: 0; margin-bottom: 30px; font-style: italic; letter-spacing: 1px;">A request requires scheduling coordination</p>
    
    <!-- Details Box design -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E6D8BF; border-left: 4px solid #5B1C1C; background-color: #FAFAF9; border-radius: 8px; margin-bottom: 35px; box-shadow: 0 4px 12px rgba(44, 8, 8, 0.02);">
      <tr>
        <td style="padding: 24px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="voucher-table">
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 8px; border-bottom: 1px solid #F4EFE6; width: 35%;">Client Name</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">${booking.customerName}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">Email Address</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">${booking.email}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">Contact Number</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">${booking.phone}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">Event Type</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">${booking.eventType}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">Event Date</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #AB8A44; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">${booking.eventDate}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">Guest Count</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 12px 8px; border-bottom: 1px solid #F4EFE6;">${booking.guestCount} Guests</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 8px; vertical-align: top;">Special Notes</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 12px 8px; line-height: 1.5;">${booking.notes || "N/A"}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Admin CTA Action Row with Equal Button Sizing -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #E6D8BF; padding-top: 30px; margin-top: 30px;">
      <tr>
        <td align="center">
          <p style="font-family: 'Cormorant Garamond', serif; font-size: 14px; color: #8C6F32; margin: 0 0 20px 0; font-style: italic;">Review scheduling details and select a response action:</p>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; margin: 0 auto;">
            <tr>
              <td class="action-btn-cell" align="center" style="width: 33.333%; padding: 6px;">
                <a href="${confirmUrl}" class="action-btn" style="display: block; background-color: #AB8A44; color: #FFFDF9; border: 1px solid #8C6F32; text-align: center; padding: 14px 8px; font-size: 11px; font-family: 'Inter', sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 6px; box-shadow: 0 4px 10px rgba(171, 138, 68, 0.12); box-sizing: border-box; transition: all 0.3s ease;">Confirm Booking</a>
              </td>
              <td class="action-btn-cell" align="center" style="width: 33.333%; padding: 6px;">
                <a href="${delayUrl}" class="action-btn" style="display: block; background-color: #5B1C1C; color: #FFFDF9; border: 1px solid #421010; text-align: center; padding: 14px 8px; font-size: 11px; font-family: 'Inter', sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 6px; box-shadow: 0 4px 10px rgba(91, 28, 28, 0.12); box-sizing: border-box; transition: all 0.3s ease;">Under Review</a>
              </td>
              <td class="action-btn-cell" align="center" style="width: 33.333%; padding: 6px;">
                <a href="${rejectUrl}" class="action-btn" style="display: block; background-color: #2C0808; color: #FFFDF9; border: 1px solid #140202; text-align: center; padding: 14px 8px; font-size: 11px; font-family: 'Inter', sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 6px; box-shadow: 0 4px 10px rgba(44, 8, 8, 0.12); box-sizing: border-box; transition: all 0.3s ease;">Reject Booking</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const htmlContent = getEmailWrapper(bodyContent);

  return sendBrevoEmail({
    toEmail: adminEmail,
    toName: "Hall Administrator",
    subject,
    htmlContent,
  });
}

// 2. Send Booking Confirmation to Customer
export async function sendCustomerConfirmationEmail(booking) {
  const subject = `Reservation Confirmed - Grand Golden Wedding Lawn`;

  const bodyContent = `
    <h2 style="font-family: 'Playfair Display', 'Georgia', serif; font-size: 24px; font-weight: 300; color: #5B1C1C; margin-top: 0; margin-bottom: 6px; text-align: center; letter-spacing: 0.5px;">Reservation Confirmed</h2>
    <p style="font-family: 'Cormorant Garamond', 'Georgia', serif; font-size: 14px; color: #C5A059; text-align: center; margin-top: 0; margin-bottom: 35px; font-style: italic; letter-spacing: 1px;">Your milestone celebration is locked in</p>
    
    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: #3A3A3A; margin-bottom: 25px;">
      Dear ${booking.customerName},<br><br>
      We are delighted to inform you that your booking request for the <strong>Grand Golden Wedding Lawn</strong> has been officially confirmed! Our management team is excited to assist you in designing a truly timeless and luxurious experience.
    </p>
    
    <!-- Voucher ticket design -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #DFB76C; background-color: #FAFAF9; border-radius: 8px; margin-bottom: 35px; border-left: 4px solid #C5A059; box-shadow: 0 4px 12px rgba(171, 138, 68, 0.03);">
      <tr>
        <td style="padding: 24px 20px;">
          <h4 style="margin: 0 0 15px 0; font-family: 'Playfair Display', 'Georgia', serif; color: #5B1C1C; font-weight: 400; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #E6D8BF; padding-bottom: 10px;">Reservation Details</h4>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="voucher-table">
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 0; width: 40%;">Event Type</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 8px 0;">${booking.eventType}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 0;">Selected Date</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #AB8A44; padding: 8px 0;">${booking.eventDate}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 0;">Guests Capacity</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 8px 0;">${booking.guestCount} Guests</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 0;">Status</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; color: #2E7D32; padding: 8px 0; text-transform: uppercase; letter-spacing: 1.5px;">✓ CONFIRMED</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: #3A3A3A; margin-bottom: 30px;">
      An event coordinator will contact you shortly to arrange physical walkthroughs, custom styling parameters, and catering setups.
    </p>

    <!-- Hospitality footer note -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(223, 183, 108, 0.08); border-radius: 8px; border: 1px solid rgba(223, 183, 108, 0.15);">
      <tr>
        <td style="padding: 18px; text-align: center; font-family: 'Inter', sans-serif; font-size: 12px; color: #5B1C1C; line-height: 1.5;">
          <strong>Have questions?</strong> Reach our concierge division directly at <br>
          <span style="font-weight: 600; color: #AB8A44;">+91 98765 43210</span> or <span style="font-weight: 600; color: #AB8A44;">concierge@grandgoldenlawn.com</span>
        </td>
      </tr>
    </table>
  `;

  const htmlContent = getEmailWrapper(bodyContent);

  return sendBrevoEmail({
    toEmail: booking.email,
    toName: booking.customerName,
    subject,
    htmlContent,
  });
}

// 3. Send Booking Rejection to Customer
export async function sendCustomerRejectionEmail(booking) {
  const subject = `Booking Update - Grand Golden Wedding Lawn`;

  const bodyContent = `
    <h2 style="font-family: 'Playfair Display', 'Georgia', serif; font-size: 24px; font-weight: 300; color: #5B1C1C; margin-top: 0; margin-bottom: 25px; text-align: center; letter-spacing: 0.5px;">Booking Request Update</h2>
    
    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: #3A3A3A; margin-bottom: 25px;">
      Dear ${booking.customerName},<br><br>
      Thank you for your interest in hosting your milestone celebration at the <strong>Grand Golden Wedding Lawn</strong>.<br><br>
      We regret to inform you that we are unable to accommodate your booking request for the date of <strong>${booking.eventDate}</strong> due to scheduling conflicts or prior commitments on the main lawn. We sincerely apologize for any inconvenience this may cause to your event planning.
    </p>
    
    <!-- Voucher ticket design -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E6D8BF; background-color: #FAFAF9; border-radius: 8px; margin-bottom: 35px; border-left: 4px solid #2C0808; box-shadow: 0 4px 12px rgba(44, 8, 8, 0.03);">
      <tr>
        <td style="padding: 24px 20px;">
          <h4 style="margin: 0 0 15px 0; font-family: 'Playfair Display', 'Georgia', serif; color: #5B1C1C; font-weight: 400; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #E6D8BF; padding-bottom: 10px;">Request Reference</h4>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="voucher-table">
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 0; width: 40%;">Event Type</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 8px 0;">${booking.eventType}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 0;">Requested Date</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 8px 0;">${booking.eventDate}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 0;">Status</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; color: #C62828; padding: 8px 0; text-transform: uppercase; letter-spacing: 1.5px;">✗ UNAVAILABLE</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: #3A3A3A; margin-bottom: 30px;">
      If your dates are flexible or you wish to explore alternative arrangements, please do not hesitate to contact our booking office. We would be honored to assist you with alternative openings.
    </p>

    <!-- Contact note -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(223, 183, 108, 0.08); border-radius: 8px; border: 1px solid rgba(223, 183, 108, 0.15);">
      <tr>
        <td style="padding: 15px; text-align: center; font-family: 'Inter', sans-serif; font-size: 12px; color: #5B1C1C; line-height: 1.5;">
          <strong>Concierge Division</strong><br>
          For calendar availability, reach us at <span style="font-weight: 600; color: #AB8A44;">+91 98765 43210</span> or <span style="font-weight: 600; color: #AB8A44;">concierge@grandgoldenlawn.com</span>
        </td>
      </tr>
    </table>
  `;

  const htmlContent = getEmailWrapper(bodyContent);

  return sendBrevoEmail({
    toEmail: booking.email,
    toName: booking.customerName,
    subject,
    htmlContent,
  });
}

// 4. Send Delay / Under Review Notification to Customer
export async function sendCustomerDelayEmail(booking) {
  const subject = `Booking Status Update - Grand Golden Wedding Lawn`;

  const bodyContent = `
    <h2 style="font-family: 'Playfair Display', 'Georgia', serif; font-size: 24px; font-weight: 300; color: #5B1C1C; margin-top: 0; margin-bottom: 6px; text-align: center; letter-spacing: 0.5px;">Booking Status</h2>
    <p style="font-family: 'Cormorant Garamond', 'Georgia', serif; font-size: 14px; color: #C5A059; text-align: center; margin-top: 0; margin-bottom: 35px; font-style: italic; letter-spacing: 1px;">Your request is under review</p>
    
    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: #3A3A3A; margin-bottom: 25px;">
      Dear ${booking.customerName},<br><br>
      Thank you for submitting your booking query for the <strong>Grand Golden Wedding Lawn</strong>.<br><br>
      We are writing to inform you that your request for the event date <strong>${booking.eventDate}</strong> is currently <strong>Under Review</strong>. Our scheduling and catering departments are checking detailed slot configurations to confirm if we can accommodate your requirements. No further action is required from you.
    </p>
    
    <!-- Voucher ticket design -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #DFB76C; background-color: #FAFAF9; border-radius: 8px; margin-bottom: 35px; border-left: 4px solid #AB8A44; box-shadow: 0 4px 12px rgba(171, 138, 68, 0.03);">
      <tr>
        <td style="padding: 24px 20px;">
          <h4 style="margin: 0 0 15px 0; font-family: 'Playfair Display', 'Georgia', serif; color: #5B1C1C; font-weight: 400; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #E6D8BF; padding-bottom: 10px;">Pending Review details</h4>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="voucher-table">
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 0; width: 40%;">Event Type</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 8px 0;">${booking.eventType}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 0;">Event Date</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 13px; color: #2C0808; padding: 8px 0;">${booking.eventDate}</td>
            </tr>
            <tr>
              <td class="voucher-label" style="font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #8C6F32; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 0;">Current Status</td>
              <td class="voucher-value" style="font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; color: #AB8A44; padding: 8px 0; text-transform: uppercase; letter-spacing: 1.5px;">⏰ UNDER REVIEW</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <p style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: #3A3A3A; margin-bottom: 30px;">
      We will contact you with a final availability update within the next 24 to 48 hours. If you have any urgent details to add, please reach out to us.
    </p>

    <!-- Contact note -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(223, 183, 108, 0.08); border-radius: 8px; border: 1px solid rgba(223, 183, 108, 0.15);">
      <tr>
        <td style="padding: 15px; text-align: center; font-family: 'Inter', sans-serif; font-size: 12px; color: #5B1C1C; line-height: 1.5;">
          <strong>Concierge Desk</strong><br>
          For queries call <span style="font-weight: 600; color: #AB8A44;">+91 98765 43210</span> or email <span style="font-weight: 600; color: #AB8A44;">concierge@grandgoldenlawn.com</span>
        </td>
      </tr>
    </table>
  `;

  const htmlContent = getEmailWrapper(bodyContent);

  return sendBrevoEmail({
    toEmail: booking.email,
    toName: booking.customerName,
    subject,
    htmlContent,
  });
}
