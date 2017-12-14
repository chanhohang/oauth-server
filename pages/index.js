'use strict'

import React from 'react'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { translate } from 'react-i18next'
import i18n from '../src/app/i18n'

const PostLink = ({ show }) => (
  <li>
    <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
      <a>{show.name}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)

var Index = (props) => (

  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <PostLink key={show.id} show={show} />
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }
    `}</style>
  </Layout>
)

const Extended = translate(['common'], { i18n, wait: process.browser })(Index);
Extended.getInitialProps = async function (context) {
  const req = context.req
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  // Passing down initial translations
  // use req.i18n instance on serverside to avoid overlapping requests set the language wrong
  if (req && !process.browser) {
    i18n.getInitialProps(req, ['common']);
    console.log('i18n is initialized.')
  }

  return {
    shows: data
  }
}

export default Extended