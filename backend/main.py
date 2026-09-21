from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# MVP CORS: allow all origins/methods/headers so frontends can call the API
# during the hackathon demo.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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

SPACES = {
    "aula": {
        "id": "aula",
        "name": "Aula",
        "faculty_id": "sbe",
        "mapped_3d": True,
        "model_3d": {
            "available": True,
            "format": "glb",
            "filename": "21_9_2026.glb",
            "source": "3D scan of the SBE Aula captured during the hackathon",
        },
        "infrastructure": [
            {
                "id": "main-aula-entrance",
                "type": "entrance",
                "name": "Main Aula Entrance",
                "accessible": True,
                "location": "",
                "notes": "",
            },
            {
                "id": "main-aula-stairs",
                "type": "stairs",
                "name": "Main Aula Stairs",
                "accessible": False,
                "location": "",
                "notes": "",
            },
            {
                "id": "aula-emergency-exit",
                "type": "emergency_exit",
                "name": "Aula Emergency Exit",
                "accessible": True,
                "location": "",
                "notes": "",
            },
            {
                "id": "aula-accessible-route",
                "type": "ramp",
                "name": "Aula Accessible Route",
                "accessible": True,
                "location": "",
                "notes": "",
            },
        ],
    },
}

@app.get("/api/spaces/{space_id}")
def get_space(space_id: str):
    space = SPACES.get(space_id)
    if space is None:
        raise HTTPException(status_code=404, detail="Space not found")
    return space

SUPPORTED_GUIDANCE_PROFILES = (
    "visual_impairment",
    "deaf_hard_of_hearing",
    "reduced_mobility",
)

@app.get("/api/guidance/aula")
def get_aula_guidance(profile: str):
    if profile not in SUPPORTED_GUIDANCE_PROFILES:
        raise HTTPException(status_code=400, detail="Unsupported profile")

    infrastructure = {item["type"]: item for item in SPACES["aula"]["infrastructure"]}
    entrance = infrastructure["entrance"]
    stairs = infrastructure["stairs"]
    emergency_exit = infrastructure["emergency_exit"]
    ramp = infrastructure["ramp"]

    if profile == "visual_impairment":
        return {
            "space_id": "aula",
            "profile": profile,
            "speakable": True,
            "steps": [
                f"Enter the Aula through the {entrance['name']}.",
                f"Obstacle ahead: the {stairs['name']} are a barrier and are not step-free; do not use them.",
                f"If you need to leave urgently, head to the {emergency_exit['name']}.",
                f"For a safe step-free path, follow the {ramp['name']}.",
            ],
        }

    if profile == "deaf_hard_of_hearing":
        return {
            "space_id": "aula",
            "profile": profile,
            "visual_alerts": True,
            "steps": [
                f"Follow the visual signage from the {entrance['name']}.",
                f"Emergency information: the {emergency_exit['name']} is clearly marked with visible signage; watch for flashing visual alarm indicators.",
                f"The {stairs['name']} and the {ramp['name']} are both signposted with text and symbols.",
            ],
        }

    # reduced_mobility
    return {
        "space_id": "aula",
        "profile": profile,
        "avoid_stairs": True,
        "steps": [
            f"Enter using the {entrance['name']}, which is step-free and accessible.",
            f"Avoid the {stairs['name']}.",
            f"Use the {ramp['name']} to move through the Aula.",
            f"If evacuation is needed, the {emergency_exit['name']} is step-free and accessible.",
        ],
    }
