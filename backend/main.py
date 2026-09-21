from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
   return {"message": "ECHO PATH backend is running"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "project": "ECHO PATH"}

INSTITUTIONS = [
    {"id": "um-sbe", "name": "Maastricht University - School of Business and Economics"},
]

@app.get("/api/institutions")
def list_institutions():
    return INSTITUTIONS
