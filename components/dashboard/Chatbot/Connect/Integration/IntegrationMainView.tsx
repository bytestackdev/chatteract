import React from 'react'
import IntegrationCard from './IntegrationCard'

const IntegrationMainView = () => {

	const intergationData = [
		{
			title: 'Zapier',
			description: 'Connect your chatbot with thousands of apps using Zapier.'
		},
		{
			title: 'Slack',
			description: 'Connect your chatbot with Slack, mention it, and have it reply to any message.'
		},
		{
			title: 'Wordpress',
			description: 'Use the official Chatbase plugin for Wordpress to add the chat widget to your website.'
		},
		{
			title: 'Whatsapp',
			description: 'Connect your chatbot to a WhatsApp number and let it respond messages from your customers.'
		},
		{
			title: 'Messenger',
			description: 'Connect your chatbot to a facebook page and let it respond messages from your customers.'
		},
		{
			title: 'Shopify',
			description: 'Let your chatbot interact with your customers on Shopify, respond to their queries, recommend products, help with orders, and more.'
		}
	]


	return (
		<div className='grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2'>
			{
				intergationData.map((data, index) => (
					<IntegrationCard key={index} cardData={data} />
				))
			}
		</div>
	)
}

export default IntegrationMainView