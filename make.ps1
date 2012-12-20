$elmRuntime = "..\lib\elm-runtime.js"
$elmFolder = "elm"
$main = "main"
$appMainPath = ".\app\public\"

Push-Location $elmFolder
&elm --make ($main+".elm") -r $elmRuntime -i JsHelper.js
Pop-Location
Copy-Item (".\$elmFolder\$main.html") $appMainPath