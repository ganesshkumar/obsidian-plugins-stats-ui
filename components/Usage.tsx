import React from 'react';

const Usage = () => {
  return (
    <>
      <h3 className='text-xl text-obsidianInteractive mb-1'>How to use?</h3>
      <ul>
        <li>• Enter Clipper name, Vault name, Folder name(optional) and comma separated values for tags(optional).</li>
        <li>• Click <b>Generate</b> button</li>
        <li>• In browser, drag the genearted clipper(name of the clipper, surrounded in bright purple background) from the right side and drop it in your bookmark/favorties bar.</li>
        <li>• In browser, to update a clipper, right click the item on the bookmark/favorites bar and replace the url with the genearted Javascript code. You can use the <b>Copy JS Clipper</b> button.</li>
        <li>• To embed a link in another web page, use the generated HTML code. You can use the <b>Copy HTML Clipper</b> button.</li>
      </ul>
    </>
  )
}

export default Usage;
