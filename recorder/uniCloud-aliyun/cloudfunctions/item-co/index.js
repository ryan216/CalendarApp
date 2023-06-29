'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const itemModel = db.collection('item')
  if (event._id) {
    if (event.model == 'remove') {
      const result = itemModel.doc(event._id).remove()
      return result
    } else {
      const {updated} = await itemModel.doc(event._id).update({theme: event.theme, content: event.content, price: event.price})
      return updated
    }
    
  } else {
     const result = await itemModel.add({
       userId: event.userId,
       theme: event.theme,
       content: event.content,
       price: event.price,
       dateAt: event.createAt
     })
     return result ? result.id : ''
  }
  
	
};
