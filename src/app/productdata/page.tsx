import { CardContent, Typography, CardActions, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { getProductData } from '../services/product';
import { ProductType } from '../interface/productType';

function Productdata(){
  const [productData, setProductData] = useState<ProductType[]>();
  
  const handleData = async () => {  
   console.log('Product data ', productData);
  }

   useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      const data = await getProductData();
      setProductData(data);
      console.log('Product data ', productData);
    };
        
  return (
   <>
      <div>
      <h3>Product Data</h3>
      <div className="my-3">
        <Row>
          {productData?.map((item, index) => (
            <Col xs={12} sm={6} md={4}  key={item?._id | index} className='my-2'>
              <Card>
                <CardContent>
                  <div className='w-100 d-flex justify-center'>
                    <img src={item.image} alt={item.category} width={'250px'} height={'300px'}/>
                  </div>
                  <Typography gutterBottom variant="h6">{item.title}</Typography>
                  <Typography className='ellipsis' variant="body2">{item.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Price: ${item.price}</Button>
                </CardActions>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
   </>
  )
}

export default Productdata;
