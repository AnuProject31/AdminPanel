import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Header from 'components/Header';

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem'
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: '14px', color: theme.palette.secondary[700] }} gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: '1.5rem', color: theme.palette.secondary[400] }}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeOut="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300]
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
          <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  // Example product data to replace API data
  const products = [
    {
      _id: '1',
      name: 'Smartphone X100',
      description: 'A high-end smartphone with a powerful processor and camera.',
      price: 999.99,
      rating: 4.5,
      category: 'Electronic Gadgets',
      supply: 50,
      stat: { yearlySalesTotal: 2000, yearlyTotalSoldUnits: 500 }
    },
    {
      _id: '2',
      name: 'Elegant Evening Gown',
      description: 'A beautiful gown perfect for formal events.',
      price: 149.99,
      rating: 4.2,
      category: 'Dresses',
      supply: 30,
      stat: { yearlySalesTotal: 300, yearlyTotalSoldUnits: 120 }
    },
    {
      _id: '3',
      name: 'Luxury Lipstick',
      description: 'A premium lipstick available in various shades.',
      price: 29.99,
      rating: 4.8,
      category: 'Cosmetics',
      supply: 200,
      stat: { yearlySalesTotal: 5000, yearlyTotalSoldUnits: 2000 }
    },
    {
      _id: '4',
      name: 'Kids’ Building Blocks',
      description: 'A fun toy set to enhance creativity in kids.',
      price: 39.99,
      rating: 4.7,
      category: 'Toys',
      supply: 100,
      stat: { yearlySalesTotal: 1500, yearlyTotalSoldUnits: 400 }
    },
    {
        _id: '8',
        name: 'Car',
        description: 'Cars Collection',
        price: 10000.11,
        rating: 4.8,
        category: 'Car Collection',
        supply: 200,
        stat: { yearlySalesTotal: 5000, yearlyTotalSoldUnits: 2000 }
      },
      {
        _id: '6',
        name: 'Men Collection',
        description: 'Shirt & Pants',
        price: 29.99,
        rating: 4.8,
        category: 'Shirt & Pants',
        supply: 200,
        stat: { yearlySalesTotal: 5000, yearlyTotalSoldUnits: 2000 }
      },
      {
        _id: '9',
        name: 'Grocery',
        description: 'Grocery.',
        price: 12.33,
        rating: 4.8,
        category: 'Grocery',
        supply: 200,
        stat: { yearlySalesTotal: 5000, yearlyTotalSoldUnits: 2000 }
      },
      {
        _id: '12',
        name: 'Laptop',
        description: 'Laptop',
        price: 500.00,
        rating: 4.8,
        category: 'Laptop',
        supply: 200,
        stat: { yearlySalesTotal: 5000, yearlyTotalSoldUnits: 2000 }
      }
  ];

  const isNonMobile = useMediaQuery('(min-width:1000px)');

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Products" subtitle="List of all products" />
      {
        products.length > 0 ? (
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
            }}
          >
            {products.map(({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            ))}
          </Box>
        ) : (
          <section>
           <Typography>No products found</Typography>
          </section>
        )
      }
    </Box>
  );
};

export default Products;
