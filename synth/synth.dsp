//-----------------------------------------------
//      Basic harpe simulation with OSC control
//      (based on Karplus-Strong)
//
//-----------------------------------------------

PI = 3.1415926535897932385;
SR = 44100;

//-----------------------------------------------
//  conversions between db and linear values
//-----------------------------------------------

db2linear(x)    = pow(10, x/20.0);
linear2db(x)    = 20*log10(x);

//-----------------------------------------------
//          ADSR envelop
//-----------------------------------------------

// a,d,s,r = attack (sec), decay (sec), sustain (percentage of t), release (sec)
// t       = trigger signal ( >0 for attack, then release is when t back to 0)

adsr(a,d,s,r,t) = env ~ (_,_) : (!,_) // the 2 'state' signals are fed back
with {
    env (p2,y) =
        (t>0) & (p2|(y>=1)),          // p2 = decay-sustain phase
        (y + p1*u - (p2&(y>s))*v*y - p3*w*y)    // y  = envelop signal
    *((p3==0)|(y>=eps)) // cut off tails to prevent denormals
    with {
    p1 = (p2==0) & (t>0) & (y<1);         // p1 = attack phase
    p3 = (t<=0) & (y>0);                  // p3 = release phase
    // #samples in attack, decay, release, must be >0
    na = SR*a+(a==0.0); nd = SR*d+(d==0.0); nr = SR*r+(r==0.0);
    // correct zero sustain level
    z = s+(s==0.0)*db2linear(-60);
    // attack, decay and (-60dB) release rates
    u = 1/na; v = 1-pow(z, 1/nd); w = 1-1/pow(z*db2linear(60), 1/nr);
    // values below this threshold are considered zero in the release phase
    eps = db2linear(-120);
    };
};

cPhase(freq) = (+(q) : mod1) ~ _
with {
    q = float(freq)/float(SR);
};
phase_to_osc = _ <: sin(2*PI*_);
mod1 = fmod(_, 1.0);

oscillator(freq) = cPhase(freq) : phase_to_osc;

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

voiceHarpe(i, N, att, lvl) = hand(i)
                        : string( 440 * 2.0^(i/5.0), att, lvl)
                        : pan((i+0.5)/N)
    with {
        hand(i) = button("hand%i") @ (i*5);
        pan(p) = _ <: *(sqrt(1-p)), *(sqrt(p));
    };

voiceOsc(i, N, att, lvl) = (hand(i), 0, (oscillator( 440 * 2.0^(i/5.0))))
                        : select2
                        : *(lvl)
                        : pan((i+0.5)/N)
    with {
        hand(i) = button("hand%i");
        pan(p) = _ <: *(sqrt(1-p)), *(sqrt(p));
    };

voiceAdd(i, N, att, lvl) = hand
                        : adsr(0.1, 0.05, 80, 1)
                        : * (partials)
                        : *(lvl)
                        : pan((i+0.5)/N)
    with {
        partials = par(j, 3, oscillator( 440 * 2.0^(i/5.0) * (j+1)) / (2.0^j)) :> _;
        hand = button("hand%i");
        pan(p) = _ <: *(sqrt(1-p)), *(sqrt(p));
    };

harpe(N) =  par(i, N,  voiceAdd(i, N, att, lvl)) :> _,_
    with {
        lvl  = hslider("level [unit:f][osc:/accxyz/0 -10 10]", 0.6, 0, 1, 0.01)^2;
        att  = hslider("attenuation [osc:/1/fader3]", 0.001, 0, 0.01, 0.001);
    };

process = harpe(16);    // an 16 strings harpe