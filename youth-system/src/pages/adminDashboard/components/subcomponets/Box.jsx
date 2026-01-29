import React from 'react'
import './box.css'

const Box = React.forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      id='border-wrapper'
      className={`w-fit ${className}`}
      {...props}
    >
      <div id="box">
        {children}
      </div>
    </div>
  )
})

Box.displayName = 'Box'

export default Box
