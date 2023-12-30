import React from 'react';
import {Link} from "react-router-dom";
import { Container, HStack, Text, VStack, Image, Heading } from '@chakra-ui/react';
const CoinsCard = ({id, currencySymble, name, img, symbol, price }) =>
(
    <Link to={`/coin/${id}`}>
        <VStack w={'52'} shadow={'lg'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} css={{
            "&:hover": {
                transform: 'scale(1.1)'
            }
        }} >
            <Image src={img} w={"10"} h={"10"} objectFit={'contain'} alt={'Coins'} />
            <Heading size={'md'} noOfLines={1}>
                {symbol}
            </Heading>
            <Text noOfLines={1}>
                {name}
            </Text>
            <Text noOfLines={1}>
                {price ? `${currencySymble}${price}`:"NA" }
            </Text>
        </VStack>
    </Link>
);

export default CoinsCard;