# RotoFinish Blasting — Rebrand Web App

Modern, animation-heavy rebrand of [RotoFinish Blasting](https://www.rotofinishblasting.com/) built with **React**, **Bootstrap 5**, **Framer Motion**, and **FastAPI** — frontend and backend served on a **single port**.

## Features

- **Industrial-themed animations** — spark particle hero, scroll progress bar, animated counters, brand marquee, page transitions
- **Information-rich pages** — Home, About, Products, Product Detail, Industries, Capabilities, Downloads, Contact
- **FastAPI REST API** — products, industries, company info, contact & quote forms
- **Single-port deployment** — FastAPI serves the built React SPA + API together
- **Responsive design** — Bootstrap 5 grid with custom dark industrial theme

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite, Bootstrap 5, Framer Motion |
| Backend  | Python 3, FastAPI, Uvicorn          |
| Styling  | Custom CSS + Bootstrap Icons        |

## Quick Start

Everything runs on **one port** — the FastAPI server serves both the React website and the API.

### One command (Windows)

```bat
start.bat
```

Or:

```bat
python run.py
```

Open **http://localhost:8000**

### One command (Mac/Linux)

```bash
python3 run.py
```

### Options

```bash
# Custom port
python run.py --port 8080

# Dev: auto-rebuild frontend when you edit files (still one port)
python run.py --dev

# Skip rebuild if frontend is already built
python run.py --skip-build

# Skip dependency install on subsequent runs
python run.py --skip-install --skip-build
```

### What happens under the hood

1. Installs Python + Node dependencies (first run)
2. Builds React into `backend/static/`
3. Starts Uvicorn — **website + API on the same port**

You do **not** need to run Vite on port 5173 unless you explicitly want Vite hot-module reload.

## Deploy to Vercel (single project, one URL)

Frontend and API deploy together from **this repo** — no separate services or domains.

1. Push the repo to GitHub ([himsinghvi/rotofinish](https://github.com/himsinghvi/rotofinish)).
2. In [Vercel](https://vercel.com) → **New Project** → import the repo.
3. Framework Preset: **Other** (Vercel reads `vercel.json` at the repo root).
4. Deploy — no extra root directory or monorepo settings needed.

After deploy, everything is on one URL:

| Path | Served by |
|------|-----------|
| `/`, `/about`, `/products`, … | React SPA (`frontend/`) |
| `/api/*` | FastAPI (`backend/`) |

Local development is unchanged: `python run.py` still builds to `backend/static/` and serves website + API on one port.

## Project Structure

```
robofinish/
├── backend/
│   ├── main.py              # FastAPI app + static file serving
│   ├── api/
│   │   ├── routes.py        # REST endpoints
│   │   └── data.py          # Content data
│   ├── static/              # Built React app (generated)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # Hero, Navbar, animations, etc.
│   │   ├── pages/           # Route pages
│   │   └── hooks/           # API hooks
│   ├── package.json
│   └── vite.config.js
├── run.py                   # Build & run helper
├── start.bat                # Windows quick start
├── vercel.json              # Single Vercel project (frontend + API)
└── requirements.txt         # Root Python deps pointer (Vercel)
```

## API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/company`        | Company info         |
| GET    | `/api/products`       | All products         |
| GET    | `/api/products/{id}`  | Product detail       |
| GET    | `/api/industries`     | Industries served    |
| GET    | `/api/capabilities`   | Manufacturing capabilities |
| GET    | `/api/stats`          | Company statistics   |
| POST   | `/api/contact`        | Contact form         |
| POST   | `/api/quote`          | Quote request        |
| GET    | `/docs`               | Swagger API docs     |

## Pages

- **/** — Hero with spark animation, stats, products, capabilities, industries, brand marquee
- **/about** — Vision, mission, quality policy, certifications
- **/products** — Full product catalogue with animated cards
- **/products/:id** — Product detail with features & quote form
- **/industries** — Interactive industry tabs
- **/capabilities** — Manufacturing, design, R&D, testing
- **/downloads** — Resource documents
- **/contact** — Contact form with map & company details

## License

© 2026 Rotofinish. All Rights Reserved.
