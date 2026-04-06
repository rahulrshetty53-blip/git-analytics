$ErrorActionPreference = "Stop"

Write-Host "Creating test commits for Analytics..." -ForegroundColor Green
Write-Host ""

# Navigate to project
cd "c:\Users\DELL\Downloads\Analytics"

# Configure git
git config user.email "rahulshetty53@gmail.com"
git config user.name "Rahul"

# Commit 1: Already exists (f170726)

# Get current content
$content = Get-Content -Path "OPTIMIZATIONS.md" -Raw

# Commit 2
for ($i = 1; $i -le 6; $i++) {
    $content += "`n`n# Update $i`n"
    Add-Content -Path "IMPROVEMENTS-$i.md" -Value "Update $i completed"

    git add "IMPROVEMENTS-$i.md"

    $messages = @(
        "Implement backend caching system - Reduce API calls by 50%",
        "Optimize frontend components - Improve load time to 800ms",
        "Fix timezone calculation bug - Correct analytics data",
        "Add comprehensive testing suite - Achieve 85% coverage",
        "Update security measures - Add rate limiting and CSRF",
        "Improve documentation - Add API and troubleshooting guides"
    )

    git commit -m $messages[$i - 1]
    Write-Host "✅ Commit $($i + 1) created: $($messages[$i - 1])"
}

# Push all commits
Write-Host ""
Write-Host "Pushing all commits to GitHub..."
git push origin main

Write-Host ""
Write-Host "✅ All test commits created and pushed!"
Write-Host ""
Write-Host "Commit history:"
git log --oneline | Select-Object -First 10

Write-Host ""
Write-Host "Next: Go to Dashboard and click 'Sync Repositories' button"
