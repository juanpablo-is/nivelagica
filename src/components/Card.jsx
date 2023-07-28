import { twMerge } from 'tailwind-merge'

const Card = ({ children, className = '', onClick }) => {
  const _class = twMerge(
    'inline-flex h-full w-full items-center justify-center rounded-xl bg-black px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl',
    className
  )

  return (
    <div
      className='relative h-32 w-32 overflow-hidden rounded-xl border border-black p-[1px] backdrop-blur-3xl bg-white hover:bg-light'
      onClick={onClick}
    >
      {/* <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' /> */}
      <div className={_class}>{children}</div>
    </div>
  )
}

export default Card
