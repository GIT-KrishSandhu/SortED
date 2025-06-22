from flask import Flask, request, jsonify, send_from_directory
from flask_mail import Mail, Message
from flask_cors import CORS
import os
from dotenv import load_dotenv 
from datetime import datetime
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins=["http://localhost:5000", "http://127.0.0.1:5000"])

# Email configuration
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.getenv("EMAIL_USER")
app.config["MAIL_PASSWORD"] = os.getenv("EMAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("EMAIL_USER")

# Initialize mail
mail = Mail(app)

@app.route("/submit-contact", methods=["POST", "OPTIONS"])
def send_email():
    # Handle preflight requests
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    
    try:
        logger.info("Received contact form submission")
        
        # Handle both JSON and form data
        if request.is_json:
            data = request.get_json()
            logger.info("Received JSON data")
        else:
            data = request.form.to_dict()
            logger.info("Received form data")
            
        if not data:
            logger.error("No data received")
            return jsonify({"status": "error", "message": "No data received"}), 400

        # Extract and validate form data
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        phone = data.get("phone", "").strip()
        school = data.get("school", "").strip()
        message = data.get("message", "").strip()

        logger.info(f"Form data - Name: {name}, Email: {email}, Phone: {phone}, School: {school}")

        # Basic validation
        if not all([name, email, phone, school, message]):
            missing_fields = []
            if not name: missing_fields.append("name")
            if not email: missing_fields.append("email")
            if not phone: missing_fields.append("phone")
            if not school: missing_fields.append("school")
            if not message: missing_fields.append("message")
            
            error_msg = f"Missing required fields: {', '.join(missing_fields)}"
            logger.error(error_msg)
            return jsonify({"status": "error", "message": error_msg}), 400

        # Email validation
        if "@" not in email or "." not in email:
            logger.error("Invalid email format")
            return jsonify({"status": "error", "message": "Invalid email format"}), 400

        # Check if email configuration is set
        if not app.config["MAIL_USERNAME"] or not app.config["MAIL_PASSWORD"]:
            logger.error("Email configuration not set")
            return jsonify({
                "status": "error", 
                "message": "Email service not configured. Please contact administrator."
            }), 500

        # Create email message
        recipient_email = os.getenv("RECIPIENT_EMAIL", app.config["MAIL_DEFAULT_SENDER"])
        
        msg = Message(
            subject=f"New Contact Form Submission from {name}",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[recipient_email],
        )
        
        # Create HTML email content
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>New Contact Form Submission</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }}
                .content {{ padding: 30px; background: #f9f9f9; }}
                .field {{ margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #667eea; }}
                .label {{ font-weight: bold; color: #555; margin-bottom: 5px; }}
                .value {{ color: #333; }}
                .footer {{ text-align: center; padding: 20px; color: #666; font-size: 14px; }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📧 New Contact Form Submission</h1>
                <p>You have received a new message from your website</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">👤 Name:</div>
                    <div class="value">{name}</div>
                </div>
                <div class="field">
                    <div class="label">📧 Email:</div>
                    <div class="value"><a href="mailto:{email}">{email}</a></div>
                </div>
                <div class="field">
                    <div class="label">📱 Phone:</div>
                    <div class="value"><a href="tel:{phone}">{phone}</a></div>
                </div>
                <div class="field">
                    <div class="label">🏫 School:</div>
                    <div class="value">{school}</div>
                </div>
                <div class="field">
                    <div class="label">💬 Message:</div>
                    <div class="value">{message}</div>
                </div>
            </div>
            <div class="footer">
                <p>Received on {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</p>
                <p>This email was automatically generated from your website's contact form.</p>
            </div>
        </body>
        </html>
        """
        
        msg.html = html_content

        # Send email
        logger.info("Attempting to send email...")
        mail.send(msg)
        logger.info("Email sent successfully")

        return jsonify({
            "status": "success", 
            "message": "Thank you! Your message has been sent successfully. We will get back to you soon."
        }), 200

    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        return jsonify({
            "status": "error", 
            "message": "Sorry, there was an error sending your message. Please try again later or contact us directly."
        }), 500

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/assets/<path:filename>")
def assets(filename):
    return send_from_directory("assets", filename)

@app.route("/portfolio-details.html")
def portfolio_details():
    return send_from_directory(".", "portfolio-details.html")

@app.route("/product-details.html")
def product_details():
    return send_from_directory(".", "product-details.html")

# Health check endpoint
@app.route("/health")
def health_check():
    return jsonify({"status": "ok", "message": "Server is running"}), 200

if __name__ == "__main__":
    logger.info("Starting Flask application...")
    logger.info(f"Email user configured: {'Yes' if os.getenv('EMAIL_USER') else 'No'}")
    logger.info(f"Email password configured: {'Yes' if os.getenv('EMAIL_PASSWORD') else 'No'}")
    app.run(debug=True, host="0.0.0.0", port=5000)
