import '../styles/globals.css';
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  fonts: {
    heading: "Work Sans",
    body: "Comfortaa"
  },
  components: {
    Heading: {
      baseStyle: {
        color: "purple.800"
      },
      variants: {
        'page-heading': {
          color: "red.900",
          py: "4"
        }
      }
    },
    Link: {
      baseStyle: {
        color: "orange.700"
      }
    },
  }
})

function MyApp({ Component, pageProps }) {
  return (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
  )
}

export default MyApp
