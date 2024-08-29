import { createServiceContext } from '../serviceContext';
import { authService } from '../../api/authService';

const { ServiceProvider: AuthServiceProvider, useServiceContext: useAuthContext } = createServiceContext(authService);

export { AuthServiceProvider, useAuthContext };
