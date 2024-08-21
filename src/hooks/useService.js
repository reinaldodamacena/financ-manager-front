import { useState, useCallback } from 'react';

const useService = (service) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (fetchFunction = service.fetchAll, params = null) => {
    setLoading(true);
    setError(null);
    try {
      const result = await (params ? fetchFunction(params) : fetchFunction());
      setData(result.data);
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
      await service.delete(id);
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
    createData,
    updateData,
    deleteData,
  };
};

export default useService;
