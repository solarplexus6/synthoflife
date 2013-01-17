<!-- UI builder -->

function UI(){
    this.openHorizontalBox = function(label)
    {
        console.log("openHorizontalBox: " + label);
    }

    this.openVerticalBox = function(label)
    {
        console.log("openVerticalBox: " + label);
    }

    this.closeBox = function()
    {
        console.log("closeBox");
    }

    this.addButton = function(label, handler)
    {
       console.log("addButton: " + label);

       document.addEventListener(label + '-on', function(e) {
            var btnPushTime = 50;

            handler(1);
            console.log("on: "+ label)
            setTimeout(function () {
                    handler(0);
                    console.log("off: "+ label)
                }, btnPushTime);
        });
    }

    this.addCheckButton = function(label, handler)
    {
        console.log("addCheckButton: " + label);
    }

    this.addVerticalSlider = function(label, handler, init, min, max, step)
    {
        console.log("addVerticalSlider: " + label);
    }

    this.addHorizontalSlider = function(label, handler, init, min, max, step)
    {
        console.log("addHorizontalSlider: " + label);

        document.addEventListener(label + '-changed', function(e) {
            handler(e.value);
        });
    }

    this.addNumEntry = function(label, handler, init, min, max, step)
    {
        console.log("addNumEntry: " + label);
    }

    this.addHorizontalBargraph = function(label, handler,  min, max)
    {
        console.log("addHorizontalBargraph: " + label);
    }

    this.addVerticalBargraph = function(label, handler,  min, max)
    {
         console.log("addVerticalBargraph: " + label);
    }

    this.declare = function(handler, key, value)
    {
         console.log("declare");
    }

    return this;
}

<!-- Faust DSP-->



function faustpower2_f(value) {
	return (value * value);

}

