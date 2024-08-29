import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TransparentBox, Button, Input, Icon } from '../../atoms/Index';
import { useEnhancedProductService } from '../../../context/Product/ProductServiceProvider';
import { useAuthContext } from '../../../context/Auth/AuthServiceProvider';
import usePriceCalculation from '../../../hooks/usePriceCalculation/usePriceCalculation';

const ProductForm = () => {
  const { handleSaveProduct, loading: saving, error: saveError } = useEnhancedProductService();
  const { user } = useAuthContext();
  const { finalPrice, calculatePrice, loading: priceLoading, error: priceError } = usePriceCalculation();
  const [description, setDescription] = useState('');
  const [manufacturerCode, setManufacturerCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [markupPercentage, setMarkupPercentage] = useState('');
  const [isPriceModalOpen, setPriceModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Usuário logado:', user);
  }, [user]);

  useEffect(() => {
    calculatePrice(costPrice, markupPercentage);
  }, [costPrice, markupPercentage, calculatePrice]);

  useEffect(() => {
    if (finalPrice !== null) {
      setPrice(finalPrice);
    }
  }, [finalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const productToCreate = {
      description,
      manufacturerCode,
      barcode,
      brand,
      categoryId,
      price: parseFloat(price),
      createdBy: user?.userId,
      updatedBy: user?.userId,
    };
  
    const priceFormationToCreate = {
      costPrice: parseFloat(costPrice),
      finalPrice: parseFloat(finalPrice),
      markupPercentage: parseFloat(markupPercentage),
      // Outros campos necessários
    };
  
    try {
      await handleSaveProduct(productToCreate, priceFormationToCreate);
      navigate('/registroproduto');
    } catch (err) {
      console.error('Erro ao criar o produto:', err);
    }
  };
  

  const togglePriceModal = () => {
    if (isPriceModalOpen) {
      setPrice(finalPrice);
    }
    setPriceModalOpen(!isPriceModalOpen);
  };

  return (
    <TransparentBox
      position="absolute"
      right="auto"
      left="50%"
      top="5%"
      bottom="5%"
      height="auto"
      width="30%"
      padding="1.5%"
      maxWidth="600px"
    >
      <Typography variant="h8" align="center" sx={{ mb: 2, color: '#6E7781' }}>
        CADASTRO DE PRODUTO
      </Typography>

      <Box component="form" overflow="auto" padding="1%" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              label="Nome do Produto"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              icon={() => <Icon name="Description" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Código do Produto"
              type="text"
              value={manufacturerCode}
              onChange={(e) => setManufacturerCode(e.target.value)}
              icon={() => <Icon name="Code" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Código de Barras"
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              icon={() => <Icon name="Barcode" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Marca"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              icon={() => <Icon name="LocalOffer" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Categoria ID"
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(parseInt(e.target.value, 10))}
              icon={() => <Icon name="Category" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Preço"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              icon={() => <Icon name="AttachMoney" />}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button type="button" variant="outlined" sx={{ width: '50%', py: 1 }} onClick={togglePriceModal}>
              <Typography variant="button">Formação de Preço</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ width: '50%', py: 1 }}>
              <Typography variant="button">Cadastrar</Typography>
            </Button>
          </Grid>
          {(saving || priceLoading) && (
            <Typography variant="body2" align="center" color="text.secondary">
              Carregando...
            </Typography>
          )}
          {(saveError || priceError) && (
            <Typography variant="body2" align="center" color="error">
              {saveError?.message || priceError?.message || 'Ocorreu um erro ao processar sua solicitação.'}
            </Typography>
          )}
        </Grid>
      </Box>

      <Modal open={isPriceModalOpen} onClose={togglePriceModal}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Formação de Preço
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                label="Custo"
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                icon={() => <Icon name="PriceCheck" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Margem (%)"
                type="number"
                value={markupPercentage}
                onChange={(e) => setMarkupPercentage(e.target.value)}
                icon={() => <Icon name="Percent" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Preço Final"
                type="number"
                value={finalPrice}
                icon={() => <Icon name="AttachMoney" />}
                disabled
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant="contained" onClick={togglePriceModal}>
                Fechar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </TransparentBox>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default ProductForm;
