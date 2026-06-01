$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Investment Committee Scenario Lab", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Scenario overview for the next investment committee review" -Subtitle "One scenario layer for exposure, savings unlock, investment need, urgency, and capital at risk." -Bullets @(
  "The overview keeps accelerate, resequence, hold, and defer tracks visible in one executive surface.",
  "Leadership can see which lanes already justify capital and which still need stronger proof before funding.",
  "This layer turns scattered scorecards into one committee-safe capital story instead of another manual synthesis cycle."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Scenario lane keeps committee direction and next decisions connected" -Subtitle "Every route retains the audience, owner, direction, scenario theme, and next committee decision." -Bullets @(
  "The scenario-lane view makes it obvious which narratives should accelerate now and which still sit in defer or resequence territory.",
  "Board questions stay attached to actual owners and concrete next decisions instead of generic strategy language.",
  "Leadership can tighten the committee story before the next board, investor, or diligence review begins."
) -OutputPath (Join-Path $screenshots "02-scenario-lane-proof.png")

New-ScenarioImage -Title "Capital options show where savings and upside justify the next allocation move" -Subtitle "Investment need, savings unlock, upside, downside, and signals stay visible in one scenario readout." -Bullets @(
  "This view keeps IBM, CyberArk, biotech, procurement, and revenue traces tied to actual live surfaces and scenario choices.",
  "Weak capital stories stay visible before the committee packet overclaims what the estate can really defend.",
  "Leadership can see which funding move will remove the most friction from the next board or diligence cycle."
) -OutputPath (Join-Path $screenshots "03-capital-options-proof.png")

New-ScenarioImage -Title "Timing risks keep urgency and confidence together" -Subtitle "Scenario timing remains grounded in urgency, confidence, and the evidence still needed for a clean decision." -Bullets @(
  "The executive story stays tied to actual investment sequencing rather than vague transformation language.",
  "Thin scenario proof remains visible before it turns into another inconclusive board discussion.",
  "This creates a repeatable committee packet that can travel into diligence, investor, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-timing-risks-proof.png")
