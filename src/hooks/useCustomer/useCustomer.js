import { useState, useCallback } from 'react';
import { customerService } from '../../api/customerService';

const useCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomersByName = useCallback(async (nameOrCompanyName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await customerService.fetchByName(nameOrCompanyName);
      setCustomers(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCustomerToSale = useCallback(async (customerId, saleService) => {
    try {
      await saleService.updateSale({ customerId });
    } catch (err) {
      setError(err);
    }
  }, []);

  return {
    customers,
    loading,
    error,
    fetchCustomersByName,
    addCustomerToSale,
  };
};

export default useCustomer;
