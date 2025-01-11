import { createOrder } from "./createOrder";
import { deleteOrder } from "./deleteOrder";
import { fetchOrders } from "./fetchOrders";
import { productOrder } from "./productOrder";

const orderActions = { createOrder, deleteOrder, fetchOrders, productOrder };
export default orderActions;