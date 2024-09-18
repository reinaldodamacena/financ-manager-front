import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Typography, Divider, List, ListItem, ListItemText, Button } from '@mui/material';
import { Input, Icon } from '../../atoms/Index';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';
import useCustomer from '../../../hooks/useCustomer/useCustomer';

const ClientSection = ({ onClientSelect }) => {
  const { updateSale } = useSaleServiceContext();
  const { customers, fetchCustomersByName, addCustomerToSale } = useCustomer();
  const [name, setName] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [page, setPage] = useState(1); // Controle de paginação
  const itemsPerPage = 3; // Itens por página
  const [error, setError] = useState(null);

  // Memoizar a função de busca para evitar re-renderizações desnecessárias
  const debouncedFetchCustomers = useCallback(() => {
    if (name) {
      setLoading(true);
      fetchCustomersByName(name)
        .finally(() => setLoading(false))
        .catch((err) => {
          setError(err);
          setLoading(false); // Garantir que o carregamento seja interrompido em caso de erro
        });
    } else {
      setLoading(false); // Define loading como false se não houver nome para buscar
    }
  }, [name, fetchCustomersByName]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      debouncedFetchCustomers(); // Chama a busca com debounce
    }, 500);

    return () => clearTimeout(delayDebounceFn); // Limpa o timeout se o usuário digitar rapidamente
  }, [debouncedFetchCustomers]);

  const handleCustomerSelect = async (customerId) => {
    setSelectedCustomerId(customerId);
    await addCustomerToSale(customerId, { updateSale });
    onClientSelect(customerId);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <Typography variant="h5" color="textPrimary">
        Cliente
      </Typography>
      <Divider sx={{ borderColor: 'primary.main', marginBottom: 2, width: '100%' }} />
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} sm={6} md={4}>
          <Input
            label="Busca Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do cliente"
            icon={() => <Icon name="Search" size="2rem" color="primary.main" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          {loading ? (
            <Typography variant="body2" color="textSecondary">
              Carregando...
            </Typography>
          ) : customers.length === 0 ? (
            <Typography variant="body2" color="error">
              Nenhum cliente encontrado.
            </Typography>
          ) : (
            <List>
              {customers.slice(0, page * itemsPerPage).map((customer) => (
                <ListItem
                  key={customer.customerId}
                  button
                  selected={customer.customerId === selectedCustomerId}
                  onClick={() => handleCustomerSelect(customer.customerId)}
                  sx={{ backgroundColor: customer.customerId === selectedCustomerId ? 'primary.light' : 'inherit' }}
                  aria-label={`Selecionar cliente ${customer.nameOrCompanyName}`}
                >
                  <ListItemText
                    primary={customer.nameOrCompanyName}
                    secondary={customer.cpfOrCnpj}
                  />
                </ListItem>
              ))}
            </List>
          )}
          {customers.length > itemsPerPage && (
            <Grid container justifyContent="space-between">
              <Button onClick={handlePreviousPage} disabled={page === 1}>
                Anterior
              </Button>
              <Button onClick={handleNextPage} disabled={page * itemsPerPage >= customers.length}>
                Próximo
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ClientSection;
  