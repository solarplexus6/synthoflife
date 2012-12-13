$elmRuntime = "..\lib\elm-runtime.js"
$mainPath = ".\elm\main"
$appMainPath = ".\app\public\"

&elm --make ($mainPath+".elm") -r $elmRuntime -i .\elm\JsHelper.js
Copy-Item ($mainPath+".html") $appMainPath