$(document).ready(function(){
    $('.datepicker').datepicker({
        autoclose: true
    });

    $(document).on('click','.view-animal',function(e){
        e.preventDefault();
        var animal_id=$(this).attr('data-animal-id');
        $.ajax({
            url:"/animal/view",
            type:'POST',
            dataType:'JSON',
            data:{animal_id:animal_id},
            success:function(response){
                if(response.status==1){
                    $modal=$('#animal_detail');  
                    $modal.find('.animal-name').text(response.data[0].name);
                    $modal.find('.animal-age').text(response.data[0].age);
                    $modal.find('.animal-poids').text(response.data[0].poids);
                    $modal.find('.animal-regne').text(response.data[0].regne);
                    $modal.find('.animal-proprietaire').text(response.data[0].proprietaire);
                    $modal.modal('show');
                }else{
                    alert(response.message);
                }
            }
        });
    });
    $(document).on('hide.bs.modal','#animal_detail',function(){
        $modal=$('#animal_detail');  
        $modal.find('.animal-name').text('');
        $modal.find('.animal-age').text('');
        $modal.find('.animal-poids').text('');
        $modal.find('.animal-regne').text('');
        $modal.find('.animal-proprietaire').text('');
    });
});