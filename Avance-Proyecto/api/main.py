import firebase_admin
from firebase_admin import credentials, auth
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# Inicializar Firebase
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)

app = FastAPI()

# Configurar CORS
origins = [
    "https://avance-proyecto-dfs.netlify.app",  # tu frontend en Netlify
    "http://localhost:19006",  # si pruebas local
    # "*"  # opcional: para permitir cualquier dominio (solo para pruebas)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # permite GET, POST, PUT, DELETE
    allow_headers=["*"],  # permite todos los headers
)

# Modelo de usuario
class RegisterUser(BaseModel):
    email: EmailStr
    password: str

# Ruta para registrar usuario
@app.post("/register")
def register(user: RegisterUser):
    try:
        firebase_user = auth.create_user(
            email=user.email,
            password=user.password,
        )

        return {
            "message": "Usuario creado en Firebase Auth",
            "uid": firebase_user.uid
        }

    except auth.EmailAlreadyExistsError:
        raise HTTPException(status_code=400, detail="El correo ya existe")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
