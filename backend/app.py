import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import hashlib
import hmac
import base64
import logging
import boto3
from botocore.exceptions import ClientError

# fast api al posto di flask?
# pytest flask

load_dotenv()
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)


def authenticate_user(email, password):
    try:
        secret = email + 'app_client_id'
        secret_hash = generate_secret_hash(secret)

        return {
            "status_code": 200,
            "token": access_token,
        }

    except ClientError as e:
        logging.error(f"Error: {e}")
        return {"status_code": 500, "message": "Internal server error"}


def generate_secret_hash(message):
    return base64.b64encode(
        hmac.new(
            app_client_secret.encode("utf-8"),
            message.encode("utf-8"),
            hashlib.sha256,
        ).digest()
    ).decode("utf-8")


@app.route("/api/auth", methods=["POST"])
def authenticate_user_route():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify(message="email and password are required"), 400

    auth_result = authenticate_user(email, password)

    status_code = auth_result.get("status_code")
    if status_code == 200:
        if token := auth_result.get("token"):
            return jsonify(token=token), status_code
        return (
            jsonify(
                message=auth_result["message"],
            ),
            status_code,
        )
    else:
        return jsonify(message=auth_result.get("message", "unknown error")), status_code
