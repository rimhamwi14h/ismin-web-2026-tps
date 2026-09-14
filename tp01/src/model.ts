export type Task = "text-generation" | "translation" | "image-classification" | "speech-to-text";
export type Model = {
  id: string;
  name: string;
  org: string;
  task: Task;
  parameters: number;
  downloads: number;
  license?: string;
};