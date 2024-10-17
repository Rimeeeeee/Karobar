import { useState } from "react"
import { Cart } from "../components/Cart"
import { FaCartShopping } from "react-icons/fa6"
const products = [
  {
    id: 4441,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
    quantity: 1,
  },
  {
    id: 442,
    name: "Medium Stuff Satchel",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top.",
    price: "$32",
    color: "Blue",
    quantity: 1,
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
    quantity: 1,
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top.",
    price: "$32",
    color: "Blue",
    quantity: 1,
  },
  {
    id: 11,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
    quantity: 1,
  },
  {
    id: 24,
    name: "Medium Stuff Satchel",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top.",
    price: "$32",
    color: "Blue",
    quantity: 1,
  },
  {
    id: 44,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
    quantity: 1,
  },
  {
    id: 78,
    name: "Medium Stuff Satchel",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top.",
    price: "$32",
    color: "Blue",
    quantity: 1,
  },
  // More products...
]

export const Merch = () => {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="bg-black min-h-screen py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Spend your ICS Token Here....
          </h2>
          <button
            onClick={() => setCartOpen(true)}
            className="mt-0 flex flex-row bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Cart
            <div className="mt-1 m-1 ml-2">
              <FaCartShopping />
            </div>
          </button>
        </div>
        <div className="mt-8"></div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-zinc-900 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-white">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-blue-500">
                  {product.price}
                </p>
              </div>
              <button
                // onClick={() => setCartOpen(true)}
                className="w-full bg-indigo-600 text-white px-1 py-1 rounded-md hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Button to open cart */}

        {/* Shopping cart component */}
        <div className="mt-14">
          <Cart
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            products={products}
          />
        </div>
      </div>
    </div>
  )
}
