'use client';
import React, { useState, useEffect } from 'react';
import MainLayout from '../MainLayout';
import { Box, Typography, Grid, Button, Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import CustomButton from '../../../components/CustomButton/CustomButton';
import MainHeader from '../MainHeader';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';
import AssociatedProduct from '../../pages/product/AssociatedProduct';
import ProductInfo from './productInfo'; 
import { useRouter } from 'next/navigation';
import { ApiService } from '../../services/api.service';
import { z } from 'zod';
import { AnyAaaaRecord } from 'dns';


interface Zone {
  id: string;
  name: string;
}

interface Market {
  id: string;
  name: string;
}
interface ValidationErrors {
  [key: string]: string; 
}

interface Attribute {
  id: string;
  name: string;
  groupName: string;
  description: string;
  unitOfMeasurements: string;
  unitOfMeasurementId: string;
  applicableValues: string;
  datatype: string;
  val: string;
}  
interface Product {
  productCategory: any;
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  quantity: string;
}

interface Trigger {
  // id: string;
  // name: string;
}

interface Duration {}

const ProductFormUpdate = ({productId}:any) => {
  const productid = productId.id; 
  console.log("productid",productid);
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const [resData, setResData] = useState<any>({});
  const [id, setId] = useState<string | null>('');
  const [mode, setMode] = useState<string>('add');
  const [zones, setZones] = useState<Zone[]>([]); 
  const [categoryDetails, setCategoryDetails] = useState<any>(null); 
  const [categoryLineageDetails, setCategoryLineageDetails] = useState<any>(null); 
  const [markets, setMarkets] = useState<Market[]>([]); 
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const defaultTriggerValues: Trigger[] = ['GRN-IN', 'Installation']; 
  const [hasChanges, setHasChanges] = useState(false);
  const [triggerpoint1, setTriggerpoint1] =
    useState<Trigger[]>(defaultTriggerValues);
  const [triggerpoint2, setTriggerpoint2] =
    useState<Trigger[]>(defaultTriggerValues);
  const [triggerpoint3, setTriggerpoint3] =
    useState<Trigger[]>(defaultTriggerValues);

  const deafultdurationvalues: Duration[] = [
    '12-month',
    '24-month',
    '36-month',
  ];
  const [durations, setduration] = useState<Duration[]>(deafultdurationvalues);
  const [durations2, setduration2] = useState<Duration[]>(
    deafultdurationvalues
  );
  const [durations3, setduration3] = useState<Duration[]>(
    deafultdurationvalues
  );

  const [formData, setFormData] = useState({
    name: '',
    productCode: '',
    leadTime: '',
    brand: '',
    description: '',
    zone: [],
    attribute: [],
    market: [],
    trigger: [],
    durations: [],
    unitofmeasurement: '',
    documenttype: '',
    duration: '',
    duration2: '',
    duration3: '',
    source: '',
    triggerpoint1: '',
    triggerpoint2: '',
    triggerpoint3: '',
    owner: '',  
    categoryLineageDetails : '',
    name2:'',
    code:'',
    category:'',
    description2:'',
    quantity:''
  });

  const productFormSchema = z.object({
    name: z.string().min(1, "Name is required")
    .max(50, "50 characters allowed")
    .regex(/^[a-zA-Z]+$/, "Name must be alphabetic"),
    productCode: z.string().min(1, "Product code is required"),
    leadTime: z.string().min(1, "Lead Time is required"),
    brand: z.string().min(1, "Brand is required")
    .max(50, "Brand must be at most 50 characters long")
    .regex(/^[a-zA-Z]+$/, "Brand must be alphabetic"),
    description: z.string().min(1, "Description is required"),
    // market: z.array(z.string()).min(1, "At least one market is required"),
    // market: z.string().min(1, "Market selection is required"),
    // zone: z.array(z.string().min(1, "Zone selection cannot be empty")),
  });
  const associatedProductSchema = z.object({
    name2: z.string().min(1, "Name is required").max(50, "50 characters allowed").regex(/^[a-zA-Z\s]+$/, " must be alphabetic"),
  });
  
  const validateField = (name: string, value: string) => {

    let result;
  if (tabValue === 0) { 
    result = productFormSchema.safeParse(formData);
  } else if (tabValue === 1) { 
    result = associatedProductSchema.safeParse(formData);
  }

//     const fieldSchema = productFormSchema.pick({ [name]: true });

//     const validationResult = fieldSchema.safeParse({ [name]: value });
// if (!validationResult.success) {
//   const firstIssueMessage = validationResult.error.issues[0].message;
//   setValidationErrors(prev => ({ ...prev, [name]: firstIssueMessage }));
// } else {
//   setValidationErrors(prev => ({ ...prev, [name]: undefined }));
// }

if (result && !result.success) {
  const newErrors = result.error.issues.reduce<Record<string, string>>((acc, issue) => {
    const key = issue.path[0];
    if (typeof key === "string" || typeof key === "number") {
      acc[key.toString()] = issue.message;
    }
    return acc;
  }, {});
  setValidationErrors(newErrors);
} else {
  setValidationErrors({});
}

  };
  
  useEffect(() => {
   const productID = productid ; 
   if(productID)
   {
    {
      setMode('edit');
      setId(productID);
      handleGetBYId(productID);
    }
   }
  }, []);     
  
  
  const isFormValid = () => {
    if (
      formData.name &&
      formData.productCode &&
      formData.leadTime &&
      formData.brand &&
      formData.description &&
      formData.market &&
      formData.zone &&
      formData.documenttype &&
      formData.duration &&
      formData.duration2 &&
      formData.duration3 &&
      formData.source &&
      formData.triggerpoint1 &&
      formData.triggerpoint2 &&
      formData.triggerpoint3 &&
      formData.owner &&
      formData.attribute &&
      formData.documenttype &&
      formData.source &&
      formData.owner && 
      formData.categoryLineageDetails&& 
      formData.name2 && 
      formData.code && 
      formData.category &&  
      formData.description2 &&  
      formData.quantity


    ) {
      return true;
    }
    return false;
  };
  const [attributeData, setAttributeData] = useState<Attribute[]>([]);
  const [productType, setProductType] = useState<any>(null);
  const apiService = new ApiService();  
  const handleBack = () => {
    router.push('/productManagement');
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as { name: string; value: string };

    setFormData({
      ...formData,
      [name]: value,
    });  
    validateField(name, value);
    setHasChanges(true);
    // validateField(name, value);
  };  
  
  const handleProductSelect = (selectedProduct: Product | null) => {
    setSelectedProduct(selectedProduct);
    if (selectedProduct) {      
      setFormData((prevData: any) => ({
        ...prevData,
        code: selectedProduct.code,
        name2: selectedProduct.name,
        category: selectedProduct.category ,
        description2: selectedProduct.description ,
        
      }));
    } 
    setHasChanges(true);
  };
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);

   
  useEffect(() => {
    const storedValue = sessionStorage.getItem('catyId');  
    const storedValue2 = sessionStorage.getItem('catyName');
    setCategoryId(storedValue);   
    setCategoryName(storedValue2);
    console.log("TestingSessionID",storedValue); 
    console.log("TestingSessionID2",storedValue2);
  }, []);  
  useEffect(() => {
    // Make API call to fetch product category details
    const fetchCategoryDetails = async () => {
      const apiService = new ApiService();
      try {
        const response = await apiService.fetchData(
          `http://20.207.68.38/hiveconnect/configuration/productCategory/${categoryId}`
        );

        if (response.statusCode === 200) {
          // Set the category details in state
          setCategoryDetails(response.data);  
          setProductType(response.data?.productType?.name || null);
        } else {
          console.error('Failed to fetch product category details');
        }
      } catch (error) {
        console.error('Error fetching product category details:', error);
      }
    };

    // Call the function to fetch category details
    fetchCategoryDetails();
  }, [categoryId])  
  useEffect(() => {
    // Make API call to fetch product category details
    const fetchCategoryLineageDetails = async () => {
      const apiService = new ApiService();
      try {
        const response = await apiService.fetchData(
          `http://20.207.68.38/hiveconnect/configuration/productCategory/lineage/${categoryId}`
        );

        if (response.statusCode === 200) {
          // Set the category details in state
          setCategoryLineageDetails(response.data);
        } else {
          console.error('Failed to fetch product category details');
        }
      } catch (error) {
        console.error('Error fetching product category details:', error);
      }
    };

    // Call the function to fetch category details
    fetchCategoryLineageDetails();
  }, [categoryId])

  useEffect(() => {
    getZoneIds();
  }, []);

  // useEffect(() => {
  //   console.log('zones12:', zones);
  // }, [zones]);

  useEffect(() => {
    getMarketIds(); 
    
  }, []);

  useEffect(() => {
    console.log('Markets12:', markets);
  }, [markets]);
  useEffect(() => {
    if (categoryId) {
      getAttributeData();
    }
  }, [categoryId]); 
  useEffect(() => {
    if (categoryId) {
      getAttributeData();
    }
  }, [categoryId]);
  
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getZoneIds = async () => {
    try {
      const response = await apiService.fetchData(
        'http://20.219.214.84/hiveconnect/common/zone'
      );

      console.log('response', response);
      if (response.statusCode === 200) {
        console.log('response market data', response);
        setZones(response.data);
        console.log('response after setting', response.data);
      } else {
        console.error('Failed to fetch zoneIDs');
      }
    } catch (error) {
      console.error('Error fetching zone IDs:', error);
    }
  };

  const getMarketIds = async () => {
    //  const apiService = new ApiService();
    try {
      const response = await apiService.fetchData(
        'http://20.219.214.84/hiveconnect/common/market'
      );

      if (response.statusCode === 200) {
        console.log('response market data', response);
        // Assuming your response data is an array of market objects
        setMarkets(response.data);
        console.log('market response after setting', response.data);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };
  

  const handleSave = async () => {
console.log('save')
const result = productFormSchema.safeParse(formData);

// if (!result.success) {
//   const newErrors = result.error.issues.reduce((acc, issue) => {
//     acc[issue.path[0]] = issue.message;
//     return acc;
//   }, {});
//   setValidationErrors(newErrors);
//   console.error('Validation failed:', newErrors);
//   return;
// }
if (!result.success) {
  const newErrors = result.error.issues.reduce<ValidationErrors>((acc, issue) => {
    if (issue.path[0]) { 
      acc[issue.path[0]] = issue.message;
    }
    return acc;
  }, {});
  setValidationErrors(newErrors);
  console.error('Validation failed:', newErrors);
  return;
}

setValidationErrors({});
console.log('Validation passed, proceeding with API call.');

    console.log('Overall Product Form Data:', formData);
    setHasChanges(false);
    const postData = {
      name: formData.name,
      code: formData.productCode,
      description: formData.description,
      productGroupId: categoryId,
      brand: formData.brand,
      productCategoryId: categoryId,

      productAttributes: Array.isArray(attributeData)
        ? attributeData.map((ele) => {
            return {
              attribute: { id: ele.id, name: ele.name },
              value: ele.val,
              unitOfMeasurement: ele.unitOfMeasurementId,
            };
          })
        : [],
      productWarrantys: [
        {
          type: 1,
          duration: formData.duration,
          triggerPoint: formData.triggerpoint1,
        },
        {
          type: 2,
          duration: formData.duration2,
          triggerPoint: formData.triggerpoint2,
        },
        {
          type: 3,
          duration: formData.duration3,
          triggerPoint: formData.triggerpoint3,
        },
      ],

      associateDocuments: [
        {
          documentType: formData.documenttype,
          source: formData.source,
          owner: formData.owner,
        },
      ],

      productZones: Array.isArray(formData.zone)
        ? formData.zone.map((ele) => {
            return { zone: { id: ele } };
          })
        : [],

      productMarkets: Array.isArray(formData.market)
        ? formData.market.map((ele) => {
            return { market: { id: ele } };
          })
        : [],
    };

    console.log('Overall Form Data>>>>>:', postData);

    try {
      const response = await apiService.postData(
        'http://20.207.68.38/hiveconnect/configuration/product',
        postData
      );

      console.log('response post data', response);

      if (response.statusCode === 200) {
        router.push('/productManagement');
      }
      console.log('Received JSON data:', response.data.billingAddress);

      console.log('Name:', response.data.name);
      console.log('Contact Number:', response.data.contactNumber);

      //setShowALert(true);
    } catch (error) {
      console.log('Error while saving data:', error);
      alert(error);
    }
  
  };   
  const handleAttributeChange = (event: any, index: number) => {
    console.log('Event', event.target);
    const { name, value, unitOfMeasurement } = event.target;
    const dummyObj = [...attributeData];

    // Assuming the name is constructed as 'unit_<attributeName>' for unitOfMeasurement
    if (name.startsWith('unit_')) {
      const attributeName = name.replace('unit_', '');
      const attributeIndex = dummyObj.findIndex(
        (attr) => attr.name.toLowerCase() === attributeName
      );
      if (attributeIndex !== -1) {
        dummyObj[attributeIndex].unitOfMeasurementId = value;
      }
    } else {
      dummyObj[index].val = value;
    }

    setAttributeData(dummyObj);

    console.log('atrr>>>', name, value, attributeData, dummyObj);
  };
  const  handleGetBYId = async (productID:any) => { 
    try {
      const response = await apiService.fetchData(
        `http://20.207.68.38/hiveconnect/configuration/productCategory/${productID}`
      );  
      const activities = response.data.activities || [];  
     
      const responseData =  {

      } 
    }
      catch (error) {
        console.error('Error fetching data:', error);
  
      }
  }
  const getAttributeData = async () => {
    const apiService = new ApiService();
    console.log('testing Id ', categoryId);
    try {
      const response = await apiService.fetchData(
        `http://20.207.68.38/hiveconnect/configuration/productCategoryAttribute/${categoryId}`
      );
      console.log('attribute', response);
      if (response.statusCode === 200) {
        // Assuming your response data is an array of owner objects
        const mapVal: { [key: string]: string } = {};
        const data = response.data.map((ele: any) => {
          if (!mapVal[ele.name]) {
            mapVal[ele.name] = '';
          }

          // Set the initial value for dropdown types
          const initialValue =
            ele.dataType === 'DropDown' ? ele.applicableValues : '';
          return { ...ele, val: initialValue };
        });

        console.log('attribute>>>', data, mapVal);
        setAttributeData(data);
        // setAttrMAp(mapVal)
      } else {
        console.error('Failed to fetch owner data');
      }
    } catch (error) {
      console.error('Error fetching owner data:', error);
    }
  };

  return (
    <MainLayout>
      <MainHeader
        pageTitle={'Add Product'}
        showAlert={showAlert}
        alertMsg={'Your employee has been added to the list.'}
      >
        <Breadcrumbs className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Dashboard
          </Link>
          <Link href="/productManagement" className="text-d-none">
            Product Management
          </Link>
          <Typography color="text.primary">Update Product</Typography>
        </Breadcrumbs>
      </MainHeader>
      <Box className="header-bg  page-padding-container">
        <Box className="product-tabs">
          {productType === 'POSM' ? (
            <CustomTabs
              labels={['Product Info', 'Associated Product']}
              value={tabValue}
              onChange={handleChangeTab}
            />
          ) : (
            <CustomTabs
              labels={['Product Info']}
              value={tabValue}
              onChange={handleChangeTab}
            />
          )}
        </Box>
      </Box>
      <Box className="input-form outletform-box page-padding-container">
        <Box component="div" className="form-body">
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
          >
            <Grid item xs={12}>
              {tabValue === 0 && (
                <ProductInfo
                  categoryId={categoryId || ''}
                  formData={formData}
                  setFormData={setFormData}
                  handleFieldChange={handleFieldChange}
                  isFormValid={isFormValid}
                  zones={zones}
                  markets={markets}
                  triggerpoint1={triggerpoint1}
                  durations={durations}
                  durations2={durations2}
                  durations3={durations3}
                  triggerpoint2={triggerpoint2}
                  triggerpoint3={triggerpoint3}
                  attributeData={attributeData}
                  handleAttributeChange={handleAttributeChange}  
                  categoryDetails={categoryDetails} 
                  categoryName = {categoryName || ''} 
                  categoryLineageDetails = {categoryLineageDetails}
                  validationErrors={validationErrors}
                  validateField={validateField}
                />
              )}
              {tabValue === 1 && (
                <AssociatedProduct   
                  categoryId={categoryId || ''}
                  formData={formData}
                  setFormData={setFormData}
                  handleFieldChange={handleFieldChange}
                  isFormValid={isFormValid} 
                  name2={formData.name2}
                  code={formData.code}
                  category={formData.category}
                  description2={formData.description2}
                  quantity={formData.quantity}  
                  handleProductSelect = {handleProductSelect}
                  validationErrors={validationErrors}
                  validateField={validateField}
                />
              )}
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ textAlign: 'right' }}
            >
              <CustomButton
                className="btn btn-outline"
                variant="outlined"
                sx={{ marginRight: '10px' }} 
                onClick={handleBack}
              >
                Back
              </CustomButton>

              <Button
                variant="contained"
                onClick={handleSave}
                className="btn btn-black" 
                // disabled={!hasChanges}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default ProductFormUpdate;