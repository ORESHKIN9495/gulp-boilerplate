window.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("myCanvas"),i=t.getContext("2d"),e=document.querySelector(".score_enemy_helth > figure"),o=document.querySelectorAll(".score_deg_helth > svg"),s=document.querySelector(".score_counter"),h=document.querySelector(".start"),n=document.querySelector(".over"),c=document.querySelector(".start > button"),l=document.querySelector(".over > button");t.width=600,t.height=1200;const y=new Image;y.src="https://i.pinimg.com/originals/39/e6/98/39e69840a1f7b3f451d23879cc72454c.jpg",h.style.display="flex",c.addEventListener("click",()=>{m(),h.style.display="none"}),l.addEventListener("click",()=>{m(),n.style.display="none"});const r={right:{pressed:!1},left:{pressed:!1},up:{pressed:!1},down:{pressed:!1}};const d=new class{constructor(){}draw(){i.drawImage(y,0,0,t.width,t.height)}update(){this.draw()}};const a=new class{constructor({position:t,velocity:i}){this.position=t,this.velocity=i,this.width=50,this.height=50,this.score=0,this.lives=5,this.marked=!1}draw(){i.fillStyle="black",i.fillRect(this.position.x,this.position.y,this.width,this.height),s.textContent=this.score}collision(){console.log("eeee")}update(){this.draw(),this.position.x+=this.velocity.x,this.position.y+=this.velocity.y}}({position:{x:t.width/2-25,y:t.height-100},velocity:{x:0,y:0}});class p{constructor({position:t,velocity:i}){this.position=t,this.velocity=i,this.width=50,this.height=50,this.helth=100}draw(){i.fillStyle="black",i.fillRect(this.position.x,this.position.y,this.width,this.height),e.style.width=this.helth+"%"}update(){this.draw(),this.position.x+=this.velocity.x,this.position.y+=this.velocity.y}}const v=[];class u{constructor({position:t,velocity:i}){this.position=t,this.velocity=i,this.radius=10}draw(){i.beginPath(),i.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI),i.fillStyle="red",i.fill(),i.closePath()}update(){this.draw(),this.position.x+=this.velocity.x,this.position.y+=this.velocity.y}}const w=[],x=(t,i)=>Math.round(Math.random()*(i-t)+t);setInterval(()=>{v.forEach(t=>{t.velocity.y=x(-2,2)})},1e3),setInterval(()=>{v.forEach(t=>{t.velocity.x=x(-7,7)})},1e3);const g=()=>{const e=requestAnimationFrame(g);i.clearRect(0,0,t.width,t.height),d.update(),a.update(),w.forEach((t,i)=>{t.position.y+t.radius<=0?setTimeout(()=>{w.splice(i,1)},0):t.update()}),a.velocity.x=0,a.velocity.y=0,v.length<=0&&v.push(new p({position:{x:Math.floor(Math.random()*t.width),y:t.height/2},velocity:{x:2,y:1}})),v.forEach((i,s)=>{i.position.x+i.width+i.velocity.x<=0+i.width&&(i.velocity.x=0),i.position.x+i.width+i.velocity.x>=t.width&&(i.velocity.x=0),i.position.y+i.height+i.velocity.y<50&&(i.velocity.y=0),i.position.y+i.height+i.velocity.y>=t.height&&(cancelAnimationFrame(e),n.style.display="flex"),i.position.x<a.position.x+a.width&&i.position.x+i.width>a.position.x&&i.position.y<a.position.y+a.height&&i.position.y+i.height>a.position.y&&(cancelAnimationFrame(e),i.position.y=0,a.position.y=t.height-100,setTimeout(()=>{requestAnimationFrame(g),a.lives-=1,o[a.lives].style.fill="none"},0)),w.forEach((t,e)=>{t.position.x<i.position.x+i.width&&t.position.x+t.radius>i.position.x&&t.position.y<i.position.y+i.height&&t.position.y+t.radius>i.position.y&&setTimeout(()=>{i.helth-=10,a.score+=1,0==i.helth&&(v.splice(s,1),i.helth=100),w.splice(e,1)},0)}),a.lives<=0&&(cancelAnimationFrame(e),n.style.display="flex"),i.update()}),r.left.pressed?a.velocity.x=-5:r.right.pressed?a.velocity.x=5:r.up.pressed?a.velocity.y=-5:r.down.pressed&&(a.velocity.y=5),a.position.x+a.width+a.velocity.x<0+a.width&&(a.velocity.x=0),a.position.x+a.width+a.velocity.x>t.width&&(a.velocity.x=0),a.position.y+a.height+a.velocity.y>t.height&&(a.velocity.y=0),a.position.y+a.height+a.velocity.y<50&&(a.velocity.y=0)},m=()=>{a.lives=5,a.score=0,v.forEach(i=>{i.helth=100,i.position.y=0,a.position.y=t.height-100}),o.forEach(t=>{t.style.fill="#ff004c"}),g()};addEventListener("keydown",t=>{switch(t.key){case"a":r.left.pressed=!0;break;case"d":r.right.pressed=!0;break;case"w":r.up.pressed=!0;break;case"s":r.down.pressed=!0;break;case" ":w.push(new u({position:{x:a.position.x+a.width/2,y:a.position.y},velocity:{x:0,y:-10}}))}}),addEventListener("keyup",t=>{switch(t.key){case"a":r.left.pressed=!1;break;case"d":r.right.pressed=!1;break;case"w":r.up.pressed=!1;break;case"s":r.down.pressed=!1}})});