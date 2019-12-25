export default {
    formateDate(time) {//时间格式化
        if (!time) {
            return '';
        }
        let date = new Date(time);
        return date.getFullYear() + '-'
            + (date.getMonth() + 1) + '-'
            + date.getDate() + '  '
            + date.getHours() + ':'
            + date.getMinutes() + ':'
            + date.getSeconds();
    },
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current);
            },
            current:data.current,//当前页数
            pageSize:data.size,//每页显示
            total: data.total,//总条数
            showTotal:()=>{
                return `共${data.total}条`
            },
            showQuickJumper:true,//快速跳转
        };
    }
}