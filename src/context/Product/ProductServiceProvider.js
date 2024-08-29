// contexts/Product/ProductContext.js
import { createServiceContext } from '../serviceContext';
import { productService, prepareProductForAPI } from '../../api/productService';
import { priceService } from '../../api/priceFormationService'; // Importe o serviço de formação de preços

const { ServiceProvider: ProductServiceProvider, useServiceContext: useProductServiceContext } = createServiceContext(productService);

const useEnhancedProductService = () => {
  const { create, ...serviceMethods } = useProductServiceContext();

  const handleSaveProduct = async (product, priceFormation) => {
    // Calcular o preço final usando o serviço de formação de preços
    try {
      const { finalPrice } = await priceService.calculateFinalPrice({
        costPrice: priceFormation.costPrice,
        markupPercentage: priceFormation.markupPercentage,
      });

      // Atualizar a formação de preço com o preço final calculado
      priceFormation.finalPrice = finalPrice;

      // Preparar os dados para envio
      const preparedData = prepareProductForAPI(product, priceFormation);

      // Salvar os dados
      await create(preparedData);
    } catch (error) {
      console.error('Erro ao calcular o preço final:', error);
    }
  };

  return {
    handleSaveProduct,
    ...serviceMethods,
  };
};

export { ProductServiceProvider, useEnhancedProductService };
