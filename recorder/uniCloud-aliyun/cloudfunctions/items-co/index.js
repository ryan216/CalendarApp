'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const itemModel = db.collection('item')
  if (event.date) {
    const {data} = await itemModel.where({dateAt: event.date,userId:event.userId}).get()
    return data
  }
  
  if (event.start && event.end) {
    const dbCmd = db.command
    const {data} = await itemModel.where({
      dateAt: dbCmd.gte(event.start).and(dbCmd.lte(event.end))
      // userId:event.userId
    }).get()
    const rtnData = {}
    data.forEach(item => {
      if (!rtnData[item.dateAt]) {
        rtnData[item.dateAt] = []
      }
      rtnData[item.dateAt].push(item)
    })
    return rtnData
  }
  
};
