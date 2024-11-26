'use client'

import { createProduct, getProduct, updateProduct } from '@/data/products'
import { editProductSchema } from '@/schemas/product'
import {
  EditProductData,
  EditProductDataErrors,
  EditProductType,
} from '@/types/products'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const initialData: EditProductData = {
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
}

const initialErrors: EditProductDataErrors = {
  title: [],
  price: [],
  description: [],
  category: [],
  image: [],
}

export const EditProduct: EditProductType = ({ editing }) => {
  const [product, setProduct] = useState<EditProductData>(initialData)
  const [productErrors, setProductErrors] =
    useState<EditProductDataErrors>(initialErrors)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        const result = await getProduct(Number(id))

        console.log(result)

        if (result.success) {
          setProduct({
            title: result.product.title,
            category: result.product.category,
            image: result.product.image,
            description: result.product.description,
            price: result.product.price,
          })
        }
      }
    }

    if (editing && id) fetchProductData()
  }, [editing, searchParams, id])

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const validation = editProductSchema.safeParse(product)

    if (validation.success) {
      if (editing) {
        sendDataToUpdateProduct() // editar produto
      } else {
        sendDataToCreateProduct() // criar produto
      }
    } else {
      setProductErrors({
        ...initialErrors,
        ...validation.error.formErrors.fieldErrors,
      })
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setProductErrors((prevState) => ({
      ...prevState,
      [name]: [],
    }))

    if (name !== 'price') {
      setProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    } else if (name === 'price') {
      setProduct((prevState) => ({
        ...prevState,
        price: Number(value),
      }))
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    setProductErrors((prevState) => ({
      ...prevState,
      image: [],
    }))

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProduct((prevState) => ({
        ...prevState,
        image: imageUrl,
      }))
    }
  }

  const sendDataToCreateProduct = async () => {
    const response = await createProduct(product)

    if (response.success) {
      toast.success('Produto criado com sucesso')
      setProduct(initialData)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } else {
      toast.error('Não foi possível criar o produto')
    }
  }

  const sendDataToUpdateProduct = async () => {
    if (id) {
      const response = await updateProduct(Number(id), product)

      if (response.success) {
        toast.success('Produto Atualizado com sucesso')
        setProduct(initialData)

        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }

        router.push('/produtos')
      } else {
        toast.error('Não foi possível atualizar o produto')
      }
    }
  }

  return (
    <form action="" className="mx-auto max-w-96" onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-5">
        <label className="flex flex-col">
          <span className="font-medium">Título</span>
          <input
            type="text"
            placeholder="Ex: Camisa masculina"
            className={`rounded-sm border px-2 py-1 ${productErrors.title.length > 0 ? 'border-red' : 'border-gray-400'}`}
            onChange={handleInputChange}
            name="title"
            value={product.title}
          />
          {productErrors.title.length > 0 &&
            productErrors.title.map((error, index) => (
              <small key={index}>{error}</small>
            ))}
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Preço</span>
          <input
            type="number"
            placeholder="Ex: 119,90"
            className={`rounded-sm border border-gray-400 px-2 py-1 ${productErrors.price.length > 0 ? 'border-red' : 'border-gray-400'}`}
            onChange={handleInputChange}
            name="price"
            value={product.price}
          />
          {productErrors.price.length > 0 &&
            productErrors.price.map((error, index) => (
              <small key={index}>{error}</small>
            ))}
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Descrição</span>
          <input
            type="text"
            placeholder="Ex: Camisa masculina de algodão"
            className={`rounded-sm border border-gray-400 px-2 py-1 ${productErrors.description.length > 0 ? 'border-red' : 'border-gray-400'}`}
            onChange={handleInputChange}
            name="description"
            value={product.description}
          />
          {productErrors.description.length > 0 &&
            productErrors.description.map((error, index) => (
              <small key={index}>{error}</small>
            ))}
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Categoria</span>
          <input
            type="text"
            placeholder="Ex: Camisa"
            className={`rounded-sm border border-gray-400 px-2 py-1 ${productErrors.category.length > 0 ? 'border-red' : 'border-gray-400'}`}
            onChange={handleInputChange}
            name="category"
            value={product.category}
          />
          {productErrors.category.length > 0 &&
            productErrors.category.map((error, index) => (
              <small key={index}>{error}</small>
            ))}
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Imagem</span>
          <input
            type="file"
            accept="image/*"
            className={`${productErrors.image.length > 0 && 'rounded-sm border border-red'}`}
            onChange={handleImageChange}
            name="image"
            ref={fileInputRef}
          />
          {productErrors.image.length > 0 &&
            productErrors.image.map((error, index) => (
              <small key={index}>{error}</small>
            ))}
        </label>

        <button
          className="rounded-md border bg-blue-950 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
          type="submit"
        >
          {editing ? 'Editar produto' : 'Criar novo produto'}
        </button>
      </div>
    </form>
  )
}
