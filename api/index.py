from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import g4f

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str
    provider: str = "g4f"

@app.post("/generate")
async def generate_response(request: PromptRequest):
    try:
        if request.provider == "g4f":
            response = g4f.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": request.prompt}]
            )
        else:
            return {"error": "Unknown provider"}
        return {"response": response}
    except Exception as e:
        return {"error": str(e)}