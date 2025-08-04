import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from 'flowbite-react';
import React from 'react';
import { Faq } from '../lib/abstractions';

interface IFaqProps {
  faqs: Faq[];
}

const Faqs = ({ faqs }: IFaqProps) => {
  return (
    <div className="w-auto">
      <Accordion>
        {faqs &&
          faqs.map((faq, idx) => (
            <AccordionPanel key={idx}>
              <AccordionTitle as="h3">
                <div className="text-gray-700 group-open:font-medium">
                  {faq.question}
                </div>
              </AccordionTitle>
              <AccordionContent>
                <div className="text-gray-500 dark:text-gray-400">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionPanel>
          ))}
      </Accordion>
    </div>
  );
};

export default Faqs;
