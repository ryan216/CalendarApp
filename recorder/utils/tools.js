// export function getImgSrc(richtext,num=3){
//   let imgList = [];
//   richtext.replace(/<img[^>]*src=['"]([^'"]+)[^>]*>/g,(match,capture)=>{
//     imgList.push(capture);
//   });
//   imgList=imgList.slice(0,num)
//   return imgList;
// }


// // 地图模块
// export function getProvince(){
//   return new Promise((resolve,reject)=>{
//     let historyProvince=uni.getStorageSync("historyProvince");
//     if(historyProvince){
//       resolve(historyProvince.province)
//     }else{
//      uni.request({
//          url:"https://restapi.amap.com/v3/ip?key=78afcb7a69f9952a7c305e5655386f3b",
//          success:res=>{
//            console.log("这是网络请求")
//            let str=""
//            // if(typeof(res.data.province) == "string         "){
//            // str=res.data.province 
//            // }else{
//            //   str="火星"
//            // }
//            typeof(res.data.province) == "string"? str=res.data.province :str="火星"
//            resolve(str)
//            let obj={
//              province: str,
//              time:Date.now()
//            }
//            uni.setStorageSync("historyProvince",obj);

//          },
//          fail:err=>{
//            reject(err)
//          }
//        }) 
//     }

//   })
// }


// // 获取昵称
// export function giveName(item){


//  return item.user_id[0].nickname || item.user_id[0].username || item.user_id[0].mobile

//  // 
//  // userInfo.nickname||userInfo.username||userInfo.mobile

// }
// // 获取默认头像
// export function giveAvatar(item){

//   return item.user_id[0]?.avatar_file?.url ?? '../../static/1.jpg'
// }


//   const db=uniCloud.database();
//   const utilsObj=uniCloud.importObject("utilsObj",{
//   customUI:true
//   });
//   // 点赞操纵数据库的方法
//   export async function  likeFun(artid){
//         let count=await db.collection("dianzan")
//         .where(`article_id=="${artid}"&& user_id==$cloudEnv_uid`).count()
//         if(count.result.total){
//           db.collection("dianzan").where(`article_id=="${artid}"&& user_id==$cloudEnv_uid`).remove();
//           utilsObj.operation("xiaowang","like_count",artid,-1)
//         }else{
//           db.collection("dianzan").add({
//             article_id:artid
//           }) 
//           utilsObj.operation("xiaowang","like_count",artid,1)
//         }
//       }