import Layout from "../components/Layout"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Mail, Lock, User } from "lucide-react"
import { useState } from "react"
import Input from "../components/Input"
import { Link } from "react-router-dom"
import PasswordStrengthMeter from "../components/PasswordStrengthMeter"

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
    console.log({ name, email, password })
  }

  return (
    <Layout>
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="max-w-md w-full bg-slate-800 bg-opacity-10 backdrop-filter backdrop-blur-xs rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-rose-500">
            Create Account
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <Input 
              icon={User}
              type='text'
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email Input */}
            <Input 
              icon={Mail}
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <Input 
              icon={Lock}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <PasswordStrengthMeter password={password} />

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 mt-5 bg-linear-to-r from-orange-500 to-rose-600 text-white font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            >
              Sign Up
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to={'/login'} className="text-orange-400 hover:text-orange-300 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}
export default SignUp