param(
  [string]$AtlasMaster = "public/media/hero/masters/atlas-master.mov",
  [string]$VitruvianMaster = "public/media/hero/masters/vitruvian-master.mov",
  [int]$DesktopWidth = 1600,
  [int]$DesktopFps = 30,
  [int]$DesktopCrf = 28,
  [int]$MobileWidth = 900,
  [int]$MobileFps = 30,
  [int]$MobileCrf = 32
)

$ErrorActionPreference = "Stop"

function Assert-Tool([string]$Name) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "$Name is not installed or not in PATH."
  }
}

function Assert-Input([string]$Path) {
  if (-not (Test-Path $Path)) {
    throw "Missing source master: $Path"
  }
}

function Ensure-Dir([string]$Path) {
  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path | Out-Null
  }
}

function Encode-WebMAlpha(
  [string]$Input,
  [string]$Output,
  [int]$Width,
  [int]$Fps,
  [int]$Crf
) {
  ffmpeg -y -i $Input `
    -vf "fps=$Fps,scale=$Width:-2:flags=lanczos,format=yuva420p" `
    -an -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf $Crf -row-mt 1 -deadline good $Output
}

function Probe-Video([string]$Path) {
  Write-Host "\n[ffprobe] $Path" -ForegroundColor Cyan
  ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,pix_fmt,r_frame_rate,duration -of default=noprint_wrappers=1 $Path
}

Assert-Tool "ffmpeg"
Assert-Tool "ffprobe"
Assert-Input $AtlasMaster
Assert-Input $VitruvianMaster

Ensure-Dir "public/media/hero/desktop"
Ensure-Dir "public/media/hero/mobile"

$atlasDesktop = "public/media/hero/desktop/atlas-desktop.webm"
$vitruvianDesktop = "public/media/hero/desktop/vitruvian-desktop.webm"
$atlasMobile = "public/media/hero/mobile/atlas-mobile.webm"
$vitruvianMobile = "public/media/hero/mobile/vitruvian-mobile.webm"

Write-Host "Encoding desktop variants..." -ForegroundColor Yellow
Encode-WebMAlpha -Input $AtlasMaster -Output $atlasDesktop -Width $DesktopWidth -Fps $DesktopFps -Crf $DesktopCrf
Encode-WebMAlpha -Input $VitruvianMaster -Output $vitruvianDesktop -Width $DesktopWidth -Fps $DesktopFps -Crf $DesktopCrf

Write-Host "Encoding mobile variants..." -ForegroundColor Yellow
Encode-WebMAlpha -Input $AtlasMaster -Output $atlasMobile -Width $MobileWidth -Fps $MobileFps -Crf $MobileCrf
Encode-WebMAlpha -Input $VitruvianMaster -Output $vitruvianMobile -Width $MobileWidth -Fps $MobileFps -Crf $MobileCrf

Probe-Video $atlasDesktop
Probe-Video $vitruvianDesktop
Probe-Video $atlasMobile
Probe-Video $vitruvianMobile

Write-Host "\nDone. Outputs are in public/media/hero/desktop and public/media/hero/mobile." -ForegroundColor Green
