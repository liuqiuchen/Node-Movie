$(function () {
    $('.del').click(function (e) {
        let returnVal = confirm('你确定要删除吗？');
        if(returnVal) {
            let target = $(e.target);
            let id = target.data('id');
            let tr = $('.item-id-' + id);

            $.ajax({
                type: 'DELETE',
                url: '/admin/list?id=' + id
            })
                .done((results) => {
                    if(results.success === 1) {
                        if(tr) {
                            tr.remove();
                        }
                    }
                });
        }
    });
});











