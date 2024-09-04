import React, { useState, useEffect } from 'react';
import { Grid, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Input, Icon } from '../../atoms/Index';
import { useSaleServiceContext } from '../../../context/Sale/SaleServiceProvider';
import useCustomer from '../../../hooks/useCustomer/useCustomer';

const ClientSection = ({ onClientSelect }) => {
  const { updateSale } = useSaleServiceContext();
  const { customers, fetchCustomersByName, addCustomerToSale } = useCustomer();
  const [name, setName] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // Debounce para aguardar enquanto o usuário digita
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (name) {
        fetchCustomersByName(name); // Chama a busca de clientes por nome
      }
    }, 500); // Aguarda 500ms antes de realizar a busca

    return () => clearTimeout(delayDebounceFn); // Limpa o timeout ao desmontar ou quando o nome muda
  }, [name, fetchCustomersByName]);

  const handleCustomerSelect = async (customerId) => {
    setSelectedCustomerId(customerId);
    await addCustomerToSale(customerId, { updateSale });
    onClientSelect(customerId); // Atualiza o customerId na SalesPage
  };

  return (
    <div>
      <Typography variant="h5" color="textPrimary">
        Cliente
      </Typography>
      <Divider sx={{ borderColor: 'primary.main', marginBottom: 2, width: '121%' }} />
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} sm={6} md={4}>
          <Input
            label="Busca Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={() => <Icon name="Search" size="2rem" color="primary.main" />}
          />
        </Grid>

        {/* Exibir a lista dos 3 primeiros clientes encontrados */}
        <Grid item xs={12} sm={6} md={4}>

          <List>
            {customers.slice(0, 3).map((customer) => (
              <ListItem
                key={customer.customerId}
                button
                selected={customer.customerId === selectedCustomerId}
                onClick={() => handleCustomerSelect(customer.customerId)}
              >
                <ListItemText
                  primary={customer.nameOrCompanyName}
                  secondary={customer.cpfOrCnpj}
                />
              </ListItem>
            ))}
          </List>
          {customers.length > 3 && (
            <Typography variant="body2" color="textSecondary">
              Exibindo os 3 primeiros de {customers.length} resultados.
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ClientSection;
