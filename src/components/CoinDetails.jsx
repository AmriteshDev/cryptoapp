import { Container,Box,HStack,RadioGroup,Radio } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import ErrorComponents from './ErrorComponents';
import { useParams } from 'react-router-dom';
const CoinDetails = () => {

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr')
  const params = useParams();


  useEffect(() => {
    const fetchCoins = async () => {
        try {
            const { data } = await axios.get(`${server}/coins/${params.id}`)
            setCoin(data);
            setLoading(false);
            console.log(data)

        }
        catch (error) {

            setError(true);
            setLoading(false);

        }
    }
    fetchCoins();
}, [])
if (error) return <ErrorComponents message={"Error While Fetching Coin Details."} />
  return (
    <Container maxW={Container.xl}>
       {
        loading ? <Loader/> :<>
        <Box width={"full"} borderWidth={1} >
hjhgjh
        </Box>
        {

        }
        <RadioGroup value= {currency} onChange={setCurrency} p={"8"} >
            <HStack spacing={'4'}>
                <Radio value={"inr"} >INR</Radio>
                <Radio value={"usd"} >USD</Radio>
                <Radio value={"eur"} >EUR</Radio>
            </HStack>
         </RadioGroup>
        </>
       }
    </Container>
  )
}

export default CoinDetails