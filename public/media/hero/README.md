# Hero Video Assets (Non-Safari scope)

This folder contains owned media assets for the split hero actor system.

## Structure
- `masters/`: immutable alpha masters (ProRes 4444 MOV or PNG sequences)
- `desktop/`: encoded web delivery assets for desktop
- `mobile/`: encoded web delivery assets for mobile

## Locked filenames
- `desktop/atlas-desktop.webm`
- `desktop/vitruvian-desktop.webm`
- `mobile/atlas-mobile.webm`
- `mobile/vitruvian-mobile.webm`

## Encode workflow
Run:

```powershell
./scripts/encode-hero-videos.ps1
```

By default, the script expects the following masters:
- `public/media/hero/masters/atlas-master.mov`
- `public/media/hero/masters/vitruvian-master.mov`

Adjust script params if your source names differ.

## Validation
The script prints stream metadata via `ffprobe` so you can verify alpha-capable outputs.

## Current temporary assets
The current repo includes temporary actor deliveries generated from:
- `public/artifacts-men/atlas-man.png`
- `public/artifacts-men/vitruvian-man.png`

Replace them by placing real alpha masters into `masters/` and re-running the encode script.
