

const TypingIndicator = () => {
  return (
    <div className='self-start p-3 h-7 items-center  flex gap-1 bg-gray-200 rounded-xl'>
        <Dot />
        <Dot className={'[animation-delay:0.2s]'}/>
        <Dot className={'[animation-delay:0.4s]'}/>
    </div>
  )
}

export default TypingIndicator

type DotProps = {
  className?: string;
}
const Dot = ({ className }: DotProps) => {
  return (
    <div className={`w-2 h-2 rounded-full bg-stone-900 animate-pulse ${className}`}></div>
  )
}