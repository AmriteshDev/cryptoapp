import { Container, Image, Text, Box, HStack, RadioGroup, Stat, StatLabel, StatNumber, Radio, VStack, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import Chart from './Chart';
import { server } from '../index';
import ErrorComponents from './ErrorComponents';
import { useParams } from 'react-router-dom';
const CoinDetails = () => {

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [days, setDays] = useState("24h")
  const [chartArray, setChartArray] = useState([])
  const [currency, setCurrency] = useState('inr')
  const params = useParams();
  const currencySymble = currency === "inr" ? "₹" : currency === "eur" ? " €" : " $"

  const btns = ['24h', '7d', '30d', '60d', '200d', '1y', 'max']
  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;

      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h");
        setLoading(true);
        break;

    }
  }

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        setCoin(data);
        setChartArray(chartData.prices)
        setLoading(false);

      }
      catch (error) {

        setError(true);
        setLoading(false);

      }
    }
    fetchCoins();
  }, [params.id, currency, days])
  if (error) return <ErrorComponents message={"Error While Fetching Coin Details."} />
  return (
    <Container maxW={"container.xl"}>
      {
        loading ? <Loader /> : <>
          <Box width={"full"} borderWidth={1} >
            <Chart currency={currencySymble} arr={chartArray} days={days} />
          </Box>
          <HStack p={'4'} wrap={'wrap'}>
            {
              btns.map((i) => (
                <Button key={i} onClick={() => switchChartStats(i)}>{i}</Button>
              ))
            }
          </HStack>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"} >
            <HStack spacing={'4'}>
              <Radio value={"inr"} >INR</Radio>
              <Radio value={"usd"} >USD</Radio>
              <Radio value={"eur"} >EUR</Radio>
            </HStack>
          </RadioGroup>
          <VStack spacing={'4'} p={'16'} alignItems={'flex-start'} >
            <Text fontSize={'small'} alignSelf="center" opacity={0.7} >
              Last Updated on {(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />

          </VStack>
          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currencySymble}{coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
              {coin.market_data.price_change_percentage_24h}%
            </StatHelpText>
          </Stat>
          <Badge fontSize={'2xl'} bgColor={"blackAlpha.800"} color={'white'}>
            {`#${coin.market_cap_rank}`}
          </Badge>
          <CustomBar high={`${currencySymble}${coin.market_data.high_24h[currency]}`} low={`${currencySymble}${coin.market_data.low_24h[currency]}`} />

          <Box w={'full'} p={'4'} >
            <Item title={'Max Supply'} value={coin.market_data.max_supply} />
            <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply} />
            <Item title={'Market Cap'} value={`${currencySymble}${coin.market_data.market_cap[currency]}`} />
            <Item title={'All Time Low'} value={`${currencySymble}${coin.market_data.atl[currency]}`} />
            <Item title={'All Time High'} value={`${currencySymble}${coin.market_data.ath[currency]}`} />
          </Box>
        </>
      }
    </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'} w={"full"} my={'4'} >
    <Text fontFamily={'Bebas Neue'} letterSpacing={"w"}> {title}</Text>
    <Text fontFamily={'Bebas Neue'} letterSpacing={"w"} > {value}</Text>
  </HStack>
)

const CustomBar = ({ high, low }) => (
  <VStack w={'full'} >
    <Progress value={50} colorScheme={"teal"} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme='red' />
      <Text fontSize={'sm'}>24 Hour</Text>
      <Badge children={high} colorScheme='green'></Badge>
    </HStack>
  </VStack>
)
export default CoinDetails