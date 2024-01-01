import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Container, HStack, Radio, Button, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponents from './ErrorComponents';
import CoinsCard from './CoinsCard';




const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1)
    const [currency, setCurrency] = useState('inr')

    const currencySymble = currency === "inr" ? "₹" : currency === "eur" ? " €" : " $"


    const changePage = (page) => {
        setPage(page);
        setLoading(true);
    }
    const btn = new Array(132).fill(1);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setCoins(data);
                setLoading(false);
                console.log(data)

            }
            catch (error) {

                setError(true);
                setLoading(false);

            }
        }
        fetchCoins();
    }, [currency, page])

    if (error) return <ErrorComponents message={"Error While Fetching Coins."} />

    return (
        <Container maxW={'container.xl'}>
            {loading ? <Loader /> : <>
                <RadioGroup value={currency} onChange={setCurrency} p={"8"} >
                    <HStack spacing={'4'}>
                        <Radio value={"inr"} >INR</Radio>
                        <Radio value={"usd"} >USD</Radio>
                        <Radio value={"eur"} >EUR</Radio>
                    </HStack>
                </RadioGroup>


                <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
                    {
                        coins.map((i) => (
                            <CoinsCard name={i.name} img={i.image} price={i.current_price} symbol={i.symbol} id={i.id} key={i.id} currencySymble={currencySymble} />
                        ))

                    }
                </HStack>
                <HStack w={'full'} overflow={'auto'} p={'8'} >
                    {btn.map((items, index) =>
                        <Button bgColor={'blackAlpha.900'} color={'white'} onClick={() => changePage(index + 1)} >{index + 1}</Button>
                    )}
                </HStack>

            </>}
        </Container>
    )
}



export default Coins