import { createServiceContext } from '../serviceContext';
import { userService } from '../../api/userService';

const { ServiceProvider: UserServiceProvider, useServiceContext: useUserServiceContext } = createServiceContext(userService);

export { UserServiceProvider, useUserServiceContext };
