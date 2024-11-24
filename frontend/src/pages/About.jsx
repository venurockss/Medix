import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500 '>
        <p>
          ABOUT <span className='text-gray-700 font-medium'>US</span>
        </p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 '>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae architecto ipsum aut possimus deserunt voluptatibus doloremque asperiores quas debitis ab corrupti obcaecati, ad deleniti iure quaerat ratione dolorem dignissimos maxime!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione molestias aut nulla, assumenda, culpa enim reiciendis totam id eaque reprehenderit cumque distinctio, minima facilis consectetur minus sint cupiditate similique explicabo!</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum tenetur quam molestias consequuntur voluptatem, unde fuga qui labore pariatur ab rem temporibus sequi. Nulla unde quisquam officia quia officiis quaerat?</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>Why <span className='text-gray-700 font-semibold'>Choose</span> Us</p>

      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary text-white transition-all duration-300 text-gray-800 cursor-pointer'>
          <b>Effiecncy:</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi id enim totam illum esse consectetur itaque tempore, sapiente numquam ipsa dolorum modi mollitia quisquam assumenda dolor quo aliquid soluta. Temporibus.</p>
        </div>
        <div  className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary text-white transition-all duration-300 text-gray-800 cursor-pointer'>
          <b>convenience:</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis excepturi nihil ex deleniti qui consectetur possimus, alias vitae distinctio ab eaque, sunt doloribus consequuntur repellendus nam blanditiis quos natus iure!</p>
        </div>
        <div  className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary text-white transition-all duration-300 text-gray-800 cursor-pointer'>
          <b>Personalization:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem mollitia consectetur esse tempore, optio vitae debitis vel alias fugiat hic placeat perferendis rerum in recusandae doloremque voluptas. Nam, iste eum!</p>
        </div>
      </div>
    </div>
  )
}

export default About
