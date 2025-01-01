import config from '.';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  id: '0001',
  email: 'mrshakilhossainofficial@gmail.com',
  password: config.super_admin_password,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
  needsPasswordChange: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
