import React from 'react';

const faqs = [
  {
    question: '1. What is the source of plugin list?',
    answer: 'The list of plugins are obtained by parsing the `community-plugins.json` file from `obsidianmd/obsidian-releases` GitHub repository.'
  },
  {
    question: '2. What is the source of plugin description?',
    answer: 'The description of the plugin is populated from the content corresponding to the plugin as found in `community-plugins.json` file.'
  },
  {
    question: '3. What is the source of release changelog?',
    answer: 'The changelog is obtained from the body of release as found in `GET /repos/{repo}/releases` API.'
  },
  {
    question: '4. How are tags populated for a plugin?',
    answer: 'The tags are the topics of the GitHub repo, as found in `GET /repos/{repo}` API. To populate this, you can go to the GitHub repo, click open the gear icon in the About section and update the topics.'
  },
  {
    question: '5. How are the trending plugins calculated?',
    answer: 'The trending plugins are calculated using the z-score obtained over the daily number of downloads - with a small delay added exponentially for the older records.'
  },
  {
    question: '6. Other question?',
    answer: 'If you question is not answered, please open an issue in the GitHub repository (https://github.com/ganesshkumar/obsidian-plugins-stats-ui). We would be happy to answer it for you!'
  }
]

const Faq = () => {
  return (
    <div className='flex flex-col border border-violet-200 bg-violet-50 divide-y divide-violet-200 first:rounded-t-xl last:rounded-b-xl overflow-hidden'>
      {faqs && faqs.map((faq, idx) => (
        <details key={idx} className='relative group open:bg-white'>
          <summary className="before:absolute before:right-0 before:content-['+'] group-open:before:content-['-'] before:mr-2 cursor-pointer list-none py-2 px-2 text-xl group-open:font-medium" id={`faq-${idx}`}>
            {faq.question}
          </summary>
          <div className='ml-3 pl-2 pb-2'>
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  )
}

export default Faq;