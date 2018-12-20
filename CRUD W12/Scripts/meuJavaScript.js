$(document).ready(function () {

    $("#formNome").keyup(function () {
        enableButtons();
    })
    $("#formTelefone").keyup(function () {
        enableButtons();
    })

    function enableButtons() {
        if ($("#formNome").val() != "" || $("#formTelefone").val() != "" || $("#formId").val() != "") {
            $('#btnClear').removeClass("disabled");
        }
        else {
            $('#btnClear').addClass("disabled");
        }
    }

    $('#btnSearchContato').click(function () {
        searchContato();
        $('#btnSearchContato').text("Atualizar Tabela");
    })

    $('#btnClear').click(function () {
        clearInputs();
    })

    $('#btnAddContato').click(function () {
        let nome = $("#formNome").val();
        let telefone = $("#formTelefone").val();
        let regex = /^\([0-9]{2}\)[0-9]{4}\-[0-9]{4}|\([0-9]{2}\)[0-9]{4}\-[0-9]{5}$/g;
        if (nome != "" && telefone != "" && regex.test(telefone)) {
            addContato(nome, telefone);
            clearInputs();
            hideRequired();
        }
        else {
            showRequired();
        }
    })

    $('#btnUpdateContato').click(function () {
        let id = $("#formId").val();
        let nome = $("#formNome").val();
        let telefone = $("#formTelefone").val();
        let regex = /^\([0-9]{2}\)[0-9]{4}\-[0-9]{4}|\([0-9]{2}\)[0-9]{4}\-[0-9]{5}$/g;
        if (nome != "" && telefone != "" && regex.test(telefone)) {
            if (confirm("Deseja alterar este cadastro?")) {
                updateContato(id, nome, telefone);
                clearInputs();
                hideRequired();
            }
        }
        else {
            showRequired();
        }
    })

    $('#btnDeleteContato').click(function () {
        if (confirm("Deseja deletar este cadastro?")) {
            let id = $("#formId").val();
            let nome = $("#formNome").val();
            let telefone = $("#formTelefone").val();
        
            deleteContato(id, nome, telefone);
            clearInputs();
        }
    })

    $('#tbData').delegate('tr.info', "click", function () {
        let info = $(event.target).parent();
        let id = info.children('.Id').text();
        let nome = info.children('.Nome').text();
        let telefone = info.children('.Telefone').text();
        
        $("#formId").val(id);
        $("#formNome").val(nome);
        $("#formTelefone").val(telefone);

        $('#btnUpdateContato, #btnDeleteContato').removeClass("disabled");
        enableButtons();
    })

    function clearInputs() {
        $("#formId, #formNome, #formTelefone").val("");
        $('#btnUpdateContato, #btnDeleteContato, #btnClear').addClass("disabled");
        hideRequired();
    }
    function showRequired() {
        let nome = $("#formNome").val();
        let telefone = $("#formTelefone").val();
        let regex = /^\([0-9]{2}\)[0-9]{4}\-[0-9]{4}|\([0-9]{2}\)[0-9]{4}\-[0-9]{5}$/g;

        $("#pLegenda").css('visibility', 'visible');
        $("#pNome, #pTelefone").css('visibility', 'hidden');

        if (telefone == "" || !regex.test(telefone)) {
            $("#pTelefone").css('visibility', 'visible');
            $("#formTelefone").focus();
        }
        if (nome == ""){
            $("#pNome").css('visibility', 'visible');
            $("#formNome").focus();
        }
    }
    function hideRequired() {
        $("#pNome, #pTelefone, #pLegenda").css('visibility', 'hidden');
    }

    function searchContato() {
        let url = "/Home/SearchContato";
        $.ajax({
            url: url, success: function (result) {
                let json = JSON.parse(result);
                console.table(json);

                // excluir os trs da table
                $('#tbData').children().remove();

                //o codigo abaixo cria trs com ths ou tds, se adequando caso o objeto Json cresca tanto em linhas quanto em colunas

                let keys = Object.getOwnPropertyNames(json[0]); //nome das propriedades do Json
                let tds = [];
                let ths = [];
                let trs = [];

                //criando ths
                let tr = document.createElement("tr");
                for (let k = 0; k < keys.length; k++) {
                    //criando ths para cada coluna com o nome
                    ths[k] = document.createElement("th");
                    $(ths[k]).text(keys[k]);
                    tr.append(ths[k]);
                }
                // colocando tr na table
                $('#tbData').append(tr);

                //criando trs para cada index do json
                for (let i = 0; i < json.length; i++) {
                    trs[i] = document.createElement("tr");
                    $(trs[i]).addClass('info');
                    //criando tds para cada colunas
                    for (let k = 0; k < keys.length; k++) {
                        //criando tds e colocando valores nelas
                        tds[k] = document.createElement("td");
                        $(tds[k]).text(json[i][keys[k].toString()]);
                        $(tds[k]).addClass(keys[k]);
                        trs[i].append(tds[k]);
                    }
                    // colocando tr na table
                    $('#tbData').append(trs[i]);
                }
            }
        })
    }

    function addContato(nome, telefone) {
        let url = "/Home/AddContato";
        let json = new Object();
        json.Nome = nome;
        json.Telefone = telefone;

        json = JSON.stringify({ Nome: json.Nome, Telefone: json.Telefone }, null, "\t");
        console.log(json);

        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: json,
            success: function (result) {
                console.log("success");
                searchContato();
            },
            failure: function (result) {
                console.log("fail");
            },
            error: function (result) {
                console.log("error");
            }
        })
    }

    function updateContato(id, nome, telefone) {
        let url = "/Home/UpdateContato";
        let json = new Object();
        json.Id = id;
        json.Nome = nome;
        json.Telefone = telefone;

        json = JSON.stringify({ Id: json.Id, Nome: json.Nome, Telefone: json.Telefone }, null, "\t");
        console.log(json);

        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: json,
            success: function (result) {
                console.log("success");
                searchContato();
            },
            failure: function (result) {
                console.log("fail");
            },
            error: function (result) {
                console.log("error");
            }
        })
    }

    function deleteContato(id, nome, telefone) {
        let url = "/Home/DeleteContato";
        let json = new Object();
        json.Id = id;
        json.Nome = nome;
        json.Telefone  = telefone;

        json = JSON.stringify({ Id: json.Id, Nome: json.Nome, Telefone: json.Telefone }, null, "\t");
        console.log(json);

        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: json,
            success: function (result) {
                console.log("success");
                searchContato();
            },
            failure: function (result) {
                console.log("fail");
            },
            error: function (result) {
                console.log("error");
            }
        })
    }
})