function dsp() {

	this.fRec31 = new Float32Array(3);
	this.fVec31 = new Float32Array(128);
	this.fRec32 = new Float32Array(2);
	this.fVec30 = new Float32Array(2);
	this.fRec29 = new Float32Array(3);
	this.fVec29 = new Float32Array(128);
	this.fRec30 = new Float32Array(2);
	this.fVec28 = new Float32Array(32);
	this.fRec27 = new Float32Array(3);
	this.fVec27 = new Float32Array(128);
	this.fRec28 = new Float32Array(2);
	this.fVec26 = new Float32Array(64);
	this.fRec25 = new Float32Array(3);
	this.fVec25 = new Float32Array(128);
	this.fRec26 = new Float32Array(2);
	this.fVec24 = new Float32Array(64);
	this.fRec23 = new Float32Array(3);
	this.fVec23 = new Float32Array(64);
	this.fRec24 = new Float32Array(2);
	this.fVec22 = new Float32Array(128);
	this.fRec21 = new Float32Array(3);
	this.fVec21 = new Float32Array(64);
	this.fRec22 = new Float32Array(2);
	this.fVec20 = new Float32Array(128);
	this.fRec19 = new Float32Array(3);
	this.fVec19 = new Float32Array(64);
	this.fRec20 = new Float32Array(2);
	this.fVec18 = new Float32Array(128);
	this.fRec17 = new Float32Array(3);
	this.fVec17 = new Float32Array(64);
	this.fRec18 = new Float32Array(2);
	this.fVec16 = new Float32Array(128);
	this.fRec15 = new Float32Array(3);
	this.fVec15 = new Float32Array(64);
	this.fRec16 = new Float32Array(2);
	this.fVec14 = new Float32Array(256);
	this.fRec13 = new Float32Array(3);
	this.fVec13 = new Float32Array(32);
	this.fRec14 = new Float32Array(2);
	this.fVec12 = new Float32Array(256);
	this.fRec11 = new Float32Array(3);
	this.fVec11 = new Float32Array(32);
	this.fRec12 = new Float32Array(2);
	this.fVec10 = new Float32Array(256);
	this.fRec9 = new Float32Array(3);
	this.fVec9 = new Float32Array(32);
	this.fRec10 = new Float32Array(2);
	this.fVec8 = new Float32Array(256);
	this.fRec7 = new Float32Array(3);
	this.fVec7 = new Float32Array(32);
	this.fRec8 = new Float32Array(2);
	this.fVec6 = new Float32Array(256);
	this.fRec5 = new Float32Array(3);
	this.fVec5 = new Float32Array(16);
	this.fRec6 = new Float32Array(2);
	this.fVec4 = new Float32Array(256);
	this.fRec3 = new Float32Array(3);
	this.fVec3 = new Float32Array(14);
	this.fRec4 = new Float32Array(2);
	this.fVec2 = new Float32Array(256);
	this.fRec0 = new Float32Array(3);
	this.fVec1 = new Float32Array(12);
	this.fRec2 = new Float32Array(2);
	this.fVec0 = new Float32Array(512);
	this.iRec1 = new Int32Array(2);
	this.fhslider0;
	this.fbutton0;
	this.IOTA;
	this.fhslider1;
	this.fbutton1;
	this.fbutton2;
	this.fbutton3;
	this.fbutton4;
	this.fbutton5;
	this.fbutton6;
	this.fbutton7;
	this.fbutton8;
	this.fbutton9;
	this.fbutton10;
	this.fbutton11;
	this.fbutton12;
	this.fbutton13;
	this.fbutton14;
	this.fbutton15;
	this.fSamplingFreq;

	this.metadata = function(m) {
		m.declare("name", "Harpe");
		m.declare("author", "Grame");
	}

	this.getNumInputs = function() { return 0; }
	this.getNumOutputs = function() { return 2; }

	this.classInit = function(samplingFreq) {
	}

	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 0.5;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec1[i] = 0;

		}
		this.fbutton0 = 0;
		this.IOTA = 0;
		for (var i = 0; (i < 512); i = (i + 1)) {
			this.fVec0[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;

		}
		this.fhslider1 = 0.005;
		for (var i = 0; (i < 12); i = (i + 1)) {
			this.fVec1[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec0[i] = 0;

		}
		this.fbutton1 = 0;
		for (var i = 0; (i < 256); i = (i + 1)) {
			this.fVec2[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec4[i] = 0;

		}
		for (var i = 0; (i < 14); i = (i + 1)) {
			this.fVec3[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec3[i] = 0;

		}
		this.fbutton2 = 0;
		for (var i = 0; (i < 256); i = (i + 1)) {
			this.fVec4[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec6[i] = 0;

		}
		for (var i = 0; (i < 16); i = (i + 1)) {
			this.fVec5[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec5[i] = 0;

		}
		this.fbutton3 = 0;
		for (var i = 0; (i < 256); i = (i + 1)) {
			this.fVec6[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec8[i] = 0;

		}
		for (var i = 0; (i < 32); i = (i + 1)) {
			this.fVec7[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec7[i] = 0;

		}
		this.fbutton4 = 0;
		for (var i = 0; (i < 256); i = (i + 1)) {
			this.fVec8[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec10[i] = 0;

		}
		for (var i = 0; (i < 32); i = (i + 1)) {
			this.fVec9[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec9[i] = 0;

		}
		this.fbutton5 = 0;
		for (var i = 0; (i < 256); i = (i + 1)) {
			this.fVec10[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec12[i] = 0;

		}
		for (var i = 0; (i < 32); i = (i + 1)) {
			this.fVec11[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec11[i] = 0;

		}
		this.fbutton6 = 0;
		for (var i = 0; (i < 256); i = (i + 1)) {
			this.fVec12[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec14[i] = 0;

		}
		for (var i = 0; (i < 32); i = (i + 1)) {
			this.fVec13[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec13[i] = 0;

		}
		this.fbutton7 = 0;
		for (var i = 0; (i < 256); i = (i + 1)) {
			this.fVec14[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec16[i] = 0;

		}
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec15[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec15[i] = 0;

		}
		this.fbutton8 = 0;
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec16[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec18[i] = 0;

		}
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec17[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec17[i] = 0;

		}
		this.fbutton9 = 0;
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec18[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec20[i] = 0;

		}
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec19[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec19[i] = 0;

		}
		this.fbutton10 = 0;
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec20[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec22[i] = 0;

		}
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec21[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec21[i] = 0;

		}
		this.fbutton11 = 0;
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec22[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec24[i] = 0;

		}
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec23[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec23[i] = 0;

		}
		this.fbutton12 = 0;
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec24[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec26[i] = 0;

		}
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec25[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec25[i] = 0;

		}
		this.fbutton13 = 0;
		for (var i = 0; (i < 64); i = (i + 1)) {
			this.fVec26[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec28[i] = 0;

		}
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec27[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec27[i] = 0;

		}
		this.fbutton14 = 0;
		for (var i = 0; (i < 32); i = (i + 1)) {
			this.fVec28[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec30[i] = 0;

		}
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec29[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec29[i] = 0;

		}
		this.fbutton15 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fVec30[i] = 0;

		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec32[i] = 0;

		}
		for (var i = 0; (i < 128); i = (i + 1)) {
			this.fVec31[i] = 0;

		}
		for (var i = 0; (i < 3); i = (i + 1)) {
			this.fRec31[i] = 0;

		}

	}

	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}

	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("synth");
		ui_interface.declare("fhslider1", "osc", "/1/fader3");
		ui_interface.addHorizontalSlider("attenuation", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 0.005, 0, 0.01, 0.001);
		ui_interface.addButton("hand0", function handler(obj) { function setval(val) { obj.fbutton15 = val; } return setval; }(this));
		ui_interface.addButton("hand1", function handler(obj) { function setval(val) { obj.fbutton14 = val; } return setval; }(this));
		ui_interface.addButton("hand10", function handler(obj) { function setval(val) { obj.fbutton5 = val; } return setval; }(this));
		ui_interface.addButton("hand11", function handler(obj) { function setval(val) { obj.fbutton4 = val; } return setval; }(this));
		ui_interface.addButton("hand12", function handler(obj) { function setval(val) { obj.fbutton3 = val; } return setval; }(this));
		ui_interface.addButton("hand13", function handler(obj) { function setval(val) { obj.fbutton2 = val; } return setval; }(this));
		ui_interface.addButton("hand14", function handler(obj) { function setval(val) { obj.fbutton1 = val; } return setval; }(this));
		ui_interface.addButton("hand15", function handler(obj) { function setval(val) { obj.fbutton0 = val; } return setval; }(this));
		ui_interface.addButton("hand2", function handler(obj) { function setval(val) { obj.fbutton13 = val; } return setval; }(this));
		ui_interface.addButton("hand3", function handler(obj) { function setval(val) { obj.fbutton12 = val; } return setval; }(this));
		ui_interface.addButton("hand4", function handler(obj) { function setval(val) { obj.fbutton11 = val; } return setval; }(this));
		ui_interface.addButton("hand5", function handler(obj) { function setval(val) { obj.fbutton10 = val; } return setval; }(this));
		ui_interface.addButton("hand6", function handler(obj) { function setval(val) { obj.fbutton9 = val; } return setval; }(this));
		ui_interface.addButton("hand7", function handler(obj) { function setval(val) { obj.fbutton8 = val; } return setval; }(this));
		ui_interface.addButton("hand8", function handler(obj) { function setval(val) { obj.fbutton7 = val; } return setval; }(this));
		ui_interface.addButton("hand9", function handler(obj) { function setval(val) { obj.fbutton6 = val; } return setval; }(this));
		ui_interface.declare("fhslider0", "osc", "/accxyz/0 -10 10");
		ui_interface.declare("fhslider0", "unit", "f");
		ui_interface.addHorizontalSlider("level", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 0.5, 0, 1, 0.01);
		ui_interface.closeBox();

	}

	this.compute = function(count, inputs, outputs) {
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = (4.65661e-10 * faustpower2_f(this.fhslider0));
		var fSlow1 = this.fbutton0;
		var fSlow2 = (0.5 * (1 - this.fhslider1));
		var fSlow3 = this.fbutton1;
		var fSlow4 = this.fbutton2;
		var fSlow5 = this.fbutton3;
		var fSlow6 = this.fbutton4;
		var fSlow7 = this.fbutton5;
		var fSlow8 = this.fbutton6;
		var fSlow9 = this.fbutton7;
		var fSlow10 = this.fbutton8;
		var fSlow11 = this.fbutton9;
		var fSlow12 = this.fbutton10;
		var fSlow13 = this.fbutton11;
		var fSlow14 = this.fbutton12;
		var fSlow15 = this.fbutton13;
		var fSlow16 = this.fbutton14;
		var fSlow17 = this.fbutton15;
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iRec1[0] = (12345 + (1103515245 * this.iRec1[1]));
			this.fVec0[(this.IOTA & 511)] = fSlow1;
			this.fRec2[0] = ((((this.fVec0[((this.IOTA - 270) & 511)] - this.fVec0[((this.IOTA - 271) & 511)]) > 0) + this.fRec2[1]) - (0.0798186 * (this.fRec2[1] > 0)));
			this.fVec1[0] = ((fSlow0 * (this.iRec1[0] * (this.fRec2[0] > 0))) + (fSlow2 * (this.fRec0[1] + this.fRec0[2])));
			this.fRec0[0] = this.fVec1[11];
			this.fVec2[(this.IOTA & 255)] = fSlow3;
			this.fRec4[0] = ((((this.fVec2[((this.IOTA - 252) & 255)] - this.fVec2[((this.IOTA - 253) & 255)]) > 0) + this.fRec4[1]) - (0.0694861 * (this.fRec4[1] > 0)));
			this.fVec3[0] = ((fSlow0 * (this.iRec1[0] * (this.fRec4[0] > 0))) + (fSlow2 * (this.fRec3[1] + this.fRec3[2])));
			this.fRec3[0] = this.fVec3[13];
			this.fVec4[(this.IOTA & 255)] = fSlow4;
			this.fRec6[0] = ((((this.fVec4[((this.IOTA - 234) & 255)] - this.fVec4[((this.IOTA - 235) & 255)]) > 0) + this.fRec6[1]) - (0.0604912 * (this.fRec6[1] > 0)));
			this.fVec5[0] = ((fSlow0 * (this.iRec1[0] * (this.fRec6[0] > 0))) + (fSlow2 * (this.fRec5[1] + this.fRec5[2])));
			this.fRec5[0] = this.fVec5[15];
			this.fVec6[(this.IOTA & 255)] = fSlow5;
			this.fRec8[0] = ((((this.fVec6[((this.IOTA - 216) & 255)] - this.fVec6[((this.IOTA - 217) & 255)]) > 0) + this.fRec8[1]) - (0.0526606 * (this.fRec8[1] > 0)));
			this.fVec7[(this.IOTA & 31)] = ((fSlow0 * (this.iRec1[0] * (this.fRec8[0] > 0))) + (fSlow2 * (this.fRec7[1] + this.fRec7[2])));
			this.fRec7[0] = this.fVec7[((this.IOTA - 17) & 31)];
			this.fVec8[(this.IOTA & 255)] = fSlow6;
			this.fRec10[0] = ((((this.fVec8[((this.IOTA - 198) & 255)] - this.fVec8[((this.IOTA - 199) & 255)]) > 0) + this.fRec10[1]) - (0.0458437 * (this.fRec10[1] > 0)));
			this.fVec9[(this.IOTA & 31)] = ((fSlow0 * (this.iRec1[0] * (this.fRec10[0] > 0))) + (fSlow2 * (this.fRec9[1] + this.fRec9[2])));
			this.fRec9[0] = this.fVec9[((this.IOTA - 20) & 31)];
			this.fVec10[(this.IOTA & 255)] = fSlow7;
			this.fRec12[0] = ((((this.fVec10[((this.IOTA - 180) & 255)] - this.fVec10[((this.IOTA - 181) & 255)]) > 0) + this.fRec12[1]) - (0.0399093 * (this.fRec12[1] > 0)));
			this.fVec11[(this.IOTA & 31)] = ((fSlow0 * (this.iRec1[0] * (this.fRec12[0] > 0))) + (fSlow2 * (this.fRec11[1] + this.fRec11[2])));
			this.fRec11[0] = this.fVec11[((this.IOTA - 24) & 31)];
			this.fVec12[(this.IOTA & 255)] = fSlow8;
			this.fRec14[0] = ((((this.fVec12[((this.IOTA - 162) & 255)] - this.fVec12[((this.IOTA - 163) & 255)]) > 0) + this.fRec14[1]) - (0.0347431 * (this.fRec14[1] > 0)));
			this.fVec13[(this.IOTA & 31)] = ((fSlow0 * (this.iRec1[0] * (this.fRec14[0] > 0))) + (fSlow2 * (this.fRec13[1] + this.fRec13[2])));
			this.fRec13[0] = this.fVec13[((this.IOTA - 27) & 31)];
			this.fVec14[(this.IOTA & 255)] = fSlow9;
			this.fRec16[0] = ((((this.fVec14[((this.IOTA - 144) & 255)] - this.fVec14[((this.IOTA - 145) & 255)]) > 0) + this.fRec16[1]) - (0.0302456 * (this.fRec16[1] > 0)));
			this.fVec15[(this.IOTA & 63)] = ((fSlow0 * (this.iRec1[0] * (this.fRec16[0] > 0))) + (fSlow2 * (this.fRec15[1] + this.fRec15[2])));
			this.fRec15[0] = this.fVec15[((this.IOTA - 32) & 63)];
			this.fVec16[(this.IOTA & 127)] = fSlow10;
			this.fRec18[0] = ((((this.fVec16[((this.IOTA - 126) & 127)] - this.fVec16[((this.IOTA - 127) & 127)]) > 0) + this.fRec18[1]) - (0.0263303 * (this.fRec18[1] > 0)));
			this.fVec17[(this.IOTA & 63)] = ((fSlow0 * (this.iRec1[0] * (this.fRec18[0] > 0))) + (fSlow2 * (this.fRec17[1] + this.fRec17[2])));
			this.fRec17[0] = this.fVec17[((this.IOTA - 36) & 63)];
			this.fVec18[(this.IOTA & 127)] = fSlow11;
			this.fRec20[0] = ((((this.fVec18[((this.IOTA - 108) & 127)] - this.fVec18[((this.IOTA - 109) & 127)]) > 0) + this.fRec20[1]) - (0.0229219 * (this.fRec20[1] > 0)));
			this.fVec19[(this.IOTA & 63)] = ((fSlow0 * (this.iRec1[0] * (this.fRec20[0] > 0))) + (fSlow2 * (this.fRec19[1] + this.fRec19[2])));
			this.fRec19[0] = this.fVec19[((this.IOTA - 42) & 63)];
			this.fVec20[(this.IOTA & 127)] = fSlow12;
			this.fRec22[0] = ((((this.fVec20[((this.IOTA - 90) & 127)] - this.fVec20[((this.IOTA - 91) & 127)]) > 0) + this.fRec22[1]) - (0.0199546 * (this.fRec22[1] > 0)));
			this.fVec21[(this.IOTA & 63)] = ((fSlow0 * (this.iRec1[0] * (this.fRec22[0] > 0))) + (fSlow2 * (this.fRec21[1] + this.fRec21[2])));
			this.fRec21[0] = this.fVec21[((this.IOTA - 49) & 63)];
			this.fVec22[(this.IOTA & 127)] = fSlow13;
			this.fRec24[0] = ((((this.fVec22[((this.IOTA - 72) & 127)] - this.fVec22[((this.IOTA - 73) & 127)]) > 0) + this.fRec24[1]) - (0.0173715 * (this.fRec24[1] > 0)));
			this.fVec23[(this.IOTA & 63)] = ((fSlow0 * (this.iRec1[0] * (this.fRec24[0] > 0))) + (fSlow2 * (this.fRec23[1] + this.fRec23[2])));
			this.fRec23[0] = this.fVec23[((this.IOTA - 56) & 63)];
			this.fVec24[(this.IOTA & 63)] = fSlow14;
			this.fRec26[0] = ((((this.fVec24[((this.IOTA - 54) & 63)] - this.fVec24[((this.IOTA - 55) & 63)]) > 0) + this.fRec26[1]) - (0.0151228 * (this.fRec26[1] > 0)));
			this.fVec25[(this.IOTA & 127)] = ((fSlow0 * (this.iRec1[0] * (this.fRec26[0] > 0))) + (fSlow2 * (this.fRec25[1] + this.fRec25[2])));
			this.fRec25[0] = this.fVec25[((this.IOTA - 65) & 127)];
			this.fVec26[(this.IOTA & 63)] = fSlow15;
			this.fRec28[0] = ((((this.fVec26[((this.IOTA - 36) & 63)] - this.fVec26[((this.IOTA - 37) & 63)]) > 0) + this.fRec28[1]) - (0.0131652 * (this.fRec28[1] > 0)));
			this.fVec27[(this.IOTA & 127)] = ((fSlow0 * (this.iRec1[0] * (this.fRec28[0] > 0))) + (fSlow2 * (this.fRec27[1] + this.fRec27[2])));
			this.fRec27[0] = this.fVec27[((this.IOTA - 74) & 127)];
			this.fVec28[(this.IOTA & 31)] = fSlow16;
			this.fRec30[0] = ((((this.fVec28[((this.IOTA - 18) & 31)] - this.fVec28[((this.IOTA - 19) & 31)]) > 0) + this.fRec30[1]) - (0.0114609 * (this.fRec30[1] > 0)));
			this.fVec29[(this.IOTA & 127)] = ((fSlow0 * (this.iRec1[0] * (this.fRec30[0] > 0))) + (fSlow2 * (this.fRec29[1] + this.fRec29[2])));
			this.fRec29[0] = this.fVec29[((this.IOTA - 86) & 127)];
			this.fVec30[0] = fSlow17;
			this.fRec32[0] = ((((fSlow17 - this.fVec30[1]) > 0) + this.fRec32[1]) - (0.00997732 * (this.fRec32[1] > 0)));
			this.fVec31[(this.IOTA & 127)] = ((fSlow0 * (this.iRec1[0] * (this.fRec32[0] > 0))) + (fSlow2 * (this.fRec31[1] + this.fRec31[2])));
			this.fRec31[0] = this.fVec31[((this.IOTA - 99) & 127)];
			output0[i] = ((0.176777 * this.fRec0[0]) + ((0.306186 * this.fRec3[0]) + ((0.395285 * this.fRec5[0]) + ((0.467707 * this.fRec7[0]) + ((0.53033 * this.fRec9[0]) + ((0.586302 * this.fRec11[0]) + ((0.637377 * this.fRec13[0]) + ((0.684653 * this.fRec15[0]) + ((0.728869 * this.fRec17[0]) + ((0.770552 * this.fRec19[0]) + ((0.810093 * this.fRec21[0]) + ((0.847791 * this.fRec23[0]) + ((0.883883 * this.fRec25[0]) + ((0.918559 * this.fRec27[0]) + ((0.951972 * this.fRec29[0]) + (0.984251 * this.fRec31[0]))))))))))))))));
			output1[i] = ((0.984251 * this.fRec0[0]) + ((0.951972 * this.fRec3[0]) + ((0.918559 * this.fRec5[0]) + ((0.883883 * this.fRec7[0]) + ((0.847791 * this.fRec9[0]) + ((0.810093 * this.fRec11[0]) + ((0.770552 * this.fRec13[0]) + ((0.728869 * this.fRec15[0]) + ((0.684653 * this.fRec17[0]) + ((0.637377 * this.fRec19[0]) + ((0.586302 * this.fRec21[0]) + ((0.53033 * this.fRec23[0]) + ((0.467707 * this.fRec25[0]) + ((0.395285 * this.fRec27[0]) + ((0.306186 * this.fRec29[0]) + (0.176777 * this.fRec31[0]))))))))))))))));
			this.iRec1[1] = this.iRec1[0];
			this.IOTA = (this.IOTA + 1);
			this.fRec2[1] = this.fRec2[0];
			for (var j = 11; (j > 0); j = (j - 1)) {
				this.fVec1[j] = this.fVec1[(j - 1)];

			}
			this.fRec0[2] = this.fRec0[1];
			this.fRec0[1] = this.fRec0[0];
			this.fRec4[1] = this.fRec4[0];
			for (var j = 13; (j > 0); j = (j - 1)) {
				this.fVec3[j] = this.fVec3[(j - 1)];

			}
			this.fRec3[2] = this.fRec3[1];
			this.fRec3[1] = this.fRec3[0];
			this.fRec6[1] = this.fRec6[0];
			for (var j = 15; (j > 0); j = (j - 1)) {
				this.fVec5[j] = this.fVec5[(j - 1)];

			}
			this.fRec5[2] = this.fRec5[1];
			this.fRec5[1] = this.fRec5[0];
			this.fRec8[1] = this.fRec8[0];
			this.fRec7[2] = this.fRec7[1];
			this.fRec7[1] = this.fRec7[0];
			this.fRec10[1] = this.fRec10[0];
			this.fRec9[2] = this.fRec9[1];
			this.fRec9[1] = this.fRec9[0];
			this.fRec12[1] = this.fRec12[0];
			this.fRec11[2] = this.fRec11[1];
			this.fRec11[1] = this.fRec11[0];
			this.fRec14[1] = this.fRec14[0];
			this.fRec13[2] = this.fRec13[1];
			this.fRec13[1] = this.fRec13[0];
			this.fRec16[1] = this.fRec16[0];
			this.fRec15[2] = this.fRec15[1];
			this.fRec15[1] = this.fRec15[0];
			this.fRec18[1] = this.fRec18[0];
			this.fRec17[2] = this.fRec17[1];
			this.fRec17[1] = this.fRec17[0];
			this.fRec20[1] = this.fRec20[0];
			this.fRec19[2] = this.fRec19[1];
			this.fRec19[1] = this.fRec19[0];
			this.fRec22[1] = this.fRec22[0];
			this.fRec21[2] = this.fRec21[1];
			this.fRec21[1] = this.fRec21[0];
			this.fRec24[1] = this.fRec24[0];
			this.fRec23[2] = this.fRec23[1];
			this.fRec23[1] = this.fRec23[0];
			this.fRec26[1] = this.fRec26[0];
			this.fRec25[2] = this.fRec25[1];
			this.fRec25[1] = this.fRec25[0];
			this.fRec28[1] = this.fRec28[0];
			this.fRec27[2] = this.fRec27[1];
			this.fRec27[1] = this.fRec27[0];
			this.fRec30[1] = this.fRec30[0];
			this.fRec29[2] = this.fRec29[1];
			this.fRec29[1] = this.fRec29[0];
			this.fVec30[1] = this.fVec30[0];
			this.fRec32[1] = this.fRec32[0];
			this.fRec31[2] = this.fRec31[1];
			this.fRec31[1] = this.fRec31[0];

		}

	}

}


<!-- WebAudio API -->

process_dsp = function(obj)
{
    function process_aux_dsp(event)
    {
        var count;

        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */

        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }

        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }

        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }

        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_dsp;
}

function create_dsp(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new dsp();

    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);

    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());

    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());

    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_dsp(this);

    return this;
}

function initAudio(buffer_size)
{
    context = new webkitAudioContext();

    ui = new UI();
    meta = ui;

    faustdsp = new create_dsp(context, ui, meta, buffer_size);
    faustdsp.processor.connect(context.destination);
}
