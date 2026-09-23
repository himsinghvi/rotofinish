from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from api.routes import router as api_router

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(
    title="RotoFinish Blasting",
    description="Surface finishing solutions — blasting, shot peening & surface preparation",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/api")
def api_root():
    return {
        "message": "RotoFinish Blasting API",
        "docs": "/docs",
        "endpoints": [
            "/api/company",
            "/api/products",
            "/api/industries",
            "/api/contact",
            "/api/quote",
        ],
    }


if STATIC_DIR.exists():
    assets_dir = STATIC_DIR / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    images_dir = STATIC_DIR / "images"
    if images_dir.exists():
        app.mount("/images", StaticFiles(directory=str(images_dir)), name="images")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        """Serve React SPA — API routes are matched first."""
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="Not found")

        file_path = STATIC_DIR / full_path
        if file_path.is_file():
            return FileResponse(str(file_path))

        index = STATIC_DIR / "index.html"
        if index.exists():
            return FileResponse(str(index))

        raise HTTPException(
            status_code=503,
            detail="Frontend not built. Run: cd frontend && npm run build",
        )

else:

    @app.get("/")
    def root():
        return {
            "message": "RotoFinish API is running.",
            "hint": "Build the frontend with `npm run build` in the frontend folder, then restart.",
            "api_docs": "/docs",
        }
