var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];
var $container;
var $nameEditor;
var $scoreEditor;
var $dateEditor;
var $editPanel;
var $editorSubmit;

$(document).ready(function(){
    $container = $('.js-assignments');
    $editPanel = $('.js-editPanel');
    $nameEditor = $('#name');
    $scoreEditor = $('#score');
    $dateEditor = $('#date_completed');
    $editorSubmit = $('#submit');

    getData();
    assignClicks();

    $('.reset').on('click', function(){
       resetSearch();
        getData();
    });

    $('.searchName').on('click', function(){
        var searchTerm = $('#searchName').val();
        var dateOne = $('#startDate').val();
        var dateTwo = $('#endDate').val();
        if (dateOne=='' && dateTwo=='') {
            dateOne = '0001-01-01';
            dateTwo = '9999-12-31';
            $.ajax({
                url:'/assignments/search?order=1&q=' + searchTerm + '&startDate=' + dateOne + '&endDate=' + dateTwo,
                data:{},
                method: 'get',
                dataType: 'json',
                success: function(data){
                    clearData();
                    processData(data);
                },
                complete: function(){
                    console.log('No date ajax call complete');
                }
            });

        }else{
            $.ajax({
                url: '/assignments/search?order=1&q=' + searchTerm + '&startDate=' + dateOne + '&endDate=' + dateTwo,
                data:{},
                method: 'get',
                dataType: 'json',
                success: function(data){
                    console.log("works");
                    clearData();
                    processData(data);
                },
                complete: function(){
                    console.log("done");
                }
            });
        }
    });

    $('.searchDate').on('click', function(){
        var searchTerm = $('#searchName').val();
        var dateOne = $('#startDate').val();
        var dateTwo = $('#endDate').val();
        if (dateOne=='' && dateTwo=='') {
            dateOne = '0001-01-01';
            dateTwo = '9999-12-31';
            $.ajax({
                url:'/assignments/search?order=1&q=' + searchTerm + '&startDate=' + dateOne + '&endDate=' + dateTwo,
                data:{},
                method: 'get',
                dataType: 'json',
                success: function(data){
                    clearData();
                    processData(data);
                },
                complete: function(){
                    console.log('No date ajax call complete');
                }
            });

        }else{
            $.ajax({
                url: '/assignments/search?order=1&q=' + searchTerm + '&startDate=' + dateOne + '&endDate=' + dateTwo,
                data:{},
                method: 'get',
                dataType: 'json',
                success: function(data){
                    console.log("works");
                    clearData();
                    processData(data);
                },
                complete: function(){
                    console.log("done");
                }
            });
        }
    });

    $('.ascend').on('click', function(){
        var searchTerm = $('#searchName').val();
        var dateOne = $('#startDate').val();
        var dateTwo = $('#endDate').val();
        console.log(dateOne);
        console.log(dateTwo);
        if (dateOne=='' && dateTwo=='') {
            dateOne = '0001-01-01';
            dateTwo = '9999-12-31';
            $.ajax({
                url:'/assignments/search?order=1&q=' + searchTerm + '&startDate=' + dateOne + '&endDate=' + dateTwo,
                data:{},
                method: 'get',
                dataType: 'json',
                success: function(data){
                    clearData();
                    processData(data);
                },
                complete: function(){
                    console.log('No date ajax call complete');
                }
            });

        }else{
            $.ajax({
                url: '/assignments/search?order=1&q=' + searchTerm + '&startDate=' + dateOne + '&endDate=' + dateTwo,
                data:{},
                method: 'get',
                dataType: 'json',
                success: function(data){
                    console.log("works");
                    clearData();
                    processData(data);
                },
                complete: function(){
                    console.log("done");
                }
            });
        }
    });

    $('.descend').on('click', function(){
        var searchTerm = $('#searchName').val();
        var dateOne = $('#startDate').val();
        var dateTwo = $('#endDate').val();
        if (dateOne=='' && dateTwo=='') {
            dateOne = '0001-01-01';
            dateTwo = '9999-12-31';
            $.ajax({
                url:'/assignments/search?order=-1&q=' + searchTerm + '&startDate=' + dateOne + '&endDate=' + dateTwo,
                data:{},
                method: 'get',
                dataType: 'json',
                success: function(data){
                    clearData();
                    processData(data);
                },
                complete: function(){
                    console.log('No date ajax call complete');
                }
            });

        }else{
            $.ajax({
                url: '/assignments/search?order=-1&q=' + searchTerm + '&startDate=' + dateOne + '&endDate=' + dateTwo,
                data:{},
                method: 'get',
                dataType: 'json',
                success: function(data){
                    console.log("works");
                    clearData();
                    processData(data);
                },
                complete: function(){
                    console.log("done");
                }
            });
        }
    });
});

