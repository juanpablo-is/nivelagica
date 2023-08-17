import { twMerge } from 'tailwind-merge'

const Card = ({ as = 'div', children, className = '', ...props }) => {
  const _class = twMerge(
    'inline-flex h-full w-full items-center justify-center rounded-xl bg-black px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl',
    className
  )

  const Element = ['div', 'label'].includes(as) ? as : 'div'

  return (
    <Element
      className='flex relative overflow-hidden rounded-xl p-0.5 backdrop-blur-3xl bg-white hover:bg-accent peer-checked:bg-accent'
      {...props}
    >
      {/* <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' /> */}
      <div className={_class}>{children}</div>
    </Element>
  )
}

export default Card
