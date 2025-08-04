
const waveStyle = {
  backgroundImage:
    "url('https://1.bp.blogspot.com/-xQUc-TovqDk/XdxogmMqIRI/AAAAAAAACvI/AizpnE509UMGBcTiLJ58BC6iViPYGYQfQCLcBGAsYHQ/s1600/wave.png')",
  backgroundSize: '1000px 50px',
};

interface IWavesBackgroundProps {
  title?: string;
}

const WavesBackground = ({ title }: IWavesBackgroundProps) => {
  return (
    <section className='bg-linear-to-b from-violet-800 via-violet-600 to-violet-500 rounded-t-2xl overflow-hidden'>
      {/* <div className='h-[60px]'></div> */}
      <h1 className='pb-12 pt-16 px-8 flex justify-center items-center text-white text-3xl leading-tight whitespace-wrap break-keep'>{title}</h1>
      <div className="relative h-[60px] overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-full h-[50px] z-1000 opacity-100 animate-[wave_30s_linear_infinite]"
          style={waveStyle}
        />
        <div
          className="absolute bottom-[5px] left-0 w-full h-[50px] z-999 opacity-50 animate-[wave2_15s_linear_infinite]"
          style={waveStyle}
        />
        <div
          className="absolute bottom-[7px] left-0 w-full h-[50px] z-998 opacity-20 animate-[wave_30s_linear_infinite] [animation-delay:-2s]"
          style={waveStyle}
        />
        <div
          className="absolute bottom-[10px] left-0 w-full h-[50px] z-997 opacity-70 animate-[wave2_5s_linear_infinite] [animation-delay:-5s]"
          style={waveStyle}
        />
      </div>
    </section>
  );
};

export default WavesBackground;