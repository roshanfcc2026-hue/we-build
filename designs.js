// Composition, content order and gallery treatment are chosen for each trade.
const DESIGNS={
 earthworks:['field','ledger','SITE OPERATIONS','Plan. Prepare. Break ground.'],
 concrete:['poster','dashboard','POUR / PLACE / FINISH','Concrete, without compromise.'],
 formwork:['architect','ledger','SYSTEMS & SEQUENCING','A framework for every pour.'],
 reinforcement:['console','dashboard','REINFORCEMENT SCHEDULE','Precision in every connection.'],
 masonry:['journal','editorial','THE MASONRY JOURNAL','Texture. Bond. Detail.'],
 steelwork:['frame','ledger','STRUCTURAL ASSEMBLY','From drawing to skyline.'],
 carpentry:['gallery','editorial','OBJECTS & INTERIORS','Designed around the grain.'],
 roofing:['rescue','service','YOUR ROOF, RESOLVED','Start with the right roof.'],
 waterproofing:['cutaway','dashboard','PROTECTION BY DESIGN','The system beneath the surface.'],
 insulation:['orbit','dashboard','COMFORT FROM WITHIN','Better spaces start inside.'],
 glazing:['gallery','catalogue','LIGHT / SPACE / VIEW','Architecture, opened up.'],
 drywall:['blueprint','catalogue','INTERIOR ARCHITECTURE','A clean starting point.'],
 plastering:['journal','editorial','A STUDY IN SURFACE','Quiet finishes. Lasting character.'],
 flooring:['poster','catalogue','MATERIALS UNDERFOOT','Set the tone from the ground up.'],
 painting:['orbit','catalogue','COLOUR, CONSIDERED','Find the feeling of your space.'],
 plumbing:['rescue','service','LET’S GET THINGS FLOWING','What can we help you with?'],
 electrical:['console','ledger','POWER & CONTROL','Make room for what comes next.'],
 hvac:['cutaway','service','AIR / TEMPERATURE / COMFORT','Comfort is a connected system.'],
 fire:['frame','dashboard','PROTECTION, COORDINATED','Every layer has a purpose.'],
 paving:['field','editorial','LANDSCAPE NOTES','Make more of the outdoors.']
};
function designStage(t,preview=false){
 const [shape,,label]=DESIGNS[t.id];
 const heading=preview?'h3':'h1';
 const action=preview?`<span class="ds-action">${t.cta} ↗</span>`:`<button class="ds-action" data-enquiry>${t.cta} ↗</button>`;
 return `<div class="design-stage shape-${shape} ${preview?'is-preview':'is-full'}" data-trade="${t.id}">
 <div class="ds-label">${label}<span>${t.number} / ${t.group}</span></div>
 <div class="ds-title"><${heading}>${t.headline.replace('\n','<br> ')}</${heading}></div>
 <figure class="ds-photo"><img src="assets/${t.image}.jpg" alt="${preview?'':t.name+' — illustrative trade photography'}" ${preview?'loading="lazy"':'fetchpriority="high"'} width="1400" height="950"><figcaption>${t.name} / A closer look</figcaption></figure>
 <div class="ds-description">${preview?'':`<p>${t.intro}</p>`}${action}</div>
 <div class="ds-directory">${t.services.map((s,i)=>preview?`<span><b>0${i+1}</b>${s.split('|')[0]}<em>↗</em></span>`:`<button data-scroll="services"><b>0${i+1}</b>${s.split('|')[0]}<em>↗</em></button>`).join('')}</div>
 <div class="ds-mark" aria-hidden="true">${shape==='orbit'?'○':shape==='console'?'+':shape==='blueprint'?'⌜':t.number}</div></div>`;
}
function designCard(t){return `<a class="trade-card" href="#trade/${t.id}" aria-label="Explore ${t.name} template"><div class="design-preview" style="${theme(t)}"><div class="design-brand">${t.brand}<span>MENU +</span></div>${designStage(t,true)}</div><div class="card-meta"><div><small>${t.number} / ${t.group.toUpperCase()}</small><h3>${t.name}</h3></div><span class="explore">Explore ↗</span></div></a>`}
function arrangeDesign(t){
 const [shape,flow,,title]=DESIGNS[t.id],article=document.querySelector('.template');
 article.classList.add('bespoke',`design-${shape}`,`flow-${flow}`);
 article.querySelector('.trade-hero').outerHTML=designStage(t);
 const services=article.querySelector('.services-section'),work=article.querySelector('.work-section'),tool=article.querySelector('.tool-section'),spec=article.querySelector('.specification'),contact=article.querySelector('.contact-band');
 services.querySelector('h2').textContent=title;
 work.querySelector('h2').textContent=flow==='editorial'?'Selected studies.':flow==='catalogue'?'Explore the collection.':'In focus.';
 article.querySelector('.service-strip').remove();
 const order={ledger:[services,spec,work,tool],dashboard:[tool,services,work,spec],editorial:[work,services,tool,spec],catalogue:[work,tool,services,spec],service:[services,tool,spec,work]};
 order[flow].forEach(section=>article.insertBefore(section,contact));
}
