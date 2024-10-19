import { useEffect, useState } from "react"
import { prepareContractCall, readContract, sendTransaction } from "thirdweb"
import { useKBRTokenContext } from "../context/context"
import { download } from "thirdweb/storage"
import { createWallet } from "thirdweb/wallets"

// Define the Product type
type Product = {
  pid: bigint
  name: string
  imageHash: string
  description: string
  price: bigint
  qty: bigint
  imageSrc: string
}

export const Merch = () => {
  const { Marketplace, client } = useKBRTokenContext()
  const [products, setProducts] = useState<Product[]>([]) // Use the Product type
  const defaultImage = "../" // Add a placeholder image path

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await readContract({
          contract: Marketplace,
          method:
            "function getProducts() view returns ((uint256 pid, string name, string imageHash, string description, uint256 price, uint256 qty)[])",
          params: [],
        })
        console.log(data)
        const updatedProducts = await Promise.all(
          data.map(async (product: any) => {
            try {
              const response = await download({
                client,
                uri: `${product.imageHash}`,
              })
              const fileBlob = await response.blob()
              const fileUrl = URL.createObjectURL(fileBlob)
              return {
                ...product,
                imageSrc: fileUrl,
              }
            } catch (error) {
              console.error(
                `Failed to download image for product ${product.name}: `,
                error,
              )
              // Return product with placeholder image
              return {
                ...product,
                imageSrc: defaultImage,
              }
            }
          }),
        )

        setProducts(updatedProducts)
      } catch (error) {
        console.error("Error fetching products: ", error)
      }
    }

    fetchProducts()
  }, [client])

  const handleBuy = async (pid: number) => {
    console.log("Attempting to buy product with pid:", pid) // Debug log
    await Buy(pid)
  }

  const Buy = async (pid: number) => {
    try {
      console.log("Connecting wallet...")
      const wallet = createWallet("io.metamask")
      const account = await wallet.connect({ client })
      console.log("Wallet connected:", account)

      console.log("Preparing contract call for product ID:", pid)
      const transaction = await prepareContractCall({
        contract: Marketplace,
        method: "function buy(uint256 _pid)",
        params: [BigInt(pid)], // Ensure pid is passed as BigInt
      })
      console.log("Transaction prepared:", transaction)

      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      })
      console.log("Transaction successful:", transactionHash)
    } catch (error) {
      console.error("Error during transaction:", error)
    }
  }

  return (
    <div className="bg-black min-h-screen py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Spend your KBR Token Here....
          </h2>
        </div>
        <div className="mt-8"></div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.pid.toString()} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-zinc-900 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  alt={product.description}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-white">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {product.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-blue-500">
                  {product.price.toString()}
                </p>
              </div>
              <button
                onClick={() => handleBuy(Number(product.pid))} // Wrap in arrow function
                className="w-full bg-indigo-600 text-white px-1 py-1 rounded-md hover:bg-indigo-700"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
