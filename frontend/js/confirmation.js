const order_id = getIdFromUrl('order_id');
const total = getIdFromUrl('total');

displayHTML('orderId', order_id);
displayHTML('totalPrice', money(total));
displayItemsInCart();