$(document).ready(function(){
    const post_id = $('#post-detail').attr('data-post-id');
    getCommentsPosts(post_id);
    $('#CommentFormSubmit').submit(function(e) {
        e.preventDefault();
        const submitButton = $("#save_comment_btn");
        submitButton.html('Saving....<i class="fa fa-spin fa-spinner" aria-hidden="true"></i>');
        const formData = $(this).serialize();

        $.ajax({
            method: "POST",
            url: '/api/comments/' + post_id,
            data: formData,
            success: (result) => {
                submitButton.html('Save');
                $("#comment-errors-data").html('');
                $("#comment-input").val('');
                $("#successMessage").removeClass('visually-hidden');
                getCommentsPosts(post_id);
            },
            error: (error) => {
                if(error.status === 422){
                    var massage = error.responseJSON.errors ? error.responseJSON.errors.comment ?  error.responseJSON.errors.comment[0] : '' : '';
                    $('#errorMassage').text(massage);
                    $("#successMessage").addClass('visually-hidden');
                    submitButton.html('Save');
                }
            }
        })
    })
});

function getCommentsPosts(Post_id){
    $.ajax({
        method: "GET",
        url: '/api/comments/' + Post_id,
        success: (result) => {
            $('#Post_Comments').html(result);
        },
        error: (error) => {
            console.log('Sorry somthing want wrong fetching comments data...');
        }
    })
}

