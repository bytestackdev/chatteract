import React from 'react'
import { Button } from '../ui/button'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className=" text-white pt-20 pb-10">
      <div className=" grid grid-cols-2 gap-2">
        <div className=" px-10">
          <div>
            <p className=" font-semibold text-3xl">BYTESTACK.AI</p>
            <p className=" text-base font-extralight mt-2">Custom ChatGPT for your website</p>
            <div className=" mt-5 flex items-center gap-4">
              <Button variant={'secondary'} size={'lg'}>Contact</Button>
              <Button variant={'secondary'} size={'icon'}><FaInstagram size={25} /></Button>
              <Button variant={'secondary'} size={'icon'}><FaFacebook size={25} /></Button>
              <Button variant={'secondary'} size={'icon'}><FaLinkedin size={25} /></Button>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3">
            <div>
              <p className=" font-semibold">Product</p>
              <div className=" text-base font-extralight">
                <p><a href="">Pricing</a></p>
                <p><a href="">Security</a></p>
                <p><a href="">Afiliates</a></p>
              </div>
            </div>
            <div>
              <p className=" font-semibold">Resources</p>
              <div className=" text-base font-extralight">
                <p><a href="">API</a></p>
                <p><a href="">Contact Us</a></p>
                <p><a href="">Guide</a></p>
                <p><a href="">Blog</a></p>
              </div>
            </div>
            <div>
              <p className=" font-semibold">Company</p>
              <div className=" text-base font-extralight">
                <p><a href="">Privacy Policy</a></p>
                <p><a href="">Terms of Service</a></p>
                <p><a href="">DPA</a></p>
                <p><a href="">Cookie Policy</a></p>
                <p><a href="">Trust Center</a></p>
                <p><a href="">Cookie Preferences</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer