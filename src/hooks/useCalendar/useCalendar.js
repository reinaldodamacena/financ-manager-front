import { useEffect, useState, useCallback } from 'react';
import { isAfter, isSameDay, format } from 'date-fns';

const useCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('startDate updated:', startDate);
    console.log('endDate updated:', endDate);
  }, [startDate, endDate]);

  const handleDateSelect = useCallback((newDate) => {
    console.log('CustomCalendar - Date changed:', newDate);

    if (!startDate) {
      setStartDate(newDate);
      setEndDate(null); // Primeira seleção só define a data de início
      setError(null);
    } else if (!endDate) {
      if (isAfter(newDate, startDate) || isSameDay(newDate, startDate)) {
        setEndDate(newDate); // Se a data for válida, define a data de fim
        setError(null);
      } else {
        setError('A data de fim deve ser maior ou igual à data de início.');
      }
    } else {
      setStartDate(newDate); // Se ambos já estão preenchidos, reinicia a seleção
      setEndDate(null);
    }

    console.log('startDate updated:', startDate);
    console.log('endDate updated:', endDate);
  }, [startDate, endDate]);
  

  const isInRange = useCallback(
    (day) => {
      if (startDate && endDate) {
        return day >= new Date(startDate) && day <= new Date(endDate);
      }
      return false;
    },
    [startDate, endDate]
  );

  const isStart = useCallback(
    (day) => startDate && isSameDay(day, startDate),
    [startDate]
  );

  const isEnd = useCallback(
    (day) => endDate && isSameDay(day, endDate),
    [endDate]
  );

  const formatDate = useCallback((date, dateFormat = 'yyyy-MM-dd') => {
    return format(new Date(date), dateFormat);
  }, []);
  const handleFilter = async () => {
    console.log('SalesFilter - Filtering with startDate:', startDate, 'endDate:', endDate);

    if (!startDate) {
      setError('Por favor, selecione a data de início.');
      return;
    }

    // Se apenas uma data for selecionada, usa a mesma para início e fim
    const finalEndDate = endDate || startDate;

    setLoading(true);
    setError(null);
    try {
      await onFilter(startDate, finalEndDate); // Passa a data de início e fim ao filtro
    } catch (err) {
      console.error('Erro ao filtrar:', err);
      setError('Ocorreu um erro ao filtrar as vendas.');
    } finally {
      setLoading(false);
    }
  };
  return {
    startDate,
    endDate,
    error,
    loading,
    setError,
    setLoading,
    handleDateSelect,
    handleFilter,
    isInRange,
    isStart,
    isEnd,
    formatDate,
  };
};

export default useCalendar;
