from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
   return {"message": "ECHO PATH backend is running"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "project": "ECHO PATH"}
