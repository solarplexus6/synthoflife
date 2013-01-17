//-----------------------------------------------
//      Basic harpe simulation with OSC control
//      (based on Karplus-Strong)
//
//-----------------------------------------------

declare name    "Harpe";
declare author  "Grame";


//-----------------------------------------------
//      whoite noise generator
//-----------------------------------------------
noise   = random / RANDMAX
    with {
        random      = +(12345) ~ *(1103515245);
        RANDMAX     = 2147483647.0;
    };


//-----------------------------------------------
//      String simulation
//-----------------------------------------------
string(freq, att, level, trig) = noise*level
                            : *(trig : trigger(freq2samples(freq)))
                            : resonator(freq2samples(freq), att)
    with {
        resonator(d, a) = (+ : @(d-1)) ~ (average : *(1.0-a));
        average(x)  = (x+x')/2;
        trigger(n)  = upfront : + ~ decay(n) : >(0.0);
        upfront(x)  = (x-x') > 0.0;
        decay(n,x)  = x - (x>0.0)/n;
        freq2samples(f) = 44100.0/f;
    };


//-----------------------------------------------
//      Build a N strings harpe
//      Each string is triggered by a specific
//      position [0..1] of the "hand"
//-----------------------------------------------

voice(i, N, att, lvl) = hand(i)
                        : string( 440 * 2.0^(i/5.0), att, lvl)
                        : pan((i+0.5)/N)
    with {
        hand(i) = button("hand%i") @ (i*18);
        pan(p) = _ <: *(sqrt(1-p)), *(sqrt(p));
    };

harpe(N) =  par(i, N,  voice(i, N, att, lvl)) :> _,_
    with {
        lvl  = hslider("level [unit:f][osc:/accxyz/0 -10 10]", 0.5, 0, 1, 0.01)^2;
        att  = hslider("attenuation [osc:/1/fader3]", 0.005, 0, 0.01, 0.001);        
    };

process = harpe(16);    // an 16 strings harpe