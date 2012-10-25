
try{

if (ElmCode.Main) throw "Module name collision, 'Main' is already defined."; 
ElmCode.Main=function(){
try{if (!(ElmCode.Prelude instanceof Object)) throw 'module not found'; } catch(e) {throw "Module 'Prelude' is missing. Compile with --make flag or load missing module in a separate JavaScript file.";}
var hiddenVars=[];
for(var i in ElmCode.Prelude){
if (hiddenVars.indexOf(i) >= 0) continue;
this[i]=ElmCode.Prelude[i];}
try{if (!(ElmCode.Signal.Window instanceof Object)) throw 'module not found'; } catch(e) {throw "Module 'Signal.Window' is missing. Compile with --make flag or load missing module in a separate JavaScript file.";}
var dimensions=ElmCode.Signal.Window.dimensions;
var main_7=lift(view_6)(dimensions);
function placeholder_0(w_8){
return function(h_9){
return function(col_10){
return function(text_11){
return color(col_10)(container(w_8)(h_9)(middle)(plainText(text_11)));};};};};
function synthCtrl_1(w_12){
return function(h_13){
return placeholder_0(w_12)(h_13)(blue)(Value.str("Sythesizer controls"));};};
function golCtrl_2(w_14){
return function(h_15){
return placeholder_0(w_14)(h_15)(rgb(56)(56)(56))(Value.str("GoL controls"));};};
function presets_3(w_16){
return function(h_17){
return placeholder_0(w_16)(h_17)(rgb(56)(56)(56))(Value.str("Presets"));};};
function sequencer_4(w_18){
return function(h_19){
return placeholder_0(w_18)(h_19)(black)(Value.str("Sequencer"));};};
function percent_5(x_20){
return function(p_21){
return div((x_20*p_21))(100);};};
function view_6(Tuple2$wh_22){
return function(case3){
var case0=case3;
switch(case0[0]){
case "Tuple2":
var case1=case0[1],case2=case0[2];
return function(){
var layout_w_25=div((5*case1))(6);
return function(){
var game_h_26=div((3*case2))(5);
return container(case1)(case2)(middle)(color(grey)(above(container(layout_w_25)(game_h_26)(middle)(flow(right)(["Cons",golCtrl_2(percent_5(layout_w_25)(12))(percent_5(game_h_26)(80)),["Cons",sequencer_4(percent_5(game_h_26)(90))(percent_5(game_h_26)(90)),["Cons",presets_3(percent_5(layout_w_25)(12))(percent_5(game_h_26)(80)),["Nil"]]]])))(synthCtrl_1(layout_w_25)(div(case2)(6)))));}();}();
}
throw "Non-exhaustive pattern match in case";}(Tuple2$wh_22);};
return {placeholder:placeholder_0,synthCtrl:synthCtrl_1,golCtrl:golCtrl_2,presets:presets_3,sequencer:sequencer_4,percent:percent_5,view:view_6,main:main_7};}();
ElmCode.main=function(){
return ElmCode.Main.main;};

} catch (e) {ElmCode.main=function() {var msg = ('<br/><h2>Your browser may not be supported. Are you using a modern browser?</h2>' + '<br/><span style="color:grey">Runtime Error in Main module:<br/>' + e + '<br/><br/>The problem may stem from an improper usage of:<br/>above</span>');document.body.innerHTML = Text.monospace(msg);throw e;};}