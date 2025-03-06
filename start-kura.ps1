Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'back'; npm run start"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'front'; npm run dev"

Start-Sleep -Seconds 3

Start-Process "http://localhost:5173/"
