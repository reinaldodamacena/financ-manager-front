import { useState, useCallback } from 'react';

const useService = (service) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (fetchFunction = service.fetchData, params = null) => {
    if (typeof fetchFunction !== 'function') {
      console.error("fetchFunction is not a function. Please provide a valid function.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await (params ? fetchFunction(params) : fetchFunction());
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const createData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await service.create(data);
      await fetchData(); // Refresh after create
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await service.update(data);
      await fetchData(); // Refresh after update
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await service.delete(id); // Assegure-se de que o serviço tenha essa função ou ajuste conforme necessário
      await fetchData(); // Refresh after delete
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    create: createData,
    update: updateData,
    delete: deleteData,
  };
};

export default useService;
