from flask_bcrypt import generate_password_hash

password = "Password123!"
hashed = generate_password_hash(password).decode('utf-8')
print(hashed)
