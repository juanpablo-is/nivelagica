import './jelly.css'

const Jelly = ({ color = 'white', size = '50px' }) => {
  return (
    <div>
      <div
        style={{ '--uib-color': color, '--uib-size': size }}
        className='jelly'
      ></div>

      <svg width='0' height='0' className='jelly-maker'>
        <defs>
          <filter id='uib-jelly-ooze'>
            <feGaussianBlur
              in='SourceGraphic'
              stdDeviation='6.25'
              result='blur'
            />
            <feColorMatrix
              in='blur'
              mode='matrix'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7'
              result='ooze'
            />
            <feBlend in='SourceGraphic' in2='ooze' />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default Jelly
