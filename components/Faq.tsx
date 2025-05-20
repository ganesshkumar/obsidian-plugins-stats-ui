import { Accordion } from 'flowbite-react';
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
            <Accordion.Panel key={idx}>
              <Accordion.Title as="h3">
                <div className="text-gray-700 group-open:font-medium">
                  {faq.question}
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <div className="text-gray-500 dark:text-gray-400">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
      </Accordion>
    </div>
  );
};

export default Faqs;
