let baseUrl = "https://6u80501etd.execute-api.us-west-1.amazonaws.com/aivspornapi";

function displayUsername(){
    let username = new URL(window.location.href).searchParams.get("username"); 
    document.getElementById("usernameDisplay").innerHTML = username;
}
document.addEventListener('DOMContentLoaded', displayUsername);

async function createOrder(){
    let username = new URL(window.location.href).searchParams.get("username");
    let url = `${baseUrl}?action=createPayment&username=${username}`
    let call = new XMLHttpRequest();
    call.open("GET", url, false);
    call.send();
    return call.responseText;
}
async function onApprove(data, actions){
    // use data.orderID to capture the order
    // return actions.restart() for "INSTRUMENT_DECLINED" 
    // no need to return anything for successful orders
}

window.paypal.Buttons({
    style: {
        shape: 'rect',
        //color:'blue', change the default color of the buttons
        layout: 'vertical', //default value. Can be changed to horizontal
    },
    createOrder,
    onApprove
}).render("#paypal-button-container");