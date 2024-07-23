import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const AccordionTriggerComponent = ({ count, title }: { count: string, title: string }) => {

  return (
    <div className=" flex flex-row gap-3 items-center">
      <p className=" text-sm">{count}</p>
      <p className=" md:text-2xl font-semibold">{title}</p>
    </div>
  )
}
const HowItWorks = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <div className=" mb-5">
        <p className="uppercase text-base text-purple-600 font-bold">How It Works</p>
        <p className="text-lg font-medium">Add your data sources, train the AI, customize it to your liking, and add it to your website</p>
      </div>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <AccordionTriggerComponent count="01" title="Import your data" />
        </AccordionTrigger>
        <AccordionContent>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <AccordionTriggerComponent count="02" title="Customize beaviour & appearance" />
        </AccordionTrigger>
        <AccordionContent>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <AccordionTriggerComponent count="03" title="Embed on your website" />
        </AccordionTrigger>
        <AccordionContent>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          <AccordionTriggerComponent count="04" title="Intergrate with your tools" />
        </AccordionTrigger>
        <AccordionContent>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default HowItWorks