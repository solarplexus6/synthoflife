all:
	faust -lang js -cn dsp -a faust-arch.js synth.dsp -o synth.js
	faust -lang js -cn dsp -a ./webaudio.html synth.dsp -o bin/synth.html

cosc: bin/cosc.cpp
	g++ bin/cosc.cpp -lpthread -lportaudio `pkg-config gtk+-2.0  --cflags --libs`  -o bin/cosc

bin/cosc.cpp: cosc.dsp
	faust -a pa-gtk.cpp cosc.dsp -o bin/cosc.cpp

hcosc: cosc.dsp
	faust -lang js -a ./webaudio.html cosc.dsp -o bin/cosc.html

harpe: harpe.dsp
	faust -lang js -a ./webaudio.html harpe.dsp -o bin/harpe.html