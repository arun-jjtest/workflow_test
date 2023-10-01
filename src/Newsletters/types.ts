export type NewsletterItem = {
  id: string;
  name: string;
  creator: string;
  status: "Sent" | "Draft" | "Sending";
  recipients?: string;
  modifiedAt: string;
};
