import React, { useState, useCallback, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Container, Grid, Link, Typography } from '@material-ui/core';
import { InvoiceAddForm } from '../../components/dashboard/invoice';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import axios from 'axios';

const InvoiceAdd = () => {
  const isMountedRef = useIsMountedRef();
  const { settings } = useSettings();
  // const [customer, setCustomer] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  // const getCustomer = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/customers/1');

  //     if (isMountedRef.current) {
  //       setCustomer(response.data.customer);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [isMountedRef]);

  // useEffect(() => {
  //   getCustomer();
  // }, [getCustomer]);

  // if (!customer) {
  //   return null;
  // }

  return (
    <>
      <Helmet>
        <title>Dashboard: Invoice Add</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Invoice Add
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Management
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Invoices
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Box mt={3}>
            <InvoiceAddForm />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default InvoiceAdd;
