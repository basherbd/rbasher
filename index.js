<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

        <title>skks</title>
        <link rel="icon" type="image/x-icon" href="globe.png">
    </head>
    <body>
        
        <div class="container">
            <h1 class="text-center mb-5 mt-5 text-danger"><b>skks-rashid</b></h1>
            <div class="card mb-5">
                <div class="card-header">
                    <div class="row">
                        <div class="col col-6">Data</div>
                        <div class="col col-6">
                            <button type="button" class="btn btn-primary btn-sm float-end" onclick="makeModal('Add User', 'Add', 'insertData')">Add</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <!--<table class="table table-bordered table-striped">-->
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Saving</th>
                                    <th>Profit</th>
                                    <th>Withdraw</th>
                                    <th>Total</th>
                                    <th>Loan</th>
                                    <th>Installment</th>
                                    <th>Installment Number</th>
                                    <th>Installment Due</th>
                                    <th>Receiver</th>
                                    <th>DateOfReceive</th>
                                    <th>Remark</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="dataArea"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<div id="modalArea"></div>

<script>

var userModalElement;

function makeModal(title, button_value, callback)
{
    let html = `
    <div class="modal" tabindex="-1" id="userModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="userform">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label>Month</label>
                            <input type="text" name="month" id="month" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Saving</label>
                            <input type="number" name="saving" id="saving" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Profit</label>
                            <input type="number" name="profit" id="profit" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Withdraw</label>
                            <input type="number" name="withdraw" id="withdraw" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Total</label>
                            <input type="number" name="total" id="total" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Loan</label>
                            <input type="number" name="loan" id="loan" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Installment</label>
                            <input type="number" name="installment" id="installment" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Installment Number</label>
                            <input type="number" name="installment_number" id="installment_number" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Installment Due</label>
                            <input type="number" name="installment_due" id="installment_due" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Receiver</label>
                            <input type="text" name="receiver" id="receiver" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Date</label>
                            <input type="text" name="date" id="date" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label>Remark</label>
                            <input type="text" name="remark" id="remark" class="form-control" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input type="hidden" name="user_id" id="user_id" />
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="${callback}()">${button_value}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;

    document.querySelector('#modalArea').innerHTML = html;

    userModalElement = new bootstrap.Modal(document.getElementById('userModal'));

    userModalElement.show();
}

function insertData()
{
    let formElement = document.getElementById('userform');
    const formData = new FormData(formElement);
    // Convert formData to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    // Make a POST request using Fetch API
    fetch('/users', {
        method : 'POST',
        body : JSON.stringify(jsonData),
        headers : {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        userModalElement.hide();
        getData();
    });
}

getData();

function getData(){
    fetch('/users')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let html = '';
        if(data.length > 0){
            data.map((row) => {
                html += `
                <tr>
                    <td>${row.month}</td>
                    <td>${row.saving}</td>
                    <td>${row.profit}</td>
                    <td>${row.withdraw}</td>
                    <td>${row.total}</td>
                    <td>${row.loan}</td>
                    <td>${row.installment}</td>
                    <td>${row.installment_number}</td>
                    <td>${row.installment_due}</td>
                    <td>${row.receiver}</td>
                    <td>${row.date}</td>
                    <td>${row.remark}</td>
                    <td>
                        <button type="button" class="btn btn-warning btn-sm" onclick="fetchSingleData('${row._id}')">Update</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteData('${row._id}')">Delete</button>
                    </td>
                </tr>
                `;
            });
        } else {
            html = '<tr><td colspan="4" class="text-center">No Data Found</td></tr>';
        }
        document.getElementById('dataArea').innerHTML = html;
    });
}

function fetchSingleData(id){
    fetch(`/users/${id}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        makeModal('Update User', 'Update', 'editData');
        document.getElementById('month').value = data.month;
        document.getElementById('saving').value = data.saving;
        document.getElementById('profit').value = data.profit;
        document.getElementById('withdraw').value = data.withdraw;
        document.getElementById('total').value = data.total;
        document.getElementById('loan').value = data.loan;
        document.getElementById('installment').value = data.installment;
        document.getElementById('installment_number').value = data.installment_number;
        document.getElementById('installment_due').value = data.installment_due;
        document.getElementById('receiver').value = data.receiver;
        document.getElementById('date').value = data.date;
        document.getElementById('remark').value = data.remark;
        document.getElementById('user_id').value = data._id;
    });
}

function editData(){
    let formElement = document.getElementById('userform');
    const formData = new FormData(formElement);
    let jsonData = {};
    formData.forEach((value, key) => { 
        jsonData[key] = value;
    });
    const userId = document.getElementById('user_id').value;
    fetch(`/users/${userId}`, {
        method : 'PUT',
        body : JSON.stringify(jsonData),
        headers : {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        userModalElement.hide();
        getData();
    });
}

function deleteData(id){
    if(confirm("Are you sure you want to delete this?")){
        fetch(`/users/${id}`, {
            method : 'DELETE',
            headers : {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            getData();
        });
    }
}

</script>