function resetSearch (){
    $('#searchName').val('');
    $('#startDate').val('');
    $('#endDate').val('');
}

function getData(){
    $.ajax({
        url: '/assignments',
        data: {},
        method: 'get',
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            clearData();
            processData(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus,errorThrown);
        },
        complete: function(jqXHR, textStatus){
            console.log("getData() Ajax Get Complete:", textStatus);
        }
    });
}


function deleteData(id){
    $.ajax({
        url: '/assignments/' + id,
        data: {},
        method: 'delete',
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            //hide and remove
            $('#' + id).slideUp(function() {
                $(this).remove();
            });
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus,errorThrown);
        },
        complete: function(jqXHR, textStatus){
            console.log("deleteData() Ajax Get Complete:", textStatus);
        }
    });
}

function updateData(data){
    $.ajax({
        url: '/assignments/' + data.id,
        data: data,
        method: 'put',
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            // clear form
            clearEditor();
            // get new data and update
            getData();
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus,errorThrown);
        },
        complete: function(jqXHR, textStatus){
            console.log("updateData() Ajax Get Complete:", textStatus);
        }
    });
}



function clearData(){
    $container.empty();
}

function processData(assignments){

    for(var i = 0; i< assignments.length; i++){
        var assignment = assignments[i];

        var id = assignment._id;
        var name = assignment.name || '';

        var year = assignment.date_completed.substring(0,4);
        var monthIndex = assignment.date_completed.substring(5,7);
        var day = assignment.date_completed.substring(8,10);

        var month = monthNames[parseInt(monthIndex) -1];

        var score = assignment.score || 0;

        // needs to stay in format yyyy-MM-dd for date pickers
        var datePicker = assignment.date_completed.substring(0,10);

        buildAndAppendData(id, name, score, datePicker, day, month, year);
    }
}

function buildAndAppendData(id, name, score, datePicker, day, month, year){
    var section = $('<section/>')
        .attr('id', id)
        .attr('data-name', name)
        .attr('data-score', score)
        .attr('data-date', datePicker);

    var ul = $('<ul/>')
        .appendTo(section);

    var liName = $('<li/>')
        .text('Name: ' + name)
        .addClass('js-name')
        .appendTo(ul);


    var liScore = $('<li/>')
        .text('Score: ' + score)
        .addClass('js-score')
        .appendTo(ul);


    var liDate = $('<li/>')
        .text('Date Completed: '+ month + ' ' + day + ', ' + year)
        .addClass('js-date')
        .appendTo(ul);


    var liDelete = $('<li/>')
        .appendTo(ul);

    var btnDelete = $('<button/>')
        .text('delete')
        .attr('data-id', id)
        .addClass('js-delete')
        .appendTo(liDelete);

    var liEdit = $('<li/>')
        .appendTo(ul);

    var btnEdit = $('<button/>')
        .text('edit')
        .addClass('js-edit')
        .attr('data-id', id)
        .appendTo(liEdit);

    $container.append(section);
}

function assignClicks(){
    $container.on('click', '.js-delete', function(){
        var id = $(this).data('id');
        deleteData(id);
    });

    $container.on('click', '.js-edit', function(){
        var id = $(this).data('id');
        var section = $('#' + id);
        var name = section.data('name');
        var score = section.data('score');
        var date = section.data('date');
        showEditor(id, name, score, date);
    });

    $editorSubmit.on('click', function() {
        // build an object and send it using ajax

        var data = {
            id: $(this).data('id'),
            name: $nameEditor.val(),
            score: $scoreEditor.val(),
            date_completed: $dateEditor.val()
        };

        updateData(data);
    });
}

function showEditor(id,name, score, date){
    $editorSubmit.attr('data-id', id);
    $nameEditor.val(name);
    $scoreEditor.val(score);
    $dateEditor.val(date);
    $editPanel.slideDown().delay().addClass('change');
    // send focus to editor
    $nameEditor.focus();
}

function clearEditor(){
    $editorSubmit.attr('data-id', '');
    $nameEditor.val('');
    $scoreEditor.val('');
    $dateEditor.val('');
    $editPanel.slideUp().delay().removeClass('change');
}

