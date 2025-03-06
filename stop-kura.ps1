Get-Process -Name "node" -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.Id -Force }

Get-Process -Name "powershell" -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -match "back|front" } | ForEach-Object { Stop-Process -Id $_.Id -Force }

Get-Process -Name "powershell" -ErrorAction SilentlyContinue | Stop-Process -Force
