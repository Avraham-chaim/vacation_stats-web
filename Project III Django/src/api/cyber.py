from hashlib import sha512
from .app_config import CustomAppConfig
from jwt import encode


class Cyber:

    @staticmethod
    def hash(plain_text):
        encoded_text = plain_text.encode("UTF-8") + CustomAppConfig.passwords_salt.encode("UTF-8")
        hashed_text = sha512(encoded_text).hexdigest()
        hashed_text = hashed_text[1:15]
        return hashed_text
    
    @staticmethod
    def jwt_token(user):
        json = { "user": user }
        token = encode(payload=json, key=CustomAppConfig.passwords_salt)
        return token
