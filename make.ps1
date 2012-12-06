$elmRuntime = "..\lib\elm-runtime"
$mainPath = ".\elm\main"
$appMainPath = ".\app\public\"

&elm --make ($mainPath+".elm") -r $elmRuntime
Copy-Item ($mainPath+".html") $appMainPath