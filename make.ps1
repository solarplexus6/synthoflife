$elmRuntime = "/lib/elm-runtime.js"
$elmFolder = "elm"
$main = "main"
$publicPath = ".\public\"

echo "Build started"
Push-Location $elmFolder
&elm --make ($main+".elm") -r $elmRuntime --scripts=..\synth\synth.js --scripts=helper.js --scripts=init.js
Pop-Location
Copy-Item (".\$elmFolder\$main.html") $publicPath

echo "Build finished"