from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/")
def home():
   return {"message": "ECHO PATH backend is running"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "project": "ECHO PATH"}

INSTITUTIONS = {
    "maastricht-university": {
        "id": "maastricht-university",
        "name": "Maastricht University",
        "faculties": [
            {"id": "fasos", "name": "FASoS", "spaces": []},
            {"id": "fhml", "name": "FHML", "spaces": []},
            {"id": "law", "name": "LAW", "spaces": []},
            {"id": "fpn", "name": "FPN", "spaces": []},
            {"id": "fse", "name": "FSE", "spaces": []},
            {
                "id": "sbe",
                "name": "SBE",
                "spaces": [
                    {"id": "aula", "name": "Aula", "mapped_3d": True},
                ],
            },
        ],
    },
}

@app.get("/api/institutions")
def list_institutions():
    return [
        {"id": institution["id"], "name": institution["name"]}
        for institution in INSTITUTIONS.values()
    ]

@app.get("/api/institutions/{institution_id}")
def get_institution(institution_id: str):
    institution = INSTITUTIONS.get(institution_id)
    if institution is None:
        raise HTTPException(status_code=404, detail="Institution not found")
    return institution
