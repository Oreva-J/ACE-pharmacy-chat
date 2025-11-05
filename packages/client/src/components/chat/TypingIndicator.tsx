

// const TypingIndicator = () => {
//   return (
//     <div className='self-start p-3 h-7 items-center  flex gap-1 bg-gray-200 rounded-xl'>
//         <Dot />
//         <Dot className={'[animation-delay:0.2s]'}/>
//         <Dot className={'[animation-delay:0.4s]'}/>
//     </div>
//   )
// }
// export default TypingIndicator


// type DotProps = {
    //   className?: string;
    // }
    // const Dot = ({ className }: DotProps) => {
        //   return (
            //     <div className={`w-2 h-2 rounded-full bg-stone-900 animate-pulse ${className}`}></div>
            //   )
            // }
            
            
// Typing Indicator Component
import { FaPills } from "react-icons/fa";


const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="flex gap-3 items-end">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <FaPills className="text-white text-sm" />
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-md border border-gray-100">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator