import { addUser } from './addUser';
import { deleteUser } from './deleteUser';
import { fetchUser } from './fetchUser';
import { fetchUsers } from './fetchUsers';
import { registerUser } from './registerUser';
import { forgetPassword } from './forgetPassword';

const userActions = { addUser, deleteUser, fetchUser, fetchUsers, registerUser, forgetPassword };
export default userActions;