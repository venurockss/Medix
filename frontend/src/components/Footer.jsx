import React from 'react'
import { assets } from "../assets/assets"

const Footer = () => {
    return (
        <div className='md:mx-10'>
                <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* left-section */}
                <div>
                    <img className='mb-5 w-40 ' src={assets.medix_logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, dolorem consequuntur ea a nisi vel tempore, officiis, est molestias dolores facilis ullam. Iste suscipit, vitae quod dicta expedita voluptatem culpa!</p>
                </div>

                {/* center */}
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-2 text-gray'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/* right */}
                <div>
                   <p className='text-xl font-medium mb-5'>GET in Touch</p>
                   <ul className='flex flex-col gap-2 text-gray'>
                    <li>+121-1437571778</li>
                    <li>example@gmail.com</li>
                   </ul>
                </div>

            </div>
            <div>
                {/* copy-right */}
                <div>
                    <hr />
                    <p className='py-5 text-sm text-center'>copyright 2024@example-All right reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
