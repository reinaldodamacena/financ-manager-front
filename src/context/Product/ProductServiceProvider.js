import { createServiceContext } from '../serviceContext';
import { productService } from '../../api/productService';
import { priceFormationService } from '../../api/priceFormationService';

const { ServiceProvider: ProductServiceProvider, useServiceContext: useProductServiceContext } = createServiceContext(productService);

const useEnhancedProductService = () => {
  const { create, ...restServiceMethods } = useProductServiceContext();

  const handleSaveProduct = async (product, priceFormation) => {
    try {
      console.log('handleSaveProduct - Iniciando salvamento do produto:', product);

      // Preparar o objeto para envio
      const preparedData = {
        product,
        priceFormation
      };

      console.log('handleSaveProduct - Dados preparados para envio:', preparedData);

      // Enviando o objeto para a API
      const response = await create(preparedData);

      console.log('handleSaveProduct - Resposta da API:', response);

      // Verificar se a resposta contém os dados esperados
      if (!response || !response.data) {
        throw new Error('A resposta do servidor não contém os dados esperados.');
      }



    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
      throw error; // Re-throw para que possa ser tratado no nível superior, se necessário
    }
  };

  return {
    handleSaveProduct,
    ...restServiceMethods,
  };
};

export { ProductServiceProvider, useEnhancedProductService };
