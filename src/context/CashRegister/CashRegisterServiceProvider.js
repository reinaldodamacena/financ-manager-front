import { createServiceContext } from '../serviceContext';
import CashRegisterService from '../../api/cashRegisterService';

export const { ServiceProvider: CashRegisterProvider, useServiceContext: useCashRegisterContext } = createServiceContext(CashRegisterService);
