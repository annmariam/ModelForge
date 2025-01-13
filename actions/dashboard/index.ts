// Product Collection
import { fetchProductCount } from "./fetchProductCount";

// Modal Collection
import { fetchModelCount } from "./fetchModelCount";
import { fetchModelCountUser } from "./fetchModelCountUser";

// Order Collection
import { fetchOrderCount } from "./fetchOrderCount";
import { fetchOrderCountUser } from "./fetchOrderCountUser";

// User Collection
import { fetchUserCount } from "./fetchUserCount";

// Print Collection
import { fetchAssignedPrint } from "./fetchAssignedPrint";
import { fetchWorkingPrintUser } from "./fetchWorkingPrintUser";
import { fetchAssignedPrintUser } from "./fetchAssignedPrintUser";
import { fetchCompletedPrintUser } from "./fetchCompletedPrintUser";

// Design Collection
import { fetchAssignedDesign } from "./fetchAssignedDesign";
import { fetchWorkingDesignUser } from "./fetchWorkingDesignUser";
import { fetchAssignedDesignUser } from "./fetchAssignedDesignUser";
import { fetchCompletedDesignUser } from "./fetchCompletedDesignUser";

const dashboardActions = { fetchModelCount, fetchModelCountUser, fetchOrderCount, fetchOrderCountUser, fetchProductCount, fetchUserCount, fetchAssignedPrint, fetchAssignedPrintUser, fetchAssignedDesign, fetchWorkingPrintUser, fetchWorkingDesignUser, fetchCompletedDesignUser, fetchCompletedPrintUser, fetchAssignedDesignUser };
export default dashboardActions;