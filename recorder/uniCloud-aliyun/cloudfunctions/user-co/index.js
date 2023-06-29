'use strict';
const appid = 'wx1a64116b366abdf5'
const secret = 'e96cefcb8319d469325fba6b595c4832'
exports.main = async (event, context) => {
	const wxOpenid = await uniCloud.httpclient.request(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${event.code}&grant_type=authorization_code`, {
    method: 'GET',
    dataType: 'json'
  })
  const db = uniCloud.database()
  const userModel = db.collection('uni-id-users')
  const user = await userModel.where({'wx_openid.mp': wxOpenid.data.openid}).get()
  if (!user.data.length) {
    const ret = await userModel.add({wx_openid: {mp: wxOpenid.data.openid}})
    return ret.id
  }
	//返回数据给客户端
	return user.data[0]._id
};
