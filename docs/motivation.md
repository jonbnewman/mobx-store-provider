---
layout: default
title: Motivation
nav_order: 9
---

# Motivation

_Why was mobx-store-provider created?_

- Answer:

  **There was no React Hook API available to use mobx-state-tree in functional components**.

- Long answer:

  I have been a long time user and fan of **mobx** and especially **mobx-state-tree**...so when I went to start incorporating functional components (the new, sexy, modern way to write React) I asked myself:

  _How do I use mobx-state-tree in my functional components?_

  After some extensive google-fu, and a lot of reading, I was surprised to find no library or hooks API to handle **mobx-state-tree** in [React Function Components](https://www.robinwieruch.de/react-function-component).

  Here is what I did find out:

  - There are existing hooks to create and manage **mobx** observables (and related) using the core supported [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) and [mobx-react-lite](https://github.com/mobxjs/mobx-react-lite) libraries.

  - There is [an example](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j) as well as a [discussion](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j/comments) and a [github issue](https://github.com/mobxjs/mobx-state-tree/issues/1363) which talk about using React Context to access **mobx-state-tree** models within React Function Components.

  - There was no React Hook API to use/manage **mobx-state-tree** models directly from within functional components like I was expecting.

  So I ended up making what I thought should have already existed.

## Common Questions

- [What are the benefits?](#what-are-the-benefits)
- [How does mobx-store-provider work?](#how-does-mobx-store-provider-work)
- [Can't I just use React Context?](#cant-i-just-use-react-context)

## What are the benefits?

- A clean, simple, and straight-forward hooks-based API.
- [mapStateToProps](/api/useStore#using-a-mapstatetoprops-callback) support (analogous to [Redux mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate)).
- [Multiple stores](/multiple-stores) support.
- Extremely small footprint (![Package size](https://img.shields.io/bundlephobia/minzip/mobx-store-provider)).

## How does mobx-store-provider work?

It uses React Context, wrapping a developer friendly hooks-based interface around it for use in functional components.

The goal is to provide a simple API that allows you to use **mobx-state-tree** from within [React Function Components](https://www.robinwieruch.de/react-function-component) while also giving a couple additional features to help with application development and cover common use cases (such as [multiple stores](/multiple-stores) and selectors via [mapStateToProps](/api/useStore#using-a-mapstatetoprops-callback)).

## Can't I just use React Context?

Yes, as an alternative you _can use_ the React Context API directly.

...but there are a couple of issues to consider:

1. Manual React Context management, which includes:

   - Creating and instrumenting the React Context.

   - Maintaining the imports and exports of the `Provider` and `Context`.

   Both of these are especially cumbersome if you have multiple models.

   With **mobx-store-provider** model instances as well as access to their `Provider` and `Context` are managed for you through a simplified and terse API.

1. Using the Context API (directly) in a modern functional React component is clunky.

   The hooks provided by **mobx-store-provider** supply you with a much more idiomatic React Hook interface to your state and its related logic.

[Back to **Introduction**](/){: .btn .btn-blue }
