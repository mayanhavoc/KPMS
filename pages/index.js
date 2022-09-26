import Head from 'next/head';

import { Heading } from '@chakra-ui/react';

import Navbar from '../components/navbar';
import Recipes from './recipes';
import ShoppingList from './shopping-list';
import KitchenPantryInventory from './kitchen-pantry-inventory';


import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>KPMS</title>
        <meta name="Kitchen Pantry Management System" content="Kitchen Pantry Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
       <Heading>
          Kitchen Pantry Management System
        </Heading>
      </main>

      <footer className={styles.footer}>
        Kitchen Pantry Management System
      </footer>
    </div>
  )
}
