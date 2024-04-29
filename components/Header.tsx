import React from 'react'

const Header = () => {
  return (
    <>
      <section className='bg-white rounded-lg p-4'>
        <div className='flexEnd'>
          <button className='py-2 px-6 bg-[#f14310] text-white rounded-lg font-medium tracking-wider duration-300 hover:bg-black'>
            Login
          </button>
        </div>
      </section>
    </>
  )
}

export default Header