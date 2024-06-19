"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Search from "@mui/icons-material/Search";
import SidebarAdmin from "./SideBarAdmin";

type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    image: string;
  };

const products: Product[] = [
    {
      id: 1,
      name: "Tabla variedades de jamón y queso",
      price: 8990,
      stock: 10,
      category: "Platos de fondo",
      image: "/images/Entradas/1.jpg",
    },
    {
      id: 36,
      name: "Pasta con pesto y pollo ",
      price: 10990,
      stock: 10,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/10.jpg",
    },
    {
      id: 4,
      name: "Queso de cabra con tomate y albahaca",
      price: 8990,
      stock: 15,
      category: "Entradas",
      image: "/images/Entradas/4.jpg",
    },
    {
      id: 5,
      name: "Mix papas fritas, nuggets y aros de cebolla",
      price: 8990,
      stock: 3,
      category: "Entradas",
      image: "/images/Entradas/5.jpg",
    },
    {
      id: 6,
      name: "Empanada variedades",
      price: 3990,
      stock: 7,
      category: "Entradas",
      image: "/images/Entradas/6.jpg",
    },
    {
      id: 14,
      name: "Agua embotellada",
      price: 3500,
      stock: 5,
      category: "Bebestibles",
      image: "/images/Bebestibles/6.jpg",
    },
    {
      id: 7,
      name: "Canapes de ricota y jamón",
      price: 7990,
      stock: 10,
      category: "Entradas",
      image: "/images/Entradas/7.jpg",
    },
    {
      id: 8,
      name: "Porción de ostras",
      price: 9990,
      stock: 4,
      category: "Entradas",
      image: "/images/Entradas/8.jpg",
    },
    {
      id: 9,
      name: "Bebidas 591ml",
      price: 3500,
      stock: 6,
      category: "Bebestibles",
      image: "/images/Bebestibles/1.jpg",
    },
    {
      id: 11,
      name: "Limonada",
      price: 4000,
      stock: 10,
      category: "Bebestibles",
      image: "/images/Bebestibles/3.jpg",
    },
    {
      id: 12,
      name: "Cervezas artesanales",
      price: 4500,
      stock: 8,
      category: "Bebestibles",
      image: "/images/Bebestibles/4.jpg",
    },
    {
      id: 15,
      name: "Café de especialidad",
      price: 3500,
      stock: 8,
      category: "Bebestibles",
      image: "/images/Bebestibles/7.jpg",
    },
    {
      id: 25,
      name: "Waffles con syrup",
      price: 3990,
      stock: 10,
      category: "Postres",
      image: "/images/Postres/5.jpg",
    },
    {
      id: 16,
      name: "Nuggets",
      price: 5990,
      stock: 15,
      category: "Menú niños",
      image: "/images/MenuNiños/1.jpg",
    },
    {
      id: 18,
      name: "Porción de papas fritas",
      price: 3500,
      stock: 7,
      category: "Menú niños",
      image: "/images/MenuNiños/3.jpg",
    },
    {
      id: 19,
      name: "Alitas de pollo",
      price: 5990,
      stock: 10,
      category: "Menú niños",
      image: "/images/MenuNiños/4.jpg",
    },
    {
      id: 39,
      name: "Pizza mar y tierra",
      price: 12990,
      stock: 3,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/13.jpg",
    },
    {
      id: 20,
      name: "Porción empanadas de queso",
      price: 4990,
      stock: 4,
      category: "Menú niños",
      image: "/images/MenuNiños/5.jpg",
    },
    {
      id: 21,
      name: "Brownie con helado",
      price: 3990,
      stock: 6,
      category: "Postres",
      image: "/images/Postres/1.jpg",
    },
    {
      id: 3,
      name: "Dedos de queso",
      price: 7990,
      stock: 8,
      category: "Entradas",
      image: "/images/Entradas/3.jpg",
    },
    {
      id: 22,
      name: "Torta de queso",
      price: 2990,
      stock: 20,
      category: "Postres",
      image: "/images/Postres/2.jpg",
    },
    {
      id: 23,
      name: "Tiramisú",
      price: 3990,
      stock: 10,
      category: "Postres",
      image: "/images/Postres/3.jpg",
    },
    {
      id: 24,
      name: "Pie de limón",
      price: 4500,
      stock: 8,
      category: "Postres",
      image: "/images/Postres/4.jpg",
    },
    {
      id: 2,
      name: "Salame con tostadas",
      price: 5990,
      stock: 5,
      category: "Platos de fondo",
      image: "/images/Entradas/2.jpg",
    },
    {
      id: 26,
      name: "Porción de galletas",
      price: 2990,
      stock: 5,
      category: "Postres",
      image: "/images/Postres/6.jpg",
    },
    {
      id: 13,
      name: "Copa de vino",
      price: 4000,
      stock: 10,
      category: "Bebestibles",
      image: "/images/Bebestibles/5.jpg",
    },
    {
      id: 27,
      name: "Filete de pollo con ensalada",
      price: 8990,
      stock: 8,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/1.jpg",
    },
    {
      id: 28,
      name: "Pechuga de pollo con brocoli",
      price: 6990,
      stock: 15,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/2.jpg",
    },
    {
      id: 30,
      name: "Puré con pechuga de pollo",
      price: 9990,
      stock: 7,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/4.jpg",
    },
    {
      id: 31,
      name: "Cordero con reducción de zapallo",
      price: 11990,
      stock: 10,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/5.jpg",
    },
    {
      id: 32,
      name: "Filete de vacuno con mix de tomates asados",
      price: 11990,
      stock: 8,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/6.jpg",
    },
    {
      id: 34,
      name: "Laminas de pescado con papas",
      price: 10990,
      stock: 3,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/8.jpg",
    },
    {
      id: 17,
      name: "Filetes de pollo",
      price: 6990,
      stock: 3,
      category: "Menú niños",
      image: "/images/MenuNiños/2.jpg",
    },
    {
      id: 35,
      name: "Pasta con camarones",
      price: 11990,
      stock: 7,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/9.jpg",
    },
    {
      id: 37,
      name: "Raviolis de cerdo con salsa de tomate",
      price: 11990,
      stock: 8,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/11.jpg",
    },
    {
      id: 38,
      name: "Pasta con salsa de tomates",
      price: 7990,
      stock: 15,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/12.jpg",
    },
    {
      id: 10,
      name: "Jugos naturales 500ml",
      price: 4000,
      stock: 20,
      category: "Bebestibles",
      image: "/images/Bebestibles/2.jpg",
    },
    {
      id: 40,
      name: "Fajitas de pollo",
      price: 5990,
      stock: 7,
      category: "Platos de fondo",
      image: "/images/PlatosFondo/14.jpg",
    },
  ];

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
    const [newProduct, setNewProduct] = useState({
      name: '',
      image: '',
      stock: 0,
      price: 0,
      category: categories[0]
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [tempStock, setTempStock] = useState(0);
    const [errors, setErrors] = useState({
      name: '',
      image: ''
    });
  
    const [productList, setProductList] = useState<Product[]>(products); // Inicialmente vacío
  
    const filteredProducts = productList.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (product.category === selectedCategory || selectedCategory === '')
    );
  
    const params = useParams();
    const name = params.name;
    const router = useRouter();
  
    const openModal = (product: Product) => {
      setSelectedProduct(product);
      setTempStock(product.stock);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    const openDeleteModal = (product: Product) => {
      setProductToDelete(product);
      setShowDeleteModal(true);
    };
  
    const closeDeleteModal = () => {
      setShowDeleteModal(false);
      setProductToDelete(null);
    };
  
    const handleDeleteProduct = () => {
      if (productToDelete) {
        setProductList(prevState => prevState.filter(product => product.id !== productToDelete.id));
      }
      closeDeleteModal();
    };
  
    const handleModifyStock = (amount: number) => {
      setTempStock(prevStock => Math.max(prevStock + amount, 0));
    };
  
    const handleConfirm = () => {
      if (selectedProduct) {
        setProductList(prevState =>
          prevState.map(p =>
            p.id === selectedProduct.id ? { ...p, stock: tempStock } : p
          )
        );
      }
      closeModal();
    };
  
    const handleCategoryClick = (category: string) => {
      setSelectedCategory(prevCategory => prevCategory === category ? '' : category);
    };
  
    const openCreateModal = () => {
      setShowCreateModal(true);
    };
  
    const closeCreateModal = () => {
      setNewProduct({
        name: '',
        image: '',
        stock: 0,
        price: 0,
        category: categories[0]
      });
      setErrors({
        name: '',
        image: ''
      });
      setShowCreateModal(false);
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value } = e.target;
      setNewProduct(prevState => ({ ...prevState, [id]: value }));
      setErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
    };
  
    const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value } = e.target;
      if (/^\d*$/.test(value)) {
        setNewProduct({
          ...newProduct,
          [id]: value
        });
      }
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProduct(prevState => ({ ...prevState, image: reader.result as string }));
          setErrors(prevErrors => ({ ...prevErrors, image: '' }));
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleCreateProduct = () => {
      let valid = true;
      let errors = {
        name: '',
        image: ''
      };
  
      if (!newProduct.name.trim()) {
        errors.name = 'El nombre es obligatorio';
        valid = false;
      }
  
      if (!newProduct.image) {
        errors.image = 'La imagen es obligatoria';
        valid = false;
      }
  
      setErrors(errors);
  
      if (valid) {
        const newId = productList.length > 0 ? Math.max(...productList.map(product => product.id)) + 1 : 1;
        const product = { ...newProduct, id: newId };
        setProductList(prevState => [...prevState, product]);
        closeCreateModal();
      }
    };
  
    return (
      <div className="flex bg-gray-800 text-white">
        <SidebarAdmin />
        <div className="w-full p-8">
          <div className="flex items-center mb-0">
            <h1 className="text-2xl mb-9">Productos {name}</h1>
            <div className="ml-auto mb-9 flex items-center">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-4"
                onClick={openCreateModal}
              >
                Crear Producto
              </button>
              <Search className="text-white mr-2" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-lg bg-gray-700"
              />
            </div>
          </div>
          
          <div className="h-1 bg-red-600 mb-4"></div>
          <div className="flex space-x-4 mb-8">
            {categories.map(category => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-gray-700 p-4 rounded-lg">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-lg">{product.name}</h3>
                <p>Precio: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 mr-2"
                  onClick={() => openModal(product)}
                >
                  Modificar Stock
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
                  onClick={() => openDeleteModal(product)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
  
          {showCreateModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 p-4 rounded-lg w-1/2">
                <h2 className="text-lg mb-4">Crear Producto</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name" className="block text-white">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg bg-gray-700"
                      required
                    />
                    {errors.name && <p className="text-red-600">{errors.name}</p>}
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="image" className="block text-white">Imagen</label>
                    <input
                      type="file"
                      id="image"
                      onChange={handleFileChange}
                      className="w-full p-2 rounded-lg bg-gray-700"
                      required
                    />
                    {errors.image && <p className="text-red-600">{errors.image}</p>}
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="stock" className="block text-white">Stock</label>
                    <input
                      type="text"
                      id="stock"
                      value={newProduct.stock}
                      onChange={handleNumericInputChange}
                      className="w-full p-2 rounded-lg bg-gray-700"
                      required
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="price" className="block text-white">Precio</label>
                    <input
                      type="text"
                      id="price"
                      value={newProduct.price}
                      onChange={handleNumericInputChange}
                      className="w-full p-2 rounded-lg bg-gray-700"
                      required
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="category" className="block text-white">Categoría</label>
                    <select
                      id="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg bg-gray-700"
                      required
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-4"
                      onClick={closeCreateModal}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleModifyStock(-1)}
                  >
                    -
                  </button>
                  <span className="text-lg">{tempStock}</span>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleModifyStock(1)}
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-4"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={handleConfirm}
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
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-4"
                    onClick={closeDeleteModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    onClick={handleDeleteProduct}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ProductManagement;