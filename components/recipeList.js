import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, useField } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Heading,
  Select,
  useToast,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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

  const _NumberInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
    <FormControl>
        <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
        <NumberInput min={0} >
                <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
        {meta.touched && meta.error ? (
            <FormErrorMessage className="error">{meta.error}</FormErrorMessage>
          ) : null }
    </FormControl>
    )
  }

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


const RecipeList = () => {
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
        <Heading as="h1" size="lg" p={5}>Enter recipe ingredients</Heading>
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
            initialValues={{ ingredientName: '', quantity: 0, measurementUnit: '', comments: '' }}
            validationSchema={Yup.object({
              ingredientName: Yup.string()
                .required('Required'),
                quantity: Yup.number()
                .required('Required'),
                measurementUnit: Yup.string()
                   .oneOf(
                     ['ounces', 'pounds', 'grams', 'cups', 'teaspoons', 'tablespoons', 'unit', 'fluid ounces', 'quarts', 'gallons', 'pinch'],
                     'Invalid category'
                   )
                   .required('Required'),
                comments: Yup.string()
                }
                )
              }
              onSubmit={(values, { setSubmitting }) => {
                 setTimeout(() => {
                   alert(JSON.stringify(values, null, 2));
                   setSubmitting(false);
                 }, 400);
               }}
              >
              <Form>
                <Box paddingBottom={3}>
                  <_TextInput
                  label="Ingredient name"
                  name="ingredientName"
                  type="text"
                  placeholder="e.g. Spaghetti"
                  />
                </Box>

                <_NumberInput
                label="Quantity"
                name="quantity"
                type="number"
                placeholder="e.g. 1"
                />
                <_Select label="Measurement unit" name="measurementUnit">
                     <option value="">Select measurement unit</option>
                     <option value="grams">Grams</option>
                     <option value="ounces">Ounces</option>
                     <option value="cups">Cups</option>
                     <option value="tablespoons">Tablespoons</option>
                     <option value="teaspoons">Teaspoons</option>
                     <option value="fluidOunces">Fluid Ounces</option>
                     <option value="pounds">Pounds</option>
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

export default RecipeList;

