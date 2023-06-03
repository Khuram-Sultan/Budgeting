let budget = 0;
let balance = 0;
let totalExpense = 0;
const dataExpense = [];
let editExpenseIndex = "";
let cat = ["utility bill", "education fee", "grocery", "maintainance"];

function disalbleView(eid) {
    switch (eid) {
        case "showExpenseBox":
            document.getElementById("showExpenseBox").style.display = "flex";
            break;
        default:
            document.getElementById("showExpenseBox").style.display = "none";
            document.getElementById("mainMenu").style.display = "none";
    }
}
function showBox(eid) {
    if (eid === "addExpense" && budget === 0) {
        alert("You have not enogh budget to make expenses");
        return;
    } else {
        document.getElementById(eid).style.display = "flex";

        if (eid === "addBudget") { document.getElementById("monthlyBudget").focus(); }
        if (eid === "addCategory") { document.getElementById("addNewCategory").focus(); }
        if (eid === "addExpense") { document.getElementById("expenseDate").focus(); }
        if (eid === "editExpense") { document.getElementById("editExpenseDate").focus(); }

        disalbleView();
    }
}

function expenseEdit(expenseIndex) {
    editExpenseIndex = expenseIndex;
    document.getElementById("editExpenseDate").value = dataExpense[expenseIndex].date;
    document.getElementById("editExpenseDescription").value = dataExpense[expenseIndex].description;
    document.getElementById("editExpenseCategory").value = dataExpense[expenseIndex].category;
    document.getElementById("editExpenseAmount").value = dataExpense[expenseIndex].amount;
    document.getElementById("editExpense").style.display = "flex";
    totalExpense = totalExpense - dataExpense[expenseIndex].amount;
    balance = budget - totalExpense;
    disalbleView();
}

function categoryList(eid) {
    if (eid === "expenseCategory") {
        result = document.getElementById("expenseCategory");
    } else {
        result = document.getElementById("editExpenseCategory");
    }
    let option = "";
    for (var i = 0; i < cat.length; i++) {
        option += '<option>' + cat[i] + '</option>';
    }
    result.innerHTML = option;
    if (eid === undefined) {
        document.getElementById("editExpenseCategory").value = dataExpense[editExpenseIndex].category;
    }
}

function AddExpense(date, category, description, amount) {
    this.date = date;
    this.category = category;
    this.description = description;
    this.amount = amount;
}

function addExpense() {
    let date = document.getElementById("expenseDate").value;
    let description = document.getElementById("expenseDescription").value;
    let category = document.getElementById("expenseCategory").value;
    let amount = parseInt(document.getElementById("expenseAmount").value);
    if (amount > 0) {
        dataExpense.push(new AddExpense(date, category, description, amount));
        document.getElementById("expenseDate").value = "";
        document.getElementById("expenseDescription").value = "";
        document.getElementById("expenseAmount").value = "";
        totalExpense = 0;
        for (var i = 0; i < dataExpense.length; i++) {
            totalExpense += dataExpense[i].amount;
        }
        document.getElementById("expense").innerHTML = totalExpense;
        balance = budget - totalExpense;
        document.getElementById("balance").innerHTML = balance;
    }
    document.getElementById("addExpense").style.display = "none";
    document.getElementById("mainMenu").style.display = "flex";
}

function editExpense() {
    let date = document.getElementById("editExpenseDate").value;
    let description = document.getElementById("editExpenseDescription").value;
    let category = document.getElementById("editExpenseCategory").value;
    let amount = parseInt(document.getElementById("editExpenseAmount").value);
    if (amount > 0) {
        dataExpense[editExpenseIndex].date = date;
        dataExpense[editExpenseIndex].description = description;
        dataExpense[editExpenseIndex].category = category;
        dataExpense[editExpenseIndex].amount = amount;
        document.getElementById("editExpenseDate").value = "";
        document.getElementById("editExpenseDescription").value = "";
        document.getElementById("editExpenseAmount").value = "";
        totalExpense = 0;
        for (var i = 0; i < dataExpense.length; i++) {
            totalExpense += dataExpense[i].amount;
        }
        document.getElementById("expense").innerHTML = totalExpense;
        balance = budget - totalExpense;
        document.getElementById("balance").innerHTML = balance;
    }
    document.getElementById("editExpense").style.display = "none";
    document.getElementById("mainMenu").style.display = "flex";
}

function expenseList() {
    if (totalExpense > 0) {
        disalbleView("showExpenseBox");
        let list = "<div class='listExpense'><table>";
        let eExpense = "editExpense";
        for (var i = 0; i < dataExpense.length; i++) {
            list += "<tr><td class='tdcat'>"
            list += dataExpense[i].category + "</td><td class='tddate'> ";
            list += dataExpense[i].date + "</td><td class='tdamount'>";
            list += dataExpense[i].amount;
            list += "</td><td onclick='expenseEdit(" + i + "); categoryList()' id='" + i + "'>";
            list += "<img src='./edit.png' height='30px' width='30px'>";
            list += "</td><td onclick='expenseDelete(" + i + ")' id='" + i + "'>";
            list += "<img src='./trash.png' height='60px' width='60px'></td></tr>";
        }
        list += "</table></div>"
        document.getElementById("showExpenseBox").innerHTML = list;
    } else { alert("Kindly add some expenses first"); }
}

function expenseDelete(eid) {
    totalExpense = totalExpense - dataExpense[eid].amount;
    dataExpense.splice(eid, 1);
    expenseList();
    document.getElementById("expense").innerHTML = totalExpense;
    setBudget();
}

function validateNumber(eid) {
    let inputNum = document.getElementById(eid).value;
    if (inputNum > 0) {
        let char = (inputNum.slice(inputNum.length - 1)).charCodeAt();
        if (char >= 48 && char <= 57) {
            if (inputNum.length === 1 && char === 48) {
                document.getElementById(eid).value = inputNum.slice(0, inputNum.length - 1);
            }
        } else {
            document.getElementById(eid).value = inputNum.slice(0, inputNum.length - 1);
        }
    } else {
        document.getElementById(eid).value = "";

    }
}

function setBudget() {
    budget = document.getElementById("monthlyBudget").value;
    balance = budget - totalExpense;
    document.getElementById("balance").innerHTML = balance;
    document.getElementById("budget").innerHTML = budget;
    document.getElementById("addBudget").style.display = "none";
    document.getElementById("mainMenu").style.display = "flex";
}

function addCategory() {
    let checkCat = (document.getElementById("addNewCategory").value).toLowerCase();
    if (cat.includes(checkCat)) {
        alert(checkCat + " is already exist try another category name")
        return;
    } else {
        cat.push((document.getElementById("addNewCategory").value).toLowerCase());
        document.getElementById("addCategory").style.display = "none";
        document.getElementById("addNewCategory").value = "";
        document.getElementById("mainMenu").style.display = "flex";
    }
}

function checkBudget(eid) {
    let checkValue = document.getElementById(eid).value;
    if (checkValue > balance) {
        alert("You have " + balance + " available budget to make expense");
        document.getElementById(eid).value = '';
        document.getElementById(eid).focus();
    }
}