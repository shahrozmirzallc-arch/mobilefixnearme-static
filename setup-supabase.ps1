# Supabase Auto Setup Script for Mobile Fix Near Me
# Run this in PowerShell: .\setup-supabase.ps1

Write-Host "🚀 Mobile Fix Near Me - Supabase Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Read SQL file
$sql = Get-Content -Path "supabase-setup.sql" -Raw

Write-Host "✅ SQL file loaded" -ForegroundColor Green
Write-Host ""
Write-Host "📋 This script will copy the SQL to your clipboard." -ForegroundColor Yellow
Write-Host ""
Write-Host "Then you need to:" -ForegroundColor Yellow
Write-Host "  1. Open: https://gbwgaumyyffzlhusadjk.supabase.co" -ForegroundColor White
Write-Host "  2. Click 'SQL Editor' in left sidebar" -ForegroundColor White
Write-Host "  3. Click 'New Query'" -ForegroundColor White
Write-Host "  4. Paste (Ctrl+V)" -ForegroundColor White
Write-Host "  5. Click 'Run' (or press F5)" -ForegroundColor White
Write-Host ""

# Copy to clipboard
Set-Clipboard -Value $sql

Write-Host "✅ SQL copied to clipboard!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Opening Supabase dashboard..." -ForegroundColor Cyan

# Open browser
Start-Process "https://gbwgaumyyffzlhusadjk.supabase.co/project/default/sql/new"

Write-Host ""
Write-Host "✅ Browser opened! Now paste (Ctrl+V) and click Run!" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
