export const getUserEmailTemplate = (data) => {
    const { userName, address, service, date, time, prescription, comment } = data;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmation - BIOPLUS Labs</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        .summary-box {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 25px 0;
            border-radius: 5px;
        }
        .summary-box h3 {
            margin-top: 0;
            color: #2c3e50;
            font-size: 18px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-label {
            font-weight: 600;
            color: #495057;
        }
        .detail-value {
            color: #6c757d;
        }
        .next-steps {
            background-color: #e8f5e8;
            border: 1px solid #c3e6c3;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        .next-steps h3 {
            color: #155724;
            margin-top: 0;
        }
        .contact-info {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        .contact-info h3 {
            color: #856404;
            margin-top: 0;
        }
        .footer {
            background-color: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .footer h4 {
            margin: 0 0 15px 0;
            color: #ecf0f1;
        }
        .footer p {
            margin: 5px 0;
            font-size: 14px;
            color: #bdc3c7;
        }
        .footer a {
            color: #3498db;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .logo-image {
            max-width: 200px;
            height: auto;
            margin: 0 auto 15px auto;
            display: block;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 0;
            }
            .content {
                padding: 20px;
            }
            .detail-row {
                flex-direction: column;
            }
            .detail-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">BIOPLUS LABS</div>
            <!-- <img src="cid:bioplus-logo" alt="BIOPLUS LABS" class="logo-image" /> -->
            <h1>Appointment Confirmed!</h1>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hi <strong>${userName}</strong>,
            </div>
            
            <p>Thank you for choosing BIOPLUS Labs! This email confirms that we have successfully received your appointment request.</p>
            
            <div class="summary-box">
                <h3>📋 A summary of your request:</h3>
                <div class="detail-row">
                    <span class="detail-label">Name : </span>
                    <span class="detail-value">${userName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Address : </span>
                    <span class="detail-value">${address}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Service Requested : </span>
                    <span class="detail-value">${service}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Scheduled For : </span>
                    <span class="detail-value">${date} at ${time}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Prescription Received : </span>
                    <span class="detail-value">${prescription ? 'Yes' : 'No'}</span>
                </div>
                ${comment ? `
                <div class="detail-row">
                    <span class="detail-label">Test Details : </span>
                    <span class="detail-value">${comment}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="next-steps">
                <h3>🔄 What Happens Next?</h3>
                <p>Our team will review your request and the provided details. We will send you a final confirmation email or call you within 24 hours to lock in your time slot.</p>
            </div>
            
            <div class="contact-info">
                <h3>📞 Need to make a change?</h3>
                <p>If you need to reschedule or cancel your appointment, please contact us at <strong>+91 7418520528</strong> or reply to this email.</p>
            </div>
            
            <p style="font-size: 16px; color: #2c3e50; margin-top: 30px;">
                We look forward to serving you!
            </p>
            
            <p style="color: #667eea; font-weight: 500;">
                Warmly,<br>
                Team - BIOPLUS Labs
            </p>
        </div>
        
        <div class="footer">
            <h4>BIOPLUS LABS</h4>
            <p>Site no: 25 & 26, Meena Estate, Sowripalayam Road</p>
            <p>Coimbatore - 641028</p>
            <p>📞 Ph: +91 7418520528</p>
            <p>🌐 <a href="https://www.biopluslab.com">www.biopluslab.com</a></p>
        </div>
    </div>
</body>
</html>
  `;
};

export const getAdminEmailTemplate = (data) => {
    const { userName, address, email, phone, service, date, time, prescription, comment } = data;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Appointment Booking - BIOPLUS Labs</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        .alert-box {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            border-left: 4px solid #f39c12;
        }
        .alert-box h3 {
            margin-top: 0;
            color: #856404;
            font-size: 18px;
        }
        .appointment-details {
            background-color: #f8f9fa;
            border-left: 4px solid #e74c3c;
            padding: 20px;
            margin: 25px 0;
            border-radius: 5px;
        }
        .appointment-details h3 {
            margin-top: 0;
            color: #2c3e50;
            font-size: 18px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-label {
            font-weight: 600;
            color: #495057;
        }
        .detail-value {
            color: #6c757d;
        }
        .action-required {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        .action-required h3 {
            color: #155724;
            margin-top: 0;
        }
        .footer {
            background-color: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .footer h4 {
            margin: 0 0 15px 0;
            color: #ecf0f1;
        }
        .footer p {
            margin: 5px 0;
            font-size: 14px;
            color: #bdc3c7;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .logo-image {
            max-width: 200px;
            height: auto;
            margin: 0 auto 15px auto;
            display: block;
        }
        .priority-badge {
            background-color: #e74c3c;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 15px;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 0;
            }
            .content {
                padding: 20px;
            }
            .detail-row {
                flex-direction: column;
            }
            .detail-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <!-- <img src="cid:bioplus-logo" alt="BIOPLUS LABS" class="logo-image" /> -->
            <div class="logo">BIOPLUS LABS</div>
            <h1>New Appointment Booking</h1>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hi Team,
            </div>
            
            <div class="alert-box">
                <div class="priority-badge">URGENT</div>
                <h3>🚨 New Appointment Request</h3>
                <p>A new appointment has been successfully booked through the website. Please find the details below:</p>
            </div>
            
            <div class="appointment-details">
                <h3>📋 Appointment Details:</h3>
                <div class="detail-row">
                    <span class="detail-label">Name : </span>
                    <span class="detail-value">${userName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Address : </span>
                    <span class="detail-value">${address}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Contact Number : </span>
                    <span class="detail-value">${phone}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email ID : </span>
                    <span class="detail-value">${email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Service Needed : </span>
                    <span class="detail-value">${service}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Preferred Time & Date : </span>
                    <span class="detail-value">${date} at ${time}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Prescription Uploaded : </span>
                    <span class="detail-value">${prescription ? 'Yes' : 'No'}</span>
                </div>
                ${comment ? `
                <div class="detail-row">
                    <span class="detail-label">Test Details : </span>
                    <span class="detail-value">${comment}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="action-required">
                <h3>✅ Action Required</h3>
                <p><strong>Please confirm the appointment with the user and add it to the calendar.</strong></p>
                <p>Contact the patient within 24 hours to finalize the appointment details.</p>
            </div>
            
            <p style="color: #2c3e50; margin-top: 30px;">
                Best regards,<br>
                <strong>Your Website System</strong>
            </p>
        </div>
        
        <div class="footer">
            <h4>BIOPLUS LABS</h4>
            <p>Site no: 25 & 26, Meena Estate, Sowripalayam Road</p>
            <p>Coimbatore - 641028</p>
            <p>📞 Ph: +91 7418520528</p>
            <p>🌐 <a href="https://www.biopluslab.com" style="color: #3498db;">www.biopluslab.com</a></p>
        </div>
    </div>
</body>
</html>
  `;
};
