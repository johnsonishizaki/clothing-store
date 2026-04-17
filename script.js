import supabase from "./config/supabase.js";

let products=[],cart=[],user=null;

window.onload=async()=>{await init();};

async function init(){
 await getUser();
 await fetchProducts();
 loadCart();
 renderCart();
}

async function getUser(){
 const {data}=await supabase.auth.getUser();
 user=data.user;
}

async function fetchProducts(){
 const {data,error}=await supabase.from("products").select("*");
 if(error) return console.error(error);
 products=data||[];
 renderProducts(products);
}

function renderProducts(list){
 const c=document.getElementById("products");
 c.innerHTML="";
 list.forEach(p=>{
  const el=document.createElement("div");
  el.className="card";
  el.innerHTML=`<h3>${p.name}</h3><p>$${p.price}</p>
  <button onclick="addToCart('${p.id}')">Add</button>`;
  c.appendChild(el);
 });
}

function addToCart(id){
 const item=cart.find(i=>i.id===id);
 if(item) item.qty++; else cart.push({id,qty:1});
 saveCart();renderCart();
}

function renderCart(){
 const el=document.getElementById("cart-items");
 const totalEl=document.getElementById("total");
 el.innerHTML="";let total=0;
 cart.forEach(item=>{
  const p=products.find(x=>x.id==item.id);
  if(!p) return;
  total+=p.price*item.qty;
  el.innerHTML+=`<div>${p.name} x${item.qty}</div>`;
 });
 totalEl.innerText="Total: $"+total;
}

function saveCart(){localStorage.setItem("cart",JSON.stringify(cart));}
function loadCart(){const d=localStorage.getItem("cart");if(d) cart=JSON.parse(d);}

async function checkout(){
 if(!user) return alert("Login first");
 let total=0;
 cart.forEach(i=>{
  const p=products.find(x=>x.id==i.id);
  total+=p.price*i.qty;
 });
 const {data,error}=await supabase.from("orders").insert([{user_id:user.id,total_price:total}]).select();
 if(error) return alert(error.message);
 const orderId=data[0].id;
 for(let i of cart){
  await supabase.from("order_items").insert([{order_id:orderId,product_id:i.id,quantity:i.qty}]);
 }
 alert("Order placed 🚀");
 cart=[];saveCart();renderCart();
}
