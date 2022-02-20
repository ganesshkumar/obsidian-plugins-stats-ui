const IndexWithAnnotations = ({isFavorite, idx, pad}) => {
  return (
    <div className='text-3xl font text-gray-400 px-5'>
      <div>{String(idx).padStart(pad, '0')}.</div>
      {isFavorite && <div>🤩</div>}
    </div>
  );
}

export default IndexWithAnnotations;