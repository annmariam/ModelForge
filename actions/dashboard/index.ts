import { fetchModelCount } from "./fetchModelCount";
import { fetchOrderCount } from "./fetchOrderCount";
import { fetchProductCount } from "./fetchProductCount";
import { fetchModelCountUser } from "./fetchModelCountUser";
import { fetchOrderCountUser } from "./fetchOrderCountUser";
import { fetchUserCount } from "./fetchUserCount";

const dashboardActions = { fetchModelCount, fetchModelCountUser, fetchOrderCount, fetchOrderCountUser, fetchProductCount, fetchUserCount };
export default dashboardActions;