/* ==========================================================
   IMPERIAL COUNTY DA · Dashboards · script.js
   Hard-coded data (2020-2025)
   ========================================================== */

/* ---------- helpers ---------- */
const $      = q => document.querySelector(q);
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/* ---------- stamp footer year ---------- */
$('#yearNow').textContent = new Date().getFullYear();

/* ---------- palette ---------- */
const palette = {
  blue:'#6992ff',  blueF:'rgba(105,146,255,.7)',
  orange:'#ff9f40',orangeF:'rgba(255,159,64,.7)',
  teal:'#4bc0c0',   pink:'#ff6384',
  yellow:'#ffce54', purple:'#9966ff', grey:'#9599a8'
};

/* ==========================================================
   1 · Arrests & Prosecutions
   ========================================================== */
const arrests = {
  violent:{
    2020:{a:[122,133,117,144,139,123,129,112,121,119,140,137],p:[74,81,68,93,86,77,83,67,74,72,89,88]},
    2021:{a:[119,136,114, 97,162,163,128,113,124,117,143,135],p:[76,79,71,59,84,79,80,69,72,70,91,86]},
    2022:{a:[121,135,116, 96,141,126,127,109,122,120,144,134],p:[77,78,69,61,87,80,81,70,75,73,88,85]},
    2023:{a:[118,132,113, 99,137,122,119,108,125,116,145,133],p:[73,82,72,63,83,79,79,66,71,74,92,84]},
    2024:{a:[123,131,118, 95,136,124,126,111,126,115,139,138],p:[78,77,73,58,88,75,84,65,70,75,93,83]},
    2025:{a:[117,137,112,101,145,128,132,107,0,0,0,0],p:[72,83,74,64,82,81,78,64,0,0,0,0]}
  },
  non:{
    2020:{a:[ 89,101, 95,104, 86,133, 98, 93,108, 99,102, 97],p:[54,61,58,60,62,66,61,57,65,59,64,60]},
    2021:{a:[ 92, 97, 90,107, 88,105,144, 96,103, 94,100, 99],p:[56,59,55,63,57,64,63,62,58,61,66,65]},
    2022:{a:[ 95,100, 93,108, 90,102, 94,110,106, 92, 97, 96],p:[59,58,60,65,61,63,63,59,60,63,67,64]},
    2023:{a:[ 91, 98, 92,106, 87,101, 89, 95,104, 90, 99, 93],p:[55,60,57,61,59,62,62,60,58,64,63,66]},
    2024:{a:[ 94, 96, 91,109, 85,107, 90, 97,105, 89,100, 98],p:[57,62,56,64,58,61,59,63,61,60,67,65]},
    2025:{a:[ 93, 99, 88,110, 84,106, 87, 92,0, 0, 0, 0],p:[53,64,54,66,55,67,65,62,0,0,0,0]}
  }
};

const arrestsChart = new Chart($('#arrestsChart'),{
  type:'bar',
  data:{labels:months,datasets:[
    {label:'Arrests',data:arrests.violent[2025].a,backgroundColor:palette.blueF,borderColor:palette.blue,stack:'s'},
    {label:'Prosecutions',data:arrests.violent[2025].p,backgroundColor:palette.orangeF,borderColor:palette.orange,stack:'s'}
  ]},
  options:{
    responsive:true,maintainAspectRatio:false,
    scales:{y:{beginAtZero:true,stacked:true,grid:{color:'#26294a'}},
            x:{stacked:true,grid:{display:false}}},
    plugins:{title:{display:true,text:'Violent – 2025',color:'#fff',font:{size:18}},
             legend:{labels:{color:'#fff'}}}
  }
});
function updArrests(){
  const y=+$('#arrestsYear').value, key=$('#arrestsType').value==='Violent'?'violent':'non';
  arrestsChart.data.datasets[0].data=arrests[key][y].a;
  arrestsChart.data.datasets[1].data=arrests[key][y].p;
  arrestsChart.options.plugins.title.text=`${$('#arrestsType').value} – ${y}`;
  arrestsChart.update(); $('#arrestsYearOut').textContent=y;
}
$('#arrestsYear').oninput=updArrests; $('#arrestsType').onchange=updArrests;

/* ==========================================================
   2 · DA Actions
   ========================================================== */
const severity = {2020:[250,140],2021:[270,130],2022:[260,125],2023:[255,135],2024:[280,120],2025:[275,150]};
const outcomes = {2020:[300,55,40,25],2021:[320,60,38,22],2022:[310,58,42,20],
                  2023:[330,62,37,21],2024:[340,65,35,20],2025:[350,70,34,21]};

const pieOpt=t=>({plugins:{title:{display:true,text:t,color:'#fff',font:{size:18}},legend:{labels:{color:'#fff'}}}});
const sevPie=new Chart($('#severityPie'),{type:'pie',
  data:{labels:['Misdemeanor','Felony'],datasets:[{data:severity[2025],backgroundColor:[palette.teal,palette.pink]}]},
  options:pieOpt('Severity – 2025')});
const outPie=new Chart($('#outcomePie'),{type:'pie',
  data:{labels:['Convicted','No Contest','Dropped','Acquitted'],
        datasets:[{data:outcomes[2025],backgroundColor:[palette.blue,palette.yellow,palette.grey,palette.purple]}]},
  options:pieOpt('Outcomes – 2025')});
$('#actionsYear').oninput=e=>{
  const y=+e.target.value;
  sevPie.data.datasets[0].data=severity[y];
  outPie.data.datasets[0].data=outcomes[y];
  sevPie.options.plugins.title.text=`Severity – ${y}`;
  outPie.options.plugins.title.text=`Outcomes – ${y}`;
  sevPie.update(); outPie.update(); $('#actionsYearOut').textContent=y;
};

/* ==========================================================
   3 · Victim Services
   ========================================================== */
const victims = {
  2020:{'Compensation':[45,50,48,52,77,49,51,46,53,50,48,44],
        'Court Escorts':[31,32,30,31,19,33,30,30,29,32,30,31],
        'Crisis Counseling':[20,22,21,23,22,24,22,21,23,22,21,20]},
  2021:{'Compensation':[46,52,49,53,48,50,52,47,54,51,33,50],
        'Court Escorts':[32,33,31,32,31,27,31,32,30,33,31,32],
        'Crisis Counseling':[21,23,22,24,23,25,23,22,24,23,22,21]},
  2022:{'Compensation':[47,53,50,54,49,55,53,48,55,52,50,51],
        'Court Escorts':[33,34,32,33,31,35,32,33,31,34,32,33],
        'Crisis Counseling':[22,24,13,25,24,19,24,23,25,24,23,22]},
  2023:{'Compensation':[48,54,51,55,50,52,54,49,56,53,51,52],
        'Court Escorts':[34,35,33,34,32,36,31,34,32,35,33,34],
        'Crisis Counseling':[23,25,24,26,25,27,25,24,26,25,24,23]},
  2024:{'Compensation':[49,55,52,56,51,43,55,55,57,54,52,53],
        'Court Escorts':[35,36,34,35,33,37,34,31,33,36,34,35],
        'Crisis Counseling':[24,26,25,27,26,28,22,25,27,26,25,24]},
  2025:{'Compensation':[10,16,23,37,42,44,56,51,63,73,84],
        'Court Escorts':[36,20,35,36,25,24,32,26,34,34,55,70],
        'Crisis Counseling':[25,27,31,28,27,29,27,20,28,30,40,50]}
};

const vColors = {
  'Compensation':      palette.teal,
  'Court Escorts':     palette.pink,
  'Crisis Counseling': palette.yellow
};

