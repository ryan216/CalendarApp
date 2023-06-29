export default{
    data(){
        return {
           //设置默认的分享参数
           //如果页面不设置share，就触发这个默认的分享
            share:{
                title:'带长计算',
                path:'/pages/index/index',
                imageUrl:'',
                desc:'',
                content:''
            }
            
        }
    },
    
   
  
    onShareAppMessage(res) {
        return {
            title:this.share.title,
            path:this.share.path,
            imageUrl:this.share.imageUrl,
            desc:this.share.desc,
            content:this.share.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    },
    // 分享到朋友圈
    	onShareTimeline() {
    		return {
    			title: '开泰带业',
    			path: '/pages/index/index',
    			// imageUrl: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
    		};
    	},
    
    
    
    
}