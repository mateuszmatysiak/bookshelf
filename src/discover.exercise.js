/** @jsx jsx */
import {jsx} from '@emotion/core'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'
import React from 'react'

function DiscoverBooksScreen() {
  const [state, setState] = React.useState({
    status: 'idle',
    data: [],
    query: '',
    queried: false,
  })

  const {status, data, query, queried} = state

  React.useEffect(() => {
    if (queried) {
      setState(prevState => ({...prevState, status: 'loading'}))
      client(
        `books?query=${encodeURIComponent(encodeURIComponent(query))}`,
      ).then(data => {
        setState(prevState => ({
          ...prevState,
          status: 'success',
          data,
        }))
      })
    }
  }, [query, queried])

  function handleSearchSubmit(event) {
    event.preventDefault()
    const {search} = event.target.elements
    setState(prevState => ({...prevState, queried: true, query: search.value}))
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {status === 'loading' ? (
                <Spinner />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {status === 'success' ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
