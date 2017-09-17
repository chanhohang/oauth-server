'use strict'

import Link from 'next/link'
import React from 'react'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <Link href="/login">
      <a style={linkStyle}>Login</a>
    </Link>
  </div>
)

export default Header