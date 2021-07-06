export function filterPrice (arr) {
	arr.map(item => {
		const price = (item.originprice * item.discount / 10).toFixed(2) + ''
		
		price.indexOf('.') !== -1 ? (item.showPrice = price.split('.')[0]) : (item.showPrice = price)
		price.indexOf('.') !== -1 ? item.otherPrice = price.split('.')[1] : item.otherPrice = '00'
	})
	return arr
}