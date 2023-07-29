import { twMerge } from 'tailwind-merge'

const variants = {
  primary:
    'inline-flex text-lg py-2 animate-background-shine items-center justify-center rounded-md border border-white bg-image-[linear-gradient(110deg,#000103,45%,#9146FF,55%,#000103)] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'
}

const Button = ({ children, className = '', variant = 'primary', onClick }) => {
  const _class = twMerge(variants[variant] ?? variants.primary, className)
  return (
    <button className={_class} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
