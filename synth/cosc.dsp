PI = 3.1415926535897932385;
SR = 44100;

noise   = random / RANDMAX
    with {
        random      = +(12345) ~ *(1103515245);
        RANDMAX     = 2147483647.0;
    };

oscillator(freq) = phase(freq) : phase_to_osc;

phase(freq) = (+(q) : mod1) ~ _
with {
    q = float(freq)/float(SR);
};
phase_to_osc = _ <: sin(2*PI*_);
mod1 = fmod(_, 1.0);

freq = hslider("freq", 400, 0, 15000, 0.1);
vol = hslider("volume", 0, 0, 1, 0.01);
process = oscillator(freq) * vol;