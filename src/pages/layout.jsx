import React from 'react'

const LayoutRoot = ({children}) => {
  return (
    <>
    <header>
        header
    </header>

    <main>
        {children}
    </main>
    <footer>
        footer
    </footer>
    </>
  )
}

export default LayoutRoot