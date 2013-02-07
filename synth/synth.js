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
            setTimeout(function () {
                    handler(0);                    
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

function faustpower2_f(value) {
	return (value * value);
	
}

function dsp() {
	
	this.fRec56 = new Float32Array(2);
	this.fRec55 = new Float32Array(2);
	this.fRec54 = new Float32Array(2);
	this.iRec53 = new Int32Array(2);
	this.fRec52 = new Float32Array(2);
	this.fRec51 = new Float32Array(2);
	this.fRec50 = new Float32Array(2);
	this.iRec49 = new Int32Array(2);
	this.fRec48 = new Float32Array(2);
	this.iRec47 = new Int32Array(2);
	this.fRec46 = new Float32Array(2);
	this.iRec45 = new Int32Array(2);
	this.fRec44 = new Float32Array(2);
	this.fRec43 = new Float32Array(2);
	this.iRec42 = new Int32Array(2);
	this.fRec41 = new Float32Array(2);
	this.fRec40 = new Float32Array(2);
	this.fRec39 = new Float32Array(2);
	this.iRec38 = new Int32Array(2);
	this.fRec37 = new Float32Array(2);
	this.fRec36 = new Float32Array(2);
	this.iRec35 = new Int32Array(2);
	this.fRec34 = new Float32Array(2);
	this.fRec33 = new Float32Array(2);
	this.iRec32 = new Int32Array(2);
	this.fRec31 = new Float32Array(2);
	this.fRec30 = new Float32Array(2);
	this.fRec29 = new Float32Array(2);
	this.iRec28 = new Int32Array(2);
	this.fRec27 = new Float32Array(2);
	this.fRec26 = new Float32Array(2);
	this.fRec25 = new Float32Array(2);
	this.iRec24 = new Int32Array(2);
	this.fRec23 = new Float32Array(2);
	this.fRec22 = new Float32Array(2);
	this.fRec21 = new Float32Array(2);
	this.iRec20 = new Int32Array(2);
	this.fRec19 = new Float32Array(2);
	this.fRec18 = new Float32Array(2);
	this.fRec17 = new Float32Array(2);
	this.iRec16 = new Int32Array(2);
	this.fRec15 = new Float32Array(2);
	this.fRec14 = new Float32Array(2);
	this.fRec13 = new Float32Array(2);
	this.iRec12 = new Int32Array(2);
	this.fRec11 = new Float32Array(2);
	this.fRec10 = new Float32Array(2);
	this.fRec9 = new Float32Array(2);
	this.iRec8 = new Int32Array(2);
	this.fRec7 = new Float32Array(2);
	this.fRec6 = new Float32Array(2);
	this.fRec5 = new Float32Array(2);
	this.iRec4 = new Int32Array(2);
	this.fRec3 = new Float32Array(2);
	this.fRec2 = new Float32Array(2);
	this.fRec1 = new Float32Array(2);
	this.iRec0 = new Int32Array(2);
	this.fhslider0;
	this.fbutton0;
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
	}

	this.getNumInputs = function() { return 0; }
	this.getNumOutputs = function() { return 2; }
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 0.6;
		this.fbutton0 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec0[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec1[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec3[i] = 0;
			
		}
		this.fbutton1 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec4[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec5[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec6[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec7[i] = 0;
			
		}
		this.fbutton2 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec8[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec9[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec10[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec11[i] = 0;
			
		}
		this.fbutton3 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec12[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec13[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec14[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec15[i] = 0;
			
		}
		this.fbutton4 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec16[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec17[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec18[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec19[i] = 0;
			
		}
		this.fbutton5 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec20[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec21[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec22[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec23[i] = 0;
			
		}
		this.fbutton6 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec24[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec25[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec26[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec27[i] = 0;
			
		}
		this.fbutton7 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec28[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec29[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec30[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec31[i] = 0;
			
		}
		this.fbutton8 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec32[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec33[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec34[i] = 0;
			
		}
		this.fbutton9 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec35[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec36[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec37[i] = 0;
			
		}
		this.fbutton10 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec38[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec39[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec40[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec41[i] = 0;
			
		}
		this.fbutton11 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec42[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec43[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec44[i] = 0;
			
		}
		this.fbutton12 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec45[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec46[i] = 0;
			
		}
		this.fbutton13 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec47[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec48[i] = 0;
			
		}
		this.fbutton14 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec49[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec50[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec51[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec52[i] = 0;
			
		}
		this.fbutton15 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec53[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec54[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec55[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec56[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("synth");
		ui_interface.addButton("hand0", function handler(obj) { function setval(val) { obj.fbutton7 = val; } return setval; }(this));
		ui_interface.addButton("hand1", function handler(obj) { function setval(val) { obj.fbutton15 = val; } return setval; }(this));
		ui_interface.addButton("hand10", function handler(obj) { function setval(val) { obj.fbutton2 = val; } return setval; }(this));
		ui_interface.addButton("hand11", function handler(obj) { function setval(val) { obj.fbutton10 = val; } return setval; }(this));
		ui_interface.addButton("hand12", function handler(obj) { function setval(val) { obj.fbutton1 = val; } return setval; }(this));
		ui_interface.addButton("hand13", function handler(obj) { function setval(val) { obj.fbutton9 = val; } return setval; }(this));
		ui_interface.addButton("hand14", function handler(obj) { function setval(val) { obj.fbutton0 = val; } return setval; }(this));
		ui_interface.addButton("hand15", function handler(obj) { function setval(val) { obj.fbutton8 = val; } return setval; }(this));
		ui_interface.addButton("hand2", function handler(obj) { function setval(val) { obj.fbutton6 = val; } return setval; }(this));
		ui_interface.addButton("hand3", function handler(obj) { function setval(val) { obj.fbutton14 = val; } return setval; }(this));
		ui_interface.addButton("hand4", function handler(obj) { function setval(val) { obj.fbutton5 = val; } return setval; }(this));
		ui_interface.addButton("hand5", function handler(obj) { function setval(val) { obj.fbutton13 = val; } return setval; }(this));
		ui_interface.addButton("hand6", function handler(obj) { function setval(val) { obj.fbutton4 = val; } return setval; }(this));
		ui_interface.addButton("hand7", function handler(obj) { function setval(val) { obj.fbutton12 = val; } return setval; }(this));
		ui_interface.addButton("hand8", function handler(obj) { function setval(val) { obj.fbutton3 = val; } return setval; }(this));
		ui_interface.addButton("hand9", function handler(obj) { function setval(val) { obj.fbutton11 = val; } return setval; }(this));
		ui_interface.declare("fhslider0", "osc", "/accxyz/0 -10 10");
		ui_interface.declare("fhslider0", "unit", "f");
		ui_interface.addHorizontalSlider("level", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 0.6, 0, 1, 0.01);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = faustpower2_f(this.fhslider0);
		var fSlow1 = this.fbutton0;
		var iSlow2 = (fSlow1 > 0);
		var iSlow3 = (fSlow1 <= 0);
		var fSlow4 = this.fbutton1;
		var iSlow5 = (fSlow4 > 0);
		var iSlow6 = (fSlow4 <= 0);
		var fSlow7 = this.fbutton2;
		var iSlow8 = (fSlow7 > 0);
		var iSlow9 = (fSlow7 <= 0);
		var fSlow10 = this.fbutton3;
		var iSlow11 = (fSlow10 > 0);
		var iSlow12 = (fSlow10 <= 0);
		var fSlow13 = this.fbutton4;
		var iSlow14 = (fSlow13 > 0);
		var iSlow15 = (fSlow13 <= 0);
		var fSlow16 = this.fbutton5;
		var iSlow17 = (fSlow16 > 0);
		var iSlow18 = (fSlow16 <= 0);
		var fSlow19 = this.fbutton6;
		var iSlow20 = (fSlow19 > 0);
		var iSlow21 = (fSlow19 <= 0);
		var fSlow22 = this.fbutton7;
		var iSlow23 = (fSlow22 > 0);
		var iSlow24 = (fSlow22 <= 0);
		var fSlow25 = this.fbutton8;
		var iSlow26 = (fSlow25 > 0);
		var iSlow27 = (fSlow25 <= 0);
		var fSlow28 = this.fbutton9;
		var iSlow29 = (fSlow28 > 0);
		var iSlow30 = (fSlow28 <= 0);
		var fSlow31 = this.fbutton10;
		var iSlow32 = (fSlow31 > 0);
		var iSlow33 = (fSlow31 <= 0);
		var fSlow34 = this.fbutton11;
		var iSlow35 = (fSlow34 > 0);
		var iSlow36 = (fSlow34 <= 0);
		var fSlow37 = this.fbutton12;
		var iSlow38 = (fSlow37 > 0);
		var iSlow39 = (fSlow37 <= 0);
		var fSlow40 = this.fbutton13;
		var iSlow41 = (fSlow40 > 0);
		var iSlow42 = (fSlow40 <= 0);
		var fSlow43 = this.fbutton14;
		var iSlow44 = (fSlow43 > 0);
		var iSlow45 = (fSlow43 <= 0);
		var fSlow46 = this.fbutton15;
		var iSlow47 = (fSlow46 > 0);
		var iSlow48 = (fSlow46 <= 0);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iRec0[0] = (iSlow2 & (this.iRec0[1] | (this.fRec1[1] >= 1)));
			var iTemp0 = (iSlow3 & (this.fRec1[1] > 0));
			this.fRec1[0] = (((iTemp0 == 0) | (this.fRec1[1] >= 1e-06)) * ((0.000226757 * (((this.iRec0[1] == 0) & iSlow2) & (this.fRec1[1] < 1))) + (this.fRec1[1] * ((1 - (0 - (0.00198929 * (this.iRec0[1] & (this.fRec1[1] > 80))))) - (0.000511877 * iTemp0)))));
			this.fRec2[0] = function fmod(a,b) {return a % b }((0.0694861 + this.fRec2[1]), 1);
			this.fRec3[0] = function fmod(a,b) {return a % b }((0.0347431 + this.fRec3[1]), 1);
			this.iRec4[0] = (iSlow5 & (this.iRec4[1] | (this.fRec5[1] >= 1)));
			var iTemp1 = (iSlow6 & (this.fRec5[1] > 0));
			this.fRec5[0] = (((iTemp1 == 0) | (this.fRec5[1] >= 1e-06)) * ((0.000226757 * (((this.iRec4[1] == 0) & iSlow5) & (this.fRec5[1] < 1))) + (this.fRec5[1] * ((1 - (0 - (0.00198929 * (this.iRec4[1] & (this.fRec5[1] > 80))))) - (0.000511877 * iTemp1)))));
			this.fRec6[0] = function fmod(a,b) {return a % b }((0.0263303 + this.fRec6[1]), 1);
			var fTemp2 = Math.sin((6.28319 * this.fRec6[0]));
			this.fRec7[0] = function fmod(a,b) {return a % b }((0.0526606 + this.fRec7[1]), 1);
			this.iRec8[0] = (iSlow8 & (this.iRec8[1] | (this.fRec9[1] >= 1)));
			var iTemp3 = (iSlow9 & (this.fRec9[1] > 0));
			this.fRec9[0] = (((iTemp3 == 0) | (this.fRec9[1] >= 1e-06)) * ((0.000226757 * (((this.iRec8[1] == 0) & iSlow8) & (this.fRec9[1] < 1))) + (this.fRec9[1] * ((1 - (0 - (0.00198929 * (this.iRec8[1] & (this.fRec9[1] > 80))))) - (0.000511877 * iTemp3)))));
			this.fRec10[0] = function fmod(a,b) {return a % b }((0.0199546 + this.fRec10[1]), 1);
			var fTemp4 = Math.sin((6.28319 * this.fRec10[0]));
			this.fRec11[0] = function fmod(a,b) {return a % b }((0.0399093 + this.fRec11[1]), 1);
			var fTemp5 = Math.sin((6.28319 * this.fRec11[0]));
			this.iRec12[0] = (iSlow11 & (this.iRec12[1] | (this.fRec13[1] >= 1)));
			var iTemp6 = (iSlow12 & (this.fRec13[1] > 0));
			this.fRec13[0] = (((iTemp6 == 0) | (this.fRec13[1] >= 1e-06)) * ((0.000226757 * (((this.iRec12[1] == 0) & iSlow11) & (this.fRec13[1] < 1))) + (this.fRec13[1] * ((1 - (0 - (0.00198929 * (this.iRec12[1] & (this.fRec13[1] > 80))))) - (0.000511877 * iTemp6)))));
			this.fRec14[0] = function fmod(a,b) {return a % b }((0.0302456 + this.fRec14[1]), 1);
			var fTemp7 = Math.sin((6.28319 * this.fRec14[0]));
			this.fRec15[0] = function fmod(a,b) {return a % b }((0.0151228 + this.fRec15[1]), 1);
			this.iRec16[0] = (iSlow14 & (this.iRec16[1] | (this.fRec17[1] >= 1)));
			var iTemp8 = (iSlow15 & (this.fRec17[1] > 0));
			this.fRec17[0] = (((iTemp8 == 0) | (this.fRec17[1] >= 1e-06)) * ((0.000226757 * (((this.iRec16[1] == 0) & iSlow14) & (this.fRec17[1] < 1))) + (this.fRec17[1] * ((1 - (0 - (0.00198929 * (this.iRec16[1] & (this.fRec17[1] > 80))))) - (0.000511877 * iTemp8)))));
			this.fRec18[0] = function fmod(a,b) {return a % b }((0.0229219 + this.fRec18[1]), 1);
			this.fRec19[0] = function fmod(a,b) {return a % b }((0.0114609 + this.fRec19[1]), 1);
			this.iRec20[0] = (iSlow17 & (this.iRec20[1] | (this.fRec21[1] >= 1)));
			var iTemp9 = (iSlow18 & (this.fRec21[1] > 0));
			this.fRec21[0] = (((iTemp9 == 0) | (this.fRec21[1] >= 1e-06)) * ((0.000226757 * (((this.iRec20[1] == 0) & iSlow17) & (this.fRec21[1] < 1))) + (this.fRec21[1] * ((1 - (0 - (0.00198929 * (this.iRec20[1] & (this.fRec21[1] > 80))))) - (0.000511877 * iTemp9)))));
			this.fRec22[0] = function fmod(a,b) {return a % b }((0.0173715 + this.fRec22[1]), 1);
			var fTemp10 = Math.sin((6.28319 * this.fRec22[0]));
			this.fRec23[0] = function fmod(a,b) {return a % b }((0.00868576 + this.fRec23[1]), 1);
			this.iRec24[0] = (iSlow20 & (this.iRec24[1] | (this.fRec25[1] >= 1)));
			var iTemp11 = (iSlow21 & (this.fRec25[1] > 0));
			this.fRec25[0] = (((iTemp11 == 0) | (this.fRec25[1] >= 1e-06)) * ((0.000226757 * (((this.iRec24[1] == 0) & iSlow20) & (this.fRec25[1] < 1))) + (this.fRec25[1] * ((1 - (0 - (0.00198929 * (this.iRec24[1] & (this.fRec25[1] > 80))))) - (0.000511877 * iTemp11)))));
			this.fRec26[0] = function fmod(a,b) {return a % b }((0.0131652 + this.fRec26[1]), 1);
			var fTemp12 = Math.sin((6.28319 * this.fRec26[0]));
			this.fRec27[0] = function fmod(a,b) {return a % b }((0.00658258 + this.fRec27[1]), 1);
			this.iRec28[0] = (iSlow23 & (this.iRec28[1] | (this.fRec29[1] >= 1)));
			var iTemp13 = (iSlow24 & (this.fRec29[1] > 0));
			this.fRec29[0] = (((iTemp13 == 0) | (this.fRec29[1] >= 1e-06)) * ((0.000226757 * (((this.iRec28[1] == 0) & iSlow23) & (this.fRec29[1] < 1))) + (this.fRec29[1] * ((1 - (0 - (0.00198929 * (this.iRec28[1] & (this.fRec29[1] > 80))))) - (0.000511877 * iTemp13)))));
			this.fRec30[0] = function fmod(a,b) {return a % b }((0.00997732 + this.fRec30[1]), 1);
			var fTemp14 = Math.sin((6.28319 * this.fRec30[0]));
			this.fRec31[0] = function fmod(a,b) {return a % b }((0.00498866 + this.fRec31[1]), 1);
			output0[i] = (fSlow0 * ((this.fRec1[0] * ((0.5 * Math.sin((6.28319 * this.fRec2[0]))) + Math.sin((6.28319 * this.fRec3[0])))) + ((this.fRec5[0] * (fTemp2 + (0.5 * Math.sin((6.28319 * this.fRec7[0]))))) + ((this.fRec9[0] * (fTemp4 + (0.5 * fTemp5))) + ((this.fRec13[0] * ((0.5 * fTemp7) + Math.sin((6.28319 * this.fRec15[0])))) + ((this.fRec17[0] * ((0.5 * Math.sin((6.28319 * this.fRec18[0]))) + Math.sin((6.28319 * this.fRec19[0])))) + ((this.fRec21[0] * ((0.5 * fTemp10) + Math.sin((6.28319 * this.fRec23[0])))) + ((this.fRec25[0] * ((0.5 * fTemp12) + Math.sin((6.28319 * this.fRec27[0])))) + (this.fRec29[0] * ((0.5 * fTemp14) + Math.sin((6.28319 * this.fRec31[0]))))))))))));
			this.iRec32[0] = (iSlow26 & (this.iRec32[1] | (this.fRec33[1] >= 1)));
			var iTemp15 = (iSlow27 & (this.fRec33[1] > 0));
			this.fRec33[0] = (((iTemp15 == 0) | (this.fRec33[1] >= 1e-06)) * ((0.000226757 * (((this.iRec32[1] == 0) & iSlow26) & (this.fRec33[1] < 1))) + (this.fRec33[1] * ((1 - (0 - (0.00198929 * (this.iRec32[1] & (this.fRec33[1] > 80))))) - (0.000511877 * iTemp15)))));
			this.fRec34[0] = function fmod(a,b) {return a % b }((0.0798186 + this.fRec34[1]), 1);
			this.iRec35[0] = (iSlow29 & (this.iRec35[1] | (this.fRec36[1] >= 1)));
			var iTemp16 = (iSlow30 & (this.fRec36[1] > 0));
			this.fRec36[0] = (((iTemp16 == 0) | (this.fRec36[1] >= 1e-06)) * ((0.000226757 * (((this.iRec35[1] == 0) & iSlow29) & (this.fRec36[1] < 1))) + (this.fRec36[1] * ((1 - (0 - (0.00198929 * (this.iRec35[1] & (this.fRec36[1] > 80))))) - (0.000511877 * iTemp16)))));
			this.fRec37[0] = function fmod(a,b) {return a % b }((0.0604912 + this.fRec37[1]), 1);
			this.iRec38[0] = (iSlow32 & (this.iRec38[1] | (this.fRec39[1] >= 1)));
			var iTemp17 = (iSlow33 & (this.fRec39[1] > 0));
			this.fRec39[0] = (((iTemp17 == 0) | (this.fRec39[1] >= 1e-06)) * ((0.000226757 * (((this.iRec38[1] == 0) & iSlow32) & (this.fRec39[1] < 1))) + (this.fRec39[1] * ((1 - (0 - (0.00198929 * (this.iRec38[1] & (this.fRec39[1] > 80))))) - (0.000511877 * iTemp17)))));
			this.fRec40[0] = function fmod(a,b) {return a % b }((0.0458437 + this.fRec40[1]), 1);
			this.fRec41[0] = function fmod(a,b) {return a % b }((0.0229219 + this.fRec41[1]), 1);
			this.iRec42[0] = (iSlow35 & (this.iRec42[1] | (this.fRec43[1] >= 1)));
			var iTemp18 = (iSlow36 & (this.fRec43[1] > 0));
			this.fRec43[0] = (((iTemp18 == 0) | (this.fRec43[1] >= 1e-06)) * ((0.000226757 * (((this.iRec42[1] == 0) & iSlow35) & (this.fRec43[1] < 1))) + (this.fRec43[1] * ((1 - (0 - (0.00198929 * (this.iRec42[1] & (this.fRec43[1] > 80))))) - (0.000511877 * iTemp18)))));
			this.fRec44[0] = function fmod(a,b) {return a % b }((0.0347431 + this.fRec44[1]), 1);
			this.iRec45[0] = (iSlow38 & (this.iRec45[1] | (this.fRec46[1] >= 1)));
			var iTemp19 = (iSlow39 & (this.fRec46[1] > 0));
			this.fRec46[0] = (((iTemp19 == 0) | (this.fRec46[1] >= 1e-06)) * ((0.000226757 * (((this.iRec45[1] == 0) & iSlow38) & (this.fRec46[1] < 1))) + (this.fRec46[1] * ((1 - (0 - (0.00198929 * (this.iRec45[1] & (this.fRec46[1] > 80))))) - (0.000511877 * iTemp19)))));
			this.iRec47[0] = (iSlow41 & (this.iRec47[1] | (this.fRec48[1] >= 1)));
			var iTemp20 = (iSlow42 & (this.fRec48[1] > 0));
			this.fRec48[0] = (((iTemp20 == 0) | (this.fRec48[1] >= 1e-06)) * ((0.000226757 * (((this.iRec47[1] == 0) & iSlow41) & (this.fRec48[1] < 1))) + (this.fRec48[1] * ((1 - (0 - (0.00198929 * (this.iRec47[1] & (this.fRec48[1] > 80))))) - (0.000511877 * iTemp20)))));
			this.iRec49[0] = (iSlow44 & (this.iRec49[1] | (this.fRec50[1] >= 1)));
			var iTemp21 = (iSlow45 & (this.fRec50[1] > 0));
			this.fRec50[0] = (((iTemp21 == 0) | (this.fRec50[1] >= 1e-06)) * ((0.000226757 * (((this.iRec49[1] == 0) & iSlow44) & (this.fRec50[1] < 1))) + (this.fRec50[1] * ((1 - (0 - (0.00198929 * (this.iRec49[1] & (this.fRec50[1] > 80))))) - (0.000511877 * iTemp21)))));
			this.fRec51[0] = function fmod(a,b) {return a % b }((0.0151228 + this.fRec51[1]), 1);
			this.fRec52[0] = function fmod(a,b) {return a % b }((0.0075614 + this.fRec52[1]), 1);
			this.iRec53[0] = (iSlow47 & (this.iRec53[1] | (this.fRec54[1] >= 1)));
			var iTemp22 = (iSlow48 & (this.fRec54[1] > 0));
			this.fRec54[0] = (((iTemp22 == 0) | (this.fRec54[1] >= 1e-06)) * ((0.000226757 * (((this.iRec53[1] == 0) & iSlow47) & (this.fRec54[1] < 1))) + (this.fRec54[1] * ((1 - (0 - (0.00198929 * (this.iRec53[1] & (this.fRec54[1] > 80))))) - (0.000511877 * iTemp22)))));
			this.fRec55[0] = function fmod(a,b) {return a % b }((0.0114609 + this.fRec55[1]), 1);
			this.fRec56[0] = function fmod(a,b) {return a % b }((0.00573047 + this.fRec56[1]), 1);
			output1[i] = (fSlow0 * ((this.fRec33[0] * ((0.5 * Math.sin((6.28319 * this.fRec34[0]))) + fTemp5)) + ((this.fRec36[0] * ((0.5 * Math.sin((6.28319 * this.fRec37[0]))) + fTemp7)) + ((this.fRec39[0] * ((0.5 * Math.sin((6.28319 * this.fRec40[0]))) + Math.sin((6.28319 * this.fRec41[0])))) + ((this.fRec43[0] * ((0.5 * Math.sin((6.28319 * this.fRec44[0]))) + fTemp10)) + ((this.fRec46[0] * ((0.5 * fTemp2) + fTemp12)) + ((this.fRec48[0] * ((0.5 * fTemp4) + fTemp14)) + ((this.fRec50[0] * ((0.5 * Math.sin((6.28319 * this.fRec51[0]))) + Math.sin((6.28319 * this.fRec52[0])))) + (this.fRec54[0] * ((0.5 * Math.sin((6.28319 * this.fRec55[0]))) + Math.sin((6.28319 * this.fRec56[0]))))))))))));
			this.iRec0[1] = this.iRec0[0];
			this.fRec1[1] = this.fRec1[0];
			this.fRec2[1] = this.fRec2[0];
			this.fRec3[1] = this.fRec3[0];
			this.iRec4[1] = this.iRec4[0];
			this.fRec5[1] = this.fRec5[0];
			this.fRec6[1] = this.fRec6[0];
			this.fRec7[1] = this.fRec7[0];
			this.iRec8[1] = this.iRec8[0];
			this.fRec9[1] = this.fRec9[0];
			this.fRec10[1] = this.fRec10[0];
			this.fRec11[1] = this.fRec11[0];
			this.iRec12[1] = this.iRec12[0];
			this.fRec13[1] = this.fRec13[0];
			this.fRec14[1] = this.fRec14[0];
			this.fRec15[1] = this.fRec15[0];
			this.iRec16[1] = this.iRec16[0];
			this.fRec17[1] = this.fRec17[0];
			this.fRec18[1] = this.fRec18[0];
			this.fRec19[1] = this.fRec19[0];
			this.iRec20[1] = this.iRec20[0];
			this.fRec21[1] = this.fRec21[0];
			this.fRec22[1] = this.fRec22[0];
			this.fRec23[1] = this.fRec23[0];
			this.iRec24[1] = this.iRec24[0];
			this.fRec25[1] = this.fRec25[0];
			this.fRec26[1] = this.fRec26[0];
			this.fRec27[1] = this.fRec27[0];
			this.iRec28[1] = this.iRec28[0];
			this.fRec29[1] = this.fRec29[0];
			this.fRec30[1] = this.fRec30[0];
			this.fRec31[1] = this.fRec31[0];
			this.iRec32[1] = this.iRec32[0];
			this.fRec33[1] = this.fRec33[0];
			this.fRec34[1] = this.fRec34[0];
			this.iRec35[1] = this.iRec35[0];
			this.fRec36[1] = this.fRec36[0];
			this.fRec37[1] = this.fRec37[0];
			this.iRec38[1] = this.iRec38[0];
			this.fRec39[1] = this.fRec39[0];
			this.fRec40[1] = this.fRec40[0];
			this.fRec41[1] = this.fRec41[0];
			this.iRec42[1] = this.iRec42[0];
			this.fRec43[1] = this.fRec43[0];
			this.fRec44[1] = this.fRec44[0];
			this.iRec45[1] = this.iRec45[0];
			this.fRec46[1] = this.fRec46[0];
			this.iRec47[1] = this.iRec47[0];
			this.fRec48[1] = this.fRec48[0];
			this.iRec49[1] = this.iRec49[0];
			this.fRec50[1] = this.fRec50[0];
			this.fRec51[1] = this.fRec51[0];
			this.fRec52[1] = this.fRec52[0];
			this.iRec53[1] = this.iRec53[0];
			this.fRec54[1] = this.fRec54[0];
			this.fRec55[1] = this.fRec55[0];
			this.fRec56[1] = this.fRec56[0];
			
		}
		
	}
	
}

