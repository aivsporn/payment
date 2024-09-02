let baseUrl = "https://6u80501etd.execute-api.us-west-1.amazonaws.com/aivspornapi";

function displayUsername(){
    let username = new URL(window.location.href).searchParams.get("username"); 
    document.getElementById("usernameDisplay").innerHTML = username;
}
document.addEventListener('DOMContentLoaded', displayUsername);

async function createOrder(){
    let username = new URL(window.location.href).searchParams.get("username");
    let password = new URL(window.location.href).searchParams.get("password");
    let url = `${baseUrl}?action=createPayment&username=${username}&password=${password}`
    let call = new XMLHttpRequest();
    call.open("GET", url, false);
    call.send();
    return call.responseText;
}

async function onApprove(data, actions){
    // use data.orderID to capture the order
    let url = `${baseUrl}?action=confirmPayment&orderId=${data.orderID}`;
    let call = new XMLHttpRequest();
    call.open("GET", url, false);
    call.send();
    let status = call.responseText;
    // return actions.restart() for "INSTRUMENT_DECLINED" 
    if(status == "INSTRUMENT_DECLINED"){
        document.getElementById("paymentStatus").innerHTML = status + ". Please try again, or contact aivsporn@gmail.com for additional support.";
        return actions.restart();
    }
    else if(status == "success"){
        document.getElementById("paymentStatus").innerHTML = "complete. Open the AI vs. Porn extension to see your new credit balance, and start browsing a porn-free internet!";
    }
    else{
        document.getElementById("paymentStatus").innerHTML = status + ". Please contact aivsporn@gmail.com for additional support. Sorry for the inconvenience.";
    }
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