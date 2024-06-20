"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Search from "@mui/icons-material/Search";
import SidebarAdmin from "./SideBarAdmin";
import { Product } from "@/types/Products";
import Cookies from 'js-cookie';
import { createProductBack, deleteProductBack, getAllProductsBack, updateProductBack } from "@/services/product.service";
import {createProductSchema} from '../validation/create_product-schema';
import * as Yup from 'yup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Box from '@mui/material/Box';

  const categories = [
    "Platos de fondo",
    "Entradas",
    "Bebestibles",
    "Menú niños",
    "Postres",
  ];
  
  const ProductManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [name, setName] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('Platos de fondo');
    const [description, setDescription] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [tempStock, setTempStock] = useState(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [generalError, setGeneralError] = useState<string>('');
    const [productList, setProductList] = useState<Product[]>([]); 
    const [ productCreated, setProductCreated ] = useState(false);
    const [ stockChanged, setStockChanged ] = useState(false);
    const [ productDeleted, setProductDeleted ] = useState(false);
    const validationSchema = createProductSchema;
    const params = useParams();
    const nameTable = params.name;
    const router = useRouter();

    // LLAMADA PARA CARGAR LOS PRODUCTOS
    const fetchProducts = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await getAllProductsBack(accessToken);
        if(response.products){
          setProductList(response.products);
        }  
      } catch (error) {
        console.error(error);
      }
    };

    // CARGAR LOS PRODUCTOS AL CARGAR LA PAGINA POR PRIMERA VEZ
    useEffect(() => {
      fetchProducts();
    }, [])

    // FILTRO POR CATEGORIA
    const filteredProducts = productList.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (product.category === selectedCategory || selectedCategory === '')
    );

    // MODAL DE MODIFICAR STOCK
    const openModal = (product: Product) => {
      setSelectedProduct(product);
      setTempStock(product.stock);
      setShowModal(true);
    };

    // MODIFICAR STOCK DEL PRODUCTO
    const handleModifyStock = (amount: number) => {
      setTempStock(prevStock => Math.max(prevStock + amount, 0));
    };

    // CONFIRMAR MODIFICACIÓN DE STOCK DEL PRODUCTO
    const handleConfirmStock = async () => {
      if (selectedProduct) {
        try{
          const accessToken = Cookies.get('accessToken');
          setProductList(prevState =>
            prevState.map(p =>
              p.id === selectedProduct.id ? { ...p, stock: tempStock } : p
            )
          );
          await updateProductBack(selectedProduct.id, { ...selectedProduct, stock: tempStock }, accessToken);
          setStockChanged(true);
        } catch (error) {
          console.error(error);
          fetchProducts();
        }  
      }
      closeModal();
    };
  
    // MODAL DE CANCELAR MODIFICACIÓN DE STOCK
    const closeModal = () => {
      setShowModal(false);
    };
  
    // MODAL DE ELIMINAR PRODUCTO
    const openDeleteModal = (product: Product) => {
      setProductToDelete(product);
      setShowDeleteModal(true);
    };

    // CONFIRMAR ELIMINACION DE PRODUCTO
    const handleDeleteProduct = async () => {
      if (productToDelete) {
        try{
          const accessToken = Cookies.get('accessToken');
          setProductList(prevList => prevList.filter(p => p.id !== productToDelete.id));
          await deleteProductBack(productToDelete.id, accessToken);
          setProductDeleted(true);
        } catch (error) {
          console.error(error);
          fetchProducts();
        }
      }
      closeDeleteModal();
    };
  
    // MODAL DE CANCELAR ELIMINACIÓN DE PRODUCTO
    const closeDeleteModal = () => {
      setShowDeleteModal(false);
      setProductToDelete(null);
    };
  
    // CATEGORIAS AL HACER CLICK
    const handleCategoryClick = (category: string) => {
      setSelectedCategory(prevCategory => prevCategory === category ? '' : category);
    };

    // GENERAR SKU ALEATORIO
    const generateNumericSKU = (num: number) => {
      let sku = '';
      const characters = '0123456789';
      for (let i = 0; i < num; i++) {
        sku += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return sku;
    };
  
    // ABRIR MODAL PARA AGREGAR PRODUCTO NUEVO
    const openCreateModal = () => {
      setShowCreateModal(true);
    };
  
    // CREACIÓN DE PRODUCTO
    const handleCreateProduct = async () => {
      try{
        const accessToken = Cookies.get('accessToken');
        const sku = generateNumericSKU(12);
        await validationSchema.validate({name ,stock, price, category, description}, { abortEarly: false});
        await createProductBack(name, sku ,stock, price, category, description, accessToken);
        fetchProducts();
        closeCreateModal();
        setGeneralError('');
        setProductCreated(true);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors: { [key: string]: string } = {};
          error.inner.forEach(err => {
            if (err.path) {
              validationErrors[err.path] = err.message;
            }
          });
          setErrors(validationErrors);
        } else {
          console.error(error);
          fetchProducts();
          setGeneralError('Error al crear el producto, verifique ');
        }
      } 
    };

    // CANCELAR AGREGACIÓN DE PRODUCTO
    const closeCreateModal = () => {
      setShowCreateModal(false);
    };

    // LIMPIAR ERRORES
    const clearError = (field: string) => {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    };

    // CERRAR ALERTA
    const handleAlertClose = () => {
      setProductCreated(false);
      setStockChanged(false);
      setProductDeleted(false);
    };

    // CIERRE DE ALERTA AUTOMATICO
    useEffect(() => {
      setTimeout(() => {
        setProductCreated(false);
        setStockChanged(false);
        setProductDeleted(false); 
      }, 5000); 
    }, [productCreated, stockChanged, setProductDeleted]);   
  
    return (
      <div className="flex bg-gray-800 text-white">
        <SidebarAdmin />
        <div className="w-full p-8">
          <div className='flex justify-between items-center mb-4'>
            <h1 className="text-2xl mb-9">Productos {name}</h1>
            <div className="ml-auto mb-9 flex items-center">
              <Search className="text-white mr-2" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-lg bg-gray-700"
              />
              <button 
                className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg ml-4"
                onClick={openCreateModal}
              >
                Crear producto
              </button>
            </div>
          </div>
          
          <div className="h-1 bg-red-600 mb-4"></div>
          <div className="flex space-x-4 mb-8">
            {categories?.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-red-600' : 'bg-gray-700'}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
  
          {/* Renderizado de productos */}
          { productList && productList.length > 0 ? (
            filteredProducts.length === 0 ? (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
                <SearchOffIcon style={{ fontSize: 60, marginBottom: 16 }} />
                <p className="text-xl">No se encontraron productos</p>
              </Box>
            ): (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts?.map(product => (
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit" variant="subtitle2" >Descripción</Typography>
                        <Typography color="inherit" variant="caption" >{product.description || ''}</Typography>
                      </React.Fragment>
                    } 
                    arrow key={product.id}
                  >
                    <div key={product.id} className="bg-gray-700 p-4 rounded-lg">
                      <img src={product.image || ""} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                      <h3 className="text-lg">{product.name}</h3>
                      <p>Precio: ${product.price}</p>
                      <p>Stock: {product.stock}</p>
                      <p>SKU {product.sku}</p>
                      <button
                        className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg mt-4 mr-2"
                        onClick={() => openModal(product)}
                      >
                        Modificar stock
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg mt-4"
                        onClick={() => openDeleteModal(product)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </Tooltip>
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center mt-20">
              <SearchOffIcon style={{ fontSize: 80 }} className="mb-4" />
              <p className="text-xl">Agrega tu primer producto</p>
            </div> 
          )}     
          {showCreateModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 p-4 rounded-lg w-1/2">
                <h2 className="text-lg mb-4">Crear Producto</h2>

                {generalError && <span className="block text-red-500 mb-4 text-sm">{generalError}</span>}
                
                <form>
                  <div className="form-group">                    
                    <label htmlFor="name" className="block text-white">Nombre</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => {
                        clearError('name');
                        setGeneralError('');
                      }}
                      className="w-full p-2 rounded-lg bg-gray-700"
                    />
                    {errors.name && <span className="block text-red-500 text-sm">{errors.name}</span>}
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="stock" className="block text-white">Stock</label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(parseInt(e.target.value))}
                      onFocus={() => {
                        clearError('stock');
                        setGeneralError('');
                      }}
                      className="w-full p-2 rounded-lg bg-gray-700"         
                    />
                    {errors.stock && <span className="block text-red-500 text-sm">{errors.stock}</span>}
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="price" className="block text-white">Precio</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value))}
                      onFocus={() => {
                        clearError('price');
                        setGeneralError('');
                      }}
                      className="w-full p-2 rounded-lg bg-gray-700"
                    />
                    {errors.price && <span className="block text-red-500 text-sm">{errors.price}</span>}
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="category" className="block text-white">Categoría</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      onFocus={() => {
                        clearError('category');
                        setGeneralError('');
                      }}
                      className="w-full p-2 rounded-lg bg-gray-700"
                    >
                      {categories?.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && <span className="block text-red-500 text-sm">{errors.category}</span>}
                  </div>
                  <div className="form-group">                    
                    <label htmlFor="description" className="block text-white">Descripción</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      onFocus={() => {
                        clearError('description');
                        setGeneralError('');
                      }}
                      className="w-full p-2 rounded-lg bg-gray-700"
                    />
                    {errors.description && <span className="block text-red-500 text-sm">{errors.description}</span>}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg mr-4"
                      onClick={closeCreateModal}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
                      onClick={handleCreateProduct}
                    >
                      Confirmar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
  
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 p-4 rounded-lg w-1/2">
                <h2 className="text-lg mb-4">Modificar Stock</h2>
                <div className="flex justify-between mb-4">
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleModifyStock(-1)}
                  >
                    -
                  </button>
                  <span className="text-lg">{tempStock}</span>
                  <button
                    className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleModifyStock(1)}
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg mr-4"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
                    onClick={handleConfirmStock}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
  
          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 p-4 rounded-lg w-1/2">
                <h2 className="text-lg mb-4">Eliminar Producto</h2>
                <p>¿Estás seguro de que quieres eliminar este producto?</p>
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mr-4"
                    onClick={closeDeleteModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg"
                    onClick={handleDeleteProduct}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {productCreated && (
          <div className="absolute top-0 left-0 w-full z-50">
            <Alert severity="success" onClose={handleAlertClose} sx={{ textAlign: 'center' }}>
              Se a creado un nuevo producto con exito!
            </Alert>
          </div>
        )}
        {stockChanged && (
          <div className="absolute top-0 left-0 w-full z-50">
            <Alert severity="info" onClose={handleAlertClose} sx={{ textAlign: 'center' }}>
              Se ha reducido el stock de {name}
            </Alert>
          </div>
        )}
        {productDeleted && (
          <div className="absolute top-0 left-0 w-full z-50">
            <Alert severity="error" onClose={handleAlertClose} sx={{ textAlign: 'center' }}>
              Se ha eliminado un producto con exito!
            </Alert>
          </div>
        )}
      </div>
    );
  };
  
  export default ProductManagement;