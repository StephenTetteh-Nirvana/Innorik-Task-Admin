import LoginForm from '@/components/app/LoginForm'
import Image from 'next/image'

const login = () => {
  return (
    <div className='w-full h-[100vh] grid grid-cols-1 sm:grid-cols-2 bg-slate-100'>
      <div className=''>
        <Image
          src="/authImage.jpg"
          alt="AdminImage"
          width={500}
          height={500}
          className='w-full h-full object-cover bg-black/30'
        />
      </div>
      <LoginForm/>
    </div>
  )
}

export default login