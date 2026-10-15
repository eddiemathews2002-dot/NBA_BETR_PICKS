// Historical values transcribed from the supplied research materials.
// No API calls, model inference, or credentials are used.
// models: [name, predictor count, accuracy percent, log loss, Brier score]
// levels: [retained games, coverage percent, accuracy percent]
(()=>{
const root=document.getElementById('nba-demo'),q=s=>root.querySelector(s);
const games=[{home:'DEN',away:'LAL',date:'Oct 24, 2023',p:62.6,score:'119–107',win:true},{home:'GSW',away:'PHX',date:'Oct 24, 2023',p:58.4,score:'104–108',win:false},{home:'DAL',away:'DET',date:'Apr 12, 2024',p:93.8,score:'89–107',win:false}];
const models=[['Home baseline',0,54.3,.693,.250],['Elo',1,63.4,.628,.220],['Basic logistic',7,65.1,.615,.214],['Form logistic',14,65.6,.610,.211],['Factors logistic',25,66.1,.609,.211],['All-KPI logistic',116,65.8,.609,.211],['All-KPI boosting',116,64.6,.614,.213]];
const levels=[[1230,100,65.1],[773,62.8,72.1],[434,35.3,79.5],[150,12.2,87.3]];
let state={view:'games',game:0,reveal:false,model:2,cal:false,threshold:0};
function restore(s){if(!s)return;const x=s.modelContent||{};if(['games','research','confidence'].includes(x.view))state.view=x.view;for(const [key,max] of [['game',2],['model',6],['threshold',3]])if(Number.isInteger(x[key])&&x[key]>=0&&x[key]<=max)state[key]=x[key];state.cal=!!x.cal&&state.model===2;state.reveal=!!x.reveal}
// Save UI choices locally; the demo works if browser storage is unavailable.
const storageKey = 'nba-betr-picks-demo-v1';
try { restore(JSON.parse(localStorage.getItem(storageKey))); } catch {}
function save() {
  try { localStorage.setItem(storageKey, JSON.stringify({modelContent: state})); } catch {}
}
function metric(v,k){return '<div class="metric"><strong>'+v+'</strong><span class="caption">'+k+'</span></div>'}
q('#nba-model').innerHTML=models.map((m,i)=>'<option value="'+i+'">'+m[0]+' · '+m[1]+' predictors</option>').join('');
function render(){
root.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===state.view)));root.querySelectorAll('[data-page]').forEach(p=>p.hidden=p.dataset.page!==state.view);
q('#nba-games').innerHTML=games.map((g,i)=>'<button class="game cursor-interaction" data-game="'+i+'" aria-pressed="'+(i===state.game)+'"><strong>'+g.away+' at '+g.home+'</strong><small>'+g.date+'</small></button>').join('');
let g=games[state.game];q('#nba-forecast').innerHTML='<div class="caption">'+g.date+' · Pregame forecast</div><div class="match"><div><div class="caption">HOME</div><div class="team">'+g.home+'</div><div class="prob">'+g.p.toFixed(1)+'%</div></div><div class="right"><div class="caption">AWAY</div><div class="team">'+g.away+'</div><div class="prob">'+(100-g.p).toFixed(1)+'%</div></div></div><div class="bar"><span style="width:'+g.p+'%"></span></div><p>Predicted winner: <strong>'+g.home+'</strong></p><div class="result"><button id="nba-reveal" class="primary cursor-interaction">'+(state.reveal?'Hide outcome':'Reveal actual outcome')+'</button>'+(state.reveal?'<div style="margin-top:14px"><strong>'+g.home+' '+g.score+' '+g.away+'</strong><p>'+(g.win?'Correct home pick.':state.game===2?'Confident miss: a 93.8% estimate still left room for an upset.':'Incorrect home pick. The away team won.')+'</p></div>':'')+'</div>';
q('#nba-model').value=state.model;q('#nba-treatment').value=state.cal?'cal':'raw';q('#nba-treatment').disabled=state.model!==2;
let m=models[state.model],acc=state.cal?65.2:m[2],ll=state.cal?.617:m[3];q('#nba-model-metrics').innerHTML=metric(acc.toFixed(1)+'%','Accuracy')+metric(ll.toFixed(3),'Log loss ↓')+metric(m[4].toFixed(3),'Brier score ↓');
q('#nba-model-note').textContent=state.model===2?'Primary model: selected on earlier validation log loss. Seven Elo and schedule predictors.':'Comparison condition. Basic logistic remains the preselected primary model. Calibration results are available here only for Basic.';
q('#nba-insight').textContent=state.cal?'Calibration raises accuracy slightly but worsens log loss (0.615 → 0.617) and Brier score (0.213509 → 0.214475).':state.model===4?'25 predictors reached 66.1% accuracy versus 65.8% for 116. This retrospective result does not change the preselected primary model.':'Lower log loss and Brier scores indicate better probability forecasts. These results describe one historical test season.';
q('#nba-threshold').value=state.threshold;let l=levels[state.threshold];q('#nba-confidence-metrics').innerHTML=metric(l[2].toFixed(1)+'%','Accuracy')+metric(l[1].toFixed(1)+'%','Coverage')+metric(l[0].toLocaleString(),'Games retained');q('#nba-coverage').style.width=l[1]+'%';q('#nba-confidence-note').textContent=state.threshold===0?'All 1,230 games are included at the 50% threshold.':(1230-l[0]).toLocaleString()+' games are excluded. Higher historical accuracy applies to this smaller subset.';
}
root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.view){state.view=b.dataset.view}else if(b.dataset.game!==undefined){state.game=Number(b.dataset.game);state.reveal=false}else if(b.id==='nba-reveal'){state.reveal=!state.reveal}else return;render();save()});
q('#nba-model').addEventListener('change',e=>{state.model=Number(e.target.value);state.cal=false;render();save()});q('#nba-treatment').addEventListener('change',e=>{state.cal=e.target.value==='cal';render();save()});q('#nba-threshold').addEventListener('change',e=>{state.threshold=Number(e.target.value);render();save()});render();
})();