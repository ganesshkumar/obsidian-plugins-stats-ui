const InfoBar = ({ title, itemsCount, infoLines }) => {
  return (
    <>
      <h1 className='text-3xl font-semibold uppercase cursor-context-menu'>{title} {itemsCount >= 0 && `(${itemsCount})`}</h1>
      <details className='ml-2 text-sm'>
        <summary className="cursor-pointer">info</summary>
        <div className='ml-3'>
          {infoLines.map((line, idx) => <span key={idx}>• {line}<br /></span>)}
        </div>
      </details>
    </>
  );
}

export default InfoBar;
