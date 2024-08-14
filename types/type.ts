export interface searchParamsType {
	message: string,
	status: "success" | "error"
}

interface Description {
  title: string;
  details: string[];
}

export interface PlanCardType {
  title: string;
  price: string;
  per: string;
  showPerChangeHandler: boolean;
  description: Description;
	btnVariant: "default" | "destructive" | "outline";
}

export interface ChatbotType {
  id: string;
  name: string;
}

export interface IngestestedTextType {
  chatbot_id: string;
  content: string;
  id: string;
  type: string;
}