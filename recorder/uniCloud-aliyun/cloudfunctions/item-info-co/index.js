'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const itemModel = db.collection('item')
	const {data} = await itemModel.where({dateAt: event.date, _id: event.id}).get()
	//返回数据给客户端
	return data[0]
};
