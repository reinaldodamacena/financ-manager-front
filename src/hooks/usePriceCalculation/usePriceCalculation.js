import { useState, useCallback } from 'react';
import { priceService } from '../../api/priceFormationService';

const usePriceCalculation = () => {
  const [finalPrice, setFinalPrice] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculatePrice = useCallback(async (costPrice, markupPercentage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await priceService.calculateFinalPrice({
        costPrice: parseFloat(costPrice),
        markupPercentage: parseFloat(markupPercentage),
      });

      setFinalPrice(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    finalPrice,
    calculatePrice,
    error,
    loading,
  };
};

export default usePriceCalculation;
