const sales = [
    {
        id:125,
        orderno:123567,
        cusName: "Richard",
        Moreless:0,
        OrderTotal: 35,
        FinalTotal: 45,
        CashPayment: 10,
        OnlinePayment: 13,
        Onlinetip:5,
        Deliveryfee:7,
        QuickNotes:" "
    },
    {
        id:125,
        orderno:123567,
        cusName: "Richard",
        Moreless:0,
        OrderTotal: 35,
        FinalTotal: 45,
        CashPayment: 10,
        OnlinePayment: 13,
        Onlinetip:5,
        Deliveryfee:7,
        QuickNotes:" "
    },
    {
        id:125,
        orderno:123567,
        cusName: "Richard",
        Moreless:0,
        OrderTotal: 35,
        FinalTotal: 45,
        CashPayment: 10,
        OnlinePayment: 13,
        Onlinetip:5,
        Deliveryfee:7,
        QuickNotes:" "
    },
    {
        id:125,
        orderno:123567,
        cusName: "Richard",
        Moreless:0,
        OrderTotal: 35,
        FinalTotal: 45,
        CashPayment: 10,
        OnlinePayment: 13,
        Onlinetip:5,
        Deliveryfee:7,
        QuickNotes:" "
    }
]
const insertrows = function(sales){
    const tablebodyobj = document.getElementsByTagName("tbody")[0];
    console.log(tablebodyobj)
    if(sales){
        sales.forEach((element,rowIndex) => {
        const rowelement = document.createElement('tr');
        const elementValues = Object.values(element);
        console.log(elementValues)
        let checkbox ;
        let textfield;
        let itemId;
        for (let i = 0; i < elementValues.length; i++) {
            const column1 = document.createElement('td')
            if(i==0){
                column1.classList.add("itemid")
                column1.innerHTML = elementValues[i]
                column1.addEventListener("click", () => {
                    showModal(element);
                });
            }
            else if (i == 3 ){
                checkbox = document.createElement('input')
                checkbox.type = 'checkbox';
                checkbox.id = `checkbox-${rowIndex}`;
                checkbox.checked = false;
                column1.appendChild(checkbox)
            }
            else if(i == 5 || i == 6 || i == 7 || i == 8 || i==10){
                textfield = document.createElement("input")
                textfield.type = 'text';
                textfield.id = `payment-${rowIndex}-${i}`
                textfield.value = elementValues[i]
                if (i == 7){
                    textfield.readOnly = true
                }
                column1.appendChild(textfield)
            }
            else{
                column1.innerHTML = elementValues[i]
            }
            
            rowelement.appendChild(column1)
        }
        tablebodyobj.insertBefore(rowelement,grandtotal)
        const onlinePaymentObj = document.getElementById(`payment-${rowIndex}-7`);
        const cashPayment = document.getElementById(`payment-${rowIndex}-6`);
        const finalTotal = document.getElementById(`payment-${rowIndex}-5`);

        checkbox.addEventListener("click", () =>{
            if (checkbox.checked) {
                onlinePaymentObj.removeAttribute('readonly');
            } else {
                onlinePaymentObj.setAttribute('readonly', 'true');
            }
        })
        cashPayment.addEventListener("input", () => {
            if (!checkbox.checked) {
                const cashValue = parseFloat(cashPayment.value) || 0;
                const finalValue = parseFloat(finalTotal.value) || 0;
                onlinePaymentObj.value = finalValue - cashValue;
            }
            getTableValues()
        });
        onlinePaymentObj.addEventListener("input", () => {
            getTableValues()
        });
        finalTotal.addEventListener("input", () => {
            getTableValues()
        });
        
        })
    }
}
const getTableValues = function () {
    const tableBody = document.querySelector('tbody');
    const rows = tableBody.querySelectorAll('tr'); 
    const finaltotal = document.getElementById('finaltotal');
    const cashPayment = document.getElementById('cashPayment');
    const onlinePayment = document.getElementById('onlinePayment');
    const onlinetip = document.getElementById('onlinetip');
    let sumcashpayemnt = 0
    let sumonlinepayment = 0
    let sumtip = 0
    let sumfinalpayment = 0
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = [];
        cells.forEach(cell => {
            const input = cell.querySelector('input');
            if (input) {
                rowData.push(input.type === 'checkbox' ? input.checked : input.value);
            } else {
                rowData.push(cell.textContent);
            }
        });
        console.log(rowData);
        sumfinalpayment += parseFloat( rowData[5]) || 0;
        sumcashpayemnt += parseFloat( rowData[6]) || 0;
        sumonlinepayment += parseFloat( rowData[7]) || 0;
        sumtip += parseFloat( rowData[8]) || 0;
        console.log("sumtip",sumtip)
    });
    finaltotal.innerHTML = sumfinalpayment
    cashPayment.innerHTML = sumcashpayemnt
    onlinePayment.innerHTML = sumonlinepayment
    onlinetip.innerHTML = sumtip
};


const showModal = function (data) {
    const modal = document.getElementById("myModal");
    const itemList = document.getElementById("itemList");

    itemList.innerHTML = ""; // Clear previous items

    // Populate the list with data
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            const listItem = document.createElement("li");
            listItem.textContent = `${key}: ${data[key]}`;
            itemList.appendChild(listItem);
        }
    }

    // Show the modal
    modal.style.display = "block";
};

const closeModal = function () {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
};

// Close the modal when the user clicks on <span> (x)
document.querySelector(".close").onclick = function () {
    closeModal();
};

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
};

document.addEventListener('DOMContentLoaded', (event) => {
    insertrows(sales);
    getTableValues()
});