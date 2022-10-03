import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, useField } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
  VisuallyHidden,
} from '@chakra-ui/react';
import * as Yup from 'yup';

  // Text input
  const _TextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
     // which we can spread on <input>. We can use field meta to show an error
     // message if the field is invalid and it has been touched (i.e. visited)
     const [field, meta] = useField(props);
     return (
      <FormControl>
        <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
        <Input className="text-input" {...field} {...props}/>
        {meta.touched && meta.error? (
          <FormErrorMessage className="error">{meta.error}</FormErrorMessage>
        ) : null }
      </FormControl>
     );
  };

  const _Checkbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
     // Formik does this too! When you specify `type` to useField(), it will
     // return the correct bag of props for you -- a `checked` prop will be included
     // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
     const [field, meta] = useField({...props, type: 'checkbox'});
     return (
      <FormControl>
        <FormLabel className="checkbox-input">
          <Input type="checkbox" {...field}{...props} />
          {children}
        </FormLabel>
          {meta.touched && meta.error ? (
            <FormErrorMessage className="error">{meta.error}</FormErrorMessage>
          ) : null }
      </FormControl>
     )
  }

  const _Select = ({ label, ...props }) => {
    const [field,meta] = useField(props);
    return (
      <FormControl>
        <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
        <Select {...field} {...props} />
        {meta.touched && meta.error ? (
          <FormErrorMessage className='error'>{meta.error}</FormErrorMessage> 
        ) : null }
      </FormControl>
    );
  };

  const handleSubmit = async (values) => {
    const data = {
      recipeName: values.recipeName,
      reference: values.reference
    }
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);
    // API endpoint where we send form data.
    const endpoint = '/api/recipes'
     // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    // alert(`Data: ${result.data}`)
  }

  const RecipeForm = () => {
    return (
      <Box
          maxWidth="1200px"
          mx="auto"
          my="auto"
          paddingTop="20px"
          paddingBottom="20px"
          height={'100%'}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
          <Heading as="h1" size="lg" p={5}>Enter recipe</Heading>
          <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              rounded="md"
              width={{ base: '60%', md: '40%' }}
            >
            <Stack isInline spacing={8} align="center">
            <Formik
              enableReinitialize
              initialValues={{ recipeName: '', reference: '' }}
              validationSchema={Yup.object({
                recipeName: Yup.string()
                  .required('Required'),
                  reference: Yup.string(),
                  category: Yup.string()
                     .oneOf(
                       ['produce', 'meat & seafood', 'dairy', 'frozen', 'deli', 'bakery', 'grocery aisles'],
                       'Invalid category'
                     )
                     .required('Required'),
                    }
                  )
                }
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    actions.setSubmitting(false)
                  }, [1000, handleSubmit(values)])
                }}
                >
                <Form action="/api/recipes" method="post">
                  <Box paddingBottom={3}>
                    <_TextInput
                    label="Recipe name"
                    name="recipeName"
                    type="text"
                    placeholder="e.g. Risotto primavera"
                    />
                  </Box>

                  <_TextInput
                  label="Reference"
                  name="reference"
                  type="text"
                  placeholder="e.g. America's Test Kitchen"
                  />
                  <_Select label="Ingredient category" name="category">
                       <option value="">Select ingredient category</option>
                       <option value="produce">Produce</option>
                       <option value="meatAndSeafood">Meat & Seafood</option>
                       <option value="dairy">Dairy</option>
                       <option value="frozen">Frozen</option>
                       <option value="deli">Deli</option>
                       <option value="bakery">Bakery</option>
                       <option value="groceryAisles">Grocery aisles</option>
                       <option value="other">Other</option>
                  </_Select>
                  <Button
                    mt={4}
                    variantcolor="teal"
                    type="submit"
                    float="right"
                  >
                    Submit
                  </Button>
                </Form>
               </Formik>
            </Stack>
          </Box> 
        </Flex>
      </Box>
    );
  };

  export default RecipeForm;

