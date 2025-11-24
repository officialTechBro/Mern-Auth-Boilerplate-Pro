import FloatingShape from "./FloatingShape"

const Layout = ({children}) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-900 via-rose-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
        <FloatingShape 
            color="bg-orange-500"
            size='w-64 h-64'
            top='-5%'
            left='10%'
            delay={0}
        />
        <FloatingShape 
            color="bg-rose-500"
            size='w-48 h-48'
            top='70%'
            left='80%'
            delay={5}
        />
        <FloatingShape 
            color="bg-amber-500"
            size='w-32 h-32'
            top='40%'
            left='-10%'
            delay={2}
        />
        {children}
    </div>
  )
}
export default Layout