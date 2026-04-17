
let currentItem = {};

function order(name,id,size,price){
currentItem = {name,id,size,price};

document.getElementById('itemInfo').innerText =
`▶ ${name} | ID:${id} | SIZE:${size} | GHS ${price}`;

document.getElementById('orderBox').style.display='block';
}

function closeModal(){
document.getElementById('orderBox').style.display='none';
}

function submitOrder(){
let name=document.getElementById('name').value;
let phone=document.getElementById('phone').value;

alert(`✔ ORDER SENT
Item: ${currentItem.name}
User: ${name}`);
closeModal();
}
