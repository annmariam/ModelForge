import { addUser } from './addUser';
import { deleteUser } from './deleteUser';
import { fetchUser } from './fetchUser';
import { fetchUsers } from './fetchUsers';
import { registerUser } from './registerUser';
import { forgetPassword } from './forgetPassword';
import { updateUser } from './updateUser';

const userActions = { addUser, deleteUser, fetchUser, fetchUsers, registerUser, forgetPassword, updateUser };
export default userActions;