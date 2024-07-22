import Image from 'next/image'
import React from 'react'
import FeatureCard from './FeatureCard'

const Features = () => {
  return (
    <>
      <div className=" mb-5">
        <p className="uppercase text-base text-purple-600 font-bold">powerful features</p>
        <p className="text-lg font-medium">Everything you need for your no-code AI chatbot</p>
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-3 gap-10 md:p-10'>
        <FeatureCard
          cardUrl='/card1.png'
          title='Trustworthy, Accurate Answers'
          subtitle='With features like "Revise answers" and "Confidence score" you can be sure your chatbot is giving the right answers.'
        />
        <FeatureCard
          cardUrl='/card2.png'
          title='Lead Generation Engine'
          subtitle="Collect leads and gather your customer's data, all while providing a personalized experience."
        />
        <FeatureCard
          cardUrl='/card3.png'
          title='Advanced Analytics'
          subtitle="Get insights into your chatbots interactions with your customers and use them to improve its performance."
        />
      </div>
    </>
  )
}

export default Features