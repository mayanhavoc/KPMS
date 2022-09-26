import Link from 'next/link';
import { Flex, Spacer, Text } from '@chakra-ui/react';

export default function Navbar(){
    return (
        <Flex direction="row" w="100%" p="5">
            <Text fontWeight={900}>
                <Link href="/">
                    Home
                </Link>
            </Text>
            <Spacer />
            <Text fontWeight={900}>
                <Link href="/recipes">
                    Recipes
                </Link>
            </Text>
            <Spacer />
            <Text fontWeight={900}>
                <Link href="/shopping-list">
                    Shopping List
                </Link>
            </Text>
            <Spacer />
            <Text fontWeight={900}>
                <Link href="/kitchen-pantry-inventory">
                    Kitchen Pantry Inventory
                </Link>
            </Text>
            <Spacer />
        </Flex>
    )
}