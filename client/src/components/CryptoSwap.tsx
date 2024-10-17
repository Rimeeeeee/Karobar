import React, { useState } from "react"
import CurrencyInput from "react-currency-input-field"
import { BiTransfer } from "react-icons/bi"
import { motion } from "framer-motion"
import TestnetInfo from "./Info"

const currencies = ["BTC", "ETH", "SOL", "USDC"]

const CryptoSwap: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("BTC")
  const [toCurrency, setToCurrency] = useState<string>("ETH")
  const [amount, setAmount] = useState<number>(0)
  const [swapResult, setSwapResult] = useState<number | null>(null)

  // Swap logic (mock for demo purposes)
  const handleSwap = () => {
    const mockRate = 0.5 // Example swap rate for demo
    const result = amount * mockRate
    setSwapResult(result)
  }

  const swapOption = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className=" flex flex-col justify-center items-center bg-black overflow-hidden">
      <div className="max-w-lg w-full p-1 bg-black rounded-lg shadow-lg ">
        <div className="flex flex-col items-center justify-between">
          {/* From Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:w-[24rem] lg:w-[32rem] p-4 bg-zinc-950 border rounded-lg shadow-md"
          >
            <label
              htmlFor="from-currency"
              className="block mb-2 text-white font-semibold"
            >
              From:
            </label>
            <select
              id="from-currency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 border bg-zinc-900 text-white rounded-lg focus:ring focus:ring-blue-600"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            <div className="mt-2">
              <label
                htmlFor="amount"
                className="block mb-2 text-white font-semibold"
              >
                Amount:
              </label>
              <CurrencyInput
                id="amount"
                name="amount"
                placeholder="Enter amount"
                defaultValue={0}
                decimalsLimit={8}
                onValueChange={(value) => setAmount(Number(value))}
                className="w-full p-1 border rounded-lg bg-zinc-900 text-white focus:ring focus:ring-blue-600"
              />
              <label
                htmlFor="receiver-address"
                className="block mb-2 mt-2 text-white font-semibold"
              >
                Enter Receiver Address:
              </label>
              <input
                type="text"
                id="receiver-address"
                className="w-full p-1 border rounded-lg bg-zinc-900 text-white focus:ring focus:ring-blue-600"
              />
            </div>
          </motion.div>

          {/* Swap Icon */}
          <div className="mx-2 my-2 bg-transparent">
            <motion.div
              className="bg-transparent"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BiTransfer
                className="w-8 h-8 text-blue-500 rotate-90 cursor-pointer hover:text-purple-500"
                onClick={swapOption}
              />
              <motion.div
                className="absolute w-10 h-10 rounded-md opacity-50 shadow-lg transition-all duration-300 ease-in-out"
                whileHover={{ opacity: 1 }}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: -1,
                }}
              />
            </motion.div>
          </div>

          {/* To Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:w-[24rem] lg:w-[32rem] p-4 bg-zinc-950 border rounded-lg shadow-md"
          >
            <label
              htmlFor="to-currency"
              className="block mb-2 text-white font-semibold"
            >
              To:
            </label>
            <select
              id="to-currency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 border bg-zinc-900 text-white rounded-lg focus:ring focus:ring-blue-600"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            <div className="mt-2">
              <label
                htmlFor="swap-result"
                className="block mb-2 text-white font-semibold"
              >
                You Receive:
              </label>
              <div className="w-full p-1 border bg-zinc-900 text-white rounded-lg">
                {swapResult !== null ? `${swapResult} ${toCurrency}` : "0.00"}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center w-full">
          <motion.button
            onClick={handleSwap}
            className="w-full sm:w-[24rem] lg:w-[32rem] mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Swap
          </motion.button>
        </div>
      </div>
      <div className="mt-1">
        <TestnetInfo />
      </div>
    </div>
  )
}

export default CryptoSwap
