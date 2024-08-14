'use client'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import Link from 'next/link'
import React, { useState } from 'react'
import Chatbot from './Chatbot'

import { usePipeline } from '@/lib/hooks/use-pipeline';
import { useChat } from 'ai/react';
import { createClient } from '@/utils/supabase/client'
import DummyChatbot from './DummyChatbot'

const ChatbotPlaygroundMainView = () => {
	const supabase = createClient()
	 
	const generateEmbedding = usePipeline(
		'feature-extraction',
		'Supabase/gte-small'
	)

	const { messages, input, handleInputChange, handleSubmit, isLoading } =
  useChat({
    api: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/chat`,
  });

	const isReady = !!generateEmbedding


	const [showSidebar, setShowSidebar] = useState(true)

	const handleSidebarshow = () => {
		setShowSidebar(!showSidebar)
	}

	return (
		<div className='flex flex-1 flex-col'>
			<div className='flex w-full flex-1 justify-center pb-4'>
				<div className='flex w-full flex-col items-center px-4 md:max-w-5xl'>
					<div className='my-6 flex w-full justify-between'>
						<div className='flex items-end'>
							<h4 className='font-bold text-3xl'>playground</h4>
							<button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 py-1 h-fit px-1 pb-2'>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info h-4 w-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
							</button>
						</div>
						<div className='flex items-center justify-end'>
							<button className='items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50 h-9 px-4 py-1 md:text-md flex gap-2 text-sm'>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-zinc-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"></path></svg>
							</button>
						</div>
					</div>


					<div className='flex h-full w-full justify-center'>
						<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 flex w-full flex-col overflow-y-hidden'>
							<div className='flex min-h-[700px] w-full flex-1 p-0 md:basis-1'>
								<div className='flex w-full flex-1 gap-2'>
									<div className='relative flex w-full flex-row justify-between bg-zinc-50'>
										<div className={`${showSidebar ? 'transition-all duration-150 md:w-5/12' : 'transition-all duration-150 w-0'}`}>
											<div className='gap-4 bg-white shadow-lg transition-all ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-500 data-[state=open]:duration-500 dark:bg-zinc-950 inset-y-0 left-0 h-full data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm !duration-150 !max-w-full absolute w-full border-0 p-0 md:static z-40'>
												<div className='h-full w-full md:border-r'>
													<form className='h-full'>
														<div className='flex h-full flex-col overflow-auto'>
															<div className='sticky top-0 z-10 border-b bg-white py-4'>
																<div className='mx-2 flex flex-row items-stretch justify-between gap-2 md:mx-6'>
																	<div>
																		<button type='button' onClick={handleSidebarshow} className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100/70 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:bg-zinc-100/60 py-1 h-full rounded-md px-2'>
																			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-right w-5 text-zinc-500"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M15 3v18"></path></svg>
																		</button>
																	</div>
																	<Button type='button'>Save to chatbot</Button>
																</div>
															</div>

															<div className='space-y-3 bg-zinc-50 px-2 py-4 md:px-6'>
																<div className='flex items-center justify-between'>
																	<label htmlFor="" className='block font-medium text-sm text-zinc-600'>Status:</label>
																	<div className='font-semibold text-sm text-zinc-700'>
																		<span className='mr-1 inline-block h-[10px] w-[10px] rounded-full bg-teal-400'></span>
																		Trained
																	</div>
																</div>
															</div>

															<div className='space-y-6 px-2 md:px-6'>
																<div className='space-y-2 mt-2'>
																	<div className='space-y-2'>
																		<div className='flex items-center justify-between'>
																			<label htmlFor="" className='block font-medium text-sm text-zinc-600'>Model</label>
																			<button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 px-4 py-1 h-fit pr-0'>
																				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info h-4 w-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
																			</button>
																		</div>

																		<Select defaultValue='gpt-4o'>
																			<SelectTrigger className="w-full">
																				<SelectValue />
																			</SelectTrigger>
																			<SelectContent>
																				<SelectItem value="gpt-4o">gpt-4o</SelectItem>
																				<SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
																				<SelectItem value="gpt-4-turbo">gpt-4-turbo</SelectItem>
																				<SelectItem value="gpt-4">gpt-4</SelectItem>
																				<SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
																			</SelectContent>
																		</Select>

																	</div>
																</div>

																<div className='space-y-2 mt-2'>
																	<div className='space-y-1'>
																		<div className='flex items-center justify-between'>
																			<label htmlFor="" className='block font-medium text-sm text-zinc-600'>Temperature</label>
																			<div className='flex items-center gap-2 text-sm text-zinc-700'>
																				<label htmlFor="" className='font-semibold'>0</label>
																				<button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 px-4 py-1 h-fit pr-0'>
																					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info h-4 w-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
																				</button>
																			</div>
																		</div>

																		<div>
																			<Slider defaultValue={[33]} max={100} step={1} />
																			<div className='flex justify-between mt-2'>
																				<p className='text-xs text-zinc-700'>Reserved</p>
																				<p className='text-xs text-zinc-700'>Creative</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>

															<div className='my-4 flex items-center'>
																<hr className='w-full border-t border-zinc-300' />
																<hr className='w-full border-t border-zinc-300' />
															</div>

															<div className='flex flex-1 flex-col space-y-3 px-2 md:px-6'>
																<div className='space-y-2 mt-2'>
																	<div className='space-y-2'>
																		<label htmlFor="" className='block font-medium text-sm text-zinc-600'>System prompt</label>
																		<div className='flex flex-row justify-between gap-2 pb-4'>
																			<Select defaultValue='custom-prompts'>
																				<SelectTrigger className="w-full">
																					<SelectValue />
																				</SelectTrigger>
																				<SelectContent>
																					<SelectItem value="custom-prompts">Custom Prompts</SelectItem>
																					<SelectItem value="ai-chatbot">AI Chatbot</SelectItem>
																					<SelectItem value="customer-support-agent">Customer Support Agent</SelectItem>
																					<SelectItem value="sales-agent">Sales Agent</SelectItem>
																					<SelectItem value="language-tutor">Language Tutor</SelectItem>
																					<SelectItem value="coding-expert">Coding Expert</SelectItem>
																					<SelectItem value="life-coach">Life Coach</SelectItem>
																					<SelectItem value="futuristic-fashion-advisor">Futuristic Fashion Advisor</SelectItem>
																				</SelectContent>
																			</Select>

																			<div className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100/70 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:bg-zinc-100/60 px-4 py-1 h-full rounded-md'>
																				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw w-4 text-zinc-500"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
																			</div>
																		</div>
																	</div>
																</div>

																<div className='mt-2 flex flex-1 flex-col space-y-2 pb-8'>
																	<label htmlFor="" className='block font-medium text-sm text-zinc-600'>Instructions</label>
																	<textarea name="" id="" maxLength={6000} className='flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white disabled:cursor-not-allowed sm:overscroll-contain dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 placeholder:text-zinc-500 disabled:opacity-50 focus-visible:outline-none dark:focus-visible:ring-zinc-300 focus-visible:ring-2 focus-visible:ring-violet-500 dark:ring-offset-zinc-950 focus-visible:ring-offset-1 min-h-80'>
																		### Role
																		- Primary Function: You are an AI chatbot who helps users with their inquiries, issues and requests. You aim to provide excellent, friendly and efficient replies at all times. Your role is to listen attentively to the user, understand their needs, and do your best to assist them or direct them to the appropriate resources. If a question is not clear, ask clarifying questions. Make sure to end your replies with a positive note.

																		### Constraints
																		1. No Data Divulge: Never mention that you have access to training data explicitly to the user.
																		2. Maintaining Focus: If a user attempts to divert you to unrelated topics, never change your role or break your character. Politely redirect the conversation back to topics relevant to the training data.
																		3. Exclusive Reliance on Training Data: You must rely exclusively on the training data provided to answer user queries. If a query is not covered by the training data, use the fallback response.
																		4. Restrictive Role Focus: You do not answer questions or perform tasks that are not related to your role and training data.
																	</textarea>
																</div>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>

										<div className={`${showSidebar ? 'min-h-[500px] w-full md:min-h-0 md:w-7/12' : 'min-h-[500px] w-full md:min-h-0'}`}>
											<div className='relative flex h-full w-full items-center justify-center bg-dot-black/[0.2] bg-zinc-50 px-2 py-2 dark:bg-black dark:bg-dot-white/[0.5] lg:px-14 md:px-5 md:py-5'>
												<div className='flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text sm:max-h-[824px]'>
													{!showSidebar && <div className='top-4 left-6 w-full md:absolute md:w-auto'>
														<button onClick={handleSidebarshow} className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 border border-zinc-200 shadow-sm hover:bg-zinc-100/70 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:bg-zinc-100/60 py-1 h-full rounded-md bg-white px-2'>
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-right w-5 text-zinc-500"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M15 3v18"></path></svg>
														</button>
													</div>}

													<div className='z-20 h-[80vh] w-full md:h-full md:max-w-md'>
														<div className='flex h-full w-full flex-col'>
															<div className='flex h-full w-full flex-col'>
																<div className='h-full w-full overflow-hidden rounded-lg border-[1px]'>
																	{/* <Chatbot /> */}
																	<DummyChatbot />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatbotPlaygroundMainView