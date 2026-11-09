Add-Type -AssemblyName System.Drawing

function Create-Placeholder {
    param (
        [string]$Path,
        [int]$Width,
        [int]$Height,
        [string]$Title,
        [string]$Category,
        [string]$Note = "CASE STUDY · ASSET PENDING APPROVAL",
        [string]$Badge = "VERIFIED DATA"
    )

    $bmp = New-Object System.Drawing.Bitmap($Width, $Height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    # Background
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(12, 12, 12))
    $g.FillRectangle($bgBrush, 0, 0, $Width, $Height)

    # Subtle grid lines
    $gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(26, 26, 26), 1)
    for ($x = 20; $x -lt $Width; $x += 24) {
        $g.DrawLine($gridPen, $x, 0, $x, $Height)
    }
    for ($y = 20; $y -lt $Height; $y += 24) {
        $g.DrawLine($gridPen, 0, $y, $Width, $y)
    }

    # Center card area
    $cardMarginX = 30
    $cardMarginY = 30
    $cardW = $Width - ($cardMarginX * 2)
    $cardH = $Height - ($cardMarginY * 2)
    $cardBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(17, 17, 17))
    $g.FillRectangle($cardBrush, $cardMarginX, $cardMarginY, $cardW, $cardH)

    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(38, 38, 38), 1)
    $g.DrawRectangle($borderPen, $cardMarginX, $cardMarginY, $cardW, $cardH)

    # Crosshairs on corners
    $crossPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 60, 60), 1)
    $g.DrawLine($crossPen, $cardMarginX - 5, $cardMarginY, $cardMarginX + 10, $cardMarginY)
    $g.DrawLine($crossPen, $cardMarginX, $cardMarginY - 5, $cardMarginX, $cardMarginY + 10)
    $g.DrawLine($crossPen, $cardMarginX + $cardW - 10, $cardMarginY, $cardMarginX + $cardW + 5, $cardMarginY)
    $g.DrawLine($crossPen, $cardMarginX + $cardW, $cardMarginY - 5, $cardMarginX + $cardW, $cardMarginY + 10)

    # Fonts
    $fontMono = New-Object System.Drawing.Font("Consolas", 9, [System.Drawing.FontStyle]::Regular)
    $fontTitle = New-Object System.Drawing.Font("Georgia", 16, [System.Drawing.FontStyle]::Bold)
    $fontCategory = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Regular)

    # Brushes
    $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(110, 110, 110))
    $titleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 235, 235))
    $blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(57, 139, 255))
    $pillBgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(24, 24, 24))

    # Top metadata row
    $g.DrawString($Category.ToUpper(), $fontMono, $mutedBrush, ($cardMarginX + 20), ($cardMarginY + 18))
    
    # Badge
    $badgeSize = $g.MeasureString($Badge, $fontMono)
    $badgeX = $cardMarginX + $cardW - $badgeSize.Width - 26
    $g.FillRectangle($pillBgBrush, $badgeX, ($cardMarginY + 15), ($badgeSize.Width + 12), 20)
    $g.DrawRectangle($borderPen, $badgeX, ($cardMarginY + 15), ($badgeSize.Width + 12), 20)
    $g.DrawString($Badge, $fontMono, $blueBrush, ($badgeX + 6), ($cardMarginY + 18))

    # Center Title
    $titleSize = $g.MeasureString($Title, $fontTitle)
    $titleX = $cardMarginX + (($cardW - $titleSize.Width) / 2)
    $titleY = $cardMarginY + (($cardH - $titleSize.Height) / 2) - 10
    $g.DrawString($Title, $fontTitle, $titleBrush, $titleX, $titleY)

    # Note at bottom
    $noteSize = $g.MeasureString($Note, $fontMono)
    $noteX = $cardMarginX + (($cardW - $noteSize.Width) / 2)
    $g.DrawString($Note, $fontMono, $mutedBrush, $noteX, ($cardMarginY + $cardH - 30))

    # Save
    $dir = [System.IO.Path]::GetDirectoryName($Path)
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created $Path"
}

# Profile placeholder
function Create-Profile-Placeholder {
    param ([string]$Path)
    $w = 400
    $h = 400
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(12, 12, 12))
    $g.FillRectangle($bgBrush, 0, 0, $w, $h)

    # Concentric rings
    $ringPen1 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(26, 26, 26), 1)
    $ringPen2 = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(38, 38, 38), 1)
    $ringPen2.DashPattern = @(4.0, 4.0)

    $g.DrawEllipse($ringPen1, 40, 40, 320, 320)
    $g.DrawEllipse($ringPen2, 70, 70, 260, 260)
    $g.DrawEllipse($ringPen1, 100, 100, 200, 200)

    $fontLg = New-Object System.Drawing.Font("Georgia", 32, [System.Drawing.FontStyle]::Bold)
    $fontSm = New-Object System.Drawing.Font("Consolas", 8, [System.Drawing.FontStyle]::Regular)
    $fontName = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Bold)

    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 235, 235))
    $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(115, 115, 115))
    $blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(57, 139, 255))

    # Center monogram
    $mono = "SKR"
    $monoSize = $g.MeasureString($mono, $fontLg)
    $g.DrawString($mono, $fontLg, $textBrush, ((400 - $monoSize.Width) / 2), 140)

    $name = "SUNIL KUMAR REDDY"
    $nameSize = $g.MeasureString($name, $fontName)
    $g.DrawString($name, $fontName, $blueBrush, ((400 - $nameSize.Width) / 2), 205)

    $loc = "17.6868 deg N, 83.2185 deg E -- VISAKHAPATNAM"
    $locSize = $g.MeasureString($loc, $fontSm)
    $g.DrawString($loc, $fontSm, $mutedBrush, ((400 - $locSize.Width) / 2), 235)

    $sub = "PORTRAIT PLACEHOLDER -- PENDING APPROVED PHOTO"
    $subSize = $g.MeasureString($sub, $fontSm)
    $g.DrawString($sub, $fontSm, $mutedBrush, ((400 - $subSize.Width) / 2), 350)

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created Profile Placeholder $Path"
}

# Run generation
Create-Profile-Placeholder "d:\portfolio\public\images\sunil-profile.jpg"

Create-Placeholder -Path "d:\portfolio\public\images\projects\karyotica-cover.jpg" -Width 760 -Height 420 `
    -Title "Karyotica Labs" -Category "Agricultural Biotechnology" -Note "Brand Identity - Corporate Website - CMS - Product Packaging" -Badge "FEATURED"

Create-Placeholder -Path "d:\portfolio\public\images\projects\visionicx-cover.jpg" -Width 760 -Height 420 `
    -Title "Visionicx" -Category "Enterprise Mobile Application" -Note "40+ Screens - 200+ REST APIs - React Native - Expo" -Badge "MOBILE UX"

Create-Placeholder -Path "d:\portfolio\public\images\projects\core-volt-matrix-cover.jpg" -Width 760 -Height 420 `
    -Title "Core Volt Matrix" -Category "Brand Identity & HRMS" -Note "Enterprise HRMS Workflows - Interactive Prototypes - Frontend" -Badge "BRAND + HRMS"

Create-Placeholder -Path "d:\portfolio\public\images\projects\intexm-fintech-cover.jpg" -Width 760 -Height 420 `
    -Title "Fintech Product Experiences" -Category "Intexm Media" -Note "KeyToLoans - LowCredit - InstantCredit - LendingInd - CredBuddha" -Badge "FINTECH"

Create-Placeholder -Path "d:\portfolio\public\images\projects\tekwissen-communication-cover.jpg" -Width 760 -Height 420 `
    -Title "TekWissen & AdvantEdge" -Category "Corporate Communication" -Note "Executive Presentations - Visual Storytelling - Engineering Decks" -Badge "CURRENT ROLE"

Create-Placeholder -Path "d:\portfolio\public\images\projects\trade-signals-cover.jpg" -Width 760 -Height 420 `
    -Title "Cross-Device Trade Signals" -Category "Application Concept" -Note "Market Signals - Notifications - P&L Calculator - Cross-Device" -Badge "TO CONFIRM"

Create-Placeholder -Path "d:\portfolio\public\images\clients\client-work-placeholder.jpg" -Width 600 -Height 340 `
    -Title "Independent Freelance Client" -Category "Client Project" -Note "Graphic Design - Video Editing - Visual Assets" -Badge "FREELANCE"