const services = Object.keys(victims[2025]);      // keeps array in sync
let vChart;
function buildVictim(svc,yr){
  return new Chart($('#victimLine'),{
    type:'line',
    data:{labels:months,
          datasets:[{label:svc,
                     data:victims[yr][svc],
                     borderColor:vColors[svc],
                     backgroundColor:vColors[svc]+'55',
                     fill:true,tension:.3}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{title:{display:true,text:`${svc} – ${yr}`,color:'#fff',font:{size:18}},
               legend:{labels:{color:'#fff'}}},
      scales:{y:{beginAtZero:true,grid:{color:'#26294a'}},
              x:{grid:{display:false}}}}
  });
}
function updVictim(){
  const yr = +$('#victimYear').value, svc = $('#victimType').value;
  vChart?.destroy(); vChart = buildVictim(svc,yr);
  $('#victimYearOut').textContent = yr;
}
updVictim();
$('#victimYear').oninput = updVictim;
$('#victimType').onchange = updVictim;
/* ==========================================================
   4 · Special Crimes
   ========================================================== */
const special={
  2020:{Fraud:6,'Elder Abuse':58,'Public Integrity':33},
  2021:{Fraud:10,'Elder Abuse':4,'Public Integrity':22},
  2022:{Fraud:57,'Elder Abuse':9,'Public Integrity':20},
  2023:{Fraud:8,'Elder Abuse':21,'Public Integrity':22},
  2024:{Fraud:5,'Elder Abuse':45,'Public Integrity':7},
  2025:{Fraud:72,'Elder Abuse':6,'Public Integrity':26}
};
let sChart;
function buildSpecial(y){
  return new Chart($('#specialBar'),{
    type:'bar',
    data:{labels:Object.keys(special[y]),
          datasets:[{data:Object.values(special[y]),
                     backgroundColor:[palette.purple,palette.orangeF,palette.teal]}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{title:{display:true,text:`Special Crimes – ${y}`,color:'#fff',font:{size:18}},
               legend:{display:false}},
      scales:{y:{beginAtZero:true,grid:{color:'#26294a'}},
              x:{grid:{display:false}}}}
  });
}
function updSpecial(){
  const y=+$('#specialYear').value;
  sChart?.destroy(); sChart=buildSpecial(y);
  $('#specialYearOut').textContent=y;
}
updSpecial(); $('#specialYear').oninput=updSpecial;

/* ==========================================================
   5 · Narcotics
   ========================================================== */
const narc={
  2020:{I:[80,82,79,83,81,84,78,80,82,81,79,85],
        II:[50,48,49,51,50,52,47,48,49,50,51,49],
        III:[35,34,33,36,35,37,32,3,34,35,4,36],
        IV:[25,24,23,2,25,27,22,23,4,25,24,26]},
  2021:{I:[82,84,81,85,83,86,80,82,84,3,81,87],
        II:[52,50,51,53,52,54,49,50,51,2,3,51],
        III:[37,36,35,38,37,39,34,35,36,37,36,38],
        IV:[27,26,25,28,27,2,24,25,6,27,26,28]},
  2022:{I:[84,86,83,8,85,88,82,84,86,85,83,89],
        II:[54,52,5,55,54,56,51,52,3,54,55,53],
        III:[39,38,37,40,39,41,36,37,38,39,38,40],
        IV:[29,28,27,3,29,31,26,27,28,29,28,30]},
  2023:{I:[86,88,85,89,87,90,84,86,88,87,85,91],
        II:[56,54,55,57,6,58,53,54,55,56,57,55],
        III:[41,40,39,42,41,43,38,39,40,41,40,42],
        IV:[31,30,2,32,31,33,28,29,30,31,30,32]},
  2024:{I:[88,0,8,91,9,2,86,88,90,89,87,3],
        II:[58,56,7,59,58,60,55,56,57,58,59,57],
        III:[43,42,1,44,43,45,40,41,42,43,42,44],
        IV:[33,32,31,34,33,35,30,31,32,33,32,34]},
  2025:{I:[40,9,89,3,1,4,8,90,2,1,9,95],
        II:[60,58,59,61,6,62,7,58,9,60,61,59],
        III:[45,44,43,46,5,47,2,43,4,45,44,46],
        IV:[35,34,33,36,35,3,32,3,34,35,34,36]}
};
const sched=['I','II','III','IV'];
const nColors=[palette.pink,palette.blue,palette.yellow,palette.purple];

const nChart=new Chart($('#narcoticsStack'),{
  type:'bar',
  data:{labels:months,datasets:sched.map((s,i)=>({
    label:`Schedule ${s}`,data:narc[2025][s],backgroundColor:nColors[i],stack:'all'
  }))},
  options:{responsive:true,maintainAspectRatio:false,
    scales:{y:{beginAtZero:true,stacked:true,grid:{color:'#26294a'}},
            x:{stacked:true,grid:{display:false}}},
    plugins:{title:{display:true,text:'Narcotics Cases by Schedule – 2025',color:'#fff',font:{size:18}},
             legend:{labels:{color:'#fff'}}}}
});
$('#narcYear').oninput=e=>{
  const y=+e.target.value;
  nChart.data.datasets.forEach((ds,i)=>ds.data=narc[y][sched[i]]);
  nChart.options.plugins.title.text=`Narcotics Cases by Schedule – ${y}`;
  nChart.update(); $('#narcYearOut').textContent=y;
};

//stops scrolling from being too bad 
document.querySelectorAll('.link-btn').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    const yOffset = -100; // Offset upwards by 20px
    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});