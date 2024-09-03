import { createServiceContext } from '../serviceContext';
import { productService } from '../../api/productService';

const { ServiceProvider: ProductServiceProvider, useServiceContext: useProductServiceContext } = createServiceContext(productService);

const useEnhancedProductService = () => {
  const { fetchAll, ...restServiceMethods } = useProductServiceContext();

  const fetchByDescription = async (description) => {
    try {
      const response = await productService.fetchByDescription(description);
      return response.data; // Supondo que o resultado está dentro de "data"
    } catch (error) {
      console.error('Erro ao buscar produtos por descrição:', error);
      return [];
    }
  };

  const fetchByCode = async (barcode) => {
    try {
      const response = await productService.fetchByCode({ barcode });
      return response.data; // Supondo que o resultado está dentro de "data"
    } catch (error) {
      console.error('Erro ao buscar produtos por código:', error);
      return [];
    }
  };

  return {
    fetchAll,
    fetchByDescription,
    fetchByCode,
    ...restServiceMethods,
  };
};

export { ProductServiceProvider, useEnhancedProductService };
