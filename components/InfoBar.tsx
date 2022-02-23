const InfoBar = ({title, itemsCount, infoLines}) => {
  return (
    <>
      <div className='text-2xl uppercase'>{title} {itemsCount >= 0 && `(${itemsCount})`}</div>
      <details className='ml-2 text-sm'>
        <summary>info</summary>
        <div className='ml-3'>
          {infoLines.map((line, idx) => <span key={idx}>• {line}<br/></span>)}
        </div>
      </details> 
    </>
  );
}

export default InfoBar;